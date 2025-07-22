import React, { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <p>loading...</p>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return children;
};

export default PrivateRoute;