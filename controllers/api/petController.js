const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Pet = require("../../models/pet");

router.post("/useItemHunger", async (req, res) => {
  console.log("Item route was hit");

  var item = req.body.item;
  var petId = req.body.id;

  var hungerIncrement = req.body.item.effect;
  console.log(hungerIncrement);
  query = { _id: petId };
  try {
    var updatedPet = await Pet.findOneAndUpdate(
      query,
      {
        $inc: {
          "status.hunger": hungerIncrement
        }
      },
      { multi: true, new: true }
    );
    console.log("========");
    console.log(updatedPet.status.hunger);
    console.log("========");
    if (updatedPet.status.hunger < 0) {
      var updatedHungerZero = await Pet.findOneAndUpdate(
        query,
        {
          "status.hunger": 0
        },
        { multi: true }
      );

      console.log(updatedHungerZero);

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

module.exports = router;
