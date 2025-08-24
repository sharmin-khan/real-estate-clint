import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all reviews
  useEffect(() => {
    axios.get("https://reak-estate-server.vercel.app/reviews").then((res) => {
      setReviews(res.data);
      setLoading(false);
    });
  }, []);

  // Delete review
  const handleDelete = async (id) => {
    await axios.delete(`https://reak-estate-server.vercel.app/reviews/${id}`);
    setReviews((prev) => prev.filter((r) => r._id !== id));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">No reviews found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded-lg shadow p-4 bg-white flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img
                  src={review.userImage || "/default-user.png"}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <div className="font-semibold text-green-500">{review.userName || "Unknown"}</div>
                  <div className="text-sm text-gray-500">{review.userEmail}</div>
                </div>
              </div>
              <div className="mt-2 text-black">{review.comment}</div>
              <button
                onClick={() => handleDelete(review._id)}
                className="self-end bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageReviews;