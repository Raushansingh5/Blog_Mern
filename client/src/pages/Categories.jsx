import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogCard from "../component/BlogCard";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

function Categories() {
  const { id } = useParams();
  const { backendUrl, api } = useContext(AppContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await api(`/api/v1/category/getDataByCategory/${id}`);
        setData(res.data.data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load category data");
      }
    };

    fetchCategoryData();
  }, [id, api, backendUrl]);

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">All Blogs</h1>
      <div className="flex flex-col gap-8 lg:gap-4">
        {data.length > 0 ? (
          data.map((items, i) => (
            <div key={i} className="flex flex-col lg:flex-row gap-2 lg:gap-4">
              <BlogCard items={items} />
            </div>
          ))
        ) : (
          <p>No blogs found for this category.</p>
        )}
      </div>
    </div>
  );
}

export default Categories;
