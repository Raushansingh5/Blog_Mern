import User from "../models/user.js";
import Category from "../models/category.js";
import Blog from "../models/blog.js";

const addCategory = async (req, res) => {
  try {
    const { title } = req.body;
    const checkCat = await Category.findOne({ title });

    if (checkCat) {
      return res.status(400).json({ error: "Category already exist" });
    }

    const newCat = new Category({ title });
    await newCat.save();
    return res.status(200).json({ message: "Category Added" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, error: "Internal server error" });
  }
};

const getCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "internal server error",
    });
  }
};

const getDataByCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const categories = await Category.findById(id).populate("blog");
    const data = categories.blog;
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: "internal server error",
    });
  }
};
export { addCategory, getCategory, getDataByCategory };
