import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  Alert,
  Container,
  Button,
  Form,
  FormControl, Card
} from "react-bootstrap";
import NavBar from "../includes/NavBar";
import FooBar from "../includes/FooBar";
import customAxios from "../../utils/CustomAxios";

class ResendActivation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      emailError: "",
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onResendClick = () => {
    this.setState({ emailError: "" });
    this.setState({ status: "" });

    const userData = {
      email: this.state.email
    };

    customAxios
        .post("/users/resend_activation/", userData)
        .then(response => {
          this.setState({ status: "success" });
        })
        .catch(error => {
          if (error.response && error.response.data.hasOwnProperty("email")) {
            this.setState({ emailError: error.response.data["email"] });
          } else {
            this.setState({ status: "error" });
          }
        });
  };
  render() {
    let errorAlert = (
        <Alert variant="danger">
          <Alert.Heading>Problem during activation email send </Alert.Heading>
          Please try again or contact service support for further help.
        </Alert>
    );

    let successAlert = (
        <Alert variant="success">
          <Alert.Heading>Email sent </Alert.Heading>
          <p>
            We send you an email with activation link. Please check your email.
          </p>
          <p>
            Please try again or contact us if you do not receive it within a few
            minutes.
          </p>
        </Alert>
    );

    let form = (
        <div>
          <Form>
            <Form.Group controlId="emailId">
              <Form.Label>
                Your account is inactive. Please activate account by sending the
                email with activation link.
              </Form.Label>
              <Form.Control
                  isInvalid={this.state.emailError}
                  type="text"
                  name="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.onChange}
              />
              <FormControl.Feedback type="invalid">
                {this.state.emailError}
              </FormControl.Feedback>
            </Form.Group>
          </Form>
          <Button color="primary" onClick={this.onResendClick}>
            Send activation email
          </Button>
        </div>
    );

    let alert = "";
    if (this.state.status === "error") {
      alert = errorAlert;
    } else if (this.state.status === "success") {
      alert = successAlert;
    }

    return (
        <div>
          <NavBar/>
          <Container>
            <h2>Resend Activation Email</h2>
            <hr/>
            <Card>
              <Card.Body>{alert}
                {this.state.status !== "success" && form}
              </Card.Body>
            </Card>
          </Container>
          <FooBar/>
        </div>
    );
  }
}

ResendActivation.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(ResendActivation));