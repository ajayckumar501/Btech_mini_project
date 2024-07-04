const User = require('../models/userModel'); // Import the User model
const Post = require('../models/postModel'); // Import the Post model
const Service=require("../models/serviceModel")
const adminModel = require("../models/adminModel");
const commitment = require("../models/commitmentModel");
const feedback = require("../models/feedbackModel");
const complaint  = require("../models/complaintModel");


const JWT = require("jsonwebtoken");

var { expressjwt: jwt } = require("express-jwt");


//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

const fetchDatavalues = async (req, res) => {
  try {
    // Query the database to find the total number of donors
    const totalDonors = await User.countDocuments({
      $or: [
        { usertype: 'donor' },
        { usertype: 'both' }
      ]
    });


    // Query the database to find the total number of receivers
    const totalReceivers = await User.countDocuments({
      $or: [
        { usertype: 'receiver' },
        { usertype: 'both' }
      ]
    });

    // Query the database to find the total number of posts
    const totalPosts = await Post.countDocuments();
    const totalConnections = await commitment.countDocuments();

    // Return the fetched data
    return res.status(200).send({ totalDonors, totalReceivers, totalPosts, totalConnections});

  } catch (error) {
    throw error; // Re-throwing the error for the caller to handle
  }
};


const fetchallDonors = async (req, res) => {
  try {

    // Query the database to find all users with usertype 'donor'
    const donors = await User.find({
      $or: [
        { usertype: 'donor' },
        { usertype: 'both' }
      ]
    });

    // Send the list of donors in the response
    return res.status(200).send(donors);
  } catch (error) {
    throw error; // Re-throwing the error for the caller to handle
  }
};


const fetchallReceivers = async (req, res) => {
  try {

    // Query the database to find all users with usertype 'donor'
    const receivers = await User.find({
      $or: [
        { usertype: 'receiver' },
        { usertype: 'both' }
      ]
    });
    // Send the list of donors in the response
    return res.status(200).send(receivers);
  } catch (error) {
    throw error; // Re-throwing the error for the caller to handle
  }
};



const adminloginController = async (req, res) => {
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
    const admin = await adminModel.findOne({ username });

    if(!admin)
      {
        return res.status(500).send({
          success:false,
          message:"Admin not found....."
        });
      }


    if (admin) {

      //TOKEN JWT
      const token = JWT.sign({ _id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });



      //match password
      const matchadmin = (password === admin.password);
      if (matchadmin) {
        return res.status(200).send({
          success: true,
          message: "Login successfull",
          token,
          admin
        });
      }
    }

  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "error in adminlogin api",
      error,
    });
  }
};



const addingnewservice = async (req, res) => {
  try {
    // Find the last inserted service and get its service_id
    const lastService = await Service.findOne().sort({ serviceid: -1 });

    // Calculate the new service_id
    const newServiceId = lastService ? lastService.serviceid + 1 : 1;

    // Extract the service name from the request body
    const { serviceName } = req.body;

    // Create a new service document
    const newService = new Service({
      serviceid: newServiceId,
      servicename: serviceName,
    });

    // Save the new service to the database
    await newService.save();

    // Send success response
    return res.status(201).send({ message: 'New service added successfully.' });
  } catch (error) {
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteUserByUsername = async (req, res) => {
  try {

    // Extract username from query parameters
    const { username } = req.query;

    // Delete the donor from the database by username
    const deletedDonor = await User.findOneAndDelete({ username });
    const deletionQuery = {
      $or: [
        { user1: username }, 
        { user2: username }, 
      ],
    };

    const deletionQuery1 = {
      $or: [
        { giver: username }, 
        { taker: username }, 
      ],
    };

    const deletedCount = await commitment.deleteMany(deletionQuery);
    const deletedCount1 = await Post.deleteMany({ username });
    const deletedCount2 = await feedback.deleteMany( deletionQuery1 );
    const deletedCount3 = await complaint.deleteMany( deletionQuery1 );

    // Send success response
    return res.status(200).send({ message: 'Donor deleted successfully' });
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};







module.exports = {
  fetchallDonors,
  fetchDatavalues,
  fetchallReceivers,
  adminloginController,
  requireSignIn,
  addingnewservice,
  deleteUserByUsername
};