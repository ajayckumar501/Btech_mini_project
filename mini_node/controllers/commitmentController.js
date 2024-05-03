const commitmentModel = require("../models/commitmentModel");

const countCommitments = async(req,res) => {
    try {
      const maxCommitment = await postModel.findOne({}, { commitment_id: 1 }).sort({ commitment_id: -1 });
      if (!maxCommitment) {
        return res.status(404).send({ count: 0 });
      }
      return res.status(200).send({ count: maxCommitment.commitment_id });
    } catch (error) {
      console.error('Error counting commitments:', error);
      return res.status(500).send({ message: "Internal server error" });
    }
  };

const commitmentcreator = async(req,res) => {
   try{
      
    const { user1,user2,commitment_id,post_id } = req.body;
    //validation
    

    if (!user1) {
      return res.status(400).send({
        success: false,
        message: "User 1 not set",
      });
    }

    if (!user2) {
      return res.status(400).send({
        success: false,
        message: "User 2 not set",
      });
    }

    if (!commitment_id) {
      return res.status(400).send({
        success: false,
        message: "Commitment id is required",
      });
    }

    
    if (!post_id) {
      return res.status(400).send({
        success: false,
        message: "Post id is required",
      });
    }

    await commitmentModel({
      user1:user1,
      user2:user2,
      commitment_id:commitment_id,
      post_id:post_id,
    }).save();

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