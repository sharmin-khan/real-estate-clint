import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const MyAddedProperties = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editProperty, setEditProperty] = useState(null);
  const navigate = useNavigate();

  // Fetch agent's properties
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["my-properties", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://reak-estate-server.vercel.app/properties?agentEmail=${user?.email}`
        // `http://localhost:3000/properties?agentEmail=${user?.email}`
        
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Delete property mutation
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`https://reak-estate-server.vercel.app/properties/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-properties", user?.email]);
      Swal.fire("Deleted!", "Property deleted.", "success");
    },
  });

  // Update property mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) =>
      axios.patch(
        `https://reak-estate-server.vercel.app/properties/${id}`,
        data
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["my-properties", user?.email]);
      setEditProperty(null);
      Swal.fire("Updated!", "Property updated.", "success");
    },
  });

  if (isLoading)
    return (
      <div className="text-center my-10">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Added Properties</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-600">{property.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <img
                src={
                  property.agentImage ||
                  "https://i.ibb.co/8j6c9b6/default-user.png"
                }
                alt="Agent"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-sm">{property.agentName}</span>
            </div>
            <p className="mt-1">
              <span className="font-semibold">Price:</span> {property.priceMin}{" "}
              - {property.priceMax} BDT
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
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
            <div className="flex gap-2 mt-3">
              {property.verificationStatus !== "rejected" && (
                <button
                  className="btn btn-xs btn-info"
                  onClick={() =>
                    navigate(`/dashboard/update-property/${property._id}`)
                  }
                >
                  Update
                </button>
              )}
              <button
                className="btn btn-xs btn-error"
                onClick={() =>
                  Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: "Yes, delete it!",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      deleteMutation.mutate(property._id);
                    }
                  })
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {editProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">Update Property</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const updated = {
                  title: form.title.value,
                  location: form.location.value,
                  priceMin: Number(form.priceMin.value),
                  priceMax: Number(form.priceMax.value),
                  // image update, agent info readonly
                };
                updateMutation.mutate({ id: editProperty._id, data: updated });
              }}
              className="space-y-2"
            >
              <input
                type="text"
                name="title"
                defaultValue={editProperty.title}
                className="input input-bordered w-full"
              />
              <input
                type="text"
                name="location"
                defaultValue={editProperty.location}
                className="input input-bordered w-full"
              />
              <div className="flex gap-2">
                <input
                  type="number"
                  name="priceMin"
                  defaultValue={editProperty.priceMin}
                  className="input input-bordered w-full"
                />
                <input
                  type="number"
                  name="priceMax"
                  defaultValue={editProperty.priceMax}
                  className="input input-bordered w-full"
                />
              </div>
              <input
                type="text"
                value={editProperty.agentName}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <input
                type="email"
                value={editProperty.agentEmail}
                readOnly
                className="input input-bordered w-full bg-gray-100"
              />
              <div className="flex gap-2 mt-2">
                <button type="submit" className="btn btn-success btn-sm">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  onClick={() => setEditProperty(null)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAddedProperties;
