const express = require("express");
const {
  fetchallDonors,
  fetchDatavalues,
  fetchallReceivers,
  adminloginController,
  addingnewservice,
  deleteUserByUsername

} = require("../controllers/adminController");

const router = express.Router();


router.post("/fetchallDonors",fetchallDonors);
router.get("/fetchDatavalues",fetchDatavalues);
router.get("/fetchallReceivers",fetchallReceivers);

router.post("/adminloginController",adminloginController);

router.post("/addingnewservice",addingnewservice);

router.delete("/deleteUserByUsername",deleteUserByUsername);








module.exports = router;