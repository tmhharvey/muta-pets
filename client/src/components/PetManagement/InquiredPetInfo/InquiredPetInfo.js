import React, { Component } from "react";
import "./InquiredPetInfo.scss";
import { Row, Col, Button } from "reactstrap";
import SimpleTooltip from "../../UI/SimpleTooltip/SimpleTooltip";

class InquiredPetInfo extends Component {
  state = {};

  render() {
    const {
      petInfo: {
        image,
        name,
        diet,
        description,
        _id,
        main,
        stats: { Hp, Attack, Defense },
        abilities
      }
    } = this.props;
    var renderedAbilities = abilities.map(ability => {
      return (
        <Col sm="2" key={ability.name}>
          <h3 className="text-center">{ability.name}</h3>
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
      <div>
        <h1
          style={{
            // color: "#fff",
            textAlign: "center"
          }}
          className="mt-1"
        >
          {name}
        </h1>
        <Row className="mt-1">
          <Col md="5">
            <div className="selectedModalPetCard">
              <img src={image} />
            </div>
          </Col>
          <Col md="7 mt-5 ">
            <Row>
              <Col md="12">
                <h3 className="selectedModalPetCard__petInfo">{description}</h3>
                <h3 className="selectedModalPetCard__petInfo">
                  <strong>Diet:</strong> {diet}
                </h3>
                <h3 className="selectedModalPetCard__petInfo">
                  <u>
                    <strong>Stats</strong>
                  </u>
                  <br />
                  <br />
                  Health Points: {Hp}
                  <br />
                  Attack Points: {Attack}
                  <br />
                  Defense Points: {Defense}
                  <br />
                </h3>
              </Col>
              <Col md="12" className="text-left">
                <h3 className="selectedModalPetCard__petInfo--abilities">
                  <u>
                    <strong>Abilities</strong>
                  </u>
                  <br />
                  <br />
                </h3>
              </Col>
              {renderedAbilities}
            </Row>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={{ size: 6, offset: 3 }} className="text-center">
            {this.props.chosenPetHandler ? (
              <Button
                color="success selectedModalPetCard__selectPetBtn"
                size="lg"
                onClick={() => this.props.chosenPetHandler(this.props.petInfo)}
              >
                Choose {name}!
              </Button>
            ) : null}
            {this.props.mainPetHandler && !main ? (
              <Button
                color="success selectedModalPetCard__selectPetBtn"
                size="lg"
                onClick={() => this.props.mainPetHandler(_id)}
              >
                Make Main Pet!
              </Button>
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

export default InquiredPetInfo;
