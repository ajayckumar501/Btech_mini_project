const userModel = require("../models/userModel");
const serviceController = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await userModel.findOne({ username});
        return res.status(200).send({
            success: true,
            services: user.service,
          });
    } 
    catch (error) {
        console.log(error);
        return res.status(500).send({
          success: false,
          message: "Error in fetching services",
          error,
        });
      }
};

module.exports = {
  serviceController,
};