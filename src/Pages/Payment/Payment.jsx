import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext/AuthContext";

const Payment = () => {
  const { id } = useParams(); // offer ID
  const { user } = useContext(AuthContext);
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        console.log("Fetching offer with ID:", id);
        
        // First get all offers for the user, then filter by ID
        const res = await fetch(`https://reak-estate-server.vercel.app/buyer-offers?email=${user?.email}`);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const allOffers = await res.json();
        console.log("All offers:", allOffers);
        
        // Find the specific offer by ID
        const specificOffer = allOffers.find(offer => offer._id === id);
        console.log("Specific offer:", specificOffer);
        
        if (!specificOffer) {
          throw new Error("Offer not found");
        }
        
        setOffer(specificOffer);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load offer", err);
        console.error("Error details:", err.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Failed to load offer details: ${err.message}`,
        });
        setLoading(false);
      }
    };

    if (id && user?.email) {
      fetchOffer();
    }
  }, [id, user?.email]);

  const handlePayment = async () => {
    const fakeTransactionId = "TXN-" + new Date().getTime();

    try {
      console.log("Processing payment for offer:", id);
      
      // Update the offer status to bought
      const res = await fetch(`https://reak-estate-server.vercel.app/offers/payment/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transactionId: fakeTransactionId,
          status: "bought",
        }),
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const result = await res.json();
      console.log("Payment response:", result);

      setTransactionId(fakeTransactionId);

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction ID: ${fakeTransactionId}`,
      });
    } catch (error) {
      console.error("Payment failed:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: `Failed to process payment: ${error.message}`,
      });
    }
  };

  if (loading) return <div className="text-center my-10"><LoadingSpinner /></div>;

  if (!offer) {
    return (
      <div className="max-w-2xl mx-auto my-10 p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Offer Not Found</h2>
        <p>The offer you're looking for doesn't exist or has been removed.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-10 p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Payment for: {offer.propertyTitle}</h2>
      <p><strong>Location:</strong> {offer.propertyLocation}</p>
      <p><strong>Amount:</strong> {offer.offerAmount} BDT</p>
      <p><strong>Status:</strong> {offer.status}</p>

      {!transactionId && offer.status !== "bought" && (
        <button
          onClick={handlePayment}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        >
          Pay Now
        </button>
      )}

      {transactionId && (
        <div className="mt-4 text-green-600 font-semibold">
          Payment Done! Transaction ID: {transactionId}
        </div>
      )}
    </div>
  );
};

export default Payment;
