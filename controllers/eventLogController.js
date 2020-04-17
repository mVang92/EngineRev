const db = require("../models");
console.log("eventLog controller loaded");

module.exports = {

    /**
     * Add an event to the event log
     */
    addOneEvent: (req, res) => {
        console.log(req.body)
        db.EventLog
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};
