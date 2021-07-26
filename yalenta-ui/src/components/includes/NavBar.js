import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logout } from "../login/LoginActions";

class NavBar extends Component {
    onLogout = () => {
        const userData = new URLSearchParams()
        this.props.logout(userData);
    };

    render() {
        const { user } = this.props.auth;
        const { isAuthenticated } = this.props.auth;
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg="light">
                    <Navbar.Brand href="/">Yalenta</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {isAuthenticated && <Navbar.Text>User: <b>{user.username}</b></Navbar.Text>}
                            {isAuthenticated && <Nav.Link href="/new">Create</Nav.Link>}
                            {!isAuthenticated && <Nav.Link href="/login">Login</Nav.Link>}
                            {isAuthenticated &&  <Nav.Link onClick={this.onLogout}>Logout</Nav.Link> }
                            {!isAuthenticated && <Nav.Link href="/signup">Sign up</Nav.Link>}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        );
    }
}

NavBar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {
    logout
})(withRouter(NavBar));