const express = require("express");
const router = express.Router();
const CompanyUser = require("../../../models/company");
const LenderUser = require("../../../models/lender");

// PUT Example
// router.put("/:userid/exampleURL", async (req, res) => {
//   try {
//     //Logic
//   } catch (err) {
//     console.log(err);
//     res.send(err);
//   }
// });

// GET Example
router.get("/findAllCompanies", async (req, res) => {
  try {
    var companiesList = await CompanyUser.find({
      funded: "false",
      profile: { $ne: null }
    });
    console.log(companiesList);

    if (companiesList) {
      return res.json({
        status: 200,
        data: {
          companiesList: companiesList
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
