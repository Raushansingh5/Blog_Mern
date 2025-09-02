import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext"; 

function Sidebar() {
  const links = [
    { to: "/admin-dashboard", label: "Dashboard" },
    { to: "/admin-dashboard/add-blogs", label: "Add Blogs" },
    { to: "/admin-dashboard/edit-blogs", label: "Edit Blogs" },
  ];

  const navigate = useNavigate();
  const { logout } = useContext(AppContext); 

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold">Admin Page</h1>
      <hr className="my-4" />
      <div className="flex flex-col gap-4">
        {links.map((item, i) => (
          <Link
            to={item.to}
            key={i}
            className="text-xl hover:scale-105 transition-all duration-300"
          >
            {item.label}
          </Link>
        ))}
      </div>
      <button
        className="mt-5 bg-zinc-900 text-white rounded w-full py-2 hover:bg-zinc-700 transition-all duration-300"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
