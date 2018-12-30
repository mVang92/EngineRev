console.log("models loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  creator: { type: String },
  year: { type: Number, required: true },
  make: { type: String, required: true },
  model: { type: String, required: true },
  logs: [{
    date: { type: Number, required: true },
    mileage: { type: String, required: true },
    service: { type: String, required: true },
    comment: { type: String }
  }],
  date: { type: Date, default: Date.now }
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
