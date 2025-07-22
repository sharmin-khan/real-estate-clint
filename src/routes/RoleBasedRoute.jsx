import React, { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";


const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } =use(AuthContext);
  const location = useLocation();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

 
  if (!allowedRoles.includes(user.role)) {
    
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;
