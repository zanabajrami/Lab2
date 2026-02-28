import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, CreditCard } from "lucide-react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";

function PaymentForm({ amount, bookingId, passengerName, onClose }) {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        // 1️⃣ Krijo PaymentIntent
        const { data } = await axios.post(
            "http://localhost:8800/api/payments/create-payment-intent",
            {
                amount: Number(amount),
                bookingId
            });
        console.log("PaymentIntent response:", data);

        const clientSecret = data.clientSecret;

        // 2️⃣ Confirm Card Payment
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: { name: passengerName },
            },
        });

        if (error) {
            alert("Payment failed: " + error.message);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            try {
                // 3️⃣ POST booking vetëm pas suksesit të pagesës
                const token = localStorage.getItem("token");
                await axios.post(
                    "http://localhost:8800/api/bookings",
                    bookingData,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                alert("Payment successful! Booking confirmed ✅");
                onClose();
            } catch (err) {
                console.error(err);
                alert("Booking failed even after payment. Contact support.");
            }
        }
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => (document.body.style.overflow = "auto");
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex justify-center items-center z-[110] p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-[2.5rem] w-full max-w-md relative overflow-hidden shadow-2xl border border-slate-100"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative">
                        <button
                            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
                            onClick={onClose}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] mb-1">
                            Payment Details
                        </p>
                        <h2 className="text-3xl font-black tracking-tight">€{amount}</h2>
                    </div>

                    {/* Card Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-wider">
                            Card Information
                        </label>
                        <div className="p-4 border-2 rounded-2xl bg-slate-50">
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <CreditCard size={18} />
                                </span>
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#0f172a",
                                                fontWeight: "600",
                                                fontFamily: "monospace",
                                            },
                                            invalid: {
                                                color: "#ef4444",
                                            },
                                        },
                                    }}
                                    className="pl-12 py-4 outline-none"
                                />
                            </div>
                        </div>

                        {/* Security */}
                        <div className="flex justify-center gap-2 text-xs text-slate-400">
                            <Lock size={14} className="text-emerald-500" />
                            Encrypted 256-bit SSL Payment
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!stripe}
                            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl shadow-blue-200 text-lg"
                        >
                            Complete Payment
                        </button>

                        <p className="text-center text-[10px] text-slate-400 px-4 leading-relaxed">
                            By clicking "Complete Payment", you agree to our terms and privacy policy.
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default PaymentForm;