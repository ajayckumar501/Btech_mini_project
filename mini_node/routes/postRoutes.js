const express = require("express");
const {
  countPosts,
  postcreator,
  fetchPosts,
  fetchreceiverPosts,
} = require("../controllers/postController");

const router = express.Router();

router.post("/count", countPosts);
router.post("/create",postcreator);
router.post("/fetch",fetchPosts);
router.post("/fetchreceiver",fetchreceiverPosts);

module.exports = router;