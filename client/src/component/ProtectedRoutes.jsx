import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";


const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, loading, user } = useContext(AppContext);


  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  
  if (requiredRole && user?.role !== requiredRole) {
    
    return user?.role === "admin" ? (
      <Navigate to="/admin-dashboard" replace />
    ) : (
      <Navigate to="/" replace />
    );
  }

  return children;
};

export default ProtectedRoute;
