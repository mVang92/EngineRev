import axios from "axios";

export default {
    // Insert a new thread
    addOneThread: payload => {
        return axios.post(`/api/forum`, payload);
    },
    // Get all threads
    getAllThreads: sortCriteria => {
        return axios.get(`/api/forum/${sortCriteria}`);
    },
    // Get all comments for one thread
    getThreadData: threadId => {
        return axios.get(`/api/forum/${threadId}/thread`);
    },
    // Add one comment to one thread
    addOneCommentToOneThread: (threadId, payload) => {
        return axios.put(`/api/forum/${threadId}/addComment`, payload);
    },
    // Update the title to a thread
    handleUpdateThreadDetails: (threadId, payload) => {
        return axios.put(`/api/forum/${threadId}/updateThreadDetails`, payload);
    },
    // Update the title to a thread
    deleteThread: threadId => {
        return axios.delete(`/api/forum/${threadId}/deleteThread`);
    },
    // Handle the upvote to a comment
    handleCommentUpVote: (creatorId, threadId, commentId) => {
        return axios.put(`/api/forum/${creatorId}/${threadId}/${commentId}/upVote`);
    },
    // Handle the downvote to a comment
    handleCommentDownVote: (creatorId, threadId, commentId) => {
        return axios.put(`/api/forum/${creatorId}/${threadId}/${commentId}/downVote`);
    },
    // Delete a comment from the thread
    handleDeleteThreadComment: (threadId, commentId) => {
        return axios.put(`/api/forum/${threadId}/${commentId}/deleteComment`);
    },
    // Update a comment on the thread
    handleUpdateThreadComment: (commentId, payload) => {
        return axios.put(`/api/forum/${commentId}/updateComment`, payload);
    },
    // Increment the view on the thread
    handleIncrementViews: (threadId) => {
        return axios.put(`/api/forum/${threadId}/view`);
    },
    // Increment the hits on the thread
    handleIncrementHits: (threadId) => {
        return axios.put(`/api/forum/${threadId}/hit`);
    }
};
