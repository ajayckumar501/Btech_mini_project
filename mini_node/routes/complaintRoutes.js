const express = require("express");
const {
  complaintcreator,
  handleCountComplaints,
  fetchComplaints,
} = require("../controllers/complaintController");

const router = express.Router();

router.post("/create",complaintcreator);
router.get("/count",handleCountComplaints);
router.get("/fetch",fetchComplaints);

module.exports = router;