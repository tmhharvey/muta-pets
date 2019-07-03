const express = require("express");
const router = express.Router();
const CompanyUser = require("../../../models/company");

// Post Example
router.post("/updateProfile", async (req, res) => {
  //clean the data

  console.log("ownership length: " + req.body.profile.ownershipLength);
  console.log("ownership: " + req.body.profile.ownerPercentage);
  console.log(
    "partner ownership: " + req.body.profile.partnerOwnershipPercentage
  );

  const updatedProfile = {
    fundingInformation: {
      annualRevenue: req.body.profile.annualRevenue,
      monthlyRevenue: req.body.profile.monthlyRevenue,
      amountSeeking: req.body.profile.amountSeeking
    },
    businessInformation: {
      legalOrCorporateName: req.body.profile.corporateName,
      doingBusinessAs: req.body.profile.dba,
      address: req.body.profile.physicalAddress,
      city: req.body.profile.city,
      state: req.body.profile.state,
      zipCode: req.body.profile.zipCode,
      phone: req.body.profile.phone,
      fax: req.body.profile.fax,
      fedTaxId: req.body.profile.taxId,
      startDate: req.body.profile.businessStartDate,
      businessOwnershipLength: req.body.profile.ownershipLength,
      website: req.body.profile.websiteLink,
      entityType: req.body.profile.entityType,
      email: req.body.profile.companyEmail,
      productOrServiceSold: req.body.profile.productAndServices
    },
    ownerInformation: {
      ownerName: req.body.profile.ownerName,
      ownerTitle: req.body.profile.ownerTitle,
      ownerOwnershipPercentage: req.body.profile.ownerPercentage,
      homeAddress: req.body.profile.merchantHomeAddress,
      city: req.body.profile.merchantCity,
      state: req.body.profile.merchantState,
      zipCode: req.body.profile.merchantZipCode,
      ssn: req.body.profile.merchantSocial,
      dob: req.body.profile.merchantDob,
      homeNumber: req.body.profile.merchantHomePhone,
      workNumber: req.body.profile.merchantWorkPhone
    },
    partnerInformation: {
      partnerName: req.body.profile.partnerName,
      title: req.body.profile.partnerTitle,
      partnerOwnershipPercentage: req.body.profile.partnerOwnershipPercentage,
      homeAddress: req.body.profile.partnerHomeAddress,
      city: req.body.profile.partnerCity,
      state: req.body.profile.partnerState,
      zipCode: req.body.profile.partnerZipCode,
      ssn: req.body.profile.partnerSocial,
      dob: req.body.profile.partnerDob,
      homeNumber: req.body.profile.partnerHomePhone,
      workNumber: req.body.profile.partnerWorkPhone
    },
    businessPropertyInformation: {
      landlord: req.body.profile.businessLandlordOrBank,
      currentWithRent: req.body.profile.mortgageOrRentCurrent,
      rentPastDue: req.body.profile.mortgageOrRentPastDue,
      monthlyRentOrMortgage: req.body.profile.businessRentOrMortgage,
      phoneNumber: req.body.profile.businessPropertyPhone
    },
    businessTradeReferences: {
      businessName: req.body.profile.referenceNameOne,
      contactOrFaxNumber: req.body.profile.referenceContactOne,
      phoneNumber: req.body.profile.referencePhoneOne,
      businessName2: req.body.profile.referenceNameTwo,
      contactOrFaxNumber2: req.body.profile.referenceContactTwo,
      phoneNumber2: req.body.profile.referencePhoneTwo,
      accountDDA: req.body.profile.accountDDA,
      businessRoutingNumber: req.body.profile.tradeRoutingNumber,
      businessBankNumber: req.body.profile.tradeBankNumber
    }
  };

  var userToUpdate = req.session.email;

  try {
    const query = { email: userToUpdate };
    const profile = JSON.stringify(updatedProfile);
    var updatedUser = await CompanyUser.findOneAndUpdate(query, {
      profile: profile
    });

    if (updatedUser) {
      res.json({
        status: 200,
        data: {
          message: "Profile Successfully Updated"
        }
      });
      //   var profileDataCheck = await CompanyUser.findOne({
      //     email: userToUpdate
      //   });
      //   console.log("@@@@@@@@@@@@@@@@@@@@@@");
      //   var cleanData = JSON.parse(profileDataCheck.profile);

      //   console.log(cleanData.fundingInformation);
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// GET Example
router.get("/profileInformation", async (req, res) => {
  try {
    var userInformation = await CompanyUser.findOne({
      email: req.session.email
    });

    if (userInformation.profile) {
      profileState = userInformation.profile;
      console.log(profileState);
      return res.json({
        status: 200,
        data: {
          profileData: profileState
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
