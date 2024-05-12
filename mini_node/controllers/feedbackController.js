const feedbackModel = require("../models/feedbackModel");

const countfeedbacks = async () => {
  try {
      const maxfeedback = await feedbackModel.findOne({}, { feedbackid: 1 }).sort({ feedbackid: -1 });
      console.log(maxfeedback);

      if (!maxfeedback) {
          return 1; // Return count as 1 if no feedbacks found
      }

      const cid = maxfeedback.feedbackid + 1;
      return cid; // Return the count
  } catch (error) {
      console.error('Error counting feedbacks:', error);
  }
};

// Handle the response outside the function
const handleCountfeedbacks = async (req, res) => {
  try {
      const count = await countfeedbacks();
      console.log(count);
      res.status(200).send({ count });
  } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send({ message: 'Internal server error' });
  }
};


const feedbackcreator = async (req, res) => {
  try {
    const { feedbackid, feedback, giver, taker } = req.body;

    // Validation
    if (feedbackid == undefined || !feedback || !giver || !taker) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields",
      });
    }

    // Save feedback to the database
    await feedbackModel({
      feedbackid: feedbackid,
      feedback: feedback,
      giver: giver,
      taker: taker,
    }).save();

    // Send success response
    return res.status(201).send({
      success: true,
      message: "feedback registered",
    });
  } catch (error) {
    console.log("Error creating feedback:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  feedbackcreator,
  handleCountfeedbacks,
};
