import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function AdminAddBlogs() {
  const { api } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const handleAddBlog = async (e) => {
    e.preventDefault();
    if (!title || !description || !image || !categoryId) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      const form = new FormData();
      form.append("title", title);
      form.append("description", description);
      form.append("image", image);
      form.append("category", categoryId);

      const res = await api("/api/v1/admin/addBlog", {
        method: "POST",
        data: form,
      });

      toast.success(res.data?.message || "Blog added successfully!");
      setTitle("");
      setDescription("");
      setImage(null);
      setPreview(null);
      setCategoryId("");
    } catch (error) {
      console.error("Error adding blog:", error);
      toast.error(error.response?.data?.message || "Failed to add blog.");
    } finally {
      setLoading(false);
    }
  };

  const addNewCategory = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;

    try {
      const res = await api("/api/v1/category/addCategory", {
        method: "POST",
        data: { title: newCategory },
      });

      toast.success(res.data?.message || "Category added successfully!");
      setNewCategory("");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add category.");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api("/api/v1/category/getCategory", {
        method: "GET",
      });
      setCategories(res.data?.categories || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch categories.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4">Add Blogs</h1>

      <form
        className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md"
        onSubmit={handleAddBlog}
      >
        <input
          type="text"
          placeholder="Title"
          className="p-3 bg-gray-100 rounded-md text-lg sm:text-xl w-full outline-none border"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Description"
          rows="4"
          className="p-3 bg-gray-100 rounded-md text-base sm:text-lg w-full outline-none border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <input
            type="file"
            accept=".jpeg, .jpg, .png"
            className="w-full sm:w-auto bg-gray-100 border rounded-md p-2 text-sm"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setPreview(URL.createObjectURL(e.target.files[0]));
            }}
          />
          <select
            name="title"
            className="w-full sm:w-auto px-4 py-2 rounded-md border bg-gray-100"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select category</option>
            {categories.map((item, i) => (
              <option value={item._id} key={i}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {preview && (
          <div className="w-full sm:w-48">
            <img
              src={preview}
              alt="preview"
              className="rounded-md mt-2 w-full object-cover"
            />
          </div>
        )}

        <div>
          {loading ? (
            <div className="bg-blue-400 w-full sm:w-fit text-center text-lg text-white rounded px-4 py-2 shadow-md">
              Adding Blog...
            </div>
          ) : (
            <button className="bg-blue-600 w-full sm:w-fit text-lg text-white rounded px-4 py-2 shadow-md hover:bg-blue-700 transition-all duration-300">
              Add Blog
            </button>
          )}
        </div>
      </form>

      <h1 className="text-xl sm:text-2xl font-semibold mt-8 mb-2">
        Add New Category
      </h1>
      <form
        className="flex flex-col sm:flex-row gap-2 sm:gap-4 bg-white p-4 rounded-lg shadow-md"
        onSubmit={addNewCategory}
      >
        <input
          type="text"
          placeholder="Your new Category"
          className="flex-1 border outline-none px-4 py-2 rounded-md bg-gray-100"
          required
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
        />
        <button className="bg-blue-600 w-full sm:w-fit px-4 py-2 rounded-md text-white">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AdminAddBlogs;
