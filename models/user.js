const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  userName: {
    type: String,
    unique: true,
    requireed: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  userType: {
    type: String,
    required: true
  },
  firstPetNotSelected: {
    type: Boolean,
    default: true,
    required: true
  },
  tutorials: {
    tutorialPM: {
      type: Boolean,
      default: true
    },
    tutorial2: {
      type: Boolean,
      default: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", UserSchema);
