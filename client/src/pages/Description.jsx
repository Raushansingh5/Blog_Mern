import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { AppContext } from "../context/AppContext";

function Description() {
  const { id } = useParams();
  const { api } = useContext(AppContext);
  const [data, setData] = useState(null);
  const [favourite, setFavourite] = useState(false);

  const handleFavourite = async () => {
    try {
      const endpoint = favourite
        ? `/api/v1/blog/removeToFav/${id}`
        : `/api/v1/blog/addToFav/${id}`;
      const res = await api(endpoint, { method: "PUT" });
      toast.success(res.data.message);
      setFavourite(!favourite);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update favourite");
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api(`/api/v1/blog/getCurrentBlog/${id}`);
        setData(res.data.blog);
        if (res.data.favourite) setFavourite(true);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [id, api]);

  return (
    <div className="p-4">
      {data && (
        <>
          <div className="w-full flex items-center justify-center">
            <h1 className="text-2xl font-semibold w-5/6">{data.title}</h1>
            <div className="text-2xl w-1/6 lg:text-3xl flex justify-end">
              <button onClick={handleFavourite}>
                {favourite ? (
                  <FaHeart className="text-red-700 hover:cursor-pointer" />
                ) : (
                  <FaRegHeart className="hover:cursor-pointer" />
                )}
              </button>
            </div>
          </div>
          <div className="mt-4 w-full">
            <img
              src={data.image}
              alt="Blog"
              className="w-full h-64 md:h-[400px] object-contain md:object-cover rounded"
            />
          </div>
          <p className="mt-4">{data.description}</p>
        </>
      )}
    </div>
  );
}

export default Description;
