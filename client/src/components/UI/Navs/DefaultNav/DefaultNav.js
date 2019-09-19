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
            <Col sm="1" />
            <Col sm="3">
              <div className="mainNav__defaultNavStyling">
                <Link to={`/home`}>
                  <div
                    className={
                      this.props.pmNavActive
                        ? "mainNav__linkItems navActive"
                        : "mainNav__linkItems"
                    }
                  >
                    Pet Management
                  </div>
                </Link>
              </div>
            </Col>
            <Col sm="3">
              <div className="mainNav__defaultNavStyling">
                <Link to={`/pet-abilities`}>
                  {" "}
                  <div
                    className={
                      this.props.abilitesNavActive
                        ? "mainNav__linkItems navActive"
                        : "mainNav__linkItems"
                    }
                  >
                    Abilities
                  </div>
                </Link>
              </div>
            </Col>
            <Col sm="3">
              <div className="mainNav__defaultNavStyling">
                <Link to={`/mutate-lab`}>
                  {" "}
                  <div
                    className={
                      this.props.mutateLabNavActive
                        ? "mainNav__linkItems navActive"
                        : "mainNav__linkItems"
                    }
                  >
                    Mutate Lab
                  </div>
                </Link>
              </div>
            </Col>
            <Col sm="2" />
          </Row>{" "}
        </Col>
        <Col sm="2" className="mainNav__avatar">
          {/* <Row>
            <Col sm="11">
              <Link to={`/home`}>Contestant: {this.props.userName}</Link>
            </Col>
            <Col sm="1"> </Col>
          </Row> */}
        </Col>
      </Row>
    );
  }
}

export default DefaultNav;
