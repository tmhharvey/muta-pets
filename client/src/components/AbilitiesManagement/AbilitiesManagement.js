import React, { Component } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Row, Col, Button } from "reactstrap";
import Modal from "../UI/Modal/Modal";
import DefaultNav from "../UI/Navs/DefaultNav/DefaultNav";
import DefaultBottomLayout from "../UI/Footers/DefaultBottomLayout/DefaultBottomLayout";
import "./AbilitiesManagement.scss";
import AbilitiesManagementDashboard from "./AbilitiesManagementDashboard/AbilitiesManagementDashboard";
import PlaceHolderPet from "../../assets/img/placeholderPet.png";
import FoodList from "../helpers/foodItemsList";

class AbilitiesManagement extends Component {
  state = {
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
    inventory: [],
    petInfoReceived: false
  };

  componentDidMount = async () => {
    console.log("component did mount fired");
    this.getUserInfo();
  };

  getUserInfo = async () => {
    console.log("get user info fired");
    const userInfo = await axios.get(
      process.env.REACT_APP_BACKEND + "/user/information"
    );
    console.log("====== user info here ========");
    console.log(userInfo);

    if (!userInfo.data.session.email) {
      this.props.history.push("/");
    } else {
      this.setState(
        {
          userName: userInfo.data.user.userName,
          mainPetInfo: userInfo.data.pet,
          inventory: userInfo.data.user.inventory,
          petInfoReceived: true
        },
        () => {
          console.log("CURRENT ABILITY MANAGEMENT PET STATE");
          console.log(this.state.mainPetInfo);
        }
      );
    }
  };

  render() {
    return (
      <>
        <DefaultNav userName={this.state.userName} />
        <Row className="mainContent text-center">
          <AbilitiesManagementDashboard
            inventory={this.state.inventory}
            getUserInfo={this.getUserInfo}
          />
        </Row>
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
      </>
    );
  }
}

export default AbilitiesManagement;
