import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

function AdminUpdateBlog() {
  const { id } = useParams();
  const { api } = useContext(AppContext);

  const [data, setData] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState(null);


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api(`/api/v1/blog/getCurrentBlog/${id}`, {
          method: "GET",
        });
        setData({
          title: res.data.blog?.title || "",
          description: res.data.blog?.description || "",
        });
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to fetch blog");
      }
    };
    fetchBlog();
  }, [id, api]);

  
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();
      form.append("title", data.title);
      form.append("description", data.description);
      if (image) form.append("image", image);

      const res = await api(`/api/v1/admin/editBlog/${id}`, {
        method: "PUT",
        data: form,
      });

      toast.success(res.data?.message || "Blog updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl font-semibold">Update Blog</h1>

      <form className="my-4 flex flex-col gap-4" onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          className="border-none outline-none p-4 bg-transparent text-3xl border-b border-zinc-400 font-semibold w-full"
          name="title"
          value={data.title}
          onChange={changeHandler}
        />
        <textarea
          placeholder="Description"
          className="border-none outline-none p-4 bg-transparent text-xl border-b border-zinc-400 font-semibold w-full"
          name="description"
          value={data.description}
          onChange={changeHandler}
        />
        <div>
          <input
            type="file"
            accept=".jpeg, .jpg, .png"
            className="bg-zinc-800 rounded text-white"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <button
            type="submit"
            className="bg-blue-600 text-xl text-white rounded px-4 py-2 shadow-xl hover:bg-blue-700 transition-all duration-300"
          >
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminUpdateBlog;
