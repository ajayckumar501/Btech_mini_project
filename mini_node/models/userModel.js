const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add username"],
      unique:true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "please add email"],
      trim: true,
    },
    phoneno: {
      type: String,
      required: [true, "please add phone number"],
      trim: true,
    },
    location: {
      type: String,
      required: [true, "please add location"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
      min: 6,
      max: 64,
    },
    usertype: {
      type: String,
      required: [true, "please add user type"],
      trim:true,
    },
    services: {
      type: [String],
      required: [true, "please add services"],
      trim:true,
    },
    flag:{
      type: Number,
      required: [true, "please add flag"],
      trim:true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);