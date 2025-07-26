import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const MySoldProperties = () => {
  const { user } = useContext(AuthContext);

  const { data: sold = [], isLoading } = useQuery({
    queryKey: ["sold-properties", user?.email],
    queryFn: async () => {
     const res = await axios.get(`https://reak-estate-server.vercel.app/sold-properties?email=${user?.email}`);

      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center my-10"><LoadingSpinner/></div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Sold Properties</h2>
      <div className="overflow-x-auto rounded shadow">
        <table className="min-w-[700px] w-full text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2">Title</th>
              <th className="py-2 px-2">Location</th>
              <th className="py-2 px-2">Buyer Email</th>
              <th className="py-2 px-2">Buyer Name</th>
              <th className="py-2 px-2">Sold Price</th>
            </tr>
          </thead>
          <tbody>
            {sold.map((item) => (
              <tr key={item._id} className="border-b border-gray-300 last:border-0">
                <td className="py-2 px-2">{item.propertyTitle}</td>
                <td className="py-2 px-2">{item.propertyLocation}</td>
                <td className="py-2 px-2">{item.buyerEmail}</td>
                <td className="py-2 px-2">{item.buyerName}</td>
                <td className="py-2 px-2">{item.offerAmount || item.soldPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySoldProperties;