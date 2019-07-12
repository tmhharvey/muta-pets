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

class PetManagement extends Component {
  state = {
    firstPetNotSelected: true,
    showTutorialPM: false,
    inquiredPetInfo: {},
    inquiredPetModal: false,
    mainPetInfo: {
      Hp: "",
      Attack: "",
      Defense: "",
      mainPetImage: PlaceHolderPet
    }
  };

  componentDidMount = async () => {
    console.log("component did mount fired");
    this.getUserInfo();
  };

  getUserInfo = async () => {
    const userInfo = await axios.get(
      process.env.REACT_APP_BACKEND + "/user/information"
    );

    if (!userInfo.data.session.email) {
      this.props.history.push("/");
    }

    if (userInfo.data.user) {
      this.setState({
        userName: userInfo.data.session.userName,
        firstPetNotSelected: userInfo.data.user.firstPetNotSelected,
        showTutorialPM: userInfo.data.user.tutorials.tutorialPM,
        mainPetInfo: userInfo.data.user.mainPet
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

  selectedPetHandler = (
    petName,
    petImage,
    petDescription,
    petDiet,
    petStats
  ) => {
    this.setState({
      inquiredPetInfo: {
        petName: petName,
        petImage: petImage,
        petDescription: petDescription,
        petDiet: petDiet,
        petStats: petStats
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
    var parsedMainPet = JSON.parse(updatedResult.data.updatedUser.mainPet);

    this.setState(
      {
        mainPetInfo: parsedMainPet,
        inquiredPetModal: false
      },
      () => {
        this.getUserInfo();
      }
    );
  };

  render() {
    return (
      <div className="mainDashboard">
        <DefaultNav userName={this.state.userName} />
        <Row className="mainContent text-center">
          {this.state.firstPetNotSelected ? (
            <StartingPetSelection
              selectedPetHandler={this.selectedPetHandler}
            />
          ) : null}
        </Row>
        {this.state.firstPetNotSelected ? null : (
          <DefaultBottomLayout mainPetInfo={this.state.mainPetInfo} />
        )}

        <Modal show={this.state.showTutorialPM} chosenImage={tutorialPMImage}>
          <Tutorial1PM clicked={this.tutorialModalHandler1} />
        </Modal>

        {this.state.inquiredPetModal ? (
          <Modal
            show={this.state.inquiredPetModal}
            chosenImage={fireLandsImage}
          >
            <InquiredPetInfo
              petInfo={this.state.inquiredPetInfo}
              chosenPetHandler={this.chosenPetHandler}
            />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default PetManagement;
