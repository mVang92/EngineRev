const db = require("../models");
console.log("controller loaded");

let creatorId = ""

module.exports = {

  /**
   * Create a database schema for the user upon first time login
   */
  createUserSchema: (req, res) => {
    console.log("Hit createUserSchema");
    db.Vehicle
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Find all vehicles belonging to one user
   */
  findAllVehiclesForUser: (req, res) => {
    console.log("Hit findAllVehiclesForUser");
    creatorId = req.params.id;
    db.Vehicle
      .findOne({ creator: creatorId })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Find one vehicle belonging to one user
   */
  findOneVehicle: (req, res) => {
    console.log("Hit findOneVehicle");
    db.Vehicle
      .find(req.query)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Add one vehicle for the current user logged in
   */
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

  /**
   * Add one service log for the selected vehicle
   */
  addOneLogForOneVehicle: (req, res) => {
    console.log("Hit addOneLogForOneVehicle");
    db.Vehicle
      .updateOne(
        { creator : creatorId, vehicles: { $elemMatch: { _id: req.params.id } } },
        { $push: { "vehicles.$.logs": { date: req.body.date, mileage: req.body.mileage, service: req.body.service, comment: req.body.comment } } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Finds all service logs for one vehicle
   */
  findAllServiceLogsForOneVehicle: (req, res) => {
    console.log("Hit findAllServiceLogsForOneVehicle");
    console.log(req.params.id)
    db.Vehicle
      .find({'vehicles.logs': req.params.id})
      .then(result => console.log(res.json(result)))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Remove the selected vehicle from the database
   */
  removeOneVehicle: (req, res) => {
    console.log("Hit removeOneVehicle");
    db.Vehicle
      .findOneAndUpdate(
        { 'vehicles._id': req.params.id },
        { $pull: { vehicles: { _id: req.params.id } } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Delete the account for the user
   */
  removeOneUserAccount: (req, res) => {
    console.log("Hit removeOneUserAccount");
    db.Vehicle
      .findByIdAndDelete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};
