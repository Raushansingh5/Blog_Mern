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
        <div className="flex flex-col">
          <div className="flex items-center gap-12">
            <div>
              <div className="size-[20vh] border rounded-full">
                <label
                  className="w-[100%] h-[100%] flex items-center justify-center"
                  htmlFor="img-file"
                >
                  {ChangeAvatar ? (
                    <img
                      src={URL.createObjectURL(ChangeAvatar)}
                      alt=""
                      className="size-[100%] object-cover rounded-full"
                    />
                  ) : UserData.avatar ? (
                    <img
                      src={UserData.avatar}
                      alt=""
                      className="size-[100%] object-cover rounded-full"
                    />
                  ) : (
                    <FaUser className="size-[12vh] text-zinc-800" />
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
                  className="bg-blue-700 text-white text-center px-4 py-2 rounded hover:bg-blue-900 transition-all duration-300"
                  onClick={updateAvatar}
                  type="button"
                >
                  Change Avatar
                </button>
              </div>
            </div>
            <div>
              <p className="text-zinc-700">{UserData.email}</p>
              <h2 className="text-4xl mt-2 font-semibold">{UserData.username}</h2>
            </div>
          </div>
          <hr className="my-8 " />
          <div>
            <h1 className="text-2xl font-semibold">Change Account's Password</h1>
            <form className="my-4" onSubmit={handlePasswordChange}>
              <div className="flex flex-col">
                <label>Current Password</label>
                <input
                  type="password"
                  name="password"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={password.password}
                  onChange={changePas}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label>New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={password.newPassword}
                  onChange={changePas}
                />
              </div>
              <div className="flex flex-col mt-4">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="mt-2 outline-none border px-3 py-2 rounded border-zinc-400"
                  required
                  value={password.confirmPassword}
                  onChange={changePas}
                />
              </div>
              <div className="mt-4">
                <button className="bg-blue-700 text-white text-center px-4 py-2 rounded hover:bg-blue-900 transition-all duration-300">
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
