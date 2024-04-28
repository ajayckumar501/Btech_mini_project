const express = require("express");
const {
  countPosts,
  postcreator,
  fetchPosts,
} = require("../controllers/postController");

const router = express.Router();

router.post("/count", countPosts);
router.post("/create",postcreator);
router.post("/fetch",fetchPosts);

module.exports = router;