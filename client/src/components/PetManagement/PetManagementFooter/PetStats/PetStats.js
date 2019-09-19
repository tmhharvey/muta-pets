import React, { Component } from "react";
import { Row, Col, Progress, Tooltip } from "reactstrap";
import "./PetStats.scss";

class PetStats extends Component {
  state = {};
  render() {
    return (
      <div className="monsterStats">
        <Row className="pt-3">
          <Col sm="5">
            <Row className="monsterStats__info">
              <Col sm="12 text-center">
                <h3>Level: 1</h3>
              </Col>
              <Col sm="6">
                <p>EXP: </p>
              </Col>
              <Col sm="6">
                <p className="monsterStats__info__data">0/20</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p>HEALTH:</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p className="monsterStats__info__data">{this.props.petHp}</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p>ATTACK:</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p className="monsterStats__info__data">
                  {this.props.petAttack}
                </p>
              </Col>
              <Col sm="6" className="pt-1">
                <p>DEFENSE:</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p className="monsterStats__info__data">
                  {this.props.petDefense}
                </p>
              </Col>
            </Row>
          </Col>

          <Col sm="7">
            <Row>
              <Col sm="12 pt-3">
                <div className="monsterStats__statusBars">
                  <p>Happiness: </p>
                  {this.props.petHappiness < 33 ? (
                    <Progress
                      striped
                      value={this.props.petHappiness}
                      color="danger"
                    >
                      <strong>{this.props.petHappiness} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress
                      striped
                      value={this.props.petHappiness}
                      color="success"
                    >
                      <strong>{this.props.petHappiness} / 100</strong>
                    </Progress>
                  )}
                </div>
              </Col>{" "}
              <Col sm="12">
                <div className="monsterStats__statusBars">
                  <p>Energy: </p>
                  {this.props.petEnergy < 33 ? (
                    <Progress
                      striped
                      value={this.props.petEnergy}
                      color="danger"
                    >
                      <strong>{this.props.petEnergy} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress
                      striped
                      value={this.props.petEnergy}
                      color="success"
                    >
                      <strong>{this.props.petEnergy} / 100</strong>
                    </Progress>
                  )}
                </div>
              </Col>{" "}
              <Col sm="12">
                <div className="monsterStats__statusBars">
                  <p>Hunger: </p>
                  {this.props.petHunger < 60 ? (
                    <Progress
                      striped
                      value={this.props.petHunger}
                      color="success"
                    >
                      <strong>{this.props.petHunger} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress
                      striped
                      value={this.props.petHunger}
                      color="danger"
                    >
                      <strong>{this.props.petHunger} / 100</strong>
                    </Progress>
                  )}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PetStats;
