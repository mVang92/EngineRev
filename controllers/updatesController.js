const db = require("../models");
console.log("updates controller loaded");

module.exports = {

    /**
     * Get all updates on record
     */
    getAllUpdates: (req, res) => {
        console.log("Hit getAllUpdates");
        db.Update
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Add an update on record
     */
    addOneUpdate: (req, res) => {
        console.log("Hit addOneUpdate");
        db.Update
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
};
