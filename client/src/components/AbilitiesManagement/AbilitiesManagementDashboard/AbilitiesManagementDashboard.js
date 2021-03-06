import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import PlaceHolderPet from "../../../assets/img/placeholderPet.png";
import axios from "axios";
import ItemsHandler from "../../helpers/itemsHandler.js";
import "./AbilitiesManagementDashboard.scss";
import Bite from "../../../assets/img/bite.png";
import Flail from "../../../assets/img/flail.png";
import SimpleTooltip from "../../UI/SimpleTooltip/SimpleTooltip";
import Inventory from "../../Inventory/Inventory";

class AbilitiesManagementDashboard extends Component {
  state = {
    collectedPets: [],
    mainPet: {
      availableAbilities: []
    },
    inventoryItemActive: false,
    petInfoActive: true,
    activeItem: null
  };
  componentDidMount = async () => {
    console.log("componentDidMount for AbilitiesManagementDashboard Fired");
    console.log(Flail);
    this.getPetInfo();
  };

  getPetInfo = async () => {
    const foundMainPet = await axios.get(
      process.env.REACT_APP_BACKEND + "/user/getMainPet"
    );
    console.log("MAIN PET HERE");
    console.log(foundMainPet.data.mainPet);

    this.setState({
      mainPet: foundMainPet.data.mainPet
    });
  };

  chosenAbilityHandler = async (petId, ability) => {
    const chosenAbility = await axios.post(
      process.env.REACT_APP_BACKEND + "/pet/abilityChosen",
      {
        id: petId,
        ability: ability
      }
    );

    console.log(chosenAbility);
    if (chosenAbility.data.status === 200) {
      this.setState(
        {
          mainPet: chosenAbility.data.updatedPet
        },
        () => {
          this.props.getUserInfo();
        }
      );
    }
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
    var renderedAvailableAbilities = this.state.mainPet.availableAbilities.map(
      ability => {
        return (
          <Col sm="3" key={ability.name}>
            <h3 className="abilitiesSelectionSection__abilitiesCardTitle">
              {ability.name}
            </h3>
            <div
              className="abilitiesSelectionSection__availableAbilitiesCard"
              onClick={() => {
                this.chosenAbilityHandler(this.state.mainPet._id, ability);
              }}
              id={"someid" + ability.name}
            >
              <img src={ability.image} />
            </div>
            <SimpleTooltip placement="bottom" target={"someid" + ability.name}>
              <Row>
                <Col md="12" className="text-center">
                  <h3>{ability.name}</h3>
                </Col>
                <Col md="12" className="text-left">
                  <p>Description: {ability.tooltip}</p>
                </Col>
                <Col md="12" className="text-left">
                  <p>Damage: {ability.damage}</p>
                  <p>Mana Cost: {ability.manaCost}</p>
                  <p>Mana Type: {ability.manaType}</p>
                  <p>Cooldown: {ability.cooldown}</p>
                </Col>
              </Row>
            </SimpleTooltip>
          </Col>
        );
      }
    );

    var renderInventory = this.props.inventory.map((itemInfo, Index) => {
      return (
        <Col sm="4" key={itemInfo.name + itemInfo.defaultCount + Index}>
          <p className="inventorySection__itemTitle"> {itemInfo.name} </p>
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
          <Row className="abilitiesSelectionSection">
            <Col md="5" className="">
              <div
                className={
                  this.state.inventoryItemActive
                    ? "abilitiesSelectionSection__mainPetCard inventoryActive"
                    : "abilitiesSelectionSection__mainPetCard"
                }
                onClick={() => {
                  this.itemUsedHandler(this.state.mainPet._id);
                }}
              >
                <h3 className="abilitiesSelectionSection__mainPetCard__title">
                  {this.state.mainPet.name}
                </h3>{" "}
                <img src={this.state.mainPet.image} />
              </div>
            </Col>
            <Col md="7">
              <div className="abilitiesSelectionSection__title">
                <h2>Available Abilities</h2>
                <hr />
                <Row>{renderedAvailableAbilities}</Row>
              </div>
            </Col>
          </Row>
        </Col>

        <Inventory
          inventory={this.props.inventory}
          inventoryStateHandler={this.inventoryStateHandler}
        ></Inventory>
      </>
    );
  }
}

export default AbilitiesManagementDashboard;
