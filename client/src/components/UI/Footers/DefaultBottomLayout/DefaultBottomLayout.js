import React, { Component } from "react";
import "./DefaultBottomLayout.scss";
import { Row, Col, Progress } from "reactstrap";

class DefaultBottomLayout extends Component {
  state = {};

  componentDidMount = () => {
    var petInfo = JSON.parse(this.props.mainPetInfo);

    this.setState({
      petImage: petInfo.petImage,
      petName: petInfo.petName,
      petHp: petInfo.petStats.Hp,
      petAttack: petInfo.petStats.Attack,
      petDefense: petInfo.petStats.Defense
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
            <Col sm="4">
              <p>Hp: {this.state.petHp}</p>{" "}
            </Col>
            <Col sm="4">
              <p>Attack: {this.state.petAttack}</p>{" "}
            </Col>
            <Col sm="4">
              <p>Defense: {this.state.petDefense}</p>
            </Col>
            <hr />
            <Col sm="12">
              <p>
                Happiness: <Progress value={75} color="success" />
              </p>
            </Col>{" "}
            <Col sm="12">
              <p>
                Energy: <Progress value={20} color="danger" />
              </p>
            </Col>{" "}
            <Col sm="12">
              <p>
                Hunger: <Progress value={10} color="success" />
              </p>
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
