import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";

const PropertyBought = () => {
  const { user } = useContext(AuthContext);
  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["offers", user?.email],
    queryFn: async () => {
      const res = await fetch(`https://reak-estate-server.vercel.app/buyer-offers?email=${user?.email}`);
   
      return res.json();
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <div className="text-center mt-10"><LoadingSpinner /></div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Property Offers</h2>
      {offers.length === 0 ? (
        <p className="text-center text-gray-500">You have not made any offers yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {offers.map((offer) => (
            <div key={offer._id} className="border rounded-lg shadow p-4 bg-white flex flex-col">
              <img
                src={offer.propertyImage}
                alt={offer.propertyTitle}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-xl font-semibold">{offer.propertyTitle}</h3>
              <p className="text-gray-600">Location: {offer.propertyLocation}</p>
              <p className="text-gray-600">Agent: {offer.agentName}</p>
              <p className="text-gray-600">Offered Amount: {offer.offerAmount} BDT</p>
              <p className="text-gray-600">Status: <span className="font-bold capitalize">{offer.status}</span></p>
              {offer.status === "accepted" && offer._id && (
                <Link to={`/payment/${offer._id}`} className="mt-2">
                  <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Pay</button>
                </Link>
              )}
              {offer.status === "accepted" && !offer._id && (
                <p className="mt-2 text-red-600 text-sm">Payment link not available</p>
              )}
              {offer.status === "bought" && offer.transactionId && (
                <p className="mt-2 text-green-700 font-semibold">Transaction ID: {offer.transactionId}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyBought;