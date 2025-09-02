import React from "react";
import { Link } from "react-router-dom";

function BlogCard({ items }) {
  return (
    <>
      <div className="w-full lg:w-4/6">
        <img src={items.image} alt="" className="rounded object-cover h-[300px]" />
      </div>
      <div className="w-full lg:w-4/6">
        <h1 className=" text-2xl font-semibold">{items.title}</h1>
        {items.description && <p className="mb-4">{items.description.slice(0,100)}....</p>}
        <Link  to={`/description/${items._id}`} className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition-all duration-300">
          Read Blog
        </Link>
      </div>
    </>
  );
};

export default BlogCard;
