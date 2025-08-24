import React, { use } from "react";
import useRole from "../../hooks/useRole";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const MyProfile = () => {
  const { user } = use(AuthContext); // Get user from context
  const [role, loading] = useRole(user?.email);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-md w-full bg-gradient-to-br from-green-500 to-green-600/50 shadow-lg p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">My Profile</h2>

        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/8j6c9b6/default-user.png"}
            alt="User"
            className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-green-500"
            onError={(e) => {
              e.target.src = "https://i.ibb.co/8j6c9b6/default-user.png";
            }}
          />
          <p className="text-white dark:text-black text-lg font-semibold">
            Name: {user?.displayName || "N/A"}
          </p>
          <p className="text-white dark:text-black font-semibold">
            Email: {user?.email}
          </p>
          <p className=" text-white dark:text-black font-bold capitalize">
            Role: {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
