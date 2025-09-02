import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

const fetchAllBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const fetchRecentBlog = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).limit(4);
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getCurrentBlog = async (req, res) => {
  try {
    const token = req.cookies.blogappToken;
    let user = null;

    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        user = await User.findById(decoded.id);
      } catch (e) {
        console.log("Invalid token");
      }
    }

    const { id } = req.params;
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(400).json({ error: "Not blog found" });
    }

    let favourite = false;
    if (user && blog.favouriteByUser.includes(user._id)) {
      favourite = true;
    }

    return res.status(200).json({ success: true, blog, favourite });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const addToFav = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const existingUser = await User.findById(user._id);
    if (!blog) {
      return res.status(400).json({ error: "Not blog found" });
    }

    blog.favouriteByUser.push(user._id);
    existingUser.favouriteBlog.push(id);
    await blog.save();
    await existingUser.save();

    return res.status(200).json({ message: "Blog added to favourites" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

const removeToFav = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const blog = await Blog.findById(id);
    const existingUser = await User.findById(user._id);
    if (!blog) {
      return res.status(400).json({ error: "Not blog found" });
    }

    const userFavouriteIndex = existingUser.favouriteBlog.indexOf(id);
    if (userFavouriteIndex !== -1) {
      existingUser.favouriteBlog.splice(userFavouriteIndex, 1);
    } else {
      return res.status(400).json({ error: "Blog is not in favourites" });
    }

    const blogFavouriteIndex = blog.favouriteByUser.indexOf(user._id);
    if (blogFavouriteIndex !== -1) {
      blog.favouriteByUser.splice(blogFavouriteIndex, 1);
    }

    await blog.save();
    await existingUser.save();

    return res.status(200).json({ message: "Blog remove from favourites" });
  } catch (error) { }
};


export {
  fetchAllBlog,
  fetchRecentBlog,
  getCurrentBlog,
  addToFav,
  removeToFav,
};
