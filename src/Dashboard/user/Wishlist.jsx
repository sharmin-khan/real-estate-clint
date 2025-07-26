import { useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Wishlist = ({ wishlist = [], onRemove }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500 text-base sm:text-lg">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {wishlist.map((item) => (
            <div
              key={item._id}
              className="border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white flex flex-col"
            >
              {/*  Ensure correct image key — may need 'image' or 'propertyImage' */}
              <img
                src={item.image || item.propertyImage}
                alt={item.title || item.propertyTitle}
                className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
              />

              <div className="p-4 flex flex-col flex-grow">
                {/*  Title fallback */}
                <h3 className="text-lg sm:text-xl font-semibold truncate">
                  {item.title || item.propertyTitle}
                </h3>

                <p className="text-gray-600 text-sm sm:text-base mt-1 truncate">
                  <strong>Location:</strong> {item.location}
                </p>

                <div>
                  <h2 className="text-xl font-semibold mt-2">{item.title}</h2>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <img
                      src={item.agentImage}
                      className="w-8 h-8 rounded-full"
                      alt={item.agentName}
                    />
                    <span className="text-sm">{item.agentName}</span>
                  </div>
                  <p className="text-sm mt-1">
                    Price: {item.priceMin} - {item.priceMax} BDT
                  </p>
                  <p className="text-sm mt-1">
                    Status: {item.verificationStatus}
                  </p>
                </div>

                <div className="mt-auto flex justify-between gap-2 sm:gap-4 pt-4">
                  <Link
                    to={`/make-offer/${item.propertyId || item._id}`}
                    className="flex-1"
                  >
                    <button className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base cursor-pointer">
                      Make an Offer
                    </button>
                  </Link>

                  <button
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You want to remove this property from wishlist?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, remove it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          onRemove(item._id); //  Trigger delete handler
                        }
                      });
                    }}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition text-sm sm:text-base cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
