import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../utils/stripe";
import PaymentForm from "../components/payments/PaymentForm";

function Checkout({ amount, onClose }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} onClose={onClose} />
    </Elements>
  );
}

export default Checkout;