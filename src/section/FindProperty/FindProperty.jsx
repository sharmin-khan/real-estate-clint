import { useState } from "react";
import { Link } from "react-router-dom";
import locationimg from "../../assets/images/location.jpg";
import ad1 from "../../assets/images/Ad.jpeg";
import ad2 from "../../assets/images/Ad2.jpeg";

const FindProperty = () => {
  const [location, setLocation] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);

  const handleSearch = async () => {
    if (!location) {
      setMessage("Please enter a location.");
      setSearchResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:3000/properties/search?location=${location}`
      );

      if (res.status === 404) {
        setSearchResults([]);
        setMessage("No properties found for this location.");
        setSearchActive(false);
      } else if (res.status === 400) {
        setSearchResults([]);
        setMessage("Location is required.");
        setSearchActive(false);
      } else if (!res.ok) {
        throw new Error("Failed to fetch");
      } else {
        const data = await res.json();
        setSearchResults(data);
        setMessage("");
        setSearchActive(true);
      }
    } catch (err) {
      console.error(err);
      setSearchResults([]);
      setMessage("Failed to fetch properties.");
      setSearchActive(false);
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults([]);
    setSearchActive(false);
    setLocation("");
    setMessage("");
  };

  return (
    <div className="my-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl lg:text-3xl font-bold">
        Search by Location
      </h2>
      <p className="text-gray-600 mt-3 mb-6">
        Enter the city, area, or neighborhood you are interested in to find
        verified properties quickly.
      </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 ">
       

        <div className="flex flex-col md:flex-1 gap-4 w-full">
          {/* Input and Button side by side */}
          <div className="flex gap-2 w-full">
            <input
              type="text"
              placeholder="Enter location..."
              className="input input-bordered flex-1"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button
              className="btn bg-green-500 text-white text-md md:text-lg hover:bg-green-600 w-auto"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>

          {/* Paragraph */}
          <p className="text-gray-500 text-sm md:text-lg">
            Please enter the name of the city, area, or neighborhood you are
            interested in. Our system will search for verified properties <br /> in the
            specified location and display relevant results instantly. This
            helps you find properties that match your preferences quickly and
            efficiently.
          </p>

          {/* Two Small Ad Images */}
          <div className="flex gap-2 mt-2 w-full">
            <img
              src={ad1}
              alt="Advertisement 1"
              className="w-full h-32 md:h-40 lg:block md:hidden object-cover rounded shadow"
            />
            <img
              src={ad2}
              alt="Advertisement 2"
              className="w-full h-32 md:h-40 lg:block md:hidden  object-cover rounded shadow"
            />
          </div>
        </div>
         <div className="flex-shrink-0 w-full md:w-1/2">
          <img src={locationimg} alt="Location" className="w-full rounded" />
        </div>
      </div>

      {message && <p className="text-red-500 mb-4 text-center">{message}</p>}

      {searchActive && (
        <div className="relative mt-6 lg:mt-20 ">
          <button
            onClick={handleClearSearch}
            className="absolute -top-5 lg:-top-15 right-0 w-10 h-10 flex items-center justify-center text-3xl md:text-4xl rounded-full font-bold text-red-500 shadow-lg bg-red-100 transition cursor-pointer"
          >
            ×
          </button>

          {searchResults.length === 0 ? (
            <div className="p-6 bg-white rounded shadow-md text-center text-red-500 font-semibold">
              No properties found for this location.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 rounded-md">
              {searchResults.map((property) => (
                <div
                  key={property._id}
                  className="rounded-lg shadow-md p-4 bg-white space-y-2"
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
                    <span className="text-green-600 font-semibold">
                      Verified
                    </span>
                  </p>

                  <p className="text-sm">
                    <strong>Price:</strong> {property.priceMin} -{" "}
                    {property.priceMax} BDT
                  </p>

                  <Link to={`/property-details/${property._id}`}>
                    <button className="w-full mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600 cursor-pointer">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FindProperty;
