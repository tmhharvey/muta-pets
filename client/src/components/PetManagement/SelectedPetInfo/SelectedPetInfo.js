import React, { Component } from "react";
import "./SelectedPetInfo.scss";
import { Row, Col, Button } from "reactstrap";

class SelectedPetInfo extends Component {
  state = {};

  render() {
    console.log("pet info");
    console.log(this.props.petInfo);

    return (
      <div>
        <h1
          style={{
            // color: "#fff",
            textAlign: "center"
          }}
          className="mt-3"
        >
          {this.props.petInfo.petName}
        </h1>
        <Row className="mt-5">
          <Col md="6 mt-5 ">
            <div className="selectedModalPetCard">
              <img src={this.props.petInfo.petImage} />
            </div>
          </Col>
          <Col md="6 mt-5">
            <h3 className="selectedModalPetCard__petInfo">
              {this.props.petInfo.petDescription}
            </h3>
            <h3 className="selectedModalPetCard__petInfo">
              <strong>Diet:</strong> {this.props.petInfo.petDiet}
            </h3>
            <h3 className="selectedModalPetCard__petInfo">
              <u className="mb-5">
                <strong>Stats</strong>
              </u>
              <br />
              <br />
              Health Points: {this.props.petInfo.petStats.Hp}
              <br />
              Attack Points: {this.props.petInfo.petStats.Attack}
              <br />
              Defense Points: {this.props.petInfo.petStats.Defense}
              <br />
            </h3>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={{ size: 6, offset: 3 }} className="text-center">
            <Button
              color="success selectedModalPetCard__selectPetBtn"
              size="lg"
              //   onClick={this.state.petInfo.clicked}
            >
              Choose {this.props.petInfo.petName}!
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SelectedPetInfo;
