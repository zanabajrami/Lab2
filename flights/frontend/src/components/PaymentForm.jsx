import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

function PaymentForm({ title = "Payment", amount = "", onClose, onSubmit }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit();
        onClose();
    };

    // bllokon scroll kur modal hapet
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto"; // rikthen scroll kur modal mbyllet
        };
    }, []);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <motion.div
                    className="bg-white rounded-2xl p-8 w-full max-w-md relative"
                    initial={{ scale: 0.8, y: -50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.8, y: -50 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <button
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                        onClick={onClose}
                    >
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold mb-4">{title}</h2>
                    {amount && <p className="mb-4 text-gray-700 font-semibold">Amount: {amount}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" placeholder="Name" className="w-full p-3 border rounded-xl" required />
                        <input type="text" placeholder="Last Name" className="w-full p-3 border rounded-xl" required />
                        <input type="email" placeholder="Email" className="w-full p-3 border rounded-xl" required />
                        <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-xl" required />
                        <div className="flex gap-2">
                            <input type="text" placeholder="MM/YY" className="w-1/2 p-3 border rounded-xl" required />
                            <input type="text" placeholder="CVC" className="w-1/2 p-3 border rounded-xl" required />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition">
                            Pay Now
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default PaymentForm;