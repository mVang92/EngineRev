import axios from "axios";

export default {
    // Insert a new thread
    addOneThread: payload => {
        return axios.post(`/api/forum/`, payload);
    },
    // Get all recent updates
    getAllThreads: () => {
        return axios.get("/api/forum");
    },
    // // Update one update / release note
    // updateOneReleaseNote: (updateId, payload) => {
    //     return axios.put(`/api/updates/updateOneReleaseNote/${updateId}`, payload);
    // },
    // // Delete one update / release note
    // deleteOneReleaseNote: updateId => {
    //     return axios.delete(`/api/updates/deleteOneReleaseNote/${updateId}`);
    // }
};
