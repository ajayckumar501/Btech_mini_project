const postModel = require("../models/postModel");
const countPosts = async(req,res) => {
  try {
    const maxPost = await postModel.findOne({}, { post_id: 1 }).sort({ post_id: -1 });
    if (!maxPost) {
      return res.status(404).send({ count: 0 });
    }
    return res.status(200).send({ count: maxPost.post_id });
  } catch (error) {
    console.error('Error counting entries:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const fetchPosts = async (req, res) => {
  const {service_id} = req.query;
  console.log(service_id);
  try {
    const posts = await postModel.find({ service_id }) // Filter by serviceId
    console.log(posts);
    return res.status(200).send({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const fetchreceiverPosts = async (req, res) => {
  const { service_id, username } = req.query;
  console.log(service_id, username); // Log the values for debugging
  try {
    let query = {};
    
    if (service_id !== undefined) {
      query.service_id = service_id;
    }
    
    if (username !== undefined) {
      query.username = username;
    }

    const posts = await postModel.find(query);
    
    console.log(posts);
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
    fetchreceiverPosts,
  };