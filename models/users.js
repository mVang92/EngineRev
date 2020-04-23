console.log("users model loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  creator: { type: String },
  email: { type: String },
  admin: { type: Boolean },
  theme: { type: String },
  backgroundPicture: { type: String },
  votedComments: [{}],
  vehicles: [{
    vehicleName: { type: String },
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

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
