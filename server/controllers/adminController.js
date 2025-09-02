import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Blog from "../models/blog.js";
import Cat from "../models/category.js";



const addBlog = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ error: "All Fields Is Required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Image is required" });
    }
    const existingCat = await Cat.findOne({ title: category });
    if (!existingCat) {
      return res.status(400).json({ error: "Category not exist" });
    }

    const newBlog = new Blog({
      title,
      description,
      image: req.file.path,
    });

    await newBlog.save();
    existingCat.blog.push(newBlog._id);
    await existingCat.save();
    return res.status(200).json({ success: true, message: "Blog Added" });
  } catch (error) {
    return res.status(400).json({ error: "Internal server error" });
  }
};

const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    await Blog.findByIdAndUpdate(id, { title, description });

    return res.status(200).json({ success: true, message: "Updated blog" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    await Blog.findByIdAndDelete(id);

    return res.status(200).json({ success: true, message: "Deleted blog" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
};

export {  addBlog, deleteBlog, editBlog };
