import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch reviews by user email
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["myReviews", user?.email],
    queryFn: async () => {
      const res = await fetch(`https://reak-estate-server.vercel.app/reviews?email=${user?.email}`);
      return res.json();
    },
    enabled: !!user?.email,
  });

  // Delete review mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await fetch(`https://reak-estate-server.vercel.app/reviews/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myReviews", user?.email]);
    },
  });

  if (isLoading) return <div className="text-center mt-10"><LoadingSpinner /></div>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Reviews</h2>
      {reviews.length === 0 ? (
        <p className="text-center text-gray-500">You have not given any reviews yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="border rounded-lg shadow p-4 bg-white">
              <h3 className="text-lg font-semibold mb-1">{review.propertyTitle || "Property"}</h3>
              <p className="text-gray-600 mb-1">Agent: {review.agentName || "N/A"}</p>
              <p className="text-gray-500 text-sm mb-2">{review.time ? new Date(review.time).toLocaleString() : ""}</p>
              <p className="mb-2">{review.comment}</p>
              <button
                onClick={() => deleteMutation.mutate(review._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
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

export default MyReviews;