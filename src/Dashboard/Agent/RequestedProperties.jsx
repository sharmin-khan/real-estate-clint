import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const RequestedProperties = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure(); 

  const { data: offers = [], isLoading, refetch } = useQuery({
    queryKey: ["offers", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers/agent/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleUpdateStatus = async (id, status) => {
    try {
      await axiosSecure.patch(`/offers/status/${id}`, { status });
      refetch();
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  if (isLoading) return <div className="text-center my-10"><LoadingSpinner /></div>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Requested / Offered Properties</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-[800px] w-full text-sm md:text-base">
          <thead className="bg-gray-100 font-semibold text-gray-700">
            <tr>
              <th className="py-2 px-2">Title</th>
              <th className="py-2 px-2">Location</th>
              <th className="py-2 px-2">Buyer Name</th>
              <th className="py-2 px-2">Buyer Email</th>
              <th className="py-2 px-2">Offer Price</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr key={offer._id} className="border-b border-gray-300 last:border-0">
                <td className="py-2 px-2">{offer.propertyTitle}</td>
                <td className="py-2 px-2">{offer.propertyLocation}</td>
                <td className="py-2 px-2">{offer.buyerName}</td>
                <td className="py-2 px-2">{offer.buyerEmail}</td>
                <td className="py-2 px-2">{offer.offerAmount}BDT</td>
                <td className="py-2 px-2 capitalize">{offer.status}</td>
                <td className="py-2 px-2 space-x-2">
                  {offer.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(offer._id, "accepted")}
                        className="bg-green-500 text-white px-2 py-1 rounded cursor-pointer"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(offer._id, "rejected")}
                        className="bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
                      >
                        Reject
                      </button>
                    </>
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

export default RequestedProperties;
