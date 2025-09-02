import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

function AdminEditBlogs() {
  const { backendUrl, api } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);


  const fetchBlogs = async () => {
    try {
      const res = await api("/api/v1/blog/fetchAllBlog", {
        method: "GET",
      });
      setBlogs(res.data?.blogs || []);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to fetch blogs");
    }
  };


  const deleteHandle = async (id) => {
    try {
      const res = await api(`/api/v1/admin/deleteBlog/${id}`, {
        method: "PUT",
      });
      toast.success(res.data?.message || "Blog deleted successfully");
      fetchBlogs(); 
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete blog");
    }
  };

 
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-semibold">Edit Blogs</h1>

      <div className="grid grid-cols-3 gap-8 lg:gap-4 my-4">
        {blogs.length > 0 ? (
          blogs.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl p-4 flex flex-col items-center justify-center"
            >
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="rounded object-cover"
                />
              </div>
              <div className="mt-4">
                <h1 className="text-2xl font-semibold">{item.title}</h1>
                <p className="mb-4">{item.description}...</p>
              </div>
              <div className="w-full flex items-center justify-between gap-4">
                <Link
                  className="bg-blue-600 w-full text-white rounded px-4 py-2 text-center"
                  to={`/admin-dashboard/update-blog/${item._id}`}
                >
                  Edit
                </Link>
                <button
                  className="bg-red-600 w-full text-white rounded px-4 py-2"
                  onClick={() => deleteHandle(item._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-3">
            No blogs found.
          </p>
        )}
      </div>
    </div>
  );
}

export default AdminEditBlogs;
