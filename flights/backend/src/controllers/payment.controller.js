import Stripe from "stripe";
import Payment from "../models/payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    if (!amount || !bookingId) {
      return res.status(400).json({
        message: "amount and bookingId are required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    await Payment.create({
      bookingId,
      paymentIntentId: paymentIntent.id,
      amount,
      status: "pending",
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, status } = req.body;

    await Payment.findOneAndUpdate(
      { paymentIntentId },
      { status }
    );

    res.json({ message: "Payment updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  console.log("PAYMENT INTENT REQUEST:", req.body);
};