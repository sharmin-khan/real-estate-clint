import React, { use } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../component/LoadingSpinner/LoadingSpinner";


const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();
  if (loading) {
    return <div className="text-center mt-10"><LoadingSpinner /></div>;
  }
  if (!user) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }
  return children;
};

export default PrivateRoute;