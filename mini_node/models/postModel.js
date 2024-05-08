const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {

    username: {
      type: String,
      required: [true, "please add user name"],
      trim: true,
    },

    postid: {
      type: Number,
      required: [true, "please add post id"],
      unique:true,
      trim: true,
    },

    serviceid: {
      type: Number,
      required: [true, "please add service id"],
      trim: true,
    },

    post_title: {
        type: String,
        required: [true, "please add post title"],
        trim: true,
    },
    post_desc: {
      type: String,
      required: [true, "please add post description"],
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("post", postSchema);