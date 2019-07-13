const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PetSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  main: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  diet: {
    type: String,
    required: true
  },
  stats: {
    type: Object,
    required: true,
    default: ""
  },
  status: {
    type: Object,
    default: { happiness: 90, energy: 90, hunger: 25 }
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Pet", PetSchema);
