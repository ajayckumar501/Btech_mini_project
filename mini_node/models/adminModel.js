const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "please add username"],
      unique:true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "please add password"],
      min: 6,
      max: 64,
    },

  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);