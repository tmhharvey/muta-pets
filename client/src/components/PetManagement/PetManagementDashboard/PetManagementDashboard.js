import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import PlaceHolderPet from "../../../assets/img/placeholderPet.png";
import axios from "axios";
import "./PetManagementDashboard.scss";

class PetManagementDashboard extends Component {
  state = {
    collectedPets: [],
    mainPet: "",
    inventoryItemActive: false,
    petInfoActive: true,
    activeItemName: null
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

  inventoryStateHandler = itemName => {
    if (this.state.inventoryItemActive) {
      this.setState({
        inventoryItemActive: false,
        activeItemName: null
      });
    } else {
      this.setState({
        inventoryItemActive: true,
        activeItemName: itemName
      });
    }
  };

  itemUsedHandler = async petId => {
    console.log(this.state.activeItemName);
    if (this.state.inventoryItemActive) {
      const itemUsed = await axios.post(
        process.env.REACT_APP_BACKEND + "/pet/useItem",
        {
          item: this.state.activeItemName,
          id: petId
        }
      );
      console.log("item route was successful");
      console.log(itemUsed);
      if (itemUsed.data.status == 200) {
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

    var renderCollectedPets = this.state.collectedPets.map(otherPet => {
      return (
        <Col md="3" className="">
          <div
            className={
              this.state.inventoryItemActive
                ? "collectedPetsCard inventoryActive"
                : "collectedPetsCard"
            }
            onClick={() => {
              this.itemUsedHandler(this.state.mainPet._id);
            }}
          >
            <h3 className="collectedPetsCard__title">{otherPet.name}</h3>{" "}
            <img src={otherPet.image} />
          </div>
        </Col>
      );
    });

    var renderInventory = this.props.inventory.map(item => {
      return (
        <Col sm="4">
          <p> {item.name} </p>
          <div
            className="inventorySection__inventoryCard"
            onClick={() => {
              this.inventoryStateHandler(item.name);
            }}
          >
            <img src={item.image} />
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
