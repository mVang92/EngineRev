const db = require("../models");
console.log("controller loaded");
// Defining methods for the controller
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
    db.Vehicle
      .findOne({ creator: req.params.id })
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
    console.log(req.body);
    console.log("req.params.id " + req.params.id)
    db.Vehicle
      .findOneAndUpdate(
        { 'vehicles._id[0].logs': req.params.id },
        { $push: { logs: [req.body] } }
      )
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  },
  /**
   * Remove the selected vehicle from the database
   */
  removeOneVehicle: (req, res) => {
    console.log("Hit removeOneVehicle");
    console.log("req.params.id " + req.params.id)
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
    console.log(req.params.id);
    db.Vehicle
      .findByIdAndDelete(req.params.id)
      .then(result => res.json(result))
      .catch(err => res.status(422).json(err));
  }
};

/*
// The line below deletes a vehicle from the database
db.vehicles.update({'vehicles._id':ObjectId('5d41bebd73de5e01b4ee30f4')},
{$pull:{vehicles:{_id:ObjectId('5d41bebd73de5e01b4ee30f4')}}})

// The line below find a vehicle in the database
db.vehicles.find({'vehicles._id':ObjectId('5d41bebd73de5e01b4ee30f4')})

*/

// Add one service log to one vehicle mongo queries, not exactly working
/*
db.vehicles.update(
	{'vehicles._id':ObjectId('5d42570ad3dc0810b445d99f')},
	{$push:{'logs':{test: 85}}}
)

db.vehicles.update(
	{'vehicles._id':ObjectId('5d42570ad3dc0810b445d99f')},
	{$push:{vehicles.logs:{key: 'value'}}}
)
*/