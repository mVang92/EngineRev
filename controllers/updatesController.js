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

    /**
     * Edit a release note / update on record
     */
    updateOneReleaseNote: (req, res) => {
        console.log("Hit updateOneReleaseNote");
        db.Update
            .updateOne(
                { "_id": req.params.updateId },
                {
                    $set: {
                        "updateChanges": req.body.newReleaseNotes,
                        "knownIssues": req.body.newKnownIssues
                    }
                }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
    * Delete a release note / update on record
    */
    removeOneVehicle: (req, res) => {
        console.log("Hit removeOneReleaseNote");
        console.log(req.params)
        db.Update
            .findOneAndUpdate(
                { "_id": req.params.updateId },
                { $pull: { "_id": req.params.updateId } }
            )
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    },
};
