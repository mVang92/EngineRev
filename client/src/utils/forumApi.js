import axios from "axios";

export default {
    // Insert a new thread
    addOneThread: payload => {
        return axios.post(`/api/forum/`, payload);
    },
    // Get all threads
    getAllThreads: () => {
        return axios.get("/api/forum");
    },
    // Get all comments for one thread
    getAllThreadComments: threadId => {
        return axios.get(`/api/forum/getAllThreadComments/${threadId}`);
    },
    // Add one comment to one thread
    addOneCommentToOneThread: (threadId, payload) => {
        return axios.put(`/api/forum/addOneCommentToOneThread/${threadId}`, payload);
    },
    // Update the title to a thread
    updateThreadTitle: (threadId, payload) => {
        return axios.put(`/api/forum/updateThreadTitle/${threadId}`, payload);
    },
    // Update the title to a thread
    deleteThread: (threadId) => {
        return axios.put(`/api/forum/deleteThread/${threadId}`);
    }
};
