import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = ({ amount, offerId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [transactionId, setTransactionId] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);
    setSuccess(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    if (parseInt(amount) < 200) {
      setError('Minimum payment amount is 200 tk.');
      setProcessing(false);
      return;
    }

    let clientSecret = '';
    try {
      const res = await fetch('https://reak-estate-server.vercel.app/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(amount) * 200 }) 
      });
      const data = await res.json();
      clientSecret = data.clientSecret;
      if (!clientSecret) {
        setError('Could not get payment client secret from server.');
        setProcessing(false);
        return;
      }
    } catch {
      setError('Failed to connect to payment server.');
      setProcessing(false);
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setProcessing(false);
      return;
    }

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
      },
    });

    if (paymentError) {
      setError(paymentError.message);
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      setSuccess('Payment successful!');
      setTransactionId(paymentIntent.id);

      // update offer status to "bought" and save transactionId
    await fetch(`https://reak-estate-server.vercel.app/offers/payment/${offerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'bought',
          transactionId: paymentIntent.id
        })
      });

      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-2 border rounded w-full bg-gray-100">
        Amount: {amount} BDT
      </div>
      <CardElement className="p-2 border rounded" />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {processing ? 'Processing...' : 'Pay'}
      </button>
      {error && <div className="text-red-500">{error}</div>}
      {success && (
        <div className="text-green-500">
          {success}
          {transactionId && <div>Transaction ID: {transactionId}</div>}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
