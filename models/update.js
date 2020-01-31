console.log("updates model loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const updateSchema = new Schema({
    updateChanges: { type: String, required: true },
    knownIssues: { type: String },
    date: { type: Date, default: Date.now }
});

const Update = mongoose.model("Update", updateSchema);

module.exports = Update;
