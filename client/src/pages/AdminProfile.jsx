import React, { useState } from "react";
import Sidebar from "../component/AdminSidebar";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";

function AdminProfile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      
      <div className="hidden lg:block w-1/6 fixed h-screen border-r bg-white">
        <Sidebar />
      </div>

     
      <div
        className={`fixed top-0 left-0 h-full w-2/3 sm:w-1/2 bg-white border-r shadow-lg transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <Sidebar />
      </div>

     
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      
      <div className="flex-1 lg:ml-[16.6%] bg-zinc-200 min-h-screen">
       
        <div className="p-4 bg-white shadow-md flex items-center lg:hidden">
          <button onClick={() => setOpen(true)} className="text-2xl">
            <FaBars />
          </button>
          <h1 className="ml-4 text-lg font-semibold">Admin Dashboard</h1>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminProfile;
