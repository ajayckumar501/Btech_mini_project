const express = require("express");
const {
  countPosts,
  postcreator,
  fetchPosts,
  fetchreceiverPosts,
  deleteUserPost,
} = require("../controllers/postController");

const router = express.Router();

router.post("/count", countPosts);
router.post("/create",postcreator);
router.post("/fetch",fetchPosts);
router.post("/fetchreceiver",fetchreceiverPosts);
router.post("/delete",deleteUserPost);

module.exports = router;