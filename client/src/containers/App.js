import React, { Component } from "react";
import "./App.scss";
import { Row, Col } from "reactstrap";
import {
  Link,
  BrowserRouter,
  Route,
  withRouter,
  Switch
} from "react-router-dom";

import Loadable from "react-loadable";
import ProtectedRoute from "../ProtectedRoute";

import AuthContextProvider, {
  AuthAppContext
} from "../Context/auth/AuthContextProvider";
import withAuthContext from "../Context/auth/Context_HOC";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const Login = Loadable({
  loader: () => import("../components/Login/Login"),
  loading
});

const AbilitiesManagement = Loadable({
  loader: () => import("../components/AbilitiesManagement/AbilitiesManagement"),
  loading
});

const PetManagement = Loadable({
  loader: () => import("../components/PetManagement/PetManagement"),
  loading
});

const Register = Loadable({
  loader: () => import("../components/Register/Register"),
  loading
});

class App extends Component {
  render() {
    return (
      <Row className="contentContainer">
        <Col sm="1" />
        <Col sm="10">
          <div className="mainDashboard">
            <BrowserRouter>
              <AuthContextProvider>
                <Switch>
                  <Route exact path="/" component={withAuthContext(Login)} />
                  <ProtectedRoute
                    exact
                    path="/home"
                    component={withAuthContext(PetManagement)}
                  />
                  <ProtectedRoute
                    exact
                    path="/pet-abilities"
                    component={withAuthContext(AbilitiesManagement)}
                  />
                  <Route
                    exact
                    path="/register"
                    component={withAuthContext(Register)}
                  />
                </Switch>
              </AuthContextProvider>
            </BrowserRouter>
          </div>
        </Col>
        <Col sm="1" />
      </Row>
    );
  }
}

export default App;
