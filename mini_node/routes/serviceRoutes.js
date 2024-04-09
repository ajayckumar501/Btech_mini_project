const express = require("express");
const {
  serviceController
} = require("../controllers/serviceController");

//riouter object
const router = express.Router();

//routes
router.post("/fetch", serviceController);


//export
module.exports = router;