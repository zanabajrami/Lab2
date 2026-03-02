import Stripe from "stripe";
import db from "../config/db.js";
import Payment from "../models/Payment.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, bookingId } = req.body;

    // 🔹 Validate
    if (!amount || !bookingId) {
      return res.status(400).json({ message: "Missing amount or bookingId" });
    }

    console.log("Creating PaymentIntent:", { amount, bookingId });

    // 🔹 Krijo PaymentIntent në Stripe
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // EUR → cents
      currency: "eur",
      metadata: { bookingId }
    });

    // 🔹 Ruaj në MongoDB
    await Payment.create({
      bookingId: bookingId.toString(),
      paymentIntentId: intent.id,
      amount,
      status: "pending",
    });

    res.json({ clientSecret: intent.client_secret });
  } catch (err) {
    console.error("Stripe PaymentIntent Error:", err);
    res.status(500).json({ message: "Payment intent failed", error: err.message });
  }
};

// Webhook handler (Stripe)
export const stripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("Webhook event received:", event.type); // 🔹 shiko event-et që vijnë
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send("Webhook Error");
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;

    const payment = await Payment.findOneAndUpdate(
      { paymentIntentId: intent.id },
      { status: "succeeded" }
    );

    if (payment) {
      await db.query(
        `UPDATE bookings
       SET status='paid', paid_at=NOW()
       WHERE id=?`,
        [payment.bookingId] // ky duhet të ekzistojë në Mongo
      );
    }
  }

  res.json({ received: true });
};

// Confirm payment manually (testing)
export const confirmPayment = async (req, res) => {
  const { paymentIntentId, status } = req.body;

  await db.query(
    `UPDATE payments SET status=? WHERE payment_intent_id=?`,
    [status, paymentIntentId]
  );

  res.json({ message: "Payment updated" });
};