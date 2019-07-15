const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Pet = require("../../models/pet");

router.post("/useItem", async (req, res) => {
  console.log("Item route was hit");

  var itemName = req.body.item;
  var petId = req.body.id;
  query = { _id: petId };
  try {
    var updatedPet = await Pet.findOneAndUpdate(
      query,
      {
        $inc: {
          "status.hunger": -30
        }
      },
      { multi: true }
    );

    console.log(updatedPet);

    res.json({
      status: 200,
      session: req.session,
      updatedPet: updatedPet
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
