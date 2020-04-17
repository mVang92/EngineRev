console.log("eventLog model loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventLogSchema = new Schema({
  creator: { type: String },
  email: { type: String },
  event: { type: String },
  type: { type: String },
  error: { type: String }
});

const EventLog = mongoose.model("EventLog", eventLogSchema);

module.exports = EventLog;
