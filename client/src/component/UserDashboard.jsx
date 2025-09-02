import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaUser } from "react-icons/fa6";
import { toast } from "react-toastify";

function UserDashboard() {
  const { api, user, fetchUserProfile } = useContext(AppContext);
  const [ChangeAvatar, SetChangeAvater] = useState(null);
  const [UserData, SetUserData] = useState(user);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api("/api/v1/user/getProfileData");
        SetUserData(res.data.user);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch profile");
      }
    };
    fetch();
  }, [api]);

  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changePas = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const res = await api("/api/v1/user/changePassword", {
        method: "PATCH",
        data: password,
      });
      toast.success(res.data.message || "Password changed successfully");
      setPassword({ password: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      toast.error(error.response?.data?.message || "Error changing password");
    }
  };

  const updateAvatar = async () => {
    try {
      if (!ChangeAvatar) {
        toast.error("Please select an image first.");
        return;
      }
      const formData = new FormData();
      formData.append("image", ChangeAvatar);

      const res = await api("/api/v1/user/changeAvatar", {
        method: "PUT",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(res.data.message || "Avatar changed successfully");
      SetChangeAvater(null);
      await fetchUserProfile();
      SetUserData((prev) => ({ ...prev, avatar: res.data.avatar }));
    } catch (error) {
      toast.error(error.response?.data?.error || "Avatar upload failed");
    }
  };

  return (
    <>
      {UserData && (
        <div className="flex flex-col px-4 sm:px-6 md:px-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12">
            <div className="flex flex-col items-center md:items-start">
              <div className="size-32 md:size-[20vh] border rounded-full overflow-hidden">
                <label
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                  htmlFor="img-file"
                >
                  {ChangeAvatar ? (
                    <img
                      src={URL.createObjectURL(ChangeAvatar)}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : UserData.avatar ? (
                    <img
                      src={UserData.avatar}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FaUser className="text-5xl md:text-[12vh] text-zinc-800" />
                  )}
                </label>
              </div>
              <div className="mt-4">
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="img-file"
                  className="hidden"
                  onChange={(e) => SetChangeAvater(e.target.files[0])}
                />
                <button
                  className="bg-blue-700 text-white px-4 py-2 text-sm md:text-base rounded hover:bg-blue-900 transition-all duration-300"
                  onClick={updateAvatar}
                  type="button"
                >
                  Change Avatar
                </button>
              </div>
            </div>
            <div className="text-center md:text-left">
              <p className="text-zinc-700 break-words">{UserData.email}</p>
              <h2 className="text-2xl md:text-4xl mt-2 font-semibold break-words">
                {UserData.username}
              </h2>
            </div>
          </div>
          <hr className="my-6 md:my-8" />
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              Change Account's Password
            </h1>
            <form className="my-4 space-y-4" onSubmit={handlePasswordChange}>
              <div className="flex flex-col">
                <label className="text-sm md:text-base">Current Password</label>
                <input
                  type="password"
                  name="password"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={password.password}
                  onChange={changePas}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm md:text-base">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={password.newPassword}
                  onChange={changePas}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm md:text-base">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={password.confirmPassword}
                  onChange={changePas}
                />
              </div>
              <div>
                <button className="bg-blue-700 w-full sm:w-auto text-white px-4 py-2 rounded hover:bg-blue-900 transition-all duration-300">
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDashboard;
