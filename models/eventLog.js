console.log("eventLog model loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventLogSchema = new Schema({
  creator: { type: String },
  email: { type: String },
  event: { type: String },
  status: { type: String },
  error: { type: String },
  date: { type: Date, default: Date.now }
});

const EventLog = mongoose.model("EventLog", eventLogSchema);

module.exports = EventLog;
