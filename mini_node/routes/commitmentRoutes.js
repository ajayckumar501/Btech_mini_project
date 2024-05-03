const express = require("express");
const {
  commitmentcreator,
  countCommitments
} = require("../controllers/commitmentController");

const router = express.Router();

router.get("/count", countCommitments);
router.post("/create",commitmentcreator);

module.exports = router;