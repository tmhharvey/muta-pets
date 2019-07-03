import React from "react";
import { Route } from "react-router-dom";
import CompanyLogin from "./views/CompanyDashboard/CompanyLogin/CompanyLogin";
import CompanyRegister from "./views/LenderDashboard/LenderRegister/LenderRegister";

const CompanyDashboard = React.lazy(() =>
  import("./views/CompanyDashboard/CompanyDashboard")
);

const CompanyProfile = React.lazy(() =>
  import("./views/CompanyDashboard/Profile/Profile")
);

const PaymentHistory = React.lazy(() =>
  import("./views/CompanyDashboard/PaymentHistory/PaymentHistory")
);

const LenderDashboard = React.lazy(() =>
  import("./views/LenderDashboard/LenderDashboard")
);

const FindCompanies = React.lazy(() =>
  import("./views/LenderDashboard/FindCompanies/FindCompanies")
);

const CompanyInfoCard = React.lazy(() =>
  import("./views/LenderDashboard/CompanyInfoCard/CompanyInfoCard")
);

const CompanyInfoProfile = React.lazy(() =>
  import("./views/LenderDashboard/CompanyInfoProfile/CompanyInfoProfile")
);

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  //Company User-type Routes

  {
    path: "/company-dashboard/home",
    name: "Home",
    component: CompanyDashboard,
    exact: true
  },

  {
    path: "/company-dashboard/profile",
    name: "Company Profile",
    component: CompanyProfile,
    exact: true
  },
  {
    path: "/company-dashboard/payment-history",
    name: "Payment History",
    component: PaymentHistory,
    exact: true
  },
  {
    path: "/lender-dashboard/home",
    name: "Home",
    component: LenderDashboard,
    exact: true
  },

  //Lender User-type Routes

  {
    path: "/lender-dashboard/find-companies",
    name: "Find Companies",
    component: FindCompanies,
    exact: true
  },
  {
    path: "/lender-dashboard/company-info/:id",
    name: "Company Info",
    component: CompanyInfoCard,
    exact: true
  },

  {
    path: "/lender-dashboard/company-info-advanced/:id",
    name: "Company Info Advanced",
    component: CompanyInfoProfile,
    exact: true
  }
];

export default routes;
