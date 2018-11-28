import axios from "axios";

export default {
  // Add a new vehicle
  add: (id, data) => {
    console.log(data)
    return (
      axios.put(`/api/vehicles/${id}`, data)
    );
  }
};
