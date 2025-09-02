import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ items }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full lg:w-4/6 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      
      <div className="w-full lg:w-1/2">
        <img
          src={items.image}
          alt={items.title}
          className="w-full h-64 lg:h-full object-contain lg:object-cover"
        />
      </div>

      
      <div className="flex flex-col justify-center m-0 p-4 w-full lg:w-1/2">
        <h1 className="text-2xl font-semibold mb-2">{items.title}</h1>
        {items.description && (
          <p className="mb-4 text-gray-700">
            {items.description.slice(0, 100)}...
          </p>
        )}
        <Link
          to={`/description/${items._id}`}
          className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition-all duration-300 w-fit"
        >
          Read Blog
        </Link>
      </div>
    </div>
  );
}

export default BlogCard;
