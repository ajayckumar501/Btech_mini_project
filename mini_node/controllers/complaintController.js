const complaintModel = require("../models/complaintModel");

const countComplaints = async () => {
  try {
      const maxComplaint = await complaintModel.findOne({}, { complaintid: 1 }).sort({ complaintid: -1 });

      if (!maxComplaint) {
          return 1; // Return count as 1 if no complaints found
      }

      const cid = maxComplaint.complaintid + 1;
      return cid; // Return the count
  } catch (error) {
      
  }
};

const fetchComplaints = async (req, res) => {

  try {

    let query = {};   

    const posts = await complaintModel.find(query);

    return res.status(200).send( posts );
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

// Handle the response outside the function
const handleCountComplaints = async (req, res) => {
  try {
      const count = await countComplaints();
      res.status(200).send({ count });
  } catch (error) {
      res.status(500).send({ message: 'Internal server error' });
  }
};


const complaintcreator = async (req, res) => {
  try {
    const { complaintid, complaint, giver, taker } = req.body;

    // Validation
    if (complaintid == undefined || !complaint || !giver || !taker) {
      return res.status(400).send({
        success: false,
        message: "Server error!!",
      });
    }

    // Save complaint to the database
    await complaintModel({
      complaintid: complaintid,
      complaint: complaint,
      giver: giver,
      taker: taker,
    }).save();

    // Send success response
    return res.status(201).send({
      success: true,
      message: "Complaint registered",
    });
  } catch (error) {
    return res.status(500).send({ message: "Complaint stored\n\nPlease refresh to post new complaint" });
  }
};

module.exports = {
  complaintcreator,
  handleCountComplaints,
  fetchComplaints,
};
