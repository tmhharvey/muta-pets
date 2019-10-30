import React, { Component } from "react";
import { Row, Col, Progress, Tooltip } from "reactstrap";
import "./PetStats.scss";

class PetStats extends Component {
  state = {};
  render() {
    const {
      mainPetInfo: {
        stats: { Hp, Attack, Defense },
        status: { happiness, energy, hunger }
      }
    } = this.props;

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
                <p className="monsterStats__info__data">{Hp}</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p>ATTACK:</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p className="monsterStats__info__data">{Attack}</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p>DEFENSE:</p>
              </Col>
              <Col sm="6" className="pt-1">
                <p className="monsterStats__info__data">{Defense}</p>
              </Col>
            </Row>
          </Col>

          <Col sm="7">
            <Row>
              <Col sm="12 pt-3">
                <div className="monsterStats__statusBars">
                  <p>Happiness: </p>
                  {happiness < 33 ? (
                    <Progress striped value={happiness} color="danger">
                      <strong>{happiness} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress striped value={happiness} color="success">
                      <strong>{happiness} / 100</strong>
                    </Progress>
                  )}
                </div>
              </Col>{" "}
              <Col sm="12">
                <div className="monsterStats__statusBars">
                  <p>Energy: </p>
                  {energy < 33 ? (
                    <Progress striped value={energy} color="danger">
                      <strong>{energy} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress striped value={energy} color="success">
                      <strong>{energy} / 100</strong>
                    </Progress>
                  )}
                </div>
              </Col>{" "}
              <Col sm="12">
                <div className="monsterStats__statusBars">
                  <p>Hunger: </p>
                  {hunger < 60 ? (
                    <Progress striped value={hunger} color="success">
                      <strong>{hunger} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress striped value={hunger} color="danger">
                      <strong>{hunger} / 100</strong>
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
