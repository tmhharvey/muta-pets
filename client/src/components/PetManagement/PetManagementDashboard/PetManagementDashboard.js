import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import PlaceHolderPet from "../../../assets/img/placeholderPet.png";
import axios from "axios";
import ItemsHandler from "../../helpers/itemsHandler.js";
import "./PetManagementDashboard.scss";
import Bite from "../../../assets/img/bite.png";

class PetManagementDashboard extends Component {
  state = {
    collectedPets: [],
    mainPet: "",
    inventoryItemActive: false,
    petInfoActive: true,
    activeItem: null
  };

  componentDidMount = async () => {
    console.log("componentDidMount Fired");

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
        activeItem: null
      });
    } else {
      console.log(item);
      console.log(index);
      this.setState({
        inventoryItemActive: true,
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

      console.log("item route data");
      console.log(itemUsed);

      var userInventory = await ItemsHandler.userInventoryUpdated(
        inventoryIndex
      );

      console.log("user inventory update data");
      console.log(userInventory);
      if (itemUsed.data.status == 200 && userInventory.data.status == 200) {
        console.log("Item Used AND User Inventory were updated");
        this.setState(
          {
            inventoryItemActive: false,
            activeItemName: null
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
          <Row>
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
      </>
    );
  }
}

export default PetManagementDashboard;
