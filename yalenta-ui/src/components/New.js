import React, { Component } from "react";
import AddPost from "./posts/AddPost";
import NavBar from "./includes/NavBar";
import FooBar from "./includes/FooBar";

class New extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <AddPost />
            <FooBar />
        </div>
    );
  }
}

export default New;