import axios from "axios";

export default {
    // Get the display names
    getDisplayNames: () => {
        return axios.get("/api/names");
    },
    // Add one display name
    addOneDisplayName: userInformation => {
        return axios.put(`/api/names`, userInformation);
    }
};
