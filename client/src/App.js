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
import MainDashboard from "./containers/MainDashboard";

import Register from "./components/Register/Register";
import Loadable from "react-loadable";
import ContextProvider, { AppContext } from "./Context/ContextProvider";
import ProtectedRoute from "./ProtectedRoute";
import withContext from "./Context/Context_HOC";
const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

const Login = Loadable({
  loader: () => import("./components/Login/Login"),
  loading
});

const MainDashboardPage = () => {
  return <MainDashboard />;
};

const LoginPage = () => {
  return <Login />;
};

const RegisterPage = () => {
  return <Register />;
};

class App extends Component {
  render() {
    return (
      <Row>
        <Col sm="1" />
        <Col sm="10">
          <BrowserRouter>
            <ContextProvider>
              <Switch>
                <Route exact path="/" component={withContext(Login)} />
                <ProtectedRoute
                  exact
                  path="/home"
                  component={MainDashboardPage}
                />
                <Route exact path="/register" component={RegisterPage} />
              </Switch>
            </ContextProvider>
          </BrowserRouter>
        </Col>
        <Col sm="1" />
      </Row>
    );
  }
}

export default App;
