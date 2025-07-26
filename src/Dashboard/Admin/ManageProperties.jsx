import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";

const fetchProperties = async () => {
  const res = await axios.get("http://localhost:3000/properties");
  return res.data;
};

const ManageProperties = () => {
  const queryClient = useQueryClient();
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });

  const verifyMutation = useMutation({
    mutationFn: (id) => axios.patch(`http://localhost:3000/properties/${id}/verify`),
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
      Swal.fire("Success", "Property verified!", "success");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (id) => axios.patch(`http://localhost:3000/properties/${id}/reject`),
    onSuccess: () => {
      queryClient.invalidateQueries(["properties"]);
      Swal.fire("Success", "Property rejected!", "success");
    },
  });

  if (isLoading) return <p className="text-center my-10">Loading...</p>;

  return (
    <div className="w-full max-w-full px-2 md:px-6 lg:px-12 mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center md:text-left">Manage Properties</h2>

      {/* Table view for md and up */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-[700px] w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2">Title</th>
              <th className="py-2 px-2">Location</th>
              <th className="py-2 px-2">Agent Name</th>
              <th className="py-2 px-2">Agent Email</th>
              <th className="py-2 px-2">Price Range</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property._id} className="border-b border-gray-400 last:border-0">
                <td className="py-2 px-2 whitespace-nowrap">{property.title}</td>
                <td className="py-2 px-2 whitespace-nowrap">{property.location}</td>
                <td className="py-2 px-2 whitespace-nowrap">{property.agentName}</td>
                <td className="py-2 px-2 whitespace-nowrap">{property.agentEmail}</td>
                <td className="py-2 px-2 whitespace-nowrap">
                  {property.priceMin} - {property.priceMax} BDT
                </td>
                <td className="py-2 px-2 whitespace-nowrap">
                  <span
                    className={
                      property.verificationStatus === "verified"
                        ? "text-green-600"
                        : property.verificationStatus === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {property.verificationStatus}
                  </span>
                </td>
                <td className="py-2 px-2 whitespace-nowrap">
                  {property.verificationStatus === "pending" && (
                    <div className="flex flex-col md:flex-row gap-2">
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => verifyMutation.mutate(property._id)}
                      >
                        Verify
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => rejectMutation.mutate(property._id)}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {property.verificationStatus === "verified" && (
                    <span className="text-green-600 font-semibold">Verified</span>
                  )}
                  {property.verificationStatus === "rejected" && (
                    <span className="text-red-600 font-semibold">Rejected</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="lg:hidden space-y-4">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border rounded p-4 shadow bg-white"
          >
            <h3 className="font-bold text-lg mb-2">{property.title}</h3>
            <p><strong>Location:</strong> {property.location}</p>
            <p><strong>Agent:</strong> {property.agentName}</p>
            <p><strong>Email:</strong> {property.agentEmail}</p>
            <p><strong>Price:</strong> {property.priceMin} - {property.priceMax} BDT</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={
                  property.verificationStatus === "verified"
                    ? "text-green-600"
                    : property.verificationStatus === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {property.verificationStatus}
              </span>
            </p>
            <div className="flex flex-col gap-2 mt-3">
              {property.verificationStatus === "pending" && (
                <>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => verifyMutation.mutate(property._id)}
                  >
                    Verify
                  </button>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => rejectMutation.mutate(property._id)}
                  >
                    Reject
                  </button>
                </>
              )}
              {property.verificationStatus === "verified" && (
                <span className="text-green-600 font-semibold">Verified</span>
              )}
              {property.verificationStatus === "rejected" && (
                <span className="text-red-600 font-semibold">Rejected</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProperties;
