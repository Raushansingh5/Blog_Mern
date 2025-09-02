import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext.jsx";

function AuthPage() {
  const { backendUrl, setIsAuthenticated, setUser, setRole, fetchUserProfile } =
    useContext(AppContext);

  const [mode, setMode] = useState("login"); 
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    adminSecret: "",
    role: "user",
  });

  const navigate = useNavigate();

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        const res = await fetch(
          `${backendUrl}/api/v1/user/signup`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: form.username,
              email: form.email,
              password: form.password,
              adminSecret: form.adminSecret,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Signup failed");

        toast.success(data.message);
        
        setMode("login"); 
         navigate("/auth");
        setForm({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          adminSecret: "",
          role: "user",
        });
      } else {
        const res = await fetch(
          `${backendUrl}/api/v1/user/login`,
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: form.email,
              password: form.password,
              role: form.role,
            }),
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        
        await fetchUserProfile();
        setIsAuthenticated(true);
        setRole(form.role);

        toast.success(data.message);

        if (form.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/profile");
        }
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-10 shadow-lg rounded-lg w-[400px]">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "login" ? "Login" : "Sign Up"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {mode === "signup" && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border px-3 py-2 rounded"
            required
          />

          {mode === "signup" && (
            <>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={form.confirmPassword}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
                required
              />

              <input
                type="text"
                name="adminSecret"
                placeholder="Admin Secret (optional)"
                value={form.adminSecret}
                onChange={handleChange}
                className="border px-3 py-2 rounded"
              />
            </>
          )}

          {mode === "login" && (
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="border px-3 py-2 rounded"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          )}

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">
            {mode === "login" ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setMode("signup")}
              >
                Sign Up
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setMode("login")}
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default AuthPage;
