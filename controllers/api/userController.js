const express = require("express");
const router = express.Router();
const User = require("../../models/user");
const Pet = require("../../models/pet");
const MutatedPet = require("../../models/mutatedPet");

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
  console.log(req.body);
  console.log(req.session);
  console.log(req.session.email)

  var userToFind = req.session.email;

  const userQuery = { email: userToFind };
  const petQuery = { main: true, userId: req.session.userId };
  console.log (userQuery);
  console.log(petQuery);

  try {
    var foundUser = await User.findOne(userQuery);

    const foundPet = await Pet.findOne(petQuery);
    console.log(foundUser);
    console.log(foundPet);
    res.json({
      status: 200,
      session: req.session,
      user: foundUser,
      pet: foundPet
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/getAllPets", async (req, res) => {
  console.log("pet route hit");

  var petsOwner = req.session.userId;
  console.log(req.session.userId);

  const petQuery = { userId: petsOwner };

  try {
    const foundPets = await Pet.find(petQuery);
    console.log("all the pets");
    console.log(foundPets);
    res.json({
      status: 200,
      session: req.session,
      pets: foundPets
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/getMainPet", async (req, res) => {
  console.log("MAIN PET route hit");

  var petsOwner = req.session.userId;
  console.log(req.session.userId);

  const petQuery = { userId: petsOwner, main: true };

  try {
    const foundMainPet = await Pet.findOne(petQuery);
    console.log("@@@@@@@@@@@@@@@ User's Main Pet @@@@@@@@@@@@@@@@@");
    console.log(foundMainPet);
    res.json({
      status: 200,
      session: req.session,
      mainPet: foundMainPet
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/getAvailableMutations", async (req, res) => {
  console.log("getAvailableMutations route hit");

  var petsOwner = req.session.userId;
  console.log(req.session.userId);

  const petQuery = { userId: petsOwner, canBeMutated: true };

  try {
    const foundPets = await Pet.find(petQuery);
    console.log(
      "$$$$$$$$$$$$$$$$$$$$ all the mutateable pets here $$$$$$$$$$$$$$$$$$$$$"
    );
    console.log(foundPets);
    res.json({
      status: 200,
      session: req.session,
      petsArray: foundPets
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/searchForMutatedPet", async (req, res) => {
  console.log("searchForMutatedPet route hit");
  console.log(req.body);

  var petOneCode = req.body.pet1.mutateId;
  var petTwoCode = req.body.pet2.mutateId;
  var petOneName = req.body.pet1.name;
  var petTwoName = req.body.pet2.name;

  if (petOneCode === petTwoCode && petOneName !== petTwoName) {
    var petsOwner = req.session.userId;
    mutationId = petOneCode + petTwoCode;

    mutatedPetFindQuery = { mutateId: mutationId };

    try {
      const foundMutatedPet = await MutatedPet.findOne(mutatedPetFindQuery);
      console.log(
        "$$$$$$$$$$$$$$$$$$$$ A MUTATION WAS FOUND $$$$$$$$$$$$$$$$$$$$$"
      );
      console.log(foundMutatedPet);

      res.json({
        status: 200,
        session: req.session,
        mutatedPet: foundMutatedPet
      });
    } catch (err) {
      console.log(err);
      res.send(err);
    }

    console.log("===");
    console.log(newPet);
  } else {
    res.json({
      status: 200,
      session: req.session,
      mutatedPet: false
    });
  }
});

router.post("/createMutatedPet", async (req, res) => {
  console.log("createMutatedPet route hit");
  console.log(req.body.petOne);

  var petOneConsumeQuery = { _id: req.body.petOne._id };
  var petTwoConsumeQuery = { _id: req.body.petTwo._id };
  var mutatedPet = req.body.mutatedPetToCreate;
  var mainPetQuestion =
    req.body.petOne.main || req.body.petTwo.main ? true : false;
  const newPet = {
    userId: req.session.userId,
    main: mainPetQuestion,
    name: mutatedPet.name,
    image: mutatedPet.image,
    description: mutatedPet.description,
    diet: mutatedPet.diet,
    stats: mutatedPet.stats,
    abilities: mutatedPet.abilities,
    canBeMutated: false,
    mutateId: req.body.petOne.mutateId + req.body.petTwo.mutateId
  };

  try {
    const petOneConsumed = await Pet.remove(petOneConsumeQuery);
    const petTwoConsumed = await Pet.remove(petTwoConsumeQuery);
    const createdMutatedPet = await Pet.create(newPet);
    console.log(
      "$$$$$$$$$$$$$$$$$$$$ A MUTATION WAS CREATED MWAHAHAHHA $$$$$$$$$$$$$$$$$$$$$"
    );
    console.log(createdMutatedPet);

    res.json({
      status: 200,
      session: req.session,
      mutatedPet: createdMutatedPet
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
    name: mainPetInfo.name,
    image: mainPetInfo.image,
    description: mainPetInfo.description,
    diet: mainPetInfo.diet,
    stats: mainPetInfo.stats,
    abilities: mainPetInfo.abilities
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
      updatedUser: updatedUser,
      chosenPet: createdPet
    });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/updateInventory", async (req, res) => {
  var userToFind = req.session.email;
  var inventoryIndex = req.body.inventoryIndex;
  var indexQuery = `inventory.${inventoryIndex}.defaultCount`;

  console.log("the index is: " + inventoryIndex);

  const query = { email: userToFind };

  try {
    var updatedUser = await User.findOneAndUpdate(
      query,
      {
        $inc: {
          [indexQuery]: -1
        }
      },
      { new: true }
    );

    console.log("==========the updated users data is========");
    console.log(updatedUser);

    if (updatedUser.inventory[inventoryIndex].defaultCount < 1) {
      console.log(
        "THE ITEM IS ALL USED UP ========================================="
      );
      updatedUser.inventory.splice(inventoryIndex, 1);
      console.log(updatedUser);
      var userUpdatedInventory = await User.findOneAndUpdate(
        query,
        updatedUser,
        { returnNewDocument: true }
      );
      console.log("@@@@@@@@@@@@@@@ UPDATED USER INVENTORY @@@@@@@@@@@@@@@@@@");
      console.log(userUpdatedInventory);

      res.json({
        status: 200,
        session: req.session,
        updatedUser: userUpdatedInventory
      });
    } else {
      console.log(updatedUser);

      res.json({
        status: 200,
        session: req.session,
        updatedUser: updatedUser
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
