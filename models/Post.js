const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "No Image",
  },
  postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = mongoose.model("posts", postSchema);
