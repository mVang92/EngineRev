const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const axios = require("axios")
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Serve up static assets and automatically delete old events
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  setInterval(function () {
    axios.delete("https://car-space.herokuapp.com/api/eventLog/");
  }, 300000);
} else {
  setInterval(function () {
    axios.delete("http://localhost:3000/api/eventLog/");
  }, 5000);
}

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.DB_URI || "mongodb://localhost/carSpace");
// mongoose.set("debug", true);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
