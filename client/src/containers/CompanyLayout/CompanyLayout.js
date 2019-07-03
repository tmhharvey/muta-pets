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
import navigation from "../../_companyNav";
// routes config
import routes from "../../routes";
import CompanyLogin from "../../views/CompanyDashboard/CompanyLogin/CompanyLogin";
import CompanyRegister from "../../views/CompanyDashboard/CompanyRegister/CompanyRegister";
import { throws } from "assert";

const CompanyLayoutAside = React.lazy(() => import("./CompanyLayoutAside"));
const CompanyLayoutFooter = React.lazy(() => import("./CompanyLayoutFooter"));
const CompanyLayoutHeader = React.lazy(() => import("./CompanyLayoutHeader"));

class CompanyLayout extends Component {
  state = {
    userId: "",
    userType: "",
    registration: false
  };

  registrationRender = () => {
    this.setState({
      registration: true
    });
  };

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">
      <div className="sk-spinner sk-spinner-pulse" />
    </div>
  );

  render() {
    const { logoutHandler } = this.props.context;
    // const { logoutHandler, state:{authenticated} } = this.props.context;
    return (
      <div className="app">
        <AppHeader fixed>
          <Suspense fallback={this.loading()}>
            <CompanyLayoutHeader logout={logoutHandler} />
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
                  <Redirect from="/" to="/company-dashboard/home" />
                </Switch>
              </Suspense>
            </Container>
          </main>
        </div>
        <AppFooter>
          <Suspense fallback={this.loading()}>
            <CompanyLayoutFooter />
          </Suspense>
        </AppFooter>
      </div>
    );
  }
}

export default CompanyLayout;
