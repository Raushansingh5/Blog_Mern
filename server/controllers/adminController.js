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
    const existingCat = await Cat.findOne({ _id: category });
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

    const updateData = { title, description };

    if (req.file) {
      updateData.image = req.file.path; 
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      blog: updatedBlog,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Internal Server Error" });
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
