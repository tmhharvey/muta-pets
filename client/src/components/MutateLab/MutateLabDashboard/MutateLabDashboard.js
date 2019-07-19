import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import PlaceHolderPet from "../../../assets/img/placeholderPet.png";
import PlaceholderImageAdd from "../../../assets/img/placeholderImageAdd.png";
import IntroImage from "../../../assets/img/introImage.jpg";
import axios from "axios";
import ItemsHandler from "../../helpers/itemsHandler.js";
import Modal from "../../UI/Modal/Modal";
import "./MutateLabDashboard.scss";
import Bite from "../../../assets/img/bite.png";
import Flail from "../../../assets/img/flail.png";
import SimpleTooltip from "../../UI/SimpleTooltip/SimpleTooltip";
import Borm from "../../../assets/img/brainWorm.jpg";
import Cloudia from "../../../assets/img/cryingCloud.jpg";
import MutateModalInfo from "../MutateModalInfo/MutateModalInfo";
import MutationTest from "../../../assets/img/mutationTest.png";

class MutateLabDashboard extends Component {
  state = {
    availableMutations: [],
    selectedPet1: {
      image: PlaceholderImageAdd
    },
    firstPetSelected: false,
    selectedPet2: {
      image: PlaceholderImageAdd
    },
    secondPetSelected: false,
    mutationModalToggle: false,
    mutationAvailable: false,
    mutatedPet: false
  };
  componentDidMount = async () => {
    console.log("componentDidMount for MutateLabDashboard Fired");
    console.log(MutationTest);

    this.getMutatedPetInfo();
  };

  getMutatedPetInfo = async () => {
    const availableMutations = await axios.get(
      process.env.REACT_APP_BACKEND + "/user/getAvailableMutations"
    );
    console.log("MUTATEABLE PETS HERE");
    console.log(availableMutations.data);
    if (availableMutations.data.petsArray.length > 0) {
      this.setState(
        {
          availableMutations: availableMutations.data.petsArray,
          mutationAvailable: true
        },
        () => {
          console.log("mutation pets state");
          console.log(this.state.availableMutations);
        }
      );
    }
  };

  mutateSelectionHandler = selectedPet => {
    console.log(selectedPet.image);
    var firstPetSelected = this.state.firstPetSelected;
    var secondPetSelected = this.state.secondPetSelected;
    console.log(firstPetSelected);
    if (!firstPetSelected && !secondPetSelected) {
      this.setState(
        {
          selectedPet1: selectedPet,
          firstPetSelected: true
        },
        () => {
          this.modalToggler();
          this.checkMutationHandler();
        }
      );
    } else if (firstPetSelected && !secondPetSelected) {
      this.setState(
        {
          selectedPet2: selectedPet,
          secondPetSelected: true
        },
        () => {
          this.modalToggler();
          this.checkMutationHandler();
        }
      );
    } else {
      window.location = process.env.REACT_APP_BACKEND + "mutate-lab";
    }
  };

  checkMutationHandler = async () => {
    var firstPetSelected = this.state.firstPetSelected;
    var secondPetSelected = this.state.secondPetSelected;

    if (firstPetSelected && secondPetSelected) {
      console.log("createMutationHandlers pets");
      var selectedPetOne = this.state.selectedPet1;
      var selectedPetTwo = this.state.selectedPet2;
      console.log(selectedPetOne);
      console.log(selectedPetTwo);
      const searchforMutatedPet = await axios.post(
        process.env.REACT_APP_BACKEND + "/user/searchForMutatedPet",
        {
          pet1: selectedPetOne,
          pet2: selectedPetTwo
        }
      );

      console.log(searchforMutatedPet);

      this.setState({
        mutatedPet: searchforMutatedPet.data.mutatedPet
      });
    } else {
      return null;
    }
  };

  createMutatedPetHandler = async () => {
    var petOne = this.state.selectedPet1;
    var petTwo = this.state.selectedPet2;
    var mutatedPetToCreate = this.state.mutatedPet;
    console.log("pet ONE TO BE CONSUMED");
    console.log(petOne);

    const createdMutatedPet = await axios.post(
      process.env.REACT_APP_BACKEND + "/user/createMutatedPet",
      {
        petOne: petOne,
        petTwo: petTwo,
        mutatedPetToCreate: mutatedPetToCreate
      }
    );

    console.log(createdMutatedPet.data.mutatedPet);
    if (createdMutatedPet.data.mutatedPet) {
      window.location = process.env.REACT_APP_BACKEND + "home";
    }
  };

  modalToggler = () => {
    if (this.state.mutationAvailable) {
      this.setState({
        mutationModalToggle: !this.state.mutationModalToggle
      });
    }
  };
  render() {
    return (
      <>
        <Col sm="12">
          <h1 className="text-center mutateLabTitle"> Mutate Lab</h1>
        </Col>
        <Row className="mutateLabSection">
          <Col sm="4">
            <div
              className="mutateLabSection__petCard"
              onClick={() => {
                this.modalToggler();
              }}
            >
              {this.state.mutationAvailable ? (
                <h3 className="mutateLabSection__petCard__title">
                  Pet Available to Mutate!
                </h3>
              ) : (
                <h3 className="mutateLabSection__petCard__title">
                  No Mutations Available
                </h3>
              )}

              <img src={this.state.selectedPet1.image} />
            </div>
          </Col>
          <Col sm="4">
            <div
              className="mutateLabSection__petCard"
              onClick={() => {
                this.modalToggler();
              }}
            >
              {this.state.mutationAvailable ? (
                <h3 className="mutateLabSection__petCard__title">
                  Pet Available to Mutate!
                </h3>
              ) : (
                <h3 className="mutateLabSection__petCard__title">
                  No Mutations Available
                </h3>
              )}

              <img src={this.state.selectedPet2.image} />
            </div>
          </Col>
          <Col sm="4">
            {!this.state.mutatedPet ? (
              <div className="mutateLabSection__petCard">
                <h3 className="mutateLabSection__petCard__title">
                  No Mutation Was Found
                </h3>
              </div>
            ) : (
              <div className="mutateLabSection__petCard">
                <h3 className="mutateLabSection__petCard__title">
                  {this.state.mutatedPet.name}
                </h3>
                <img src={this.state.mutatedPet.image} />
                <Button
                  color="success"
                  size="lg"
                  onClick={() => {
                    this.createMutatedPetHandler();
                  }}
                >
                  Mutate!!!
                </Button>
              </div>
            )}
          </Col>
        </Row>
        {this.state.mutationModalToggle ? (
          <Modal
            show={this.state.mutationModalToggle}
            chosenImage={IntroImage}
            modalToggler={this.modalToggler}
            height={"90%"}
            width={"90%"}
          >
            <MutateModalInfo
              availableMutations={this.state.availableMutations}
              mutateSelectionHandler={this.mutateSelectionHandler}
            />
          </Modal>
        ) : null}
      </>
    );
  }
}

export default MutateLabDashboard;
