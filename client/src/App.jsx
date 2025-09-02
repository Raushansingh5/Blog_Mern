import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "./context/AppContext";
import MainLayout from "./layout/MainLayout";
import OtherLayout from "./layout/OtherLayout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import AllBlogs from "./pages/AllBlogs";
import Description from "./pages/Description";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import UserDashboard from "./component/UserDashboard";
import Favourites from "./component/UserFavouriteBlogs.jsx";
import AdminProfile from "./pages/AdminProfile.jsx";
import AdminDashboard from "./component/AdminDashboard.jsx";
import AddBlogs from "./component/AdminAddBlog.jsx";
import EditBlogs from "./component/AdminEditBlog.jsx";
import UpdateBlog from "./component/AdminUpdateBlog.jsx";
import ProtectedRoute from "./component/ProtectedRoutes.jsx";

const App = () => {
  const { loading } = useContext(AppContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Checking session...
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
       
        <Route path="/" element={<MainLayout />}>
         
          <Route index element={<Home />} />
          <Route path="all-blogs" element={<AllBlogs />} />
          <Route path="description/:id" element={<Description />} />
          <Route path="cat/:id" element={<Categories />} />

          
          <Route
            path="profile"
            element={
              <ProtectedRoute requiredRole="user">
                <Profile />
              </ProtectedRoute>
            }
          >
            <Route index element={<UserDashboard />} />
            <Route path="favourites" element={<Favourites />} />
          </Route>
        </Route>

        <Route element={<OtherLayout />}>
         
          <Route path="/auth" element={<AuthPage />} />

         
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminProfile />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="add-blogs" element={<AddBlogs />} />
            <Route path="edit-blogs" element={<EditBlogs />} />
            <Route path="update-blog/:id" element={<UpdateBlog />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
