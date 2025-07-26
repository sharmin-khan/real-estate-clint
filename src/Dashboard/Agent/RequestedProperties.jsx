import React, { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestedProperties = () => {
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: offers = [], isLoading, refetch } = useQuery({
    queryKey: ["offers", user?.email],
    
    queryFn: async () => {
      const res = await axiosSecure.get(`/offers?email=${user.email}`);
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
    <div className="max-w-6xl mx-auto px-2 md:px-4 py-4">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        Requested / Offered Properties
      </h2>

      <div className="w-full overflow-x-auto rounded shadow border border-gray-200">
        <table className="min-w-[800px] w-full text-sm md:text-base table-auto">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Buyer Name</th>
              <th className="py-3 px-4 text-left">Buyer Email</th>
              <th className="py-3 px-4 text-left">Offer Price</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer) => (
              <tr
                key={offer._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4">{offer.propertyTitle}</td>
                <td className="py-3 px-4">{offer.propertyLocation}</td>
                <td className="py-3 px-4">{offer.buyerName}</td>
                <td className="py-3 px-4">{offer.buyerEmail}</td>
                <td className="py-3 px-4">{offer.offerAmount} BDT</td>
                <td className="py-3 px-4 capitalize">{offer.status}</td>
                <td className="py-3 px-4 space-x-2">
                  {offer.status === "pending" && (
                    <>
                      <button
                        onClick={() => handleUpdateStatus(offer._id, "accepted")}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(offer._id, "rejected")}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
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
