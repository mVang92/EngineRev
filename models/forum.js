const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  creator: { type: String },
  email: { type: String },
  threadTitle: { type: String },
  threadDescription: { type: String },
  threadCategory: { type: String },
  views: { type: Number },
  hits: { type: Number },
  date: { type: Date, default: Date.now },
  comments: [{
    creator: { type: String },
    email: { type: String },
    comment: { type: String },
    votes: { type: Number },
    date: { type: Date, default: Date.now }
  }]
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
