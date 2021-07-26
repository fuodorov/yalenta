import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Root from "./Root";
import Home from "./components/Home";
import New from "./components/New";
import Signup from "./components/account/Signup";
import Login from "./components/login/Login";
import ResendActivation from "./components/account/ResendActivation";
import ActivateAccount from "./components/account/ActivateAccount";
import ResetPassword from "./components/account/ResetPassword";
import ResetPasswordConfirm from "./components/account/ResetPasswordConfirm";
import requireAuth from "./utils/RequireAuth";

class App extends Component {
  render() {
    return (
        <div>
          <Root>
            <ToastContainer hideProgressBar={true} newestOnTop={true} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/new/" component={requireAuth(New)} />
              <Route path="/login/" component={Login} />
              <Route path="/resend_activation" component={ResendActivation} />
              <Route path="/activate/:uid/:token" component={ActivateAccount} />
              <Route path="/send_reset_password/" component={ResetPassword} />
              <Route path="/reset_password/:uid/:token" component={ResetPasswordConfirm} />
            </Switch>
          </Root>
        </div>
    );
  }
}

export default App;