import React from "react";
import Sidebar from "../component/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminProfile() {
  return (
    <div className="flex">
      <div className="w-1/6"></div>
      <div className="w-1/6 fixed h-screen border-r">
        <Sidebar />
      </div>
      <div className="w-5/6 bg-zinc-200 ">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminProfile;
