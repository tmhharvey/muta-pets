import React, { Component } from "react";
import { Row, Col, Progress, Tooltip } from "reactstrap";
import SimpleTooltip from "../../../UI/SimpleTooltip/SimpleTooltip";
import "./PetAbilitiesInfo.scss";

class PetAbilitiesInfo extends Component {
  state = {};
  render() {
    var renderedAbilities = this.props.abilities.map(ability => {
      return (
        <Col sm="4" key={ability.name}>
          <h3 className="abilityTitle">{ability.name}</h3>
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
      <>
        <h2>Abilities</h2>

        <Row>{renderedAbilities}</Row>
      </>
    );
  }
}

export default PetAbilitiesInfo;
