console.log("forum model loaded")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  creator: { type: String },
  email: { type: String },
  threadDescription: { type: String },
  date: { type: Date, default: Date.now },
  comments: [{
    email: { type: String },
    comment: { type: String },
    date: { type: Date, default: Date.now }
  }]
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
