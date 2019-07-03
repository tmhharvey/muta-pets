import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppBreadcrumb,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppSidebarNav
} from "@coreui/react";
// sidebar nav config
import navigation from "../../_lenderNav";
// routes config
import routes from "../../routes";
import LenderLogin from "../../views/LenderDashboard/LenderLogin/LenderLogin";
import LenderRegister from "../../views/LenderDashboard/LenderRegister/LenderRegister";

const LenderLayoutAside = React.lazy(() => import("./LenderLayoutAside"));
const LenderLayoutFooter = React.lazy(() => import("./LenderLayoutFooter"));
const LenderLayoutHeader = React.lazy(() => import("./LenderLayoutHeader"));

class LenderLayout extends Component {
  state = {
    userId: "",
    userType: "",
    registration: false,
    loggedOut: true
  };

  registrationRender = () => {
    this.setState({
      registration: true
    });
  };

  logoutHandler = () => {
    this.setState({
      loggedOut: true,
      registration: false,
      userId: "",
      userType: ""
    });
  };

  loginHandler = async (e, email, password) => {
    e.preventDefault();

    try {
      console.log("we're about to post login to the server for the lender");
      console.log(process.env.REACT_APP_BACKEND);
      console.log(email);
      console.log(password);
      const loginResponse = await fetch(
        process.env.REACT_APP_BACKEND + `lender-auth/login`,
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password,
            userType: "L"
          }),
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parsedRes = await loginResponse.json();
      console.log("We are halfway through the process...");
      console.log(parsedRes.status);

      // If a successful response...

      if (parsedRes.status === 200 && parsedRes.data.userType === "L") {
        console.log("got login data! Response is...");
        console.log(parsedRes.data);

        // clean incoming data

        // set state
        const loginState = { ...this.state.loggedOut };
        const newLoginState = !loginState;

        this.setState({
          loggedOut: newLoginState,
          userId: parsedRes.data.userId,
          userType: parsedRes.data.userType,
          registration: false
        });
      } else {
        console.log("failed to get login data!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  registerHandler = async (e, email, password) => {
    e.preventDefault();

    try {
      console.log("we're about to post login to the server for the Lender");
      console.log(process.env.REACT_APP_BACKEND);
      const registerResponse = await fetch(
        process.env.REACT_APP_BACKEND + "lender-auth/register",
        {
          method: "POST",
          body: JSON.stringify({
            email: email,
            password: password
          }),
          credentials: "include",
          headers: {
            "Content-type": "application/json"
          }
        }
      );

      const parsedRes = await registerResponse.json();
      console.log("Register Response Data....." + parsedRes);

      // If a successful response...

      if (parsedRes.status === 200) {
        console.log("Sucessful register! Response is...");
        console.log(parsedRes.data);
        console.log(parsedRes.data.userId);
        console.log(parsedRes.data.userType);

        // set state
        const loginState = { ...this.state.loggedOut };
        const newLoginState = !loginState;
        const newUserType = parsedRes.data.userType;
        this.setState(
          {
            userId: parsedRes.data.userId,
            loggedOut: newLoginState,
            userType: newUserType
          },
          () => {
            window.location.href =
              "http://localhost:3000/#/lender-dashboard/home";
          }
        );
      } else {
        console.log("Failed to register!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
  );

  render() {
    if (this.state.loggedOut && !this.state.registration) {
      console.log("rendered 1");
      return (
        <LenderLogin
          login={this.loginHandler}
          registration={this.registrationRender}
        />
      );
    } else if (this.state.registration && this.state.loggedOut) {
      console.log("rendered 2");
      return <LenderRegister register={this.registerHandler} />;
    } else if (!this.state.loggedOut && this.state.userType === "L") {
      console.log("rendered 3");
      return (
        <div className="app">
          <AppHeader fixed>
            <Suspense fallback={this.loading()}>
              <LenderLayoutHeader logout={this.logoutHandler} />
            </Suspense>
          </AppHeader>
          <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
            <main className="main">
              <AppBreadcrumb appRoutes={routes} />
              <Container fluid>
                <Suspense fallback={this.loading()}>
                  <Switch>
                    {routes.map((route, idx) => {
                      return route.component ? (
                        <Route
                          key={idx}
                          path={route.path}
                          exact={route.exact}
                          name={route.name}
                          render={props => <route.component {...props} />}
                        />
                      ) : null;
                    })}
                    <Redirect from="/" to="/lender-dashboard/home" />
                  </Switch>
                </Suspense>
              </Container>
            </main>
          </div>
          <AppFooter>
            <Suspense fallback={this.loading()}>
              <LenderLayoutFooter />
            </Suspense>
          </AppFooter>
        </div>
      );
    }
  }
}

export default LenderLayout;
