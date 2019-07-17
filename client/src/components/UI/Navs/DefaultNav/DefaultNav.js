import React, { Component } from "react";
import "./DefaultNav.scss";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import DefaultBoyAvatar from "../../../../assets/img/defaultBoyAvatar.png";

class DefaultNav extends Component {
  state = {};
  render() {
    return (
      <Row className="mainNav">
        <Col sm="2 text-center ">
          <div className="mainNav__map">
            {" "}
            <p>Map</p>
          </div>
        </Col>
        <Col sm="8 text-center">
          <Row>
            <Col sm="3" className="mainNav__defaultNavStyling">
              <Link to={`/home`}>Pet Management</Link>
            </Col>
            <Col sm="3" className="mainNav__defaultNavStyling">
              <Link to={`/pet-abilities`}>Abilities</Link>
            </Col>
            <Col sm="3" className="mainNav__defaultNavStyling">
              <Link to={`/home`}>Mutate Lab</Link>
            </Col>
            <Col sm="3" />
          </Row>{" "}
        </Col>
        <Col sm="2" className="mainNav__avatar">
          <Row>
            <Col sm="11">
              <Link to={`/home`}>Contestant: {this.props.userName}</Link>
            </Col>
            <Col sm="1"> {/* <img src={DefaultBoyAvatar} /> */}</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default DefaultNav;
