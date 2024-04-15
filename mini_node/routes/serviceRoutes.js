const express = require("express");
const {
  serviceController,
  FetchallServices,
} = require("../controllers/serviceController");

//riouter object
const router = express.Router();

//routes
router.post("/fetch", serviceController);
router.post("/fetchall", FetchallServices);


//export
module.exports = router;