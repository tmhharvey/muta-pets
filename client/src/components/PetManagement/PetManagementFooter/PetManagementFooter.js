import React, { Component } from "react";
import "./PetManagementFooter.scss";
import { Row, Col, Progress, Tooltip } from "reactstrap";
import defaultBoyAvatar from "../../../assets/img/defaultBoyAvatar.png";
import PetStats from "./PetStats/PetStats";
import PetAbilitiesInfo from "./PetAbilitiesInfo/PetAbilitiesInfo";

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

    return (
      <Row className="bottomLayout text-center">
        <Col sm="2 bottomLayout__monsterImage">
          <h1>{this.props.petName}</h1>
          <img src={this.props.petImage} />
        </Col>
        <Col sm="4">
          <PetStats
            petHp={this.props.petHp}
            petDefense={this.props.petDefense}
            petAttack={this.props.petAttack}
            petImage={this.props.petImage}
            petName={this.props.petName}
            petHunger={this.props.petHunger}
            petEnergy={this.props.petEnergy}
            petHappiness={this.props.petHappiness}
          ></PetStats>
        </Col>
        <Col sm="4 bottomLayout__abilityContent">
          <PetAbilitiesInfo abilities={this.props.abilities}></PetAbilitiesInfo>
        </Col>
        <Col sm="2">
          <div className="bottomLayout__charImage">
            <h2>{this.props.userName}</h2>
            <img src={defaultBoyAvatar}></img>
          </div>
        </Col>
      </Row>
    );
  }
}

export default DefaultBottomLayout;
