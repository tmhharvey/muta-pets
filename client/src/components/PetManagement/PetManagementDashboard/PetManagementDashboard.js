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
          className={
            this.state.inventoryItemActive
              ? "mainPetCard inventoryActive"
              : "mainPetCard"
          }
          onClick={() => {
            this.itemUsedHandler(this.state.mainPet._id);
            this.petInfoToggler(this.state.mainPet);
          }}
        >
          <h3 className="mainPetCard__title">{this.state.mainPet.name}</h3>{" "}
          <img src={this.state.mainPet.image} />
        </div>
      </Col>
    );

    var renderCollectedPets = this.state.collectedPets.map(collectedPet => {
      return (
        <Col md="3" className="" key={collectedPet._id}>
          <div
            className={
              this.state.inventoryItemActive
                ? "collectedPetsCard inventoryActive"
                : "collectedPetsCard"
            }
            onClick={() => {
              this.itemUsedHandler(collectedPet._id);
              this.petInfoToggler(collectedPet);
            }}
          >
            <h3 className="collectedPetsCard__title">{collectedPet.name}</h3>{" "}
            <img src={collectedPet.image} />
          </div>
        </Col>
      );
    });

    var renderInventory = this.props.inventory.map((itemInfo, Index) => {
      return (
        <Col sm="4" key={itemInfo.name + itemInfo.defaultCount + Index}>
          <p> {itemInfo.name} </p>
          <div
            className={
              this.state.inventoryItemActive
                ? "inventorySection__inventoryCard inventoryActive"
                : "inventorySection__inventoryCard"
            }
            onClick={() => {
              this.inventoryStateHandler(itemInfo, Index);
            }}
          >
            <p className="inventorySection__inventoryCard__itemUses">
              {itemInfo.defaultCount}
            </p>
            <img src={itemInfo.image} />
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
        <Col sm="3">
          <div className="inventorySection">
            {" "}
            <h2 className="inventorySection__title">Inventory</h2>
            <hr />
            <Row>{renderInventory}</Row>
          </div>
        </Col>
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
