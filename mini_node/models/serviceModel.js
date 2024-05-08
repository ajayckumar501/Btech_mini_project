const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    serviceid: {
      type: Number,
      required: [true, "please add service id"],
      unique:true,
      trim: true,
    },
    servicename: {
      type: String,
      required: [true, "please add service name"],
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);