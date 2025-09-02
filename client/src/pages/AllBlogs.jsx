import React, { useEffect, useState, useContext } from "react";
import BlogCard from "../component/BlogCard";
import { AppContext } from "../context/AppContext";

function AllBlogs() {
  const { backendUrl, api } = useContext(AppContext); 
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api("/api/v1/blog/fetchAllBlog", { method: "GET" });
        setBlogs(res.data.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [backendUrl, api]);

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">All Blogs</h1>
      <div className="flex flex-col gap-8 lg:gap-12">
        {blogs.length > 0 ? (
          blogs.map((items, i) => (
            <div
              key={i}
              className="flex flex-col lg:flex-row gap-2 lg:gap-4"
            >
              <BlogCard items={items} />
            </div>
          ))
        ) : (
          <p>No blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default AllBlogs;
