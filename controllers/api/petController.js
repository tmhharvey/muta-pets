const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Pet = require("../../models/pet");

router.post("/useItemHunger", async (req, res) => {
  var item = req.body.item;
  var petId = req.body.id;

  petQuery = { _id: petId };
  var hungerIncrement = req.body.item.effect;
  try {
    var updatedPet = await Pet.findOneAndUpdate(
      petQuery,
      {
        $inc: {
          "status.hunger": hungerIncrement
        }
      },
      { new: true }
    );

    if (updatedPet.status.hunger < 0) {
      var updatedHungerZero = await Pet.findOneAndUpdate(
        petQuery,
        {
          "status.hunger": 0
        },
        { multi: true, new: true }
      );

      res.json({
        status: 200,
        session: req.session,
        updatedPet: updatedHungerZero
      });
    } else {
      console.log(updatedPet);

      res.json({
        status: 200,
        session: req.session,
        updatedPet: updatedPet
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/abilityChosen", async (req, res) => {
  var ability = req.body.ability;
  var petId = req.body.id;

  petQuery = { _id: petId };

  //if there are 7 abilities selected,
  //then push the most recent one selected
  //and pop the first one selected

  try {
    var updatedPet = await Pet.findOneAndUpdate(
      petQuery,
      {
        $push: {
          abilities: ability
        },
        $pull: {
          availableAbilities: ability
        }
      },
      { new: true }
    );

    if (updatedPet.abilities.length >= 7) {
      var abilitytoRemove = updatedPet.abilities[0];
      var updatedPetWithTooManyAbilities = await Pet.findOneAndUpdate(
        petQuery,
        {
          $pop: { abilities: -1 },
          $push: {
            abilities: ability
          },
          $push: {
            availableAbilities: abilitytoRemove
          }
        },
        { new: true }
      );

      res.json({
        status: 200,
        session: req.session,
        updatedPet: updatedPetWithTooManyAbilities
      });
    } else {
      res.json({
        status: 200,
        session: req.session,
        updatedPet: updatedPet
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/changeMainPet", async (req, res) => {
  var petId = req.body.petId;
  var currentMainPetId = req.body.mainPetId;

  if (petId == currentMainPetId) {
    res.json({
      status: 400,
      session: req.session
    });
  } else {
    changeToMainQuery = { _id: petId };
    removeFromMainQuery = { _id: currentMainPetId };
    try {
      var newMainPet = await Pet.findOneAndUpdate(
        changeToMainQuery,
        {
          $set: {
            main: true
          }
        },
        { new: true }
      );

      var removedFromMainPet = await Pet.findOneAndUpdate(
        removeFromMainQuery,
        {
          $set: {
            main: false
          }
        },
        { new: true }
      );

      res.json({
        status: 200,
        session: req.session,
        updatedPet: newMainPet
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  }
});
module.exports = router;
