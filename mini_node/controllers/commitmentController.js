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
      const cid =  maxCommitment.commitmentid+1;
      return res.status(200).send({ count : cid});
    } catch (error) {
      console.error('Error counting commitments:', error);
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

    await sendEmail(
      email,
      "New Connection!!!",
      `Hello ${user1},\n\nYour new connection is ${receiverdata.username}.\nDetails:\nPhone number: ${receiverdata.phoneno},\nLocation: ${receiverdata.location}`
    );
    

  await sendEmail(
    receiverdata.email,
    "New Connection!!!",
    `Hello ${receiverdata.username}, Your new connection is ${user1} for post:${posttitle}.`
);


    return res.status(201).send({
      success: true,
      message: "Connection made..Please check your mail",
    });

   }
   catch(error){
    if(error.response)
      {
          console.log(error.response.data.message);
          alert(error.response.data.message);
      }
      else{
          console.log('Error:', error);
      }
      //return res.status(500).send({message:"Internal server error"});
   }
};

module.exports = {
    commitmentcreator,
    countCommitments,
};