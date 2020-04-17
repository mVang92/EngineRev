import axios from "axios";

export default {
    // Add a new event to the event log
    addOneEvent: payload => {
        return axios.post(`/api/eventLog/`, payload);
    },
    // Remove old events
    removeOldEvents: () => {
        return axios.delete(`/api/eventLog/`);
    }
};
