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

    const {
      mainPetInfo: { name, image },
      userName
    } = this.props;

    return (
      <Row className="bottomLayout text-center">
        <Col sm="2 bottomLayout__monsterImage">
          <h1>{name}</h1>
          <img src={image} />
        </Col>
        <Col sm="4">
          <PetStats mainPetInfo={this.props.mainPetInfo}></PetStats>
        </Col>
        <Col sm="4 bottomLayout__abilityContent">
          <PetAbilitiesInfo
            abilities={this.props.mainPetInfo.abilities}
          ></PetAbilitiesInfo>
        </Col>
        <Col sm="2">
          <div className="bottomLayout__charImage">
            <h2>{userName}</h2>
            <img src={defaultBoyAvatar}></img>
          </div>
        </Col>
      </Row>
    );
  }
}

export default DefaultBottomLayout;
