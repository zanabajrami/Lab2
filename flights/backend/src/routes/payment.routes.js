import express from "express";
import bodyParser from "body-parser";
import { createPaymentIntent, stripeWebhook, confirmPayment } from "../controllers/payment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create-payment-intent", verifyToken, createPaymentIntent);
router.post("/stripe-webhook", bodyParser.raw({ type: "application/json" }),stripeWebhook );
router.post("/confirm", verifyToken, confirmPayment);

export default router;