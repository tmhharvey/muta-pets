import React, { Component } from "react";
import "./DefaultBottomLayout.scss";
import { Row, Col, Progress, Tooltip } from "reactstrap";
import SimpleTooltip from "../../../UI/SimpleTooltip/SimpleTooltip";

class DefaultBottomLayout extends Component {
  state = {
    tooltipOpen: false
  };

  toggle = () => {
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  };

  render() {
    this.toggle = this.toggle.bind(this);
    var renderedAbilities = this.props.abilities.map(ability => {
      return (
        <Col sm="4" key={ability.name}>
          <h3>{ability.name}</h3>
          <div className="abilitiesCard" id={"someid" + ability.name}>
            <img src={ability.image} />
          </div>
          <SimpleTooltip placement="top" target={"someid" + ability.name}>
            <Row>
              <Col md="12" className="text-center">
                <h3>{ability.name}</h3>
              </Col>
              <Col md="12" className="text-left">
                <p>Description: {ability.tooltip}</p>
              </Col>
              <Col md="12" className="text-left">
                <p>Damage: {ability.damage}</p>
                <p>Mana Cost: {ability.manaCost}</p>
                <p>Mana Type: {ability.manaType}</p>
                <p>Cooldown: {ability.cooldown}</p>
              </Col>
            </Row>
          </SimpleTooltip>
        </Col>
      );
    });
    return (
      <Row className="bottomLayout text-center">
        <Col sm="2 bottomLayout__monsterImage">
          <h1>{this.props.petName}</h1>
          <img src={this.props.petImage} />
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
              <p>Hp: {this.props.petHp}</p>{" "}
            </Col>
            <Col sm="4" className="pt-3">
              <p>Attack: {this.props.petAttack}</p>{" "}
            </Col>
            <Col sm="4" className="pt-3">
              <p>Defense: {this.props.petDefense}</p>
            </Col>
            <hr />
            <Col sm="12 pt-3">
              <div className="bottomLayout__monsterStats--statusBars">
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
              <div className="bottomLayout__monsterStats--statusBars">
                <p>Energy: </p>
                {this.props.petEnergy < 33 ? (
                  <Progress striped value={this.props.petEnergy} color="danger">
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
              <div className="bottomLayout__monsterStats--statusBars">
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
                  <Progress striped value={this.props.petHunger} color="danger">
                    <strong>{this.props.petHunger} / 100</strong>
                  </Progress>
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col sm="4 bottomLayout__content">
          <h4>Abilities</h4>
          <hr />
          <Row>{renderedAbilities}</Row>
        </Col>
        <Col sm="3 bottomLayout__charImage">Character Image</Col>
      </Row>
    );
  }
}

export default DefaultBottomLayout;
