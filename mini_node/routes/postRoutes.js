const express = require("express");
const {
  countPosts,
  postcreator,
  fetchPosts,
  fetchreceiverPosts,
  deleteUserPost,
} = require("../controllers/postController");

const router = express.Router();

router.get("/count", countPosts);
router.post("/create",postcreator);
router.get("/fetch",fetchPosts);
router.get("/fetchreceiver",fetchreceiverPosts);
router.post("/delete",deleteUserPost);

module.exports = router;