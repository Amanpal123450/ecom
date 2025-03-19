import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";

const stripePromise = loadStripe("your-publishable-key-here");

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const { data } = fetch("/api/payment/create-payment-intent", {
      amount: 1000, // Amount in cents (example: $10.00)
    });

    const { error, paymentIntent } = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent.status === "succeeded") {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Complete Payment</h2>
      <CardElement className="border p-2 rounded" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Payment Successful!</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

const PaymentIntegration = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentIntegration;