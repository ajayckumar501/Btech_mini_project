const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    service_id: {
      type: Number,
      required: [true, "please add service id"],
      unique:true,
      trim: true,
    },
    service_name: {
      type: String,
      required: [true, "please add service name"],
      trim: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);