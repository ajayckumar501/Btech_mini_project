const User = require('../models/userModel'); // Import the User model
const Post = require('../models/postModel'); // Import the Post model

const Service=require("../models/serviceModel")

const adminModel = require("../models/adminModel");


const JWT = require("jsonwebtoken");

var { expressjwt: jwt } = require("express-jwt");


//middleware
const requireSignIn = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});


const fetchDatavalues = async (req, res) => {
  try {


    console.log("hellooooooo");


    // Query the database to find the total number of donors
    const totalDonors = await User.countDocuments({ usertype: "donor" });


    // Query the database to find the total number of receivers
    const totalReceivers = await User.countDocuments({ usertype: "receiver" });

    // Query the database to find the total number of posts
    const totalPosts = await Post.countDocuments();

    // Return the fetched data
    return res.status(200).send({ totalDonors, totalReceivers, totalPosts });

  } catch (error) {
    // Handle errors
    console.error('Error fetching all data needed for adminScreen:', error);
    throw error; // Re-throwing the error for the caller to handle
  }
};


const fetchallDonors = async (req, res) => {
  try {
    console.log("inside fetchAllDonors function.....");

    // Query the database to find all users with usertype 'donor'
    const donors = await User.find({ usertype: "donor" });

    console.log("this is list of donors", donors);
    // Send the list of donors in the response
    return res.status(200).send(donors);
  } catch (error) {
    // Handle errors
    console.error('Error fetching all data needed for donorlistScreen:', error);
    throw error; // Re-throwing the error for the caller to handle
  }
};


const fetchallReceivers = async (req, res) => {
  try {
    console.log("inside fetchAllReceivers function.....");

    // Query the database to find all users with usertype 'donor'
    const receivers = await User.find({ usertype: "receiver" });

    console.log("this is list of receivers", receivers);
    // Send the list of donors in the response
    return res.status(200).send(receivers);
  } catch (error) {
    // Handle errors
    console.error('Error fetching all data needed for donorlistScreen:', error);
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
      // console.log(matchadmin);
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
    console.log(error);
    console.log("hereeeeeeeeeeeeeeee");
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
    const lastService = await Service.findOne().sort({ service_id: -1 });

    // Calculate the new service_id
    const newServiceId = lastService ? lastService.service_id + 1 : 1;

    // Extract the service name from the request body
    const { serviceName } = req.body;

    // Create a new service document
    const newService = new Service({
      service_id: newServiceId,
      service_name: serviceName,
    });

    // Save the new service to the database
    await newService.save();

    // Send success response
    return res.status(201).send({ message: 'New service added successfully.' });
  } catch (error) {
    // Handle errors
    console.error('Error adding new service:', error);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
};

const deleteUserByUsername = async (req, res) => {
  try {
    console.log("inside deleteDonorByUsername function.....");

    // Extract username from query parameters
    const { username } = req.query;

    // Delete the donor from the database by username
    const deletedDonor = await User.findOneAndDelete({ username });

    console.log("Deleted donor:", deletedDonor);

    // Send success response
    return res.status(200).send({ message: 'Donor deleted successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error deleting donor:', error);
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