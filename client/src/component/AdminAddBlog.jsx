import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext"; 
import { toast } from "react-toastify";

function AdminAddBlogs() {
  const {
    backendUrl,
    api,
  } = useContext(AppContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
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
      fetchCategories(); // Refresh category list
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
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-semibold">Add Blogs</h1>

      <form className="my-4 flex flex-col gap-4" onSubmit={handleAddBlog}>
        <input
          type="text"
          placeholder="Title"
          className="p-4 bg-transparent text-3xl border-b border-zinc-400 font-semibold w-full outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="p-4 bg-transparent text-xl border-b border-zinc-400 font-semibold w-full outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <input
            type="file"
            accept=".jpeg, .jpg, .png"
            className="w-fit bg-zinc-800 rounded text-white"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <select
            name="title"
            className="w-fit px-4 py-2 rounded shadow"
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

        <div>
          {loading ? (
            <div className="bg-blue-400 w-fit text-xl text-white rounded px-4 py-2 shadow-xl">
              Adding Blog...
            </div>
          ) : (
            <button className="bg-blue-600 text-xl text-white rounded px-4 py-2 shadow-xl hover:bg-blue-700 transition-all duration-300">
              Add Blog
            </button>
          )}
        </div>
      </form>

      <h1 className="text-2xl font-semibold mt-8">Add New Category</h1>
      <form className="mt-4" onSubmit={addNewCategory}>
        <input
          type="text"
          placeholder="Your new Category"
          className="bg-none border outline-none px-4 py-2 rounded bg-gray-50"
          required
          onChange={(e) => setNewCategory(e.target.value)}
          value={newCategory}
        />
        <button className="ms-4 bg-blue-600 px-4 py-2 rounded text-white">
          Add Category
        </button>
      </form>
    </div>
  );
}

export default AdminAddBlogs;
