import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../utils/stripe";
import PaymentForm from "./PaymentForm";

function PaymentModal({ amount, onClose }) {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} onClose={onClose} />
    </Elements>
  );
}

export default PaymentModal;