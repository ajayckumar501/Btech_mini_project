const commitmentModel = require("../models/commitmentModel");
const nodemailer = require('nodemailer');
const validator = require('validator');
const { sendEmail } = require('./mailer');

const fetchCommitments = async (req, res) => {
  try {
    const {user1} = req.query;

    const user = await commitmentModel.find({
      $or: [
        { user1: user1 }, 
        { user2: user1 }, 
      ],
    });

    return res.status(200).send(user);
  } catch (error) {
    throw error; // Re-throwing the error for the caller to handle
  }
};

const deleteCommitment = async (req, res) => {
  try {
    const { username1, username2 } = req.query;

    const deletionQuery = {
      $or: [
        { user1: username1, user2: username2 }, 
        { user1: username2, user2: username1 }, 
      ],
    };

    const deletedCount = await commitmentModel.deleteMany(deletionQuery);

    return res.status(200).send({
      message: `Deleted ${deletedCount.deletedCount} commitment(s) with ${username1}`,
    });
  } catch (error) {
    return res.status(500).send({ error: 'Internal server error' });
  }
};


const countCommitments = async(req,res) => {
    try {
      const maxCommitment = await commitmentModel.findOne({}, { commitmentid: 1 }).sort({ commitmentid: -1 });
      if (!maxCommitment) {
        return res.status(200).send({ count: 1 });
      }
      const cid =  maxCommitment.commitmentid+1;
      return res.status(200).send({ count : cid});
    } catch (error) {
      return res.status(500).send({ message: "Internal server error" });
    }
  };

const commitmentcreator = async(req,res) => {
   try{
      
    const { user1,email,receiverdata,commitmentid,postid,posttitle } = req.body;
    //validation
    

    if (!user1) {
      return res.status(400).send({
        success: false,
        message: "User 1 not set",
      });
    }

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email not set",
      });
    }

    if (!receiverdata) {
      return res.status(400).send({
        success: false,
        message: "Receiver data is required",
      });
    }

    if (commitmentid === undefined) {
      return res.status(400).send({
        success: false,
        message: "Commitment id is required",
      });
    }

    
    if (postid === undefined) {
      return res.status(400).send({
        success: false,
        message: "Post id is required",
      });
    }


    await commitmentModel({
      user1:user1,
      user2:receiverdata.username,
      commitmentid:commitmentid,
      postid:postid,
    }).save();

    sendEmail(
      email,
      "New Connection!!!",
      `Hello ${user1},\n\nYour new connection is ${receiverdata.username}.\nDetails:\nPhone number: ${receiverdata.phoneno},\nLocation: ${receiverdata.location}`
    );
    

  sendEmail(
    receiverdata.email,
    "New Connection!!!",
    `Hello ${receiverdata.username}, \n\nYour new connection is ${user1} \nPost title:"${posttitle}".`
);


    return res.status(201).send({
      success: true,
      message: "Connection made..Please check your mail",
    });

   }
   catch(error){
    if(error.response)
      {
          alert(error.response.data.message);
      }
   }
};

module.exports = {
    commitmentcreator,
    countCommitments,
    fetchCommitments,
    deleteCommitment
};