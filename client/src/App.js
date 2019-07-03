import React, { Component } from "react";
import { HashRouter, Route, Switch, Link, Redirect } from "react-router-dom";
// import { renderRoutes } from 'react-router-config';
import Loadable from "react-loadable";
import "./App.scss";
import CompanyDashboard from "./views/CompanyDashboard/CompanyDashboard";
import ProtectedRoute from "./ProtectedRoute";
import ContextProvider, { AppContext } from "./ContextAPI/ContextProvider";
import withContext from "./ContextAPI/Context_HOC";
import { STATES } from "mongoose";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse" />
  </div>
);

// Containers
const CompanyLayout = Loadable({
  loader: () => import("./containers/CompanyLayout"),
  loading
});

const LenderLayout = Loadable({
  loader: () => import("./containers/LenderLayout"),
  loading
});

const CompanyBankAuth = Loadable({
  loader: () =>
    import("./views/CompanyDashboard/CompanyBankAuth/CompanyBankAuth"),
  loading
});

const CompanyLogin = Loadable({
  loader: () => import("./views/CompanyDashboard/CompanyLogin/CompanyLogin"),
  loading
});

const CompanyRegister = Loadable({
  loader: () =>
    import("./views/CompanyDashboard/CompanyRegister/CompanyRegister"),
  loading
});

class App extends Component {
  render() {
    return (
      <>
        <HashRouter>
          <ContextProvider>
            <Switch>
              <Route
                exact
                path="/"
                name="Login Page"
                component={withContext(CompanyLogin)}
              />
              <Route
                path="/register"
                name="Register Page"
                component={CompanyRegister}
              />

              <Route
                exact
                path="/company-bank-authentication"
                name="Bank Authentication"
                component={CompanyBankAuth}
              />

              <ProtectedRoute
                path="/company-dashboard"
                name="Home"
                component={withContext(CompanyLayout)}
              />
              <ProtectedRoute
                path="/lender-dashboard"
                name="Home"
                component={LenderLayout}
              />
            </Switch>
          </ContextProvider>
        </HashRouter>
      </>
    );
  }
}

export default App;
