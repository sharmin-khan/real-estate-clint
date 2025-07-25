import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users
  useEffect(() => {
    axios.get("http://localhost:3000/users").then(res => {
      setUsers(res.data);
      setLoading(false);
    });
  }, []);

  const handleMakeAdmin = async (id) => {
    await axios.patch(`http://localhost:3000/users/${id}/role`, { role: "admin" });
    setUsers(prev => prev.map(u => u._id === id ? { ...u, role: "admin" } : u));
  };
  const handleMakeAgent = async (id) => {
    await axios.patch(`http://localhost:3000/users/${id}/role`, { role: "agent" });
    setUsers(prev => prev.map(u => u._id === id ? { ...u, role: "agent" } : u));
  };
  const handleMarkFraud = async (id) => {
    await axios.patch(`http://localhost:3000/users/${id}/fraud`);
    setUsers(prev => prev.map(u => u._id === id ? { ...u, status: "fraud" } : u));
  };
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/users/${id}`);
    setUsers(prev => prev.filter(u => u._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-6 lg:px-12">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Manage Users</h2>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-[700px] w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2">Name</th>
              <th className="py-2 px-2">Email</th>
              <th className="py-2 px-2">Role</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Action</th>
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
                    <div className="flex flex-col md:flex-row gap-2">
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
    </div>
  );
};

export default ManageUsers;