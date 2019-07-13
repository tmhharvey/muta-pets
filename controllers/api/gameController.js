const express = require("express");
const router = express.Router();
const User = require("../../models/user");

var cron = require("node-cron");

var task = cron.schedule("05 * * * * *", () => {}, {
  scheduled: false
});

// task.start();

updateStatusBars = () => {
  // const query = { email: userToFind };
  // try {
  //   var updatedUser = await User.findAndUpdate(
  //     query,
  //     {
  //       $set: {
  //         tutorials: {
  //           tutorialPM: false
  //         }
  //       }
  //     },
  //     { new: true, upsert: true }
  //   );
  //   console.log(updatedUser);
  //   res.json({
  //     status: 200,
  //     session: req.session,
  //     updatedUser: updatedUser
  //   });
  // } catch (err) {
  //   console.log(err);
  //   res.send(err);
  // }
};

module.exports = router;
