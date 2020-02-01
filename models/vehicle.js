console.log("vehicle model loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  creator: { type: String },
  admin: { type: Boolean },
  theme: { type: String },
  vehicles: [{
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    logs: [{
      date: { type: String },
      mileage: { type: String },
      service: { type: String },
      comment: { type: String }
    }],
    date: { type: Date, default: Date.now }
  }]
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
