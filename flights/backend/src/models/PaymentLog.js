import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  bookingId: Number,
  amount: Number,
  status: String,
  method: String,
}, { timestamps: true });

export default mongoose.model("PaymentLog", PaymentSchema);
