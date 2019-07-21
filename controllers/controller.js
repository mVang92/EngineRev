const db = require("../models");
console.log("controller loaded")
// Defining methods for the controller
module.exports = {
  createUserSchema: (req, res) => {
    console.log("Hit createUserSchema")
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
<<<<<<< HEAD
    console.log("Hit findOneVehicle");
=======
    // console.log(req.query);
>>>>>>> dfbc2876509bdc816c8d54e82e4b7d4c194f0d38
    db.Vehicle
      .find(req.query)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  addOneVehicle: (req, res) => {
    console.log("Hit addOneVehicle")
    db.Vehicle
      .findOneAndUpdate(
        { creator: req.params.id },
        { $push: { vehicles: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  updateOneLogForOneVehicle: (req, res) => {
    console.log("Hit updateOneLogForOneVehicle")
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
