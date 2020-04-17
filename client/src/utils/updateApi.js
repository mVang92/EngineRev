import axios from "axios";

export default {
    // Insert a new update
    addOneUpdate: payload => {
        return axios.post(`/api/updates/`, payload);
    },
    // Get all recent updates
    getAllUpdates: () => {
        return axios.get("/api/updates");
    },
    // Update one update / release note
    updateOneReleaseNote: (updateId, payload) => {
        return axios.put(`/api/updates/updateOneReleaseNote/${updateId}`, payload);
    },
    // Delete one update / release note
    deleteOneReleaseNote: updateId => {
        return axios.delete(`/api/updates/deleteOneReleaseNote/${updateId}`);
    }
};
