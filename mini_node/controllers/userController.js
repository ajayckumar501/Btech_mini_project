const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//register
const registerController = async (req, res) => {
  try {
    const { username, email, phone, location, password, confirmpassword } = req.body;
    //validation
    
    if (!username) {
      return res.status(400).send({
        success: false,
        message: "username is required",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }

    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required",
      });
    }

    if (!location) {
      return res.status(400).send({
        success: false,
        message: "Location is required",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is required and 6 character long",
      });
    }
    if (!confirmpassword || password != confirmpassword) {
      return res.status(400).send({
        success: false,
        message: "Passwords doesn't match",
      });
    }
    //exisiting user
    const exisitingUser = await userModel.findOne({ username });
    if (exisitingUser) {
      return res.status(500).send({
        success: false,
        message: "User already registered With this username",
      });
    }

    return res.status(201).send({
      success: true,
      message: "Navigating to next page",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

const registerSubmitController = async (req, res) => {
  try {
    const { username, email, phone, location, password,confirmpassword,usertype,services } = req.body;
    //validation
    
    if (!usertype) {
      return res.status(400).send({
        success: false,
        message: "Usertype is required",
      });
    }

    if (!services) {
      return res.status(400).send({
        success: false,
        message: "Service selection is required",
      });
    }
    //hashed pasword
    const hashedPassword = await hashPassword(password);

    //save user
    await userModel({
      username:username,
      email:email,
      phoneno:phone,
      location:location,
      password:hashedPassword,
      usertype:usertype,
      services:services,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Registration sucesssful..Please login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//login
const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    //validation
    if (!username || !password) {
      return res.status(500).send({
        success: false,
        message: "Fill all the fields",
      });
    }
    // find user
    const user = await userModel.findOne({ username});
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User Not Found",
      });
    }
    //match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Invalid usrname or password",
      });
    }
    //TOKEN JWT
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // undefined password
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "login successful",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login api",
      error,
    });
  }
};
module.exports = {
  requireSignIn,
  registerController,
  registerSubmitController,
  loginController,
};