import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../component/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const Payment = () => {
  const { id } = useParams(); // offer ID
  const axiosSecure = useAxiosSecure();
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [transactionId, setTransactionId] = useState(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axiosSecure.get(`/offers/${id}`);
        setOffer(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load offer", err);
        setLoading(false);
      }
    };

    fetchOffer();
  }, [id, axiosSecure]);

  const handlePayment = async () => {
    const fakeTransactionId = "TXN-" + new Date().getTime();

    try {
      await axiosSecure.patch(`/offers/payment/${id}`, {
        transactionId: fakeTransactionId,
        status: "bought",
      });

      setTransactionId(fakeTransactionId);

      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: `Transaction ID: ${fakeTransactionId}`,
      });
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  if (loading) return <div className="text-center my-10"><LoadingSpinner /></div>;

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
