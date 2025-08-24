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
  <div className="max-w-6xl mx-auto p-4">
  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100 text-center ">
    My Sold Properties
  </h2>

  <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
    <table className="min-w-[700px] w-full text-sm md:text-base table-auto border-collapse">
      <thead className="bg-gray-100 dark:bg-green-800 text-gray-900 dark:text-gray-100">
        <tr>
          <th className="py-3 px-4 text-left uppercase tracking-wider">Title</th>
          <th className="py-3 px-4 text-left uppercase tracking-wider">Location</th>
          <th className="py-3 px-4 text-left uppercase tracking-wider">Buyer Email</th>
          <th className="py-3 px-4 text-left uppercase tracking-wider">Buyer Name</th>
          <th className="py-3 px-4 text-left uppercase tracking-wider">Sold Price</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        {sold.map((item, idx) => (
          <tr
            key={item._id}
            className={`border-b border-gray-200 dark:border-gray-700 hover:bg-green-50 dark:hover:bg-gray-700 transition-colors ${
              idx % 2 === 0 ? "bg-gray-50 dark:bg-gray-800" : ""
            }`}
          >
            <td className="py-3 px-4">{item.propertyTitle}</td>
            <td className="py-3 px-4">{item.propertyLocation}</td>
            <td className="py-3 px-4">{item.buyerEmail}</td>
            <td className="py-3 px-4">{item.buyerName}</td>
            <td className="py-3 px-4 font-semibold text-green-600 dark:text-green-400">
              {item.offerAmount || item.soldPrice}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default MySoldProperties;