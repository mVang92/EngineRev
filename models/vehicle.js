console.log("models loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const vehicleSchema = new Schema({
//   year: { type: Number, required: true },
//   make: { type: String, required: true },
//   model: { type: String, required: true },
//   date: { type: Date, default: Date.now },
// });

const vehicleSchema = new Schema({
  creator: { type: String },
  vehicle: [{
    year: { type: Number },
    make: { type: String },
    model: { type: String }
  }],
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);

module.exports = Vehicle;
