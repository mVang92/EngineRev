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
  getUserInfoPartial: (req, res) => {
    db.Users
      .findOne(
        { creator: req.params.id },
        { _id: 0, creator: 1, backgroundPicture: 1, displayName: 1, theme: 1 }
      )
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
                cond: { $eq: ["$$vehicle._id", new ObjectId(req.params.vehicleId)] }
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
  updateVehicleInfo: (req, res) => {
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
   * Get the vehicle count from the user
   */
  getVehicleCount: (req, res) => {
    db.Users
      .aggregate(
        [
          {
            $match: { creator: req.params.creatorId }
          },
          {
            $group: {
              _id: "$vehicles",
              total: { $sum: { $size: "$vehicles" } }, _id: null
            }
          }
        ]
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Get the email from the user
   */
  getEmail: (req, res) => {
    db.Users
      .find({ creator: req.params.creatorId }, { _id: 0, email: 1 })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Get the roles from the user
   */
  getRoles: (req, res) => {
    db.Users
      .find({ creator: req.params.creatorId }, { _id: 0, roles: 1 })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Get the theme from the user
   */
  getTheme: (req, res) => {
    db.Users
      .find({ creator: req.params.creatorId }, { _id: 0, theme: 1 })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Get the background picture from the user
   */
  getBackgroundPicture: (req, res) => {
    db.Users
      .find({ creator: req.params.creatorId }, { _id: 0, backgroundPicture: 1 })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Get the voted comments from the user
   */
  getVotedComments: (req, res) => {
    db.Users
      .find({ creator: req.params.creatorId }, { _id: 0, votedComments: 1 })
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Get the vehicles from the user
   */
  getUserVehicles: (req, res) => {
    db.Users
      .find({ creator: req.params.creatorId }, { _id: 0, vehicles: 1 })
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

    const updateThreadEmail = db.Forum
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

    return Promise.all([updateUserEmail, updateThreadEmail, updateThreadComments])
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },

  /**
   * Update the display names throughout the application
   */
  updateDisplayName: (req, res) => {
    if (
      !checkIfStringIsBlank(req.params.newDisplayName) &&
      req.params.newDisplayName.length > 5
    ) {
      const updateThreadDisplayName = db.Forum
        .updateMany(
          { creator: req.params.creatorId },
          { $set: { displayName: req.params.newDisplayName } }
        );

      const updateThreadComments = db.Forum
        .updateMany(
          { "comments.creator": req.params.creatorId },
          { $set: { "comments.$[element].displayName": req.params.newDisplayName } },
          { arrayFilters: [{ "element.creator": req.params.creatorId }], "multi": true }
        );

      const updateDisplayNameInUserDb = db.Users
        .updateOne(
          { creator: req.params.creatorId },
          { $set: { displayName: req.params.newDisplayName } }
        );

      const updateDisplayNameInDisplayNameDb = db.DisplayNames
        .updateOne(
          { creator: req.params.creatorId },
          { $set: { displayName: req.params.newDisplayName } }
        );

      return Promise.all([updateThreadDisplayName, updateThreadComments, updateDisplayNameInUserDb, updateDisplayNameInDisplayNameDb])
        .then(result => res.json(result))
        .catch(err => res.status(422).json(err));
    } else {
      res.status(400).json({
        status: 400,
        message: "Display name must be 6 characters or more."
      });
    };
  }
};
