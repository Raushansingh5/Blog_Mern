import React, { useState } from "react";
import SideBar from "../component/UserSidebar";
import { Outlet } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";

function Profile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4 py-4 flex gap-8 relative">
     
      <div className="hidden md:block w-1/6">
        <SideBar />
      </div>

      
      <div className="w-full md:w-5/6 min-h-screen">
       
        <button
          onClick={() => setOpen(true)}
          className="md:hidden mb-4 text-3xl"
        >
          <IoReorderThreeOutline />
        </button>

        <Outlet />
      </div>

      
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute left-0 top-0 w-3/4 max-w-xs h-full bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              className="mb-4 text-xl"
            >
              X
            </button>
            <SideBar />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
