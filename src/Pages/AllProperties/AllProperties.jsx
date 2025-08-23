import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import { useEffect } from "react";

const AllProperties = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axios.get(
        "https://reak-estate-server.vercel.app/properties"
      );
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="text-center mt-10">
        <LoadingSpinner />
      </div>
    );

  const verifiedProperties = properties.filter(
    (property) => property.verificationStatus === "verified"
  );

  return (
    <div className="my-12">
      <h2 className="text-3xl font-bold  text-center">All Properties</h2>
      <p className="text-center mb-10 mt-3 max-w-2xl mx-auto">
        Browse through all available properties including houses, apartments,
        and commercial spaces. Find the perfect place that matches your needs
        and budget.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {verifiedProperties.map((property) => (
          <div
            key={property._id}
            className="border border-gray-300 dark:border-gray-600 rounded-lg shadow-md p-4 bg-white dark:bg-gray-900/70 space-y-2"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-40 object-cover rounded-md"
            />

            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-green-500">📍 {property.location}</p>

            <div className="flex items-center gap-3 mt-2">
              <img
                src={property.agentImage}
                alt={property.agentName}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">{property.agentName}</span>
            </div>

            <p className="text-sm">
              <strong>Status:</strong>{" "}
              {property.verificationStatus === "verified" && (
                <span className="text-green-600 font-semibold">Verified</span>
              )}
              {property.verificationStatus === "pending" && (
                <span className="text-yellow-500 font-semibold">Pending</span>
              )}
              {property.verificationStatus === "rejected" && (
                <span className="text-red-500 font-semibold">Rejected</span>
              )}
            </p>

            <p className="text-sm">
              <strong>Price:</strong> {property.priceMin} - {property.priceMax}{" "}
              BDT
            </p>

            <Link to={`/property-details/${property._id}`}>
              <button className="w-full mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProperties;
