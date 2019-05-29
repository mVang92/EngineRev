const db = require("../models");
console.log("controller loaded")
// Defining methods for the controller
module.exports = {
  findAll: (req, res) => {
    db.Vehicle
      .find(req.query)
      .sort({ date: -1 })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  findAllForUser: (req, res) => {
    db.Vehicle
      .findOne({ creator: req.params.id })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  findOneVehicle: (req, res) => {
    // console.log("findOneVehicle route");
    // console.log(req.query);
    db.Vehicle
      .find(req.query)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  create: (req, res) => {
    db.Vehicle
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  update: (req, res) => {
    db.Vehicle
      .findOneAndUpdate(
        { creator: req.params.id },
        { $push: { vehicles: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  updateOneLog: (req, res) => {
    console.log(req.body);
    console.log(req.params.id)
    db.Vehicle
      .findOneAndUpdate(
        { _id: req.params.id },
        { $push: { logs: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  remove: (req, res) => {
    console.log(req.params.id)
    db.Vehicle
      // .findOneAndDelete(req.params.id)
      .update(
        { _id: ObjectId(req.params.id) },
        { $pull: { vehicles: { _id: req.params.id } } }, false, true
      )
      .then(result => console.log(result))
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};
