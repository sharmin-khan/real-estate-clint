import { useEffect, useState } from "react";
import axios from "axios";

const LatestReviews = () => {
  const [latestReviews, setLatestReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3000/reviews")
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.time) - new Date(a.time));
        setLatestReviews(sorted.slice(0, 3));
        setError(null);
      })
      .catch(err => {
        console.error("Failed to fetch reviews", err);
        setError("Failed to fetch reviews. Please check your server or route.");
      });
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Latest User Reviews</h2>
        <div className="text-red-600 text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 my-12">
      <h2 className="text-2xl text-gray-700 md:text-3xl font-bold text-center mb-8">Latest User Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {latestReviews.map((review, index) => (
          <div key={review._id || index} className="bg-white border rounded-xl shadow-lg p-5 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={review.userImage || "https://i.ibb.co/L90wLWW/default-user.png"}
                alt="Reviewer"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">{review.userName}</p>
                <p className="text-sm text-gray-500">{new Date(review.time).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-2 line-clamp-3">“{review.comment}”</p>
            <p className="text-sm text-blue-600 font-medium">🏠 {review.propertyTitle}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestReviews;
