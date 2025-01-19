import { loadStripe } from "@stripe/stripe-js";

import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import PaymentForm from "./PaymentForm";

// todo add a[published key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const PaymentCards = () => {
  const { amount } = useParams();
  console.log(amount);
  return (
    <div>
      <h2 className="text-3xl text-center">Purchase Coin</h2>

      <Elements stripe={stripePromise}>
        <PaymentForm></PaymentForm>
      </Elements>
    </div>
  );
};

export default PaymentCards;
