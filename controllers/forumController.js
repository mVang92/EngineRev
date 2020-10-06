const db = require("../models");
const threadCategories = [
    "Ask Car Question",
    "Tips and Tricks",
    "Share a Story",
    "Other"
];

/**
 * Check if the string value is blank
 */
checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
};

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
     * Get all comments to a thread
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
        if (threadCategories.includes(req.body.threadCategory)) {
            db.Forum
                .create(req.body)
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
        } else {
            res.status(400).json({
                status: 400,
                message: req.body.threadCategory + " is not a valid category."
            });
        }
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
        if (threadCategories.includes(req.body.threadCategory)) {
            db.Forum
                .updateOne(
                    { _id: req.params.threadId },
                    {
                        $set: {
                            threadTitle: req.body.threadTitle,
                            threadDescription: req.body.threadDescription,
                            threadCategory: req.body.threadCategory
                        }
                    }
                )
                .then(dbModel => res.json(dbModel))
                .catch(err => res.status(422).json(err));
        } else {
            res.status(400).json({
                status: 400,
                message: req.body.threadCategory + " is not a valid category."
            });
        }
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
    },

    /**
     * Update the comment on the thread
     */
    handleUpdateThreadComment: (req, res) => {
        if (checkIfStringIsBlank(req.body.comment)) {
            res.status(400).json({
                status: 400,
                message: "Comments cannot be blank."
            });
        } else {
            db.Forum
                .updateOne(
                    { "comments._id": req.params.commentId },
                    { $set: { "comments.$.comment": req.body.comment } }
                )
                .then(result => res.json(result))
                .catch(err => res.status(422).json(err));
        }
    },

    /**
     * Increment the views to the thread
     */
    handleIncrementViews: (req, res) => {
        db.Forum
            .updateOne(
                { _id: req.params.threadId },
                { $inc: { views: 1 } }
            )
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Increment the hits to the thread
     */
    handleIncrementHits: (req, res) => {
        db.Forum
            .updateOne(
                { _id: req.params.threadId },
                { $inc: { hits: 1 } }
            )
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    }
};