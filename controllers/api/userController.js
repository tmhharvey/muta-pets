const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Pet = require("../../models/pet");

// PUT Example
// router.put("/:userid/exampleURL", async (req, res) => {
//   try {
//     //Logic
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

router.get("/information", async (req, res) => {
  console.log("information route hit");

  var userToFind = req.session.email;

  const query = { email: userToFind };

  try {
    var foundUser = await User.findOne(query);
    console.log(foundUser);
    res.json({
      status: 200,
      session: req.session,
      user: foundUser
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/tutorialPM", async (req, res) => {
  var userToFind = req.session.email;

  const query = { email: userToFind };

  try {
    var updatedUser = await User.findOneAndUpdate(
      query,
      {
        $set: {
          tutorials: {
            tutorialPM: false
          }
        }
      },
      { new: true, upsert: true }
    );

    console.log(updatedUser);

    res.json({
      status: 200,
      session: req.session,
      updatedUser: updatedUser
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/firstPetSelected", async (req, res) => {
  var userToFind = req.session.email;

  const mainPetInfo = req.body.petInfo;
  console.log(mainPetInfo);

  const query = { email: userToFind };
  const newPet = {
    userId: req.session.userId,
    main: true,
    name: mainPetInfo.petName,
    image: mainPetInfo.petImage,
    description: mainPetInfo.petDescription,
    diet: mainPetInfo.petDiet,
    stats: mainPetInfo.petStats
  };
  console.log("===");
  console.log(newPet);

  try {
    const createdPet = await Pet.create(newPet);

    console.log("created pet here");
    console.log(createdPet);
    console.log("updating user");
    var updatedUser = await User.findOneAndUpdate(
      query,
      {
        $set: {
          mainPet: createdPet,
          firstPetNotSelected: false
        }
      },
      { new: true, upsert: true }
    );

    console.log("user updated with their pet...");
    console.log(updatedUser);

    res.json({
      status: 200,
      session: req.session,
      updatedUser: updatedUser
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
