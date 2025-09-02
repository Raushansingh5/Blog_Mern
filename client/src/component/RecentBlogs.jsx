import React, { useContext, useEffect, useState } from "react";
import BlogCard from "../component/BlogCard";
import { AppContext } from "../context/AppContext";

function RecentBlogs() {
  const { api } = useContext(AppContext);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api("/api/v1/blog/fetchAllBlog", { method: "GET" });
        setBlogs(res.data.blogs || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [api]);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Recent Blogs</h1>
      <div className="flex flex-col gap-8 lg:gap-4">
        {blogs.map((blog) => (
          <div key={blog._id} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <BlogCard items={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecentBlogs;
