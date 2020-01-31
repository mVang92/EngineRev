import axios from "axios";

export default {
    // Insert a new update
    addOneUpdate: data => {
        return axios.post(`/api/updates/`, data);
    },
    // Get all recent updates
    getAllUpdates: () => {
        console.log("get")
        return axios.get("/api/updates");
    }
};
