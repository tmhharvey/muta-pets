import React, { Component } from "react";
import axios from "axios";
import { Row, Col, Button } from "reactstrap";
import fireGolem from "../../../assets/img/fireGolem.jpg";
import cryingCloud from "../../../assets/img/cryingCloud.jpg";
import Furibo from "../../../assets/img/kuribo.jpg";
import Natog from "../../../assets/img/greenDog.jpg";
import Feepy from "../../../assets/img/magmar.jpg";
import Gyptci from "../../../assets/img/cerci.jpg";
import Blussy from "../../../assets/img/tooCute.jpg";
import Borm from "../../../assets/img/brainWorm.jpg";
import "./StartingPetSelection.scss";

class StartingPetSelection extends Component {
  state = {
    startingPets: [
      {
        name: "Folem",
        image: fireGolem,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      },
      {
        name: "Cloudia",
        image: cryingCloud,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      },
      {
        name: "Furbio",
        image: Furibo,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      },
      {
        name: "Natog",
        image: Natog,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 50,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      },
      {
        name: "Feepy",
        image: Feepy,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      },
      {
        name: "Gyptci",
        image: Gyptci,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      },
      {
        name: "Blussy",
        image: Blussy,
        description:
          "The Fire Golem is a pet of the fire type which comes from the Volcano lands.  This pet is very hard to train at first... but with time can become extremely powerful",
        diet: "Rocks, leaves, and lava",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      },
      {
        name: "Borm",
        image: Borm,
        description:
          "A very cute looking Brain Worm.  Don't be fooled however, Borm will eat almost anything it comes in contact with... including OTHER Mutapets!",
        diet: "Brains, animals",
        stats: {
          Hp: 250,
          Attack: 5,
          Defense: 20
        },
        abilities: [
          {
            name: "Flail",
            type: "attack",
            damage: 3,
            manaCost: 1,
            manaType: "colorless",
            cooldown: 0,
            image: "/static/media/flail.c3ad8329.png",
            tooltip: "A desperate attack that is both cheap and weak"
          }
        ]
      }
    ],
    selectedPetInfo: {},
    selectedPetModal: false
  };

  render() {
    var renderStartingPets;
    renderStartingPets = this.state.startingPets.map(pet => {
      return (
        <Col md="3 text-center">
          <div
            className="selectPetCard"
            key={pet.name}
            onClick={() => {
              this.props.selectedPetHandler(
                pet.name,
                pet.image,
                pet.description,
                pet.diet,
                pet.stats,
                pet.abilities
              );
            }}
          >
            <h3 className="selectPetCard__title">{pet.name}</h3>
            <img src={pet.image} />
          </div>
        </Col>
      );
    });

    return <Row>{renderStartingPets}</Row>;
  }
}

export default StartingPetSelection;
