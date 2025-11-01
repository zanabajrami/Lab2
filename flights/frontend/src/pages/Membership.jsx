import React from "react";
import { motion } from "framer-motion";

function MembershipCard({ title, price, benefits, emoji, onClick }) {
  return (
    <motion.div
      className="w-full max-w-md p-8 rounded-3xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-[0_20px_40px_rgba(59,130,246,0.3)]"
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
    >
      <div className="flex items-center mb-6">
        <div className="text-4xl mr-4">{emoji}</div>
        <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      </div>

      <p className="text-xl text-gray-700 mb-6 font-semibold">{price}</p>

      <ul className="space-y-3 mb-6 text-gray-700">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-start">
            <span className="mr-3 text-xl">✔️</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_25px_10px_rgba(59,130,246,0.5)] transition-all">
        Join Now
      </button>
    </motion.div>
  );
}

export default function Membership() {
  const cards = [
    {
      title: "Basic Membership",
      emoji: "💳",
      price: "€49.99 / year",
      benefits: [
        "Benefits for you and 1 companion ✈️",
        "Subscribe when you book your next flight 🗓️",
        "Special onboard coupons 🧾",
        "Exclusive ticket promotions and personalized offers 🎟️",
        "€10 discount on flight fares from €29.99 💶",
        "€5 discount on checked-in baggages purchased online 🧳",
        "Priority customer care ☎️",
        "Enhanced benefits with partners 🤝",
        "2 cabin bags & priority 🛄",
        "Premium (unlimited) seat selection ✈️"
      ]
    },
    {
      title: "Standard Membership",
      emoji: "🎟️",
      price: "€69.99 / year",
      benefits: [
        "Benefits for you and 1 companion ✈️",
        "Subscribe when you book your next flight 🗓️",
        "Special onboard coupons 🧾",
        "Exclusive ticket promotions and personalized offers 🎟️",
        "€10 discount on flight fares from €29.99 💶",
        "€5 discount on checked-in baggages purchased online 🧳",
        "Priority customer care ☎️",
        "Enhanced benefits with partners 🤝",
        "2 cabin bags & priority 🛄",
        "Premium (unlimited) seat selection ✈️",
        "Extra seasonal offers 🌞",
        "Early access to sales ⏰"
      ]
    },
    {
      title: "Premium Membership",
      emoji: "🏆",
      price: "€99.99 / year",
      benefits: [
        "Benefits for you and 1 companion ✈️",
        "Subscribe when you book your next flight 🗓️",
        "Special onboard coupons 🧾",
        "Exclusive ticket promotions and personalized offers 🎟️",
        "€10 discount on flight fares from €29.99 💶",
        "€5 discount on checked-in baggages purchased online 🧳",
        "Priority customer care ☎️",
        "Enhanced benefits with partners 🤝",
        "2 cabin bags & priority 🛄",
        "Premium (unlimited) seat selection ✈️",
        "Extra seasonal offers 🌞",
        "Early access to sales ⏰",
        "Flexible ticket changes 🔄",
        "Special birthday offers 🎂",
        "VIP customer support 🛎️"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-5xl text-gray-900 font-bold mb-12 text-center">
     Memberships
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
        {cards.map((card, i) => (
          <MembershipCard
            key={i}
            title={card.title}
            price={card.price}
            benefits={card.benefits}
            emoji={card.emoji}
            onClick={() => console.log(`Selected ${card.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
