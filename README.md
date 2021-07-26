# Test assignment for a Python Developer candidate


## ToDo

- [x] app posts
- [x] app about
- [x] static and templates
- [x] paginator
- [x] tests
- [x] api
- [x] doc
- [x] docker
- [x] docker compose
- [x] add comments
- [x] liquibase
- [x] oauth with access token
- [x] refresh token
- [x] React FE
- [x] Activate email
- [x] Reset password email 
- [x] Celery + Redis + RabbitMQ  


## Deployment Yalenta
### Build the image
A Docker image is a private file system just for your container. It provides all the files and code your container needs.

`docker build -t yalenta .`

### Run your container
Start a container based on the image you built in the previous step. Running a container launches your application with private resources, securely isolated from the rest of your machine.

`docker run -p 8000:8000 --name yalenta -d yalenta`

### Run your yalenta site

[http://127.0.0.1:8000](http://127.0.0.1:8000)

## Task: Newsfeed
Create a news feed with a form to add news based on a web application. Each news item should contain:
- title,
- publication date,
- news body (text format), 
- pictures (optional).
News feed display must support page-by-page display with configurable number of news items per page: 10, 20, and 50.
All news items should be displayed.

## Technology requirements
Django, Django Forms, database: MySQL or PostgreSQL
An additional plus would be the use of containerization technologies for deployment.

## Requirements for the presentation of results
The completed ToR must be compiled into a .gzip, .bzip2, or .zip archive and include:
- Instructions for assembly (if the project is assembled in parts) as well as instructions for use in English.
- Where appropriate, additional files with database structure, application configuration, etc.
Solutions that do not meet the requirements will not be considered.


