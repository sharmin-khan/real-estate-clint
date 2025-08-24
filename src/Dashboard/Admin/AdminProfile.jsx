import React, { use } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useRole from "../../hooks/useRole";

const AdminProfile = () => {
  const { user } = use(AuthContext);
  const [role, loading] = useRole(user?.email);

  console.log("User object:", user);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  return (
  <div className="flex justify-center items-center min-h-screen transition-colors duration-300">
  <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg p-6 rounded-2xl">
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
      Agent Profile
    </h2>

    <div className="flex flex-col items-center">
      <img
        src={user?.photoURL || "https://i.ibb.co/8j6c9b6/default-user.png"}
        alt="Agent"
        className="w-28 h-28 rounded-full object-cover mb-4 border-4 border-green-500 shadow-md"
        onError={(e) => {
          e.target.src = "https://i.ibb.co/8j6c9b6/default-user.png";
        }}
      />
      <p className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
        Name: {user?.displayName || user?.name || "N/A"}
      </p>
      <p className="text-gray-600 dark:text-gray-300 mb-1">
        Email: {user?.email}
      </p>
      <p className="text-green-600 dark:text-green-400 font-bold capitalize">
        Role: {role}
      </p>
    </div>
  </div>
</div>

  );
};

export default AdminProfile;