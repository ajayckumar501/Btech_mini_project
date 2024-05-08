const postModel = require("../models/postModel");
const { post } = require("../routes/complaintRoutes");
const countPosts = async(req,res) => {
  try {
    const maxPost = await postModel.findOne({}, { postid: 1 }).sort({ postid: -1 });
    if (!maxPost) {
      return res.status(200).send({ count: 1 });
    }
    return res.status(200).send({ count: maxPost.postid+1 });
  } catch (error) {
    console.error('Error counting entries:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};

const deleteUserPost = async(req,res) => {
  const { postid } = req.query; // Assuming postid is passed in the request body
  console.log(postid);
  try {
    // Find the post by its ID and delete it
    const deletedPost = await postModel.findByIdAndDelete(postid);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const fetchPosts = async (req, res) => {
  const { serviceid, username } = req.query; // Rename to excludeUsername

  try {
    console.log(serviceid);
    let query = {};
    
    if (serviceid != undefined) {
      query.serviceid = serviceid;
    }

    if (username !== undefined) {
      query.username = { $ne: username }; // Exclude posts with the specified username
    }
    console.log(query);
    

    const posts = await postModel.find(query);

    console.log(posts);
    return res.status(200).send({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).send({ message: "Internal server error" });
  }
};



const fetchreceiverPosts = async (req, res) => {
  const { serviceid, username } = req.query;
  console.log(serviceid, username); // Log the values for debugging
  try {
    let query1 = {};
    
    if (serviceid != undefined) {
      query1.serviceid = serviceid;
    }
    
    if (username != undefined) {
      query1.username = username;
    }

    const posts = await postModel.find(query1);
    
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

      if (id===undefined) {
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
        postid:id,
        serviceid:serviceid,
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
        message: error.message,
        error:error.message
      });
    }
  };

  module.exports = {
    postcreator,
    countPosts,
    fetchPosts,
    fetchreceiverPosts,
    deleteUserPost,
  };