import React from "react";
import { motion } from "framer-motion";

function MembershipCard({ title, price, benefits, onClick }) {
  return (
    <motion.div
      className="w-full max-w-sm p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-gray-300 shadow-[0_10px_25px_rgba(0,0,0,0.15)] cursor-pointer transition-transform duration-200"
      whileHover={{ scale: 1.03, boxShadow: "0 15px 30px rgba(59,130,246,0.3)" }}
      onClick={onClick}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      <p className="text-xl text-gray-600 mb-4">{price}</p>
      <ul className="space-y-2 mb-6">
        {benefits.map((b, i) => (
          <li key={i} className="text-gray-600">
            – {b}
          </li>
        ))}
      </ul>
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.5)] transition-all"
      >
        Select
      </button>
    </motion.div>
  );
}

export default function Membership() {
  const cards = [
    {
      title: "Basic Membership",
      price: "€49.99 / year",
      benefits: ["€5 off per flight", "Priority booking on select flights", "Exclusive promos"]
    },
    {
      title: "Standard Membership",
      price: "€69.99 / year",
      benefits: ["€10 off per flight", "Priority boarding", "Extra baggage allowance", "Exclusive promos"]
    },
    {
      title: "Premium Membership",
      price: "€99.99 / year",
      benefits: ["€15 off per flight", "Priority boarding & check-in", "Extra baggage allowance", "VIP customer support", "Exclusive promos"]
    }
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-4xl text-gray-900 font-bold mb-8 text-center">
     Memberships
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {cards.map((card, i) => (
          <MembershipCard
            key={i}
            title={card.title}
            price={card.price}
            benefits={card.benefits}
            onClick={() => console.log(`Selected ${card.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
