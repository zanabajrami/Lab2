import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MembershipCard({ title, price, benefits, emoji, gradient, badge }) {
  const [activeTips, setActiveTips] = useState({});

  const toggleTooltip = (i) => {
    setActiveTips((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  // Auto-hide tooltips pas 3 sekondash
  useEffect(() => {
    const timers = Object.keys(activeTips).map((key) => {
      if (activeTips[key]) {
        return setTimeout(() => {
          setActiveTips((prev) => ({ ...prev, [key]: false }));
        }, 3000);
      }
      return null;
    });
    return () => timers.forEach((t) => t && clearTimeout(t));
  }, [activeTips]);

  return (
    <motion.div
      className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl relative overflow-visible cursor-pointer"
      whileHover={{ scale: 1.05 }}
    >
      {badge && (
        <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm shadow-lg z-10">
          {badge}
        </div>
      )}

      <div className="flex items-center p-6" style={{ background: gradient }}>
        <div className="text-4xl mr-4">{emoji}</div>
        <h2 className="text-3xl font-bold text-white">{title}</h2>
      </div>

      <div className="p-6">
        <p className="text-xl text-gray-700 mb-6 font-semibold">{price}</p>
        <ul className="space-y-3 mb-6 text-gray-700 relative">
          {benefits.map((b, i) => (
            <li
              key={i}
              className="flex items-center p-2 rounded-lg hover:bg-blue-100/30 transition-colors duration-200 relative"
              onClick={() => toggleTooltip(i)}
            >
              <span className="mr-3 text-xl">{b.icon}</span>
              <span>{b.text}</span>

              {/* Tooltip me smooth animation */}
              <AnimatePresence>
                {activeTips[i] && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, y: -5, scale: 1 }}
                    exit={{ opacity: 0, x: -10, y: -5, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute bottom-full left-0 transform -translate-y-full mb-2 bg-gray-900 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap z-50"
                  >
                    ✨ {b.tooltip}
                    <div className="absolute top-full left-3 w-3 h-3 bg-gray-900 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <button className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl shadow-lg hover:shadow-[0_0_25px_10px_rgba(59,130,246,0.5)] transition-all">
          Join Now
        </button>
      </div>
    </motion.div>
  );
}

export default function Membership() {
  const cards = [
    {
      title: "Standard Membership",
      emoji: "💳",
      gradient: "linear-gradient(90deg, #60a5fa, #93c5fd)",
      price: "€49.99 / year",
      badge: "Starter",
      benefits: [
        { icon: "👤", text: "Benefits for you and 1 companion", tooltip: "Share the perks with a companion of your choice." },
        { icon: "✈️", text: "Subscribe when you book your next flight", tooltip: "You can join Standard Membership during flight booking." },
        { icon: "🎫", text: "Special onboard coupons", tooltip: "Get discount coupons for onboard services." },
        { icon: "🎟️", text: "Exclusive ticket promotions and personalized offers", tooltip: "Receive unique ticket deals tailored to you." },
        { icon: "💶", text: "€10 discount on flight fares from €29.99", tooltip: "Save €10 when the fare is €29.99 or higher." },
        { icon: "🧳", text: "€5 discount on checked-in baggages purchased online", tooltip: "Book your luggage online and save €5." },
        { icon: "🎧", text: "Priority customer care", tooltip: "Get faster assistance from support team." },
        { icon: "👥", text: "Enhanced benefits with partners", tooltip: "Enjoy perks with our partner companies." },
        { icon: "🧳", text: "2 cabin bags & priority", tooltip: "Carry 2 cabin bags and enjoy priority boarding." },
        { icon: "👑", text: "Premium (unlimited) seat selection", tooltip: "Choose any seat with no limit." }
      ]
    },
    {
      title: "Premium Membership",
      emoji: "🎟️",
      gradient: "linear-gradient(90deg, #3b82f6, #60a5fa)",
      price: "€69.99 / year",
      badge: "Most Popular",
      benefits: [
        { icon: "👤", text: "Benefits for you and 1 companion", tooltip: "Share all perks with a companion." },
        { icon: "✈️", text: "Subscribe when you book your next flight", tooltip: "Easily join during flight booking." },
        { icon: "🎫", text: "Special onboard coupons", tooltip: "Exclusive onboard coupons for Premium members." },
        { icon: "🎟️", text: "Exclusive ticket promotions and personalized offers", tooltip: "Special offers personalized for you." },
        { icon: "💶", text: "€10 discount on flight fares from €29.99", tooltip: "Save €10 on flights over €29.99." },
        { icon: "🧳", text: "€5 discount on checked-in baggages purchased online", tooltip: "Save on baggage booked online." },
        { icon: "🎧", text: "Priority customer care", tooltip: "Get priority support." },
        { icon: "👥", text: "Enhanced benefits with partners", tooltip: "Enjoy extra benefits with partners." },
        { icon: "🧳", text: "2 cabin bags & priority", tooltip: "Carry 2 bags and priority boarding." },
        { icon: "👑", text: "Premium (unlimited) seat selection", tooltip: "Unlimited seat choice." },
        { icon: "🎁", text: "Extra seasonal offers", tooltip: "Get extra seasonal promotions." },
        { icon: "🎁", text: "Early access to sales", tooltip: "Be the first to access sales." }
      ]
    },
    {
      title: "VIP Membership",
      emoji: "🏆",
      gradient: "linear-gradient(90deg, #1d4ed8, #3b82f6)",
      price: "€99.99 / year",
      badge: "VIP",
      benefits: [
        { icon: "👤", text: "Benefits for you and 1 companion", tooltip: "VIP perks for you and a companion." },
        { icon: "✈️", text: "Subscribe when you book your next flight", tooltip: "Join VIP while booking a flight." },
        { icon: "🎫", text: "Special onboard coupons", tooltip: "VIP onboard coupons." },
        { icon: "🎟️", text: "Exclusive ticket promotions and personalized offers", tooltip: "Exclusive offers only for VIPs." },
        { icon: "💶", text: "€10 discount on flight fares from €29.99", tooltip: "Save €10 on flights above €29.99." },
        { icon: "🧳", text: "€5 discount on checked-in baggages purchased online", tooltip: "Discount for online baggage booking." },
        { icon: "🎧", text: "Priority customer care", tooltip: "VIP support available anytime." },
        { icon: "👥", text: "Enhanced benefits with partners", tooltip: "Additional partner perks." },
        { icon: "🧳", text: "2 cabin bags & priority", tooltip: "Carry 2 bags with priority boarding." },
        { icon: "👑", text: "Premium (unlimited) seat selection", tooltip: "Unlimited premium seat selection." },
        { icon: "🎁", text: "Extra seasonal offers", tooltip: "Special seasonal deals." },
        { icon: "🎁", text: "Early access to sales", tooltip: "Access sales before everyone else." },
        { icon: "✈️", text: "Flexible ticket changes", tooltip: "Change your tickets without extra fees." },
        { icon: "🎉", text: "Special birthday offers", tooltip: "Birthday perks for VIP members." },
        { icon: "🎧", text: "VIP customer support", tooltip: "Dedicated VIP support team." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-5xl text-gray-900 font-bold mb-12 text-center">Memberships</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">
        {cards.map((card, i) => (
          <MembershipCard
            key={i}
            title={card.title}
            price={card.price}
            benefits={card.benefits}
            emoji={card.emoji}
            gradient={card.gradient}
            badge={card.badge}
          />
        ))}
      </div>
    </div>
  );
}
