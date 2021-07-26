import React, { Component } from "react";
import PostsList from "./posts/PostsList";
import NavBar from "./includes/NavBar";
import FooBar from "./includes/FooBar";

class Home extends Component {
  render() {
    return (
        <div>
            <NavBar />
            <PostsList />
            <FooBar />
        </div>
    );
  }
}

export default Home;