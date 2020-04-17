const db = require("../models");
console.log("eventLog controller loaded");

module.exports = {

    /**
     * Add an event to the event log
     */
    addOneEvent: (req, res) => {
        db.EventLog
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Remove events that are 30 days old
     */
    removeOldEvents: (req, res) => {
        db.EventLog
            .deleteMany({ date: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
