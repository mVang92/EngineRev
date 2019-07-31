const db = require("../models");
console.log("controller loaded");
// Defining methods for the controller
module.exports = {
  createUserSchema: (req, res) => {
    console.log("Hit createUserSchema");
    db.Vehicle
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  findAllVehiclesForUser: (req, res) => {
    console.log("Hit findAllVehiclesForUser");
    db.Vehicle
      .findOne({ creator: req.params.id })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  findOneVehicle: (req, res) => {
    console.log("Hit findOneVehicle");
    db.Vehicle
      .find(req.query)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  addOneVehicle: (req, res) => {
    console.log("Hit addOneVehicle");
    db.Vehicle
      .findOneAndUpdate(
        { creator: req.params.id },
        { $push: { vehicles: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  updateOneLogForOneVehicle: (req, res) => {
    console.log("Hit updateOneLogForOneVehicle");
    console.log(req.body);
    console.log(req.params.id);
    db.Vehicle
      .findOneAndUpdate(
        { _id: req.params.id },
        { $push: { logs: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  removeOneVehicle: (req, res) => {
    console.log("Hit removeOneVehicle");
    db.Vehicle
      .findByIdAndDelete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  removeOneUserAccount: (req, res) => {
    console.log("Hit removeOneUserAccount");
    console.log(req.params.id);
    db.Vehicle
      .findByIdAndDelete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};

/*
// The line below deletes a vehicle from the database
db.vehicles.update({'vehicles._id':ObjectId('5d41bebd73de5e01b4ee30f4')},{$pull:{vehicles:{_id:ObjectId('5d41bebd73de5e01b4ee30f4')}}})

// The line below find a vehicle in the database
db.vehicles.find({'vehicles._id':ObjectId('5d41bebd73de5e01b4ee30f4')})

*/