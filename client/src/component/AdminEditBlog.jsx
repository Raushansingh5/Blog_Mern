import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

function AdminEditBlogs() {
  const { api } = useContext(AppContext);
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
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Manage Blogs</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 overflow-hidden flex flex-col"
            >
              <div className="h-48 w-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="flex-1 p-4 flex flex-col">
                <h1 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h1>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {item.description}
                </p>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <Link
                    className="bg-blue-600 hover:bg-blue-700 w-full sm:w-1/2 text-white rounded-lg px-4 py-2 text-center text-sm font-medium"
                    to={`/admin-dashboard/update-blog/${item._id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="bg-red-600 hover:bg-red-700 w-full sm:w-1/2 text-white rounded-lg px-4 py-2 text-sm font-medium"
                    onClick={() => deleteHandle(item._id)}
                  >
                    Delete
                  </button>
                </div>
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
