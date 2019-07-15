const express = require("express");
const router = express.Router();
const Pet = require("../../models/pet");
var timeIncrement = 10800000; //10800000ms = 3 hours

petStatusBarsHandler = async () => {
  console.log("Pet Status Bar task executing...");
  try {
    var updateHappinessBars = await Pet.updateMany(
      {
        "status.happiness": { $gt: 3 }
      },
      {
        $inc: {
          "status.happiness": -4
        }
      },
      { multi: true }
    );

    var updateEnergyBars = await Pet.updateMany(
      {
        "status.energy": { $gt: 3 }
      },
      {
        $inc: {
          "status.energy": -4
        }
      },
      { multi: true }
    );

    var updateHungerBars = await Pet.updateMany(
      {
        "status.hunger": { $lt: 100 }
      },
      {
        $inc: {
          "status.hunger": +4
        }
      },
      { multi: true }
    );

    console.log("Pet Status Bar task finished...");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

setInterval(petStatusBarsHandler, timeIncrement);

module.exports = router;
