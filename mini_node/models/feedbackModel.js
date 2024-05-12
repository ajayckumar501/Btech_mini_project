const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {

    feedbackid:{
      type: Number,
      required: [true, "please add feedback id"],
      unique:true,
      trim: true,
    },

    giver: {
      type: String,
      required: [true, "please add feedback giver"],
      trim: true,
    },

    taker: {
        type: String,
        required: [true, "please add feedback taker"],
        trim: true,
    },

    feedback: {
      type: String,
      required: [true, "please add feedback"],
      trim: true,
    },

  },
  { timestamps: true }
);

feedbackSchema.index({ feedback: 1, giver: 1, taker: 1,  feedback: 1 }, { unique: true });

module.exports = mongoose.model("feedback", feedbackSchema);