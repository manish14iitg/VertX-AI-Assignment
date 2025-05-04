const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
  
  reported: {
    type: Number,
    default: 0,
  },
  saved: {
    type: Number,
    default: 0,
  },
  source: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
