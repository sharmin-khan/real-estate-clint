import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import useRole from "../hooks/useRole";

import AdminProfile from "./Admin/AdminProfile";
import AgentProfile from "./Agent/AgentProfile";
import MyProfile from "./user/MyProfile";

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [role] = useRole(user?.email);

  if (loading || (user && !role)) {
    return <p>Loading Profile...</p>;
  }

  if (role === "admin") {
    return <AdminProfile />;
  }

  if (role === "agent") {
    return <AgentProfile />;
  }

  if (role === "user") {
    return <MyProfile />;
  }

  return null; 
};

export default Profile; 