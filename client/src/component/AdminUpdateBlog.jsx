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
  const [preview, setPreview] = useState(null);

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
        setPreview(res.data.blog?.image || null);
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
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data?.message || "Blog updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update blog");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Update Blog
        </h1>

        <form className="flex flex-col gap-5" onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Blog Title"
            className="p-3 sm:p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            name="title"
            value={data.title}
            onChange={changeHandler}
          />

          <textarea
            placeholder="Blog Description"
            className="p-3 sm:p-4 text-lg border border-gray-300 rounded-lg h-40 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            name="description"
            value={data.description}
            onChange={changeHandler}
          />

          <div className="flex flex-col gap-3">
            <input
              type="file"
              accept=".jpeg, .jpg, .png"
              className="w-fit bg-gray-100 border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer"
              onChange={(e) => {
                setImage(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />

            {preview && (
              <div className="w-full h-48 rounded-lg overflow-hidden border">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg px-6 py-3 shadow-md transition duration-200"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminUpdateBlog;
