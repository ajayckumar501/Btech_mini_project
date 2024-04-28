const postModel = require("../models/postModel");
const countPosts = async(req,res) => {
  try {
    const count = await postModel.countDocuments();
    return res.status(200).send({ count });
  } catch (error) {
    console.error('Error counting entries:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const fetchPosts = async (req, res) => {
  const {service_id} = req.query;
  try {
    const posts = await postModel.find({ service_id }) // Filter by serviceId

    return res.status(200).send({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};


const postcreator = async (req, res) => {
    try {
      const { username,id,serviceid,title,desc } = req.body;
      //validation
      

      if (!username) {
        return res.status(400).send({
          success: false,
          message: "User name not set",
        });
      }

      if (!id) {
        return res.status(400).send({
          success: false,
          message: "Post id not set",
        });
      }

      if (!serviceid) {
        return res.status(400).send({
          success: false,
          message: "Service id not set",
        });
      }
  
      if (!title) {
        return res.status(400).send({
          success: false,
          message: "Post title is required",
        });
      }

      
      if (!desc) {
        return res.status(400).send({
          success: false,
          message: "Post description is required",
        });
      }

      await postModel({
        username:username,
        post_id:id,
        service_id:serviceid,
        post_title:title,
        post_desc:desc,
      }).save();
  
      return res.status(201).send({
        success: true,
        message: "Post successfully stored",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        success: false,
        message: "Error!!",
        error:error.message
      });
    }
  };

  module.exports = {
    postcreator,
    countPosts,
    fetchPosts,
  };