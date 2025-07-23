import { Link } from "react-router";
import Swal from "sweetalert2";

const Wishlist = ({ wishlist=[], onRemove }) => {
  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center">My Wishlist</h2>

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
              <img
                src={item.propertyImage}
                alt={item.propertyTitle}
                className="w-full h-48 sm:h-56 object-cover rounded-t-lg"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-semibold truncate">{item.propertyTitle}</h3>
                <p className="text-gray-600 text-sm sm:text-base mt-1 truncate">
                  <strong>Location:</strong> {item.location}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <img
                    src={item.agentImage}
                    alt={item.agentName}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <p className="font-medium text-sm sm:text-base truncate">{item.agentName}</p>
                </div>

                <p className="text-sm sm:text-base mt-2">
                  <strong>Status:</strong> {item.verificationStatus || "N/A"}
                </p>
                <p className="text-sm sm:text-base mt-1">
                  <strong>Price Range:</strong> ${item.minPrice} - ${item.maxPrice}
                </p>

                <div className="mt-auto flex justify-between gap-2 sm:gap-4 pt-4">
                  <Link to={`/make-offer/${item._id}`} className="flex-1">
                    <button className="w-full bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 transition text-sm sm:text-base">
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
                          onRemove(item._id);
                        }
                      });
                    }}
                    className="flex-1 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 transition text-sm sm:text-base"
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
