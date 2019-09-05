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
            <Col sm="3">
              <Link to={`/home`}>
                <div
                  className={
                    this.props.pmNavActive
                      ? "mainNav__defaultNavStyling navActive"
                      : "mainNav__defaultNavStyling"
                  }
                >
                  Pet Management
                </div>
              </Link>
            </Col>
            <Col sm="3">
              <Link to={`/pet-abilities`}>
                {" "}
                <div
                  className={
                    this.props.abilitesNavActive
                      ? "mainNav__defaultNavStyling navActive"
                      : "mainNav__defaultNavStyling"
                  }
                >
                  Abilities
                </div>
              </Link>
            </Col>
            <Col sm="3">
              <Link to={`/mutate-lab`}>
                {" "}
                <div
                  className={
                    this.props.mutateLabNavActive
                      ? "mainNav__defaultNavStyling navActive"
                      : "mainNav__defaultNavStyling"
                  }
                >
                  Mutate Lab
                </div>
              </Link>
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
