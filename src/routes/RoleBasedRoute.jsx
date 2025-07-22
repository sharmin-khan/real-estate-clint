import React, { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import useRole from "../hooks/useRole";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  const [role] = useRole(user?.email); // fetch role by email

  if (loading || (user && !role)) return <p>Loading...</p>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;
