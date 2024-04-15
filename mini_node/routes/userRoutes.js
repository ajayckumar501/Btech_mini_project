const express = require("express");
const {
  registerController,
  registerSubmitController,
  loginController,
  addData,
  updateUserController,
  requireSingIn,
} = require("../controllers/userController");

//riouter object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);
router.post("/register2", registerSubmitController);

// LOGIN || POST
router.post("/login", loginController);


//export
module.exports = router;