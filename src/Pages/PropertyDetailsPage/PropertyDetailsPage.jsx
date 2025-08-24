import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useRole from "../../hooks/useRole";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import axios from "axios"; 

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [role, roleLoading] = useRole(user?.email);

  const { data: property = {} } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/properties/${id}`);
      return res.data;
    },
  });

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  const handleAddToWishlist = async () => {
    const wishlistItem = {
      propertyId: id,
      propertyTitle: property.title,
      propertyImage: property.image,
      location: property.location,
      agentName: property.agentName,
      agentImage: property.agentImage,
      verificationStatus: property.verificationStatus,
      email: user.email,
      priceMin: property.priceMin,
      priceMax: property.priceMax,
      userEmail: user?.email
    };

    try {
      const res = await axios.post("https://reak-estate-server.vercel.app/wishlist",wishlistItem )
     

      if (res.data?.message === "already exists") {
        Swal.fire({
          icon: "info",
          title: "Already Added",
          text: "This property is already in your wishlist!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Property added to wishlist!",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Something Went Wrong",
        text: error.message,
      });
    }
  };

  const handleAddReview = async () => {
    if (!reviewText.trim()) {
      return Swal.fire("Error", "Review cannot be empty", "error");
    }

    const review = {
      propertyId: id,
      propertyTitle: property.title,
      agentName: property.agentName,
      userEmail: user.email,
      userName: user.displayName,
      userImage: user.photoURL,
      comment: reviewText,
      time: new Date(),
    };

    try {
      await axiosSecure.post("/reviews", review);
      refetch();
      setShowModal(false);
      setReviewText("");
      Swal.fire("Success", "Review added!", "success");
    } catch {
      Swal.fire("Oops!", "Failed to add review", "error");
    }
  };

  if (roleLoading) return <div className="text-center mt-10"><LoadingSpinner /></div>;

  return (
  <div className="max-w-4xl mx-auto p-6 transition-colors duration-300 bg-gray-50 dark:bg-gray-900 rounded-2xl">
  <h1 className="text-2xl font-bold mb-4 text-center md:text-left text-gray-900 dark:text-gray-100">
    Property Details
  </h1>

  <img
    src={property.image}
    alt={property.title}
    className="w-full h-80 object-cover rounded-lg mb-4 shadow-md"
  />

  <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">{property.title}</h2>
  <p className="text-gray-700 dark:text-gray-300 mb-2">{property.description}</p>

  <p className="mb-1 text-gray-800 dark:text-gray-200"><strong>Location:</strong> {property.location}</p>
  <p className="mb-1 text-gray-800 dark:text-gray-200"><strong>Agent:</strong> {property.agentName}</p>
  <p className="mb-1 text-gray-800 dark:text-gray-200">
    <strong>Status:</strong>{" "}
    <span className={property.verificationStatus === "verified" ? "text-green-600 dark:text-green-400" : "text-yellow-600"}>
      {property.verificationStatus}
    </span>
  </p>
  <p className="mb-2 text-gray-800 dark:text-gray-200"><strong>Price:</strong> {property.priceMin} BDT - {property.priceMax} BDT</p>

  {role === "user" && (
    <button
      onClick={handleAddToWishlist}
      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
    >
      Add to Wishlist
    </button>
  )}

  <div className="mt-2">
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Reviews</h3>

    {reviews.length === 0 && <p className="text-gray-600 dark:text-gray-300">No reviews yet.</p>}

    {reviews.map((review) => (
      <div
        key={review._id}
        className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 mb-2 shadow-sm transition-colors duration-300"
      >
        <p className="text-sm text-gray-500 dark:text-gray-300 mb-1">By: {review.userName}</p>
        <p className="text-gray-800 dark:text-gray-100">{review.comment}</p>
      </div>
    ))}
  </div>

  {role === "user" && (
    <button
      onClick={() => setShowModal(true)}
      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-300"
    >
      Add a Review
    </button>
  )}

  {showModal && (
    <div className="fixed inset-0 bg-green-500 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-md transition-colors duration-300">
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">
          Write your review
        </h3>
        <textarea
          rows="4"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded mb-4 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-300"
          placeholder="Your thoughts..."
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowModal(false)}
            className="bg-gray-300 dark:bg-gray-600 dark:text-gray-100 px-3 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleAddReview}
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500 transition-colors duration-300"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )}
</div>

  );
};

export default PropertyDetailsPage;
