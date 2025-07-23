
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  // fetch property details
  const { data: property = {} } = useQuery({
    queryKey: ["property-details", id],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/properties/${id}`);
      return res.data;
    },
  });

  // handle wishlist add
  const handleAddToWishlist = async () => {
    const wishlistItem = {
      propertyId: id,
      propertyTitle: property.title,
      propertyImage: property.image,
      location: property.location,
      agentName: property.agentName,
      agentImage: property.agentImage,
      verificationStatus: property.verificationStatus,
      minPrice: property.minPrice,
      maxPrice: property.maxPrice,
      email: user.email,
    };

    const res = await axios.post("http://localhost:3000/wishlist", wishlistItem);
    if (res.data.insertedId) {
      Swal.fire("Added!", "Property added to wishlist", "success");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <img src={property.image} alt={property.title} className="w-full h-80 object-cover rounded mb-4" />
      <h2 className="text-3xl font-bold">{property.title}</h2>
      <p className="text-gray-600">{property.description}</p>
      <p className="mt-2"><strong>Location:</strong> {property.location}</p>
      <p><strong>Agent:</strong> {property.agentName}</p>
      <p><strong>Status:</strong> {property.verificationStatus}</p>
      <p><strong>Price:</strong> ${property.priceMin} - ${property.priceMax}</p>

      <button onClick={handleAddToWishlist} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Add to Wishlist
      </button>

      {/* Reviews Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-2">Reviews</h3>
        {/* TODO: Show all reviews for this property here */}
      </div>

      {/* Add Review Modal */}
      <div className="mt-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Add a Review
        </button>
        {/* TODO: Add modal for writing a review */}
      </div>
    </div>
  );
};

export default PropertyDetailsPage;




