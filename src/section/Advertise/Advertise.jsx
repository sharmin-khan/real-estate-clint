import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import { FaMoneyBillWave, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaUser } from "react-icons/fa";

const Advertise = () => {
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["advertisedProperties"],
    queryFn: async () => {
      const res = await fetch(
        "https://reak-estate-server.vercel.app/properties?verified=true"
      );
      return res.json();
    },
  });

  if (isLoading)
    return (
      <div className="text-center my-10">
        <LoadingSpinner />
      </div>
    );

  const latestProperties = properties
    .filter((property) => property.verificationStatus === "verified")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <section className="my-12">
      <div className="mb-6 px-4 sm:px-0">
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <h2 className="text-2xl lg:text-3xl font-bold text-center md:text-left">
            Latest Verified Properties
          </h2>
          <span className="bg-yellow-400 text-white w-24 text-xs font-bold px-2 py-1 rounded-full inline-flex justify-center md:justify-center">
            Featured
          </span>
        </div>
        <p className="text-center md:text-left text-gray-600 mt-2 max-w-xl mx-auto md:mx-0">
          Explore the most recent verified properties added to our platform.
          These properties are carefully selected to ensure quality and trust.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {latestProperties.map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            <img
              src={property.image}
              alt={property.title || property.location}
              className="w-full h-32 lg:h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{property.title || property.location}</h3>

              {/* Location */}
              <p className="text-gray-600 flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-500" />
                {property.location}
              </p>

              {/* Price */}
              <p className="text-gray-600 flex items-center gap-1">
                <FaMoneyBillWave className="text-yellow-700" />
                {property.priceMin} - {property.priceMax} BDT
              </p>

              {/* Verified Status */}
              <p className={`text-sm font-medium flex items-center gap-1 ${
                  property.verificationStatus === "verified" ? "text-green-600" : "text-red-500"
                }`}>
                {property.verificationStatus === "verified" ? <FaCheckCircle /> : <FaTimesCircle />}
                {property.verificationStatus === "verified" ? "Verified Property" : "Not Verified"}
              </p>


              <Link to={`/property-details/${property._id}`}>
                <button className="mt-2 border border-green-500 text-green-500 px-2 py-1 hover:bg-green-500 hover:text-white rounded bg-white w-full cursor-pointer">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Advertise;
