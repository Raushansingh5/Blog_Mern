import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";

function UserSideBar() {
  const sidebarLinks = [
    { name: "Dashboard", to: "/profile" },
    { name: "Favourites", to: "/profile/favourites" },
  ];

  const navigate = useNavigate();
  const { logout } = useContext(AppContext);

  const logoutHandler = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="w-[100%] border-r rounded-xl flex flex-col gap-4 pr-4">
      {sidebarLinks.map((items) => (
        <Link to={items.to} className="hover:font-semibold" key={items.name}>
          {items.name}
        </Link>
      ))}
      <button
        className="bg-zinc-900 text-white rounded w-[100%] py-2 hover:bg-zinc-700 transition-all duration-300"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}

export default UserSideBar;
