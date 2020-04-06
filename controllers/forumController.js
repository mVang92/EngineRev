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
            .updateOne(
                { _id: req.params.threadId },
                { $push: { comments: [req.body] } }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Update the details to the thread
     */
    handleUpdateThreadDetails: (req, res) => {
        db.Forum
            .updateOne(
                { _id: req.params.threadId },
                {
                    $set: {
                        threadTitle: req.body.threadTitle,
                        threadDescription: req.body.threadDescription,
                    }
                }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Delete the thread
     */
    deleteThread: (req, res) => {
        db.Forum
            .findById({ _id: req.params.threadId })
            .then(result => result.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Increment the votes to the comment by 1
     */
    handleCommentUpVote: (req, res) => {
        db.Forum
            .updateOne(
                { _id: req.params.threadId, comments: { $elemMatch: { _id: req.params.commentId } } },
                { $inc: { "comments.$.votes": 1 } }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Decrement the votes to the comment by 1
     */
    handleCommentDownVote: (req, res) => {
        db.Forum
            .updateOne(
                { _id: req.params.threadId, comments: { $elemMatch: { _id: req.params.commentId } } },
                { $inc: { "comments.$.votes": -1 } }
            )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Delete the comment from the thread
     */
    handleDeleteThreadComment: (req, res) => {
        db.Forum
            .updateOne(
                { _id: req.params.threadId },
                { $pull: { comments: { _id: req.params.commentId } } }
            )
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }
};