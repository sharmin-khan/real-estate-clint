import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const Advertise = () => {
  // Fetch 4 verified properties from backend
  const { data: properties = [], isLoading } = useQuery({
    queryKey: ["advertisedProperties"],
    queryFn: async () => {
      const res = await fetch("https://reak-estate-server.vercel.app/properties?verified=true");
      return res.json();
    },
  });

  if (isLoading) return <div className="text-center my-10"><LoadingSpinner /></div>;

  return (
    <section className="my-12 px-4 md:px-8 container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Advertisement</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {properties.slice(0, 4).map((property) => (
          <div
            key={property._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
          >
            <img
              src={property.image}
              alt={property.title}
              className="w-full h-32 lg:h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-semibold">{property.location}</h3>
              <p className="text-gray-600">
                {property.priceMin} - {property.priceMax} BDT
              </p>
              <p
                className={`text-sm font-medium ${
                  property.verificationStatus === "verified"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {property.verificationStatus === "verified"
                  ? "Verified Property"
                  : "Not Verified"}
              </p>
              <Link to={`/property-details/${property._id}`}>
                <button className="mt-2 border border-green-500 text-green-500 px-2 py-1 hover:bg-green-500 hover:text-white rounded bg-white ">
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
