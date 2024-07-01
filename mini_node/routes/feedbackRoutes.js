const express = require("express");
const {
  feedbackcreator,
  handleCountfeedbacks,
  fetchFeedbacks
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/create",feedbackcreator);
router.get("/count",handleCountfeedbacks);
router.post("/fetch",fetchFeedbacks);

module.exports = router;