const express = require("express");
const {
  feedbackcreator,
  handleCountfeedbacks,
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/create",feedbackcreator);
router.get("/count",handleCountfeedbacks);

module.exports = router;