const db = require("../models");

module.exports = {

    /**
     * Get all display names on record
     */
    getDisplayNames: (req, res) => {
        db.DisplayNames
            .find(req.query, { _id: 0, displayName: 1 })
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Add one display name
     */
    addOneDisplayName: (req, res) => {
        db.DisplayNames
            .create(req.body)
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }
};
