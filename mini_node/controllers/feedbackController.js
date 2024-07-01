const feedbackModel = require("../models/feedbackModel");

const countfeedbacks = async () => {
  try {
      const maxfeedback = await feedbackModel.findOne({}, { feedbackid: 1 }).sort({ feedbackid: -1 });

      if (!maxfeedback) {
          return 1; // Return count as 1 if no feedbacks found
      }

      const cid = maxfeedback.feedbackid + 1;
      return cid; // Return the count
  } catch (error) {
      
  }
};

// Handle the response outside the function
const handleCountfeedbacks = async (req, res) => {
  try {
      const count = await countfeedbacks();
      res.status(200).send({ count });
  } catch (error) {
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
    return res.status(500).send({message: "Feedback stored\n\nPlease refresh to post new feedback"});
  }
};

const fetchFeedbacks = async (req, res) => {

  try {

    let query = {};   

    const posts = await feedbackModel.find(query);

    return res.status(200).send( posts );
  } catch (error) {
    return res.status(500).send({ message: "Internal server error" });
  }
};

module.exports = {
  feedbackcreator,
  handleCountfeedbacks,
  fetchFeedbacks,
};
