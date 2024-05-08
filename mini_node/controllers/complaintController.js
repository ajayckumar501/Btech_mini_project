const complaintModel = require("../models/complaintModel");

const countComplaints = async(req,res) => {
  try {
    const maxComplaint = await complaintModel.findOne({}, { complaintid: 1 }).sort({ complaintid: -1 });
    if (!maxComplaint) {
      return res.status(200).send({ count: 1 });
    }
    return res.status(200).send({ count: maxComplaint.postid+1 });
  } catch (error) {
    console.error('Error counting entries:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const complaintcreator = async(req,res) => {

   try{
      
    const { complaintid, complaint , giver, taker} = req.body;
    //validation
    

    if (complaintid == undefined) {
      return res.status(400).send({
        success: false,
        message: "Complaint id not set",
      });
    }

    if (!complaint) {
      return res.status(400).send({
        success: false,
        message: "Complaint not set",
      });
    }

    if (!giver) {
        return res.status(400).send({
          success: false,
          message: "Giver not set",
        });
      }

      if (!taker) {
        return res.status(400).send({
          success: false,
          message: "Taker not set",
        });
      }


    await complaintModel({
        complaintid:complaintid,
        complaint:complaint,
        giver:giver,
        taker:taker

    }).save();

    return res.status(201).send({
      success: true,
      message: "Complaint registered",
    });

   }
   catch(error){
      console.log("Error making connection",error); 
      return res.status(500).send({message:"Internal server error"});
   }
};

module.exports = {
    complaintcreator,
    countComplaints,
};