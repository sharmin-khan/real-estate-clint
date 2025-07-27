import React, { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const Payment = () => {
  const { id } = useParams();
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://reak-estate-server.vercel.app/offers/${id}`)
        .then(res => res.json())
        .then(data => setOffer(data));
    }
  }, [id]);

  if (!offer) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Make a Payment</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm amount={offer.offerAmount} offerId={offer._id} />
      </Elements>
    </div>
  );
};

export default Payment;
