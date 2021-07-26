import React, { Component } from "react";
import { Navbar } from "react-bootstrap";

class NavBar extends Component {
  render() {
    return (
        <div>
            <hr />
            <Navbar className="justify-content-center">
                <Navbar.Text > Yalenta by <a href="https://www.sibers.com/">Sibers</a>, 2021</Navbar.Text>
              <Navbar.Toggle />
            </Navbar>
        </div>
    );
  }
}

export default NavBar;