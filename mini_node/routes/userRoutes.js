const express = require("express");
const {
  registerController,
  loginController,
  updateUserController,
  requireSingIn,
} = require("../controllers/userController");

//riouter object
const router = express.Router();

//routes
// REGISTER || POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);


//export
module.exports = router;