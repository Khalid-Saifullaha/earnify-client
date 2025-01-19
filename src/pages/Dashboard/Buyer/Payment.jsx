import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const Payment = () => {
  return (
    <div>
      <div>
        <Elements stripe={stripePromise}>
          <PaymentForm></PaymentForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
