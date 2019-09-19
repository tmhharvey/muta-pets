import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import PlaceHolderPet from "../../../assets/img/placeholderPet.png";
import axios from "axios";
import ItemsHandler from "../../helpers/itemsHandler.js";
import "./PetManagementDashboard.scss";
import Bite from "../../../assets/img/bite.png";
import fireLandsImage from "../../../assets/img/fireLandsImage.jpg";
import InquiredPetInfo from "../InquiredPetInfo/InquiredPetInfo";
import Modal from "../../UI/Modal/Modal";
import Inventory from "../../Inventory/Inventory";

class PetManagementDashboard extends Component {
  state = {
    collectedPets: [],
    mainPet: "",
    inventoryItemActive: false,
    petInfoActive: true,
    petInfoActiveModal: false,
    activeItem: null
  };

  componentDidMount = async () => {
    this.getPetInfo();
  };

  getPetInfo = async () => {
    const userPets = await axios.get(
      process.env.REACT_APP_BACKEND + "/user/getAllPets"
    );

    userPets.data.pets.map(pet => {
      var updatedPetArray = [];
      if (pet.main) {
        this.setState({
          mainPet: pet
        });
      } else {
        var collectedPetsArray = [...this.state.collectedPets];
        collectedPetsArray.push(pet);
        this.setState({
          collectedPets: collectedPetsArray
        });
      }
    });
  };

  inventoryStateHandler = (item, index) => {
    if (this.state.inventoryItemActive) {
      this.setState({
        inventoryItemActive: false,
        activeItem: null,
        petInfoActive: true
      });
    } else {
      this.setState({
        inventoryItemActive: true,
        petInfoActive: false,
        activeItem: {
          item: item,
          index: index
        }
      });
    }
  };

  itemUsedHandler = async petId => {
    if (this.state.inventoryItemActive) {
      var usedItem = this.state.activeItem.item;
      var inventoryIndex = this.state.activeItem.index;
      // ItemsHandler.foodItemHandler(this.state.activeItemName);
      var itemUsed = await ItemsHandler.foodItemHandler(petId, usedItem);

      var userInventory = await ItemsHandler.userInventoryUpdated(
        inventoryIndex
      );

      if (itemUsed.data.status == 200 && userInventory.data.status == 200) {
        this.setState(
          {
            inventoryItemActive: false,
            activeItemName: null,
            petInfoActive: true
          },
          () => {
            this.props.getUserInfo();
          }
        );
      }
    } else {
      return null;
    }
  };

  petInfoToggler = selectedPet => {
    if (this.state.petInfoActive) {
      this.setState({
        petInfoActiveModal: true,
        selectedPetInformation: selectedPet
      });
    }
  };

  modalToggler = () => {
    this.setState({
      petInfoActiveModal: false
    });
  };

  mainPetHandler = async petId => {
    const userPets = await axios.post(
      process.env.REACT_APP_BACKEND + "/pet/changeMainPet",
      {
        petId: petId,
        mainPetId: this.state.mainPet._id
      }
    );

    if (userPets.data.status == 200) {
      this.setState(
        {
          petInfoActive: true,
          petInfoActiveModal: false,
          collectedPets: []
        },
        () => {
          this.getPetInfo();
          this.props.getUserInfo();
        }
      );
    }
  };

  render() {
    var renderedMainPet = (
      <Col md="3" className="">
        <div
          className="mainPetPanel"
          onClick={() => {
            this.itemUsedHandler(this.state.mainPet._id);
            this.petInfoToggler(this.state.mainPet);
          }}
        >
          <div
            className={
              this.state.inventoryItemActive
                ? "mainPetPanel__card inventoryActive"
                : "mainPetPanel__card"
            }
          >
            <h3 className="mainPetPanel__title">{this.state.mainPet.name}</h3>
            <img src={this.state.mainPet.image} />
          </div>
        </div>
      </Col>
    );

    var renderCollectedPets = this.state.collectedPets.map(collectedPet => {
      return (
        <Col md="3" className="" key={collectedPet._id}>
          <div
            className="collectedPetPanel"
            onClick={() => {
              this.itemUsedHandler(collectedPet._id);
              this.petInfoToggler(collectedPet);
            }}
          >
            <div
              className={
                this.state.inventoryItemActive
                  ? "collectedPetPanel__card inventoryActive"
                  : "collectedPetPanel__card"
              }
            >
              <h3 className="collectedPetPanel__title">{collectedPet.name}</h3>{" "}
              <img src={collectedPet.image} />
            </div>
          </div>
        </Col>
      );
    });

    return (
      <>
        <Col sm="9">
          <Row className="petManagementSection">
            {renderedMainPet} {renderCollectedPets}
          </Row>
        </Col>
        <Inventory
          inventory={this.props.inventory}
          inventoryStateHandler={this.inventoryStateHandler}
        ></Inventory>
        {this.state.petInfoActiveModal ? (
          <Modal
            show={this.state.petInfoActiveModal}
            chosenImage={fireLandsImage}
            modalToggler={this.modalToggler}
            height={"90%"}
            width={"90%"}
          >
            <InquiredPetInfo
              petInfo={this.state.selectedPetInformation}
              mainPetHandler={this.mainPetHandler}
            />
          </Modal>
        ) : null}
      </>
    );
  }
}

export default PetManagementDashboard;
