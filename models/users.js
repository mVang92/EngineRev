const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  creator: { type: String, required: true },
  email: { type: String, required: true },
  roles: [{}],
  theme: { type: String, required: true },
  backgroundPicture: { type: String },
  votedComments: [{}],
  vehicles: [{
    vehicleName: { type: String },
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    logs: [{
      date: { type: String, required: true },
      mileage: { type: Number, required: true },
      service: { type: String, required: true },
      comment: { type: String }
    }],
    date: { type: Date, default: Date.now }
  }]
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
