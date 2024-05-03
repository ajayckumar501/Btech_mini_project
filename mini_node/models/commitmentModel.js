const mongoose = require("mongoose");

const commitmentSchema = new mongoose.Schema(
  {

    user1: {
      type: String,
      required: [true, "please add user1"],
      trim: true,
    },

    user2: {
        type: String,
        required: [true, "please add user2"],
        trim: true,
    },

    commitment_id: {
      type: Number,
      unique:true,
      required: [true, "please add commitment id"],
      trim: true,
    },

    post_id: {
        type: Number,
        required: [true, "please add post id"],
        trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("commitment", commitmentSchema);