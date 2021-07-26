import pickle

import pika
from django.conf import settings
from django.core.mail import EmailMessage, get_connection

from celery import shared_task

# Make sure our AppConf is loaded properly.
import djcelery_emails.conf  # noqa
from djcelery_emails.utils import dict_to_email, email_to_dict

# Messages *must* be dicts, not instances of the EmailMessage class
# This is because we expect Celery to use JSON encoding, and we want to prevent
# code assuming otherwise.

TASK_CONFIG = {'name': 'djcelery_email_send_multiple', 'ignore_result': False}
TASK_CONFIG.update(settings.CELERY_EMAIL_TASK_CONFIG)

# import base if string to allow a base celery task
if 'base' in TASK_CONFIG and isinstance(TASK_CONFIG['base'], str):
    from django.utils.module_loading import import_string

    TASK_CONFIG['base'] = import_string(TASK_CONFIG['base'])


def callback(function_to_decorate):
    user = settings.AMQP_USER
    broker_host = settings.AMQP_HOST
    password = settings.AMQP_PASSWORD
    credentials = pika.PlainCredentials(user, password)
    parameters = pika.ConnectionParameters(host=broker_host,
                                           credentials=credentials)

    def receiver(*args, **kw):
        queue_name = settings.AMQP_QUEUE
        print("call_backend")
        connection = pika.BlockingConnection(parameters)
        channel = connection.channel()
        channel.queue_declare(queue=queue_name, durable=True)
        channel.basic_publish(
            exchange=queue_name,
            routing_key=queue_name,
            body=pickle.dumps(*args[0], protocol=pickle.HIGHEST_PROTOCOL)
        )
        channel.basic_consume(
            queue=queue_name,
            on_message_callback=function_to_decorate,
            auto_ack=True
        )
        channel.start_consuming()
        connection.close()
    return receiver


@shared_task(**TASK_CONFIG)
@callback
def send_emails(ch, method, properties, body):
    combined_kwargs = {}
    messages = [email_to_dict(m) for m in [pickle.loads(body)]]
    conn = get_connection(backend=settings.CELERY_EMAIL_BACKEND,
                          **combined_kwargs)
    conn.open()
    messages_sent = 0
    for message in messages:
        try:
            sent = conn.send_messages([dict_to_email(message)])
            if sent is not None:
                messages_sent += sent
            logger.info("Successfully sent email message to %r.",
                        message)
        except Exception as e:
            logger.warning("Failed to send email message to %r, retrying. (%r)",
                           message['to'], e)
            send_emails.retry([[message], combined_kwargs], exc=e, throw=False)
    conn.close()


SendEmailTask = send_email = send_emails

try:
    from celery.utils.log import get_task_logger
    logger = get_task_logger(__name__)
except ImportError:
    logger = send_emails.get_logger()
