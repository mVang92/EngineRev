const db = require("../models");
const { ObjectId } = require("mongodb");
const minimumYear = 1885;
const date = new Date();
const futureYear = date.getFullYear() + 2;
const themes = [
  "engineRev",
  "light",
  "grey",
  "dark",
  "transparentLight",
  "transparentGrey",
  "transparentDark"
];

/**
 * Check if the string value is blank
 */
checkIfStringIsBlank = string => {
  return (!string || /^\s*$/.test(string));
};

module.exports = {

  /**
   * Create a database schema for the user upon first time login
   */
  createUserSchema: (req, res) => {
    db.Users
      .create(req.body)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Find all vehicles belonging to one user
   */
  findUserInformationForOneUser: (req, res) => {
    db.Users
      .findOne({ creator: req.params.id })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Find one vehicle belonging to one user
   */
  findOneVehicleForUser: (req, res) => {
    db.Users
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
    if (
      req.body.year < minimumYear ||
      req.body.year > futureYear ||
      checkIfStringIsBlank(req.body.year) ||
      checkIfStringIsBlank(req.body.make) ||
      checkIfStringIsBlank(req.body.model)
    ) {
      res.status(400).json({
        status: 400,
        message: "Vehicle year out of range, or a required input (year/make/model) is empty."
      });
    } else {
      db.Users
        .updateOne(
          { creator: req.params.id },
          { $push: { vehicles: [req.body] } }
        )
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    }
  },

  /**
   * Add one service log for the selected vehicle
   */
  addOneLogForOneVehicle: (req, res) => {
    if (
      checkIfStringIsBlank(req.body.date) ||
      checkIfStringIsBlank(req.body.mileage) ||
      checkIfStringIsBlank(req.body.service)
    ) {
      res.status(400).json({
        status: 400,
        message: "A required input field is missing."
      });
    } else {
      db.Users
        .updateOne(
          { creator: req.params.creatorId, vehicles: { $elemMatch: { _id: req.params.vehicleId } } },
          { $push: { "vehicles.$.logs": [req.body] } }
        )
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    }
  },

  /**
   * Update the vehicle name for the selected vehicle
   */
  updateOneVehicleInformation: (req, res) => {
    if (
      req.body.year < minimumYear ||
      req.body.year > futureYear ||
      checkIfStringIsBlank(req.body.year) ||
      checkIfStringIsBlank(req.body.make) ||
      checkIfStringIsBlank(req.body.model)
    ) {
      res.status(400).json({
        status: 400,
        message: "Vehicle year out of range, or a required input (year/make/model) is empty."
      });
    } else {
      db.Users
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
    }
  },

  /**
   * Update one service log for the selected vehicle
   */
  updateOneLogForOneVehicle: (req, res) => {
    if (
      checkIfStringIsBlank(req.body.date) ||
      checkIfStringIsBlank(req.body.mileage) ||
      checkIfStringIsBlank(req.body.service)
    ) {
      res.status(400).json({
        status: 400,
        message: "A required input field is missing."
      });
    } else {
      db.Users
        .updateOne(
          { "vehicles._id": req.params.vehicleId },
          { $set: { "vehicles.$[].logs.$[logs]": req.body } },
          { arrayFilters: [{ "logs._id": req.params.serviceLogId }] }
        )
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    }
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
    db.Users
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
    db.Users
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
    db.Users
      .updateOne(
        { "vehicles._id": req.params.vehicleId },
        { $pull: { "vehicles.$.logs": { _id: req.params.serviceLogId } } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Remove the name to the vehicle
   */
  removeOneVehicleName: (req, res) => {
    db.Users
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
    db.Users
      .findByIdAndDelete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Save the theme for the user
   */
  saveThemeForUser: (req, res) => {
    if (themes.includes(req.params.themeType)) {
      db.Users
        .updateOne(
          { creator: req.params.creatorId },
          { $set: { theme: req.params.themeType } }
        )
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    } else {
      res.status(400).json();
    }
  },

  /**
   * Record the comment id in the user database
   */
  recordVotedThreadComment: (req, res) => {
    db.Users
      .updateOne(
        { creator: req.params.creatorId },
        { $push: { votedComments: req.params.commentId } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Update the email addresses for the user data, threads, and comments
   */
  updateEmail: (req, res) => {
    const updateUserEmail = db.Users
      .updateOne(
        { creator: req.params.creatorId },
        { $set: { email: req.params.newEmail } }
      );

    const updateThreadAuthor = db.Forum
      .updateMany(
        { creator: req.params.creatorId },
        { $set: { email: req.params.newEmail } }
      );

    const updateThreadComments = db.Forum
      .updateMany(
        { "comments.creator": req.params.creatorId },
        { $set: { "comments.$[element].email": req.params.newEmail } },
        { arrayFilters: [{ "element.creator": req.params.creatorId }], "multi": true }
      );

    return Promise.all([updateUserEmail, updateThreadAuthor, updateThreadComments])
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};
