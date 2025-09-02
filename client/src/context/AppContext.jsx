import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); 
  const [user, setUser] = useState(null);   
  const [role, setRole] = useState(null);   

  
  const api = async (path, options = {}) => {
    try {
      return await axios({
        url: backendUrl + path,
        withCredentials: true,
        ...options,
      });
    } catch (err) {
      if (err.response?.status === 401) {
        setIsAuthenticated(false);
        setUser(null);
        setRole(null);
        toast.error("Session expired. Please log in again.");
      }
      throw err;
    }
  };

 
  const fetchUserProfile = async () => {
    try {
      const res = await api("/api/v1/user/getProfileData");
      setUser(res.data.user);
      setRole(res.data.user.role);
      setIsAuthenticated(true);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
    }
  };

  
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          backendUrl + "/api/v1/user/checkCookie",
          { withCredentials: true }
        );
        if (res.data.isAuthenticated) {
          await fetchUserProfile();
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    })();
  }, [backendUrl]);

  
  const logout = async () => {
    try {
      await api("/api/v1/user/logout", { method: "POST" });
      setIsAuthenticated(false);
      setUser(null);
      setRole(null);
      toast.success("Logged out successfully");
    } catch {
      toast.error("Logout failed");
    }
  };

  const value = {
    backendUrl,
    isAuthenticated,
    loading,
    user,
    role,
    setIsAuthenticated,
    setUser,
    setRole,
    fetchUserProfile,
    logout,
    api,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider;
