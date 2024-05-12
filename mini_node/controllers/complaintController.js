const complaintModel = require("../models/complaintModel");

const countComplaints = async () => {
  try {
      const maxComplaint = await complaintModel.findOne({}, { complaintid: 1 }).sort({ complaintid: -1 });
      console.log(maxComplaint);

      if (!maxComplaint) {
          return 1; // Return count as 1 if no complaints found
      }

      const cid = maxComplaint.complaintid + 1;
      return cid; // Return the count
  } catch (error) {
      console.error('Error counting complaints:', error);
  }
};

const fetchComplaints = async (req, res) => {

  try {

    let query = {};   

    const posts = await complaintModel.find(query);

    console.log(posts);
    return res.status(200).send( posts );
  } catch (error) {
    console.error('Error fetching complaints:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

// Handle the response outside the function
const handleCountComplaints = async (req, res) => {
  try {
      const count = await countComplaints();
      console.log(count);
      res.status(200).send({ count });
  } catch (error) {
      console.error('Error:', error.message);
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
        message: "Missing required fields",
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
    console.log("Error creating complaint:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  complaintcreator,
  handleCountComplaints,
  fetchComplaints,
};
