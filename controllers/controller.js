const db = require("../models");
const { ObjectId } = require("mongodb");
console.log("vehicle controller loaded");

module.exports = {

  /**
   * Create a database schema for the user upon first time login
   */
  createUserSchema: (req, res) => {
    db.Vehicle
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Find all vehicles belonging to one user
   */
  findUserInformationForOneUser: (req, res) => {
    db.Vehicle
      .findOne({ creator: req.params.id })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Find one vehicle belonging to one user
   */
  findOneVehicleForUser: (req, res) => {
    db.Vehicle
      .aggregate([
        { $match: { creator: req.params.creatorId } },
        {
          $project: {
            vehicles: {
              $filter: {
                input: "$vehicles",
                as: "vehicle",
                cond: { $eq: ["$$vehicle._id", ObjectId(req.params.vehicleId)] }
              }
            },
            _id: 0
          }
        }
      ])
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Add one vehicle for the current user logged in
   */
  addOneVehicle: (req, res) => {
    db.Vehicle
      .updateOne(
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
    db.Vehicle
      .updateOne(
        { creator: req.params.creatorId, vehicles: { $elemMatch: { _id: req.params.vehicleId } } },
        { $push: { "vehicles.$.logs": [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Update the vehicle name for the selected vehicle
   */
  updateOneVehicleInformation: (req, res) => {
    db.Vehicle
      .updateOne(
        { "vehicles._id": req.params.vehicleId },
        {
          $set: {
            "vehicles.$.vehicleName": req.body.vehicleName,
            "vehicles.$.year": req.body.year,
            "vehicles.$.make": req.body.make,
            "vehicles.$.model": req.body.model
          }
        }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Update one service log for the selected vehicle
   */
  updateOneLogForOneVehicle: (req, res) => {
    db.Vehicle
      .updateOne(
        { "vehicles._id": req.params.vehicleId },
        { $set: { "vehicles.$[].logs.$[logs]": req.body } },
        { arrayFilters: [{ "logs._id": req.params.serviceLogId }] }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Update background picture for one user
   */
  updateUserBackgroundPicture: (req, res) => {
    let backgroundPicture = "";
    for (let url in req.body) {
      backgroundPicture = url;
      break;
    }
    db.Vehicle
      .updateOne(
        { creator: req.params.creatorId },
        { $set: { backgroundPicture: backgroundPicture } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Remove the selected vehicle from the database
   */
  removeOneVehicle: (req, res) => {
    db.Vehicle
      .updateOne(
        { "vehicles._id": req.params.vehicleId },
        { $pull: { vehicles: { _id: req.params.vehicleId } } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Remove the selected service log from the database
   */
  removeOneServiceLog: (req, res) => {
    db.Vehicle
      .updateOne(
        { "vehicles._id": req.params.vehicleId },
        { $pull: { "vehicles.$.logs": { _id: req.params.serviceLogId } } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Delete the account for the user
   */
  removeOneVehicleName: (req, res) => {
    db.Vehicle
      .updateOne(
        { "vehicles._id": req.params.vehicleId },
        { $set: { "vehicles.$.vehicleName": req.body.emptyVehicleName } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Delete the account for the user
   */
  removeOneUserAccount: (req, res) => {
    db.Vehicle
      .findByIdAndDelete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Save a theme for the user
   */
  saveThemeForUser: (req, res) => {
    db.Vehicle
      .updateOne(
        { creator: req.params.creatorId },
        { $set: { theme: req.params.themeType } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Record the comment id in the user database
   */
  recordVotedThreadComment: (req, res) => {
    db.Vehicle
      .updateOne(
        { creator: req.params.creatorId },
        { $push: { votedComments: req.params.commentId } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};
