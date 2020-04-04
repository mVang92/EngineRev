const db = require("../models");
console.log("forum controller loaded");

module.exports = {

    /**
     * Get all threads on record
     */
    getAllThreads: (req, res) => {
        db.Forum
            .find(req.query)
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
    * Add a comment to a thread
    */
    getAllThreadComments: (req, res) => {
        db.Forum.find({ _id: req.params.threadId })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
    * Add a thread
    */
    addOneThread: (req, res) => {
        db.Forum
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
    * Add a comment to a thread
    */
    addOneCommentToOneThread: (req, res) => {
        db.Forum
            .findOneAndUpdate(
                { _id: req.params.threadId },
                { $push: { comments: [req.body] } }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
};