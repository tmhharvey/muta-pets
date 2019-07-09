import React, { Component } from "react";
import "./MainDashboard.scss";

import { Row, Col } from "reactstrap";
import DefaultNav from "../components/UI/Navs/DefaultNav/DefaultNav";
import DefaultBottomLayout from "../components/DefaultBottomLayout/DefaultBottomLayout";

class MainDashboard extends Component {
  state = {};
  render() {
    return (
      <div className="mainDashboard">
        <DefaultNav />
        <Row className="mainContent text-center">
          <Col sm="12">Here is the main content</Col>
        </Row>
        <DefaultBottomLayout />
      </div>
    );
  }
}

export default MainDashboard;
