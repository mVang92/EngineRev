const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const displayNameSchema = new Schema({
    creator: { type: String, required: true },
    displayName: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const DisplayName = mongoose.model("DisplayName", displayNameSchema);

module.exports = DisplayName;
