import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import {Alert, Container, Card} from "react-bootstrap";
import NavBar from "../includes/NavBar";
import FooBar from "../includes/FooBar";
import customAxios from "../../utils/CustomAxios";

class ActivateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    const { uid, token } = this.props.match.params;

    customAxios
        .post("/users/activation/", { uid, token })
        .then(response => {
          this.setState({ status: "success" });
        })
        .catch(error => {
          this.setState({ status: "error" });
        });
  }

  render() {
    let errorAlert = (
        <Alert variant="danger">
          <Alert.Heading>Problem during account activation</Alert.Heading>
          Please try again or contact service support for further help.
        </Alert>
    );

    let successAlert = (
        <Alert variant="success">
          <Alert.Heading>Your account has been activated</Alert.Heading>
          <p>
            You can <Link to="/login/">Login</Link> to your account.
          </p>
        </Alert>
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
            <h2>Activate Account</h2>
            <hr/>
            <Card>
              <Card.Body>
                {alert}
              </Card.Body>
            </Card>
          </Container>
          <FooBar/>
        </div>
    );
  }
}

ActivateAccount.propTypes = {};

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(withRouter(ActivateAccount));