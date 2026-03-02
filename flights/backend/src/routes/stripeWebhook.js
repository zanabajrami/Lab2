import express from "express";
import bodyParser from "body-parser";
import Stripe from "stripe";
import Payment from "../models/Payment.js";
import db from "../config/db.js";

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post(
  "/stripe",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("Webhook Error:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const intent = event.data.object;

      // 🔹 Update MongoDB
      const payment = await Payment.findOneAndUpdate(
        { paymentIntentId: intent.id },
        { status: "succeeded" },
        { new: true }
      );

      if (payment) {
        // 🔹 Update MySQL booking status
        await db.query(
          `UPDATE bookings SET status='paid', paid_at=NOW() WHERE id=?`,
          [payment.bookingId]
        );
      }
    }

    res.json({ received: true });
  }
);

export default router;