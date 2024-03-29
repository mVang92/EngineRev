const db = require("../models");

const threadCategories = [
    "Ask Car Question",
    "Tips and Tricks",
    "Share a Story",
    "Other"
];

const sortCriterias = {
    oldestThreadsSort: "oldestThreadsSort",
    mostRecentThreadsSort: "mostRecentThreadsSort",
    mostViewsThreadsSort: "mostViewsThreadsSort",
    askCarQuestionsThreadsSort: "askCarQuestionsThreadsSort",
    tipsAndTricksThreadsSort: "tipsAndTricksThreadsSort",
    shareStoryThreadsSort: "shareStoryThreadsSort",
    otherCategoryThreadsSort: "otherCategoryThreadsSort"
};

/**
 * Check if the string value is blank
 */
checkIfStringIsBlank = string => {
    return (!string || /^\s*$/.test(string));
};

/**
 * Get all threads ordered by date
 */
sortByDate = (res, sort) => {
    db.Forum
        .find({}, {
            creator: 0,
            hits: 0,
            __v: 0,
            "comments._id": 0,
            "comments.votes": 0,
            "comments.edited": 0,
            "comments.email": 0,
            "comments.displayName": 0,
            "comments.creator": 0,
            "comments.comment": 0,
            "comments.date": 0
        })
        .sort({ date: sort })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
};

/**
 * Get all threads ordered by most to least views
 */
mostViewsThreadsSort = (req, res) => {
    db.Forum
        .find(req.query, {
            creator: 0,
            hits: 0,
            __v: 0,
            "comments._id": 0,
            "comments.votes": 0,
            "comments.edited": 0,
            "comments.email": 0,
            "comments.displayName": 0,
            "comments.creator": 0,
            "comments.comment": 0,
            "comments.date": 0
        })
        .sort({ views: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
};

/**
 * Get all threads for a specific category
 */
sortByCategory = (res, index) => {
    db.Forum
        .find({ threadCategory: threadCategories[index] }, {
            creator: 0,
            hits: 0,
            __v: 0,
            "comments._id": 0,
            "comments.votes": 0,
            "comments.edited": 0,
            "comments.email": 0,
            "comments.displayName": 0,
            "comments.creator": 0,
            "comments.comment": 0,
            "comments.date": 0
        })
        .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
};

module.exports = {

    /**
     * Get all threads on record and sort according to sort criteria
     */
    getAllThreads: (req, res) => {
        switch (req.params.sortCriteria) {
            case sortCriterias.oldestThreadsSort:
                sortByDate(res, 1);
                break;
            case sortCriterias.mostRecentThreadsSort:
                sortByDate(res, -1);
                break;
            case sortCriterias.mostViewsThreadsSort:
                mostViewsThreadsSort(req, res);
                break;
            case sortCriterias.askCarQuestionsThreadsSort:
                sortByCategory(res, 0);
                break;
            case sortCriterias.tipsAndTricksThreadsSort:
                sortByCategory(res, 1);
                break;
            case sortCriterias.shareStoryThreadsSort:
                sortByCategory(res, 2);
                break;
            case sortCriterias.otherCategoryThreadsSort:
                sortByCategory(res, 3);
                break;
            default:
                sortByDate(res, -1);
        }
    },

    /**
     * Get one thread
     */
    getThreadData: (req, res) => {
        db.Forum
            .find(
                { _id: req.params.threadId },
                { _id: 0, views: 0, hits: 0, __v: 0 }
            )
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
            .findByIdAndDelete(req.params.threadId )
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Increment the votes to the comment by 1
     */
    handleCommentUpVote: (req, res) => {
        const incrementComment = db.Forum
            .updateOne(
                { _id: req.params.threadId, comments: { $elemMatch: { _id: req.params.commentId } } },
                { $inc: { "comments.$.votes": 1 } }
            );

        const recordComment = db.Users
            .updateOne(
                { creator: req.params.creatorId },
                { $push: { votedComments: req.params.commentId } }
            );

        return Promise.all([incrementComment, recordComment])
            .then(result => res.json(result))
            .catch(err => res.status(422).json(err));
    },

    /**
     * Decrement the votes to the comment by 1
     */
    handleCommentDownVote: (req, res) => {
        const decrementComment = db.Forum
            .updateOne(
                { _id: req.params.threadId, comments: { $elemMatch: { _id: req.params.commentId } } },
                { $inc: { "comments.$.votes": -1 } }
            );

        const recordComment = db.Users
            .updateOne(
                { creator: req.params.creatorId },
                { $push: { votedComments: req.params.commentId } }
            );

        return Promise.all([decrementComment, recordComment])
            .then(result => res.json(result))
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
                    {
                        $set: {
                            "comments.$.comment": req.body.comment,
                            "comments.$.edited": true
                        }
                    }
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
