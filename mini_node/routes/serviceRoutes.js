const express = require("express");
const {
  serviceController,
  FetchallServices,
  createService,
} = require("../controllers/serviceController");

//riouter object
const router = express.Router();

//routes
router.post("/fetch", serviceController);
router.post("/fetchall", FetchallServices);
router.post("/create",createService);


//export
module.exports = router;