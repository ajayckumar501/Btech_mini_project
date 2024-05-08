const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {

    complaintid:{
      type: Number,
      required: [true, "please add complaint id"],
      unique:true,
      trim: true,
    },

    giver: {
      type: String,
      required: [true, "please add complaint giver"],
      trim: true,
    },

    taker: {
        type: String,
        required: [true, "please add complaint taker"],
        trim: true,
    },

    complaint: {
      type: String,
      required: [true, "please add complaint"],
      trim: true,
    },

  },
  { timestamps: true }
);

complaintSchema.index({ complaint: 1, giver: 1, taker: 1,  complaint: 1 }, { unique: true });

module.exports = mongoose.model("complaint", complaintSchema);