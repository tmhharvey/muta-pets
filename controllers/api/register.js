const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../../models/user");

//Registration Example
router.post("/register", async (req, res) => {
  console.log("register route hit...");
  console.log(req.body.password);

  var foodItemsList = {
    meatHaunch: {
      name: "Meat Haunch",
      type: "food",
      effect: -20,
      description: "A haunch of meat from the Forbidden Forest",
      defaultCount: 3,
      image: "/static/media/meat.3c253285.png"
    },

    smallBerry: {
      name: "Small Berry",
      type: "food",
      effect: -10,
      description: "A couple of berries picked from the Forbidden Forest",
      defaultCount: 3,
      image:
        "data:image/png;base64,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"
    },
    starFruit: {
      name: "Star Fruit",
      type: "food",
      effect: -99,
      description:
        "An amazing fruit capable of staving off hunger for days with just one bite...",
      defaultCount: 1,
      image: "/static/media/starFruit.69f215e5.png"
    }
  };

  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const userDbEntry = {};
  userDbEntry.userName = req.body.userName;
  userDbEntry.email = req.body.email;
  userDbEntry.password = hashedPassword;
  userDbEntry.userType = "U";
  userDbEntry.inventory = [
    foodItemsList.starFruit,
    foodItemsList.meatHaunch,
    foodItemsList.smallBerry
  ];

  console.log(userDbEntry.password);
  console.log(userDbEntry.userName);
  console.log(userDbEntry.email);
  console.log(userDbEntry.userType);

  try {
    const emailTaken = await User.findOne({
      email: userDbEntry.email
    });

    const userNameTaken = await User.findOne({
      userName: userDbEntry.userName
    });

    console.log("Is the user EMAIL taken: " + emailTaken ? "Yes" : "No");
    console.log("Is the user NAME taken: " + userNameTaken ? "Yes" : "No");

    if (!emailTaken && !userNameTaken) {
      if (req.body.email && req.body.password && req.body.userName) {
        console.log("====");
        console.log(userDbEntry);
        const user = await User.create(userDbEntry);
        console.log("user created: " + user);

        req.session.email = user.email;
        req.session.userName = user.userName;
        req.session.logged = true;
        req.session.userId = user._id;

        res.json({
          status: 200,
          session: req.session,
          userId: user._id,
          userType: "U",
          message: "User Successfully Created"
        });
      } else {
        console.log("PLEASE ENTER USERNAME AND PASSWORD.");
        res.json({
          status: 406,
          data: JSON.stringify({
            message: "PLEASE ENTER USERNAME AND PASSWORD."
          })
        });
      }
    } else {
      console.log("USERNAME TAKEN.");
      res.json({
        status: 406,
        data: JSON.stringify({
          message: "USERNAME TAKEN."
        })
      });
    }
  } catch (err) {
    console.log(`Login failed. Error: ${err}`);
    res.send(`Login failed. Error: ${err}`);
  }
});

//Login Example
router.post("/login", async (req, res) => {
  console.log(req.body.emailOrUserName);
  try {
    const foundUserEmail = await User.findOne({
      email: req.body.emailOrUserName
    });
    console.log(`FOUND EMAIL: ${foundUserEmail}`);

    const foundUserName = await User.findOne({
      userName: req.body.emailOrUserName
    });
    console.log(`FOUND USER: ${foundUserName}`);

    if (foundUserEmail || foundUserName) {
      var foundUser = foundUserEmail ? foundUserEmail : foundUserName;
      console.log("found user is true");
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        console.log("PASSWORD CORRECT.");
        req.session.message = "";
        req.session.email = foundUserEmail
          ? foundUserEmail.email
          : foundUserName.email;
        req.session.userName = foundUserEmail
          ? foundUserEmail.userName
          : foundUserName.userName;
        req.session.logged = true;
        req.session.userId = foundUserEmail
          ? foundUserEmail._id
          : foundUserName._id;
        req.session.userType = foundUserEmail
          ? foundUserEmail.userType
          : foundUserName.userType;
        console.log(`STARTED SESSION: ${JSON.stringify(req.session)}`);
        console.log("===== SESSION DATA =======");
        console.log(req.session.email);
        console.log(req.session.userName);
        console.log(req.session.userId);
        res.json({
          status: 200,
          session: req.session,
          userId: req.session.userId,
          userType: req.session.userType
        });
      } else {
        req.session.message = "USERNAME/PASS INCORRECT";
        res.json({
          status: 406,
          data: {
            message: "USERNAME/PASS INCORRECT"
          }
        });
      }
    } else {
      req.session.message = "USERNAME/PASS INCORRECT";
      res.json({
        status: 406,
        data: JSON.stringify({
          message: "USERNAME/PASS INCORRECT"
        })
      });
    }
  } catch (err) {
    res.send(err);
  }
});

router.get("/logout", (req, res) => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  req.session.destroy(err => {
    if (err) {
      res.send(err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
