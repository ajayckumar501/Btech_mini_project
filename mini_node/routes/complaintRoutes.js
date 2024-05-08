const express = require("express");
const {
  complaintcreator,
  countComplaints,
} = require("../controllers/complaintController");

const router = express.Router();

router.post("/create",complaintcreator);
router.get("/count",countComplaints);

module.exports = router;