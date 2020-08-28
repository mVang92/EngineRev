const db = require("../models");

module.exports = {

    /**
     * Get all updates on record
     */
    getAllUpdates: (req, res) => {
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
        db.Update
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Edit a release note/update on record
     */
    updateOneReleaseNote: (req, res) => {
        db.Update
            .updateOne(
                { _id: req.params.updateId },
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
    * Delete a release note/update from record
    */
    deleteOneReleaseNote: (req, res) => {
        db.Update
            .findById({ _id: req.params.updateId })
            .then(result => result.remove())
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }
};
