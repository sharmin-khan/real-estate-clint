import React, { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    axios.get("https://reak-estate-server.vercel.app/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  const handleMakeAdmin = async (id) => {
    await axios.patch(`https://reak-estate-server.vercel.app/users/${id}/role`, { role: "admin" });
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u)));
  };
  const handleMakeAgent = async (id) => {
    await axios.patch(`https://reak-estate-server.vercel.app/users/${id}/role`, { role: "agent" });
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role: "agent" } : u)));
  };
  const handleMarkFraud = async (id) => {
    await axios.patch(`https://reak-estate-server.vercel.app/users/${id}/fraud`);
    setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, status: "fraud" } : u)));
  };
  const handleDelete = async (id) => {
    await axios.delete(`https://reak-estate-server.vercel.app/users/${id}`);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-6 lg:px-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Users</h2>

      {/* Table view for md and up */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full w-full text-sm md:text-base table-auto">
          <thead className=" bg-gray-100 dark:bg-gray-900/50">
            <tr>
              <th className="py-3 px-2 text-left">Name</th>
              <th className="py-3 px-2 text-left">Email</th>
              <th className="py-3 px-2 text-left">Role</th>
              <th className="py-3 px-2 text-left">Status</th>
              <th className="py-3 px-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-400 last:border-0">
                <td className="py-2 px-2 whitespace-nowrap">{user.name}</td>
                <td className="py-2 px-2 whitespace-nowrap">{user.email}</td>
                <td className="py-2 px-2 whitespace-nowrap capitalize">{user.role}</td>
                <td className="py-2 px-2 whitespace-nowrap">
                  {user.status === "fraud" ? (
                    <span className="text-red-600 font-semibold">Fraud</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="py-2 px-2 whitespace-nowrap">
                  {user.status === "fraud" ? (
                    <span className="text-red-500 font-bold">Fraud</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {user.role !== "admin" && (
                        <button
                          className="btn btn-xs btn-success"
                          onClick={() => handleMakeAdmin(user._id)}
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role !== "agent" && (
                        <button
                          className="btn btn-xs btn-info"
                          onClick={() => handleMakeAgent(user._id)}
                        >
                          Make Agent
                        </button>
                      )}
                      {user.role === "agent" && (
                        <button
                          className="btn btn-xs btn-warning"
                          onClick={() => handleMarkFraud(user._id)}
                        >
                          Mark as Fraud
                        </button>
                      )}
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete User
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile (sm) */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="border border-gray-300 rounded p-4 shadow-sm bg-white"
          >
            <p>
              <span className="font-semibold">Name: </span>
              {user.name}
            </p>
            <p>
              <span className="font-semibold">Email: </span>
              {user.email}
            </p>
            <p>
              <span className="font-semibold">Role: </span>
              <span className="capitalize">{user.role}</span>
            </p>
            <p>
              <span className="font-semibold">Status: </span>
              {user.status === "fraud" ? (
                <span className="text-red-600 font-semibold">Fraud</span>
              ) : (
                <span className="text-green-600">Active</span>
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {user.status === "fraud" ? (
                <span className="text-red-500 font-bold">Fraud</span>
              ) : (
                <>
                  {user.role !== "admin" && (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() => handleMakeAdmin(user._id)}
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role !== "agent" && (
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleMakeAgent(user._id)}
                    >
                      Make Agent
                    </button>
                  )}
                  {user.role === "agent" && (
                    <button
                      className="btn btn-xs btn-warning"
                      onClick={() => handleMarkFraud(user._id)}
                    >
                      Mark as Fraud
                    </button>
                  )}
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete User
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
