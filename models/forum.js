const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
  creator: { type: String, required: true  },
  email: { type: String, required: true  },
  threadTitle: { type: String, required: true  },
  threadDescription: { type: String, required: true  },
  threadCategory: { type: String, required: true  },
  views: { type: Number, required: true  },
  hits: { type: Number, required: true  },
  date: { type: Date, default: Date.now },
  comments: [{
    creator: { type: String, required: true  },
    email: { type: String, required: true  },
    comment: { type: String, required: true  },
    votes: { type: Number, required: true  },
    edited: { type: Boolean, required: true  },
    date: { type: Date, default: Date.now }
  }]
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;
