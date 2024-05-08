const express = require("express");
const {
  registerController,
  registerSubmitController,
  loginController,
  profile_edit1,
  profile_edit2,
  fetchUserDetails,
} = require("../controllers/userController");

//riouter object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);
router.post("/register2", registerSubmitController);
router.post("/Profile_edit2", profile_edit2);
router.post("/Profile_edit1", profile_edit1);
router.get("/fetchUser",fetchUserDetails);

// LOGIN || POST
router.post("/login", loginController);


//export
module.exports = router;