import React, { Component } from "react";
import "./DefaultBottomLayout.scss";
import { Row, Col } from "reactstrap";

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
          <strong>
            <h1> Pet Name</h1>
            <hr className="pb-3" />
            <p>Hp: {this.state.petHp}</p>
            <p>Attack: {this.state.petAttack}</p>
            <p>Defense: {this.state.petDefense}</p>
            <hr className="pb-3" />
            <p>Hunger:</p>
            <p>Energy:</p>
            <p>Happiness:</p>
          </strong>
        </Col>
        <Col sm="4 bottomLayout__content">Content</Col>
        <Col sm="3 bottomLayout__charImage">Character Image</Col>
      </Row>
    );
  }
}

export default DefaultBottomLayout;
