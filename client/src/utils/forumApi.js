import axios from "axios";

export default {
    // Insert a new thread
    addOneThread: payload => {
        return axios.post(`/api/forum`, payload);
    },
    // Get all threads
    getAllThreads: () => {
        return axios.get("/api/forum");
    },
    // Get all comments for one thread
    getAllThreadComments: threadId => {
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
    handleCommentUpVote: (threadId, commentId) => {
        return axios.put(`/api/forum/${threadId}/${commentId}/upVote`);
    },
    // Handle the downvote to a comment
    handleCommentDownVote: (threadId, commentId) => {
        return axios.put(`/api/forum/${threadId}/${commentId}/downVote`);
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
