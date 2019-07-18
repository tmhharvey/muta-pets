import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import Modal from "../UI/Modal/Modal";
import fireLandsImage from "../../assets/img/fireLandsImage.jpg";
import tutorialPMImage from "../../assets/img/introImage.jpg";
import Tutorial1PM from "./TutorialPM/Tutorial1PM";
import DefaultNav from "../UI/Navs/DefaultNav/DefaultNav";
import DefaultBottomLayout from "../UI/Footers/DefaultBottomLayout/DefaultBottomLayout";
import InquiredPetInfo from "./InquiredPetInfo/InquiredPetInfo";
import PlaceHolderPet from "../../assets/img/placeholderPet.png";
import "./PetManagement.scss";
import StartingPetSelection from "./StartingPetSelection/StartingPetSelection";
import PetManagementDashboard from "./PetManagementDashboard/PetManagementDashboard";
import FoodList from "../helpers/foodItemsList";

class PetManagement extends Component {
  state = {
    firstPetNotSelected: true,
    showTutorialPM: false,
    inquiredPetInfo: {},
    inquiredPetModal: false,
    mainPetInfo: {
      stats: {
        Hp: "",
        Attack: "",
        Defense: ""
      },
      status: {
        happiness: "",
        energy: "",
        hunger: ""
      },
      image: PlaceHolderPet,
      petName: "",

      abilities: []
    },
    inventory: []
  };

  componentDidMount = async () => {
    this.getUserInfo();
  };

  getUserInfo = async () => {
    const userInfo = await axios.get(
      process.env.REACT_APP_BACKEND + "/user/information"
    );

    if (!userInfo.data.session.email) {
      this.props.history.push("/");
    } else {
      this.setState({
        userName: userInfo.data.user.userName,
        firstPetNotSelected: userInfo.data.user.firstPetNotSelected,
        showTutorialPM: userInfo.data.user.tutorials.tutorialPM,
        mainPetInfo: userInfo.data.pet,
        inventory: userInfo.data.user.inventory
      });
    }
  };

  tutorialModalHandler1 = async () => {
    const updatedUser = await axios.post(
      process.env.REACT_APP_BACKEND + "/user/tutorialPM"
    );

    if (updatedUser.data.updatedUser) {
      this.setState({
        showTutorialPM: updatedUser.data.updatedUser.tutorialPM
      });
    }
  };

  modalToggler = () => {
    this.setState({
      inquiredPetModal: false
    });
  };

  selectedPetHandler = (
    petName,
    petImage,
    petDescription,
    petDiet,
    petStats,
    petAbilities
  ) => {
    this.setState({
      inquiredPetInfo: {
        name: petName,
        image: petImage,
        description: petDescription,
        diet: petDiet,
        stats: petStats,
        abilities: petAbilities
      },
      inquiredPetModal: true
    });
  };

  chosenPetHandler = async petInfo => {
    const updatedResult = await axios.post(
      process.env.REACT_APP_BACKEND + "/user/firstPetSelected",
      {
        petInfo: petInfo
      }
    );
    var mainPet = updatedResult.data.chosenPet;

    this.setState({
      mainPetInfo: mainPet,
      inquiredPetModal: false,
      firstPetNotSelected: false
    });
  };

  render() {
    return (
      <>
        <DefaultNav userName={this.state.userName} />
        <Row className="mainContent text-center">
          {this.state.firstPetNotSelected ? (
            <StartingPetSelection
              selectedPetHandler={this.selectedPetHandler}
            />
          ) : (
            <PetManagementDashboard
              inventory={this.state.inventory}
              getUserInfo={this.getUserInfo}
            />
          )}
        </Row>
        {this.state.firstPetNotSelected ? null : (
          <DefaultBottomLayout
            petHp={this.state.mainPetInfo.stats.Hp}
            petDefense={this.state.mainPetInfo.stats.Defense}
            petAttack={this.state.mainPetInfo.stats.Attack}
            petImage={this.state.mainPetInfo.image}
            petName={this.state.mainPetInfo.name}
            petHunger={this.state.mainPetInfo.status.hunger}
            petEnergy={this.state.mainPetInfo.status.energy}
            petHappiness={this.state.mainPetInfo.status.happiness}
            abilities={this.state.mainPetInfo.abilities}
          />
        )}

        <Modal
          show={this.state.showTutorialPM}
          chosenImage={tutorialPMImage}
          height={"85%"}
          width={"85%"}
        >
          <Tutorial1PM clicked={this.tutorialModalHandler1} />
        </Modal>

        {this.state.inquiredPetModal ? (
          <Modal
            show={this.state.inquiredPetModal}
            chosenImage={fireLandsImage}
            modalToggler={this.modalToggler}
            height={"90%"}
            width={"90%"}
          >
            <InquiredPetInfo
              petInfo={this.state.inquiredPetInfo}
              chosenPetHandler={this.chosenPetHandler}
            />
          </Modal>
        ) : null}
      </>
    );
  }
}

export default PetManagement;
