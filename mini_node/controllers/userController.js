const JWT = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModel = require("../models/userModel");
const adminModel = require("../models/adminModel");
var { expressjwt: jwt } = require("express-jwt");
const serviceModel = require("../models/serviceModel");
const nodemailer = require('nodemailer');
const validator = require('validator');
const { sendEmail } = require('./mailer');

//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

function isValidEmail(email) {
  return validator.isEmail(email);
}

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

    if (!isValidEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Enter valid email!!",
      });
    }

    if (!phone || phone.length != 10) {
      return res.status(400).send({
        success: false,
        message: "Enter valid phone number",
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
        message: "User already registered with this username",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Navigating to next page",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in register api",
      error,
    });
  }
};

const registerSubmitController = async (req, res) => {
  try {
    const { username, email, phone, location, password,confirmpassword,usertype,services,flag } = req.body;
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
      flag:flag,
    }).save();

    sendEmail(
      email,
      "Welcome to Our Platform!",
      `Hello ${username}, welcome to DanaSetu! Your user type is ${usertype}.`
  );

    return res.status(201).send({
      success: true,
      message: "Registration successful..Please login",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};


const fetchUserDetails = async (req, res) => {
  try {
    const { username } = req.query;
    //validation
    if (username === undefined) {
      return res.status(500).send({
        success: false,
        message: "Username not passed",
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

    return res.status(200).send({
      success: true,
      user:user
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in user details api",
      error,
    });
  }
};
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

    // Find admin
    const admin = await adminModel.findOne({ username });
    if (admin) {
      const matchAdmin = (password === admin.password);
      if (matchAdmin) {
        // Admin login successful
        const token = JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).send({
          success: true,
          message: "Admin login successful",
          token,
          user: admin,
          isAdmin: true
        });
      } else {
        return res.status(500).send({
          success: false,
          message: "Invalid admin credentials",
        });
      }
    }

    // Find user
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "User not found",
      });
    }

    //match password
     
    const matchUser = await comparePassword(password, user.password);
    if (matchUser) {
      // User login successful
      const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
      return res.status(200).send({
        success: true,
        message: "User login successful",
        token,
        user,
        isAdmin: false
      });
    } else {
      return res.status(500).send({
        success: false,
        message: "Incorrect password",
      });
    }

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

const profile_edit1 = async (req, res) => {
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

    if (!isValidEmail(email)) {
      return res.status(400).send({
        success: false,
        message: "Enter valid email!!",
      });
    }

    if (!phone || phone.length != 10) {
      return res.status(400).send({
        success: false,
        message: "Enter valid phone number",
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

    return res.status(200).send({
      success: true,
      message: "Navigating to next page",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};


const profile_edit2 = async (req, res) => {
  try {
    const { username, email, phone, location, password, confirmpassword, usertype, services, flag } = req.body;
    // Validation
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

    // Hash password
    const hashedPassword = await hashPassword(password);
    // Update user profile
    const updatedUser = await userModel.findOneAndUpdate(
      { username: username }, // Find user by username
      {
        email: email,
        phoneno: phone,
        location: location,
        password: hashedPassword,
        usertype: usertype,
        services: services,
        flag: flag,
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Profile updated successfully....please Login",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in updating profile",
      error,
    });
  }
};


module.exports = {
  requireSignIn,
  registerController,
  registerSubmitController,
  loginController,
  profile_edit1,
  profile_edit2,
  fetchUserDetails,
};