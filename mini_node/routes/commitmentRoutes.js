const express = require("express");
const {
  commitmentcreator,
  countCommitments,
  fetchCommitments,
  deleteCommitment,
} = require("../controllers/commitmentController");

const router = express.Router();

router.get("/count", countCommitments);
router.post("/fetch", fetchCommitments);
router.post("/create",commitmentcreator);
router.delete("/deleteConnection",deleteCommitment);

module.exports = router;