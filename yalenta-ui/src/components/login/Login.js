import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card, Container, Button, Form } from "react-bootstrap";
import NavBar from "../includes/NavBar";
import { login } from "./LoginActions.js";
import FooBar from "../includes/FooBar";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLoginClick = () => {
    const userData = new URLSearchParams()
    userData.append('username', this.state.username)
    userData.append('password', this.state.password)
    this.props.login(userData, "/");
  };
  render() {
    return (
        <div>
          <NavBar />
          <Container>
            <h2>Login</h2>
            <hr />
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group controlId="usernameId">
                    <Form.Label>Your Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        placeholder="Enter username"
                        value={this.state.username}
                        onChange={this.onChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="passwordId">
                    <Form.Label>Your password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.onChange}
                    />
                  </Form.Group>
                </Form>
                <Button color="primary" onClick={this.onLoginClick}>
                  Login
                </Button>
              </Card.Body>
              <Card.Footer>
                <Card.Text>
                  Don't have account? <Link to="/signup">Signup</Link>
                </Card.Text>
                <Card.Text>
                  Forget password? <Link to="/send_reset_password">Reset Password</Link>
                </Card.Text>
              </Card.Footer>
            </Card>
          </Container>
          <FooBar />
        </div>
    );
  }
}

//export default Login;
Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {
  login
})(withRouter(Login));