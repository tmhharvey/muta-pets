import React, { Component } from "react";
import "./DefaultBottomLayout.scss";
import { Row, Col, Progress } from "reactstrap";

class DefaultBottomLayout extends Component {
  state = {};

  componentDidMount = () => {
    var petInfo = this.props.mainPetInfo;
    console.log(petInfo);

    this.setState({
      petImage: petInfo.image,
      petName: petInfo.petName,
      petHp: petInfo.stats.Hp,
      petAttack: petInfo.stats.Attack,
      petDefense: petInfo.stats.Defense,
      petHappiness: petInfo.status.happiness,
      petEnergy: petInfo.status.energy,
      petHunger: petInfo.status.hunger
    });
  };

  render() {
    return (
      <Row className="bottomLayout text-center">
        <Col sm="2 bottomLayout__monsterImage">
          <h1>{this.state.petName}</h1>
          <img src={this.state.petImage} />
        </Col>
        <Col sm="3 bottomLayout__monsterStats">
          <Row className="pt-3">
            <Col sm="6">
              <h3>Level: 1</h3>
            </Col>
            <Col sm="6">
              <h3>BP: 0/20</h3>
            </Col>{" "}
            <hr />
            <Col sm="4" className="pt-3">
              <p>Hp: {this.state.petHp}</p>{" "}
            </Col>
            <Col sm="4" className="pt-3">
              <p>Attack: {this.state.petAttack}</p>{" "}
            </Col>
            <Col sm="4" className="pt-3">
              <p>Defense: {this.state.petDefense}</p>
            </Col>
            <hr />
            <Col sm="12 pt-3">
              <div className="bottomLayout__monsterStats__statusBars">
                <p>
                  Happiness:{" "}
                  {this.state.petHappiness < 33 ? (
                    <Progress
                      striped
                      value={this.state.petHappiness}
                      color="danger"
                    >
                      <strong>{this.state.petHappiness} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress
                      striped
                      value={this.state.petHappiness}
                      color="success"
                    >
                      <strong>{this.state.petHappiness} / 100</strong>
                    </Progress>
                  )}
                </p>
              </div>
            </Col>{" "}
            <Col sm="12">
              <div className="bottomLayout__monsterStats__statusBars">
                <p>
                  Energy:{" "}
                  {this.state.petEnergy < 33 ? (
                    <Progress
                      striped
                      value={this.state.petEnergy}
                      color="danger"
                    >
                      <strong>{this.state.petEnergy} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress
                      striped
                      value={this.state.petEnergy}
                      color="success"
                    >
                      <strong>{this.state.petEnergy} / 100</strong>
                    </Progress>
                  )}
                </p>
              </div>
            </Col>{" "}
            <Col sm="12">
              <div className="bottomLayout__monsterStats__statusBars">
                <p>
                  Hunger:{" "}
                  {this.state.petHunger < 60 ? (
                    <Progress
                      striped
                      value={this.state.petHunger}
                      color="success"
                    >
                      <strong>{this.state.petHunger} / 100</strong>
                    </Progress>
                  ) : (
                    <Progress
                      striped
                      value={this.state.petHunger}
                      color="danger"
                    >
                      <strong>{this.state.petHunger} / 100</strong>
                    </Progress>
                  )}
                </p>
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm="4 bottomLayout__content">Content</Col>
        <Col sm="3 bottomLayout__charImage">Character Image</Col>
      </Row>
    );
  }
}

export default DefaultBottomLayout;
