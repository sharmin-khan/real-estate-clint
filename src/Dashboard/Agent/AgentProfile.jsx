import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useRole from "../../hooks/useRole";

const AgentProfile = () => {
  const { user } = use(AuthContext);
  const [role, loading] = useRole(user?.email);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-4">
      <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL || "https://i.ibb.co/8j6c9b6/default-user.png"}
          alt="Agent"
          className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-500"
          onError={(e) => {
            e.target.src = "https://i.ibb.co/8j6c9b6/default-user.png";
          }}
        />
        <p className="text-lg font-semibold">Name: {user?.displayName || user?.name || "N/A"}</p>
        <p className="text-gray-600">Email: {user?.email}</p>
        <p className="text-green-600 capitalize">Role: {role}</p>
      </div>
    </div>
  );
};

export default AgentProfile;