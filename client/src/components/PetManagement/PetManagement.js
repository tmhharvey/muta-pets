import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button } from "reactstrap";
import Modal from "../UI/Modal/Modal";
import Backdrop from "../UI/Backdrop/Backdrop";
import fireGolem from "../../assets/img/fireGolem.png";
import fireLandsImage from "../../assets/img/fireLandsImage.jpg";
import tutorialPMImage from "../../assets/img/introImage.jpg";
import Tutorial1PM from "./TutorialPM/Tutorial1PM";
import DefaultNav from "../UI/Navs/DefaultNav/DefaultNav";
import DefaultBottomLayout from "../UI/Footers/DefaultBottomLayout/DefaultBottomLayout";
import SelectedPetInfo from "./SelectedPetInfo/SelectedPetInfo";
import "./PetManagement.scss";

class PetManagement extends Component {
  state = {
    firstPetNotSelected: true,
    startingPets: [
      {
        name: "Fire Golem",
        image: fireGolem,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        }
      },
      {
        name: "Pet 2",
        image: "-"
      },
      {
        name: "Pet 3",
        image: "-"
      },
      {
        name: "Pet 4",
        image: "-"
      },
      {
        name: "Pet 5",
        image: "-"
      },
      {
        name: "Pet 6",
        image: "-"
      },
      {
        name: "Pet 7",
        image: "-"
      },
      {
        name: "Pet 8",
        image: "-"
      }
    ],
    showTutorialPM: false,
    selectedPetInfo: {},
    selectedPetModal: false
  };

  componentDidMount = async () => {
    const userInfo = await axios.get(
      process.env.REACT_APP_BACKEND + "/user/information"
    );

    console.log("username Info");
    console.log(userInfo.data);

    if (userInfo.data.user) {
      this.setState({
        userName: userInfo.data.session.userName,
        firstPetNotSelected: userInfo.data.user.firstPetNotSelected,
        showTutorialPM: userInfo.data.user.tutorials.tutorialPM
      });
    }
  };

  tutorialModalHandler1 = async () => {
    const updatedUser = await axios.post(
      process.env.REACT_APP_BACKEND + "/user/tutorialPM"
    );

    console.log("user Info");
    console.log(updatedUser.data);

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
    console.log("selectedPetHandler Fired");
    this.setState(
      {
        selectedPetInfo: {
          petName: petName,
          petImage: petImage,
          petDescription: petDescription,
          petDiet: petDiet,
          petStats: petStats
        },
        selectedPetModal: true
      },
      () => {
        console.log("Pet Info has been set");
      }
    );
  };

  render() {
    var renderStartingPets;

    if (this.state.firstPetNotSelected) {
      renderStartingPets = this.state.startingPets.map(pet => {
        return (
          <Col md="3 text-center">
            <div
              className="selectPetCard text-center"
              key={pet.name}
              onClick={() => {
                this.selectedPetHandler(
                  pet.name,
                  pet.image,
                  pet.description,
                  pet.diet,
                  pet.stats
                );
              }}
            >
              <h3 className="selectPetCard__title">{pet.name}</h3>
              <img src={fireGolem} />
            </div>
          </Col>
        );
      });
    }

    return (
      <div className="mainDashboard">
        <DefaultNav userName={this.state.userName} />
        <Row className="mainContent text-center">{renderStartingPets}</Row>
        <DefaultBottomLayout />

        <Modal
          show={this.state.showTutorialPM}
          backgroundImage={tutorialPMImage}
        >
          <Tutorial1PM clicked={this.tutorialModalHandler1} />
        </Modal>

        {this.state.selectedPetModal ? (
          <Modal
            show={this.state.selectedPetModal}
            chosenImage={fireLandsImage}
          >
            <SelectedPetInfo petInfo={this.state.selectedPetInfo} />
          </Modal>
        ) : null}
      </div>
    );
  }
}

export default PetManagement;
