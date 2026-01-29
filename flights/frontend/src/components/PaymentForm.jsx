import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, Lock, Calendar, Hash } from "lucide-react";

function PaymentForm({ amount = "", onClose, onSubmit }) {
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    // Formaton numrin e kartelës: 0000 0000 0000 0000
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Heq gjithçka që s'është numër
        value = value.substring(0, 16); // Max 16 numra
        const formatted = value.match(/.{1,4}/g)?.join(" ") || ""; // Shton hapësirë çdo 4 numra
        setCardNumber(formatted);
    };

    // Formaton skadimin: MM/YY
    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Heq gjithçka që s'është numër
        if (value.length > 4) value = value.substring(0, 4);

        if (value.length >= 3) {
            setExpiry(`${value.substring(0, 2)}/${value.substring(2, 4)}`);
        } else {
            setExpiry(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = "auto"; };
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
                        <p className="text-blue-100 text-xs font-black uppercase tracking-[0.2em] mb-1">Payment Details</p>
                        <h2 className="text-3xl font-black tracking-tight">€{amount}</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Card Number */}
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-wider">Card Number</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <CreditCard size={18} />
                                </span>
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-mono font-bold text-slate-700"
                                    required
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 italic font-black text-[10px] text-slate-300">
                                    <span>VISA</span>
                                    <span>MC</span>
                                </div>
                            </div>
                        </div>

                        {/* Expiry & CVC */}
                        <div className="flex gap-4">
                            <div className="w-1/2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-wider">Expiry Date</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><Calendar size={18} /></span>
                                    <input
                                        type="text"
                                        placeholder="MM/YY"
                                        value={expiry}
                                        onChange={handleExpiryChange}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="w-1/2 space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-wider">CVC / CVV</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Hash size={18} />
                                    </span>
                                    <input
                                        type="password"
                                        maxLength="3"
                                        placeholder="***"
                                        value={cvc}
                                        onChange={(e) => setCvc(e.target.value.replace(/\D/g, ""))}
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Security Note */}
                        <div className="flex items-center justify-center gap-2 py-2">
                            <Lock size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                Encrypted 256-bit SSL Payment
                            </span>
                        </div>

                        {/* Action Button */}
                        <button
                            type="submit"
                            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all active:scale-[0.98] shadow-xl shadow-blue-200 text-lg flex items-center justify-center gap-2"
                        >
                            Complete Payment
                        </button>

                        <p className="text-center text-[10px] text-slate-400 px-4 leading-relaxed">
                            By clicking "Complete Payment", you agree to our terms and conditions and our privacy policy.
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default PaymentForm;