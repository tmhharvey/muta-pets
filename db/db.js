const mongoose = require("mongoose");
// DB Config
const db = require("../config/keys").mongoURI;
const MutatedPets = require("../models/mutatedPet");
const DefaultMutatedPets = require("../DefMutatePets");

mongoose.connect(process.env.MONGODB_URI || db, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.connection.on("connected", async () => {
  console.log("Mongoose is connected");
  var collectionsList = await mongoose.connection.db
    .listCollections()
    .toArray();

  if (collectionsList.length <= 2) {
    MutatedPets.create(DefaultMutatedPets)
      .then(function(mongooseDocuments) {
        /* ... */
        console.log("Mutated Pet Document Collection Inserted");
      })
      .catch(function(err) {
        /* Error handling */
        console.log("COULD NOT INSERT");
        console.log(err);
      });
  }
});

mongoose.connection.on("error", err => {
  console.log(err, " mongoose failed to connect");
});

mongoose.connection.on("disconncted", () => {
  console.log("Mongoose is disconnected");
});
