const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Pet = require("../../models/pet");

router.post("/useItemHunger", async (req, res) => {
  console.log("Item route was hit");
  console.log(req.body.id);

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
      console.log(
        "############### THE PETS HUNGER IS COMPLETED QUENCHED #############"
      );
      var updatedHungerZero = await Pet.findOneAndUpdate(
        petQuery,
        {
          "status.hunger": 0
        },
        { multi: true, new: true }
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
