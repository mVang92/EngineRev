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
    }
};
