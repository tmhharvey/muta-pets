import React, { Component } from "react";
import "./Tutorial1PM.scss";
import { Row, Col, Button } from "reactstrap";

class Tutorial1PM extends Component {
  state = {};

  render() {
    return (
      <>
        <Row className="mt-5 text-center tutorialContent">
          <Col md={{ size: 6, offset: 3 }}>
            <h1
              style={{
                // color: "#fff",
                textAlign: "center"
              }}
              className="mt-3 tutorialContent__mainTitle"
            >
              Welcome to MutaPets!
            </h1>
          </Col>

          <Col md={{ size: 6, offset: 3 }} className="tutorialContent__content">
            <h2 className="mt-5 mb-5">
              ...Ah, I see you received my invitation traveler
            </h2>
            <h3>
              I invited only the strongest for my competition. On this island
              you will encounter danger, excitement, but most of all...
              MUTAPETS!{" "}
            </h3>
            <h3>
              Mutapets are my own creation. As a child I played pet collecting
              games and had a dream of making them a reality.
            </h3>
            <br />
            <h3>Now, it finally is!</h3>
            <br />
            <h3>
              Your are about to embark on a magnificient and dangerous journey,
              should you choose to accept this path, I will allow you to choose
              oyur very own Muta pet!
            </h3>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={{ size: 6, offset: 3 }} className="text-center">
            <Button
              color="success"
              size="lg"
              onClick={this.props.clicked}
              className="tutorialContent__button"
            >
              Select Your Pet!
            </Button>
          </Col>
        </Row>
      </>
    );
  }
}

export default Tutorial1PM;
