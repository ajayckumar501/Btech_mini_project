const commitmentModel = require("../models/commitmentModel");
const nodemailer = require('nodemailer');
const validator = require('validator');
const { sendEmail } = require('./mailer');

const countCommitments = async(req,res) => {
    try {
      const maxCommitment = await commitmentModel.findOne({}, { commitmentid: 1 }).sort({ commitmentid: -1 });
      console.log(maxCommitment);
      if (!maxCommitment) {
        return res.status(200).send({ count: 1 });
      }
      return res.status(200).send({ count: maxCommitment.commitmentid+1 });
    } catch (error) {
      console.error('Error counting commitments:', error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

const commitmentcreator = async(req,res) => {
   try{
      
    const { user1,email,receiveremail,user2,commitmentid,postid } = req.body;
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

    if (!receiveremail) {
      return res.status(400).send({
        success: false,
        message: "Receiver email not set",
      });
    }

    if (!user2) {
      return res.status(400).send({
        success: false,
        message: "User 2 not set",
      });
    }

    if (commitmentid == undefined) {
      return res.status(400).send({
        success: false,
        message: "Commitment id is required",
      });
    }

    
    if (!postid) {
      return res.status(400).send({
        success: false,
        message: "Post id is required",
      });
    }

    await commitmentModel({
      user1:user1,
      user2:user2,
      commitmentid:commitmentid,
      postid:postid,
    }).save();

    await sendEmail(
      email,
      "New Connection!!!",
      `Hello ${user1}, Your new connection is ${user2}.`
  );

  await sendEmail(
    receiveremail,
    "New Connection!!!",
    `Hello ${user1}, Your new connection is ${user1}.`
);


    return res.status(201).send({
      success: true,
      message: "Connection made",
    });

   }
   catch(error){
      console.log("Error making connection",error); 
      return res.status(500).send({message:"Internal server error"});
   }
};

module.exports = {
    commitmentcreator,
    countCommitments,
};