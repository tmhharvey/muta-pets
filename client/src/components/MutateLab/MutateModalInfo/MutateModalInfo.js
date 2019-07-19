import React, { Component } from "react";
import "./MutateModalInfo.scss";
import { Row, Col, Button } from "reactstrap";
import SimpleTooltip from "../../UI/SimpleTooltip/SimpleTooltip";

class MutateModalInfo extends Component {
  state = {};

  render() {
    var renderedAvailablePets = this.props.availableMutations.map(pet => {
      return (
        <Col md="3" className="">
          <div
            className="mutationPetCard"
            onClick={() => {
              this.props.mutateSelectionHandler(pet);
            }}
          >
            <h3 className="mutationPetCard__titleName">{pet.name}</h3>{" "}
            <h3 className="mutationPetCard__titleId">
              Mutation Code: {pet.mutateId}
            </h3>{" "}
            <img src={pet.image} />
          </div>
        </Col>
      );
    });

    return (
      <div>
        <h1
          style={{
            color: "#fff",
            textAlign: "center"
          }}
          className="mt-1 mb-5"
        >
          Available Pets to Mutate!
        </h1>
        <Row className="mt-1">{renderedAvailablePets}</Row>
      </div>
    );
  }
}

export default MutateModalInfo;
