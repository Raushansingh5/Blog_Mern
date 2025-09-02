import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function CategoriesTile() {
  const { api } = useContext(AppContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api("/api/v1/category/getCategory", { method: "GET" });
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [api]);

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="mb-4 py-4">
      <h1 className="text-xl font-semibold mb-4">Categories</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/cat/${cat._id}`}
            className="px-4 py-2 text-center bg-green-200 md:text-xl font-semibold rounded hover:shadow-2xl transition-all"
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesTile;
