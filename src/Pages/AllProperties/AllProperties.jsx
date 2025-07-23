import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import axios from "axios";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const AllProperties = () => {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/properties");
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10"><LoadingSpinner /></div>;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">All Properties</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property._id}
            className="border rounded-lg shadow-md p-4 bg-white space-y-2"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-40 object-cover rounded-md"
            />

            <h3 className="text-xl font-semibold">{property.title}</h3>
            <p className="text-gray-600">📍 {property.location}</p>

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
              {property.verificationStatus ? (
                <span className="text-green-600 font-semibold">Verified</span>
              ) : (
                <span className="text-red-500 font-semibold">Not Verified</span>
              )}
            </p>

            <p className="text-sm">
              <strong>Price:</strong> {property.priceMin}  - 
              {property.priceMax} BDT
            </p>

            <Link to={`/property-details/${property._id}`}>
              <button className="w-full mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600">
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
