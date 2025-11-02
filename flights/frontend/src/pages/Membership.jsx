import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function MembershipCard({ title, price, benefits, emoji, gradient, badge }) {
  const [activeTips, setActiveTips] = useState({});

  const toggleTooltip = (i) => {
    setActiveTips((prev) => ({ ...prev, [i]: !prev[i] }));
  };

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
      className="w-full max-w-[90%] sm:max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white/30 
  shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-visible cursor-pointer transition-all"
      whileHover={{ scale: 1.05 }}
    >

      {badge && (
        <div
          className="absolute top-2 right-3 px-3 py-1 rounded-full font-bold text-base
    text-white bg-white/20 border border-white/30
    z-20 transition-all duration-300 hover:scale-105 hover:bg-white/30"
        >
          {badge}
        </div>
      )}

      <div
        className="flex flex-col sm:flex-row items-center p-4 sm:p-6 rounded-t-[2rem]"
        style={{
          background: "linear-gradient(135deg, rgba(25, 29, 149, 0.9), rgba(59,130,246,0.8))"
        }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center sm:text-left break-words mt-4">
          {title}
        </h2>

      </div>

      <div className="p-8">
        <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-6 relative inline-block text-transparent bg-clip-text 
bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 animate-gradient">
          {price}
        </p>

        <style>{`
  @keyframes gradientMove {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .animate-gradient {
    background-size: 200% 200%;
    animation: gradientMove 3s ease-in-out infinite;
  }
`}</style>

        <ul className="space-y-3 mb-6 text-gray-700 relative">
          {benefits.map((b, i) => (
            <li
              key={i}
              className="flex items-center p-3 rounded-2xl hover:bg-blue-100/40 transition-colors duration-200 relative"
              onClick={() => toggleTooltip(i)}
            >
              <span className="mr-3 text-xl">{b.icon}</span>
              <span>{b.text}</span>

              <AnimatePresence>
                {activeTips[i] && (
                  <motion.div
                    initial={{ opacity: 0, x: -10, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, y: -5, scale: 1 }}
                    exit={{ opacity: 0, x: -10, y: -5, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute bottom-full left-0 transform -translate-y-full mb-3 
                    bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-xl whitespace-nowrap z-50"
                  >
                    {b.tooltip}
                    <div className="absolute top-full left-4 w-3 h-3 bg-gray-900 rotate-45"></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
        <button
          className="w-full py-3.5 text-white font-semibold text-lg rounded-2xl 
  bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 
  shadow-[0_0_25px_rgba(30,64,175,0.35)] 
  hover:shadow-[0_0_50px_12px_rgba(30,64,175,0.55)] 
  transition-all duration-500 ease-out 
  relative overflow-hidden group transform hover:-translate-y-1 hover:scale-[1.03]"
        >
          {/* Teksti me animim në hover */}
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:tracking-wider">
            Join Now
          </span>

          {/* Efekti i dritës që lëviz */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent animate-shine"></span>

          {/* Efekt i butë i valëzimit */}
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-blue-400/10 via-transparent to-blue-400/10 blur-2xl animate-wave"></span>

          <style>{`
    @keyframes shine {
      0% { transform: translateX(-100%); }
      50% { transform: translateX(100%); }
      100% { transform: translateX(-100%); }
    }
    .animate-shine {
      animation: shine 3s linear infinite;
    }

    @keyframes wave {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-wave {
      background-size: 200% 200%;
      animation: wave 5s ease-in-out infinite;
    }
  `}</style>
        </button>


      </div>
    </motion.div>
  );
}

export default function Membership() {
  const cards = [
    {
      title: "Standard Membership",
      gradient: "linear-gradient(90deg, #60a5fa, #93c5fd)",
      price: "€49.99 / year",
      badge: "Starter",
      benefits: [
        { icon: "👤", text: "Benefits for you and 1 companion", tooltip: "Share perks with 1 companion." },
        { icon: "✈️", text: "Subscribe when you book your next flight", tooltip: "Join during booking." },
        { icon: "🎫", text: "Special onboard coupons", tooltip: "Get onboard coupons." },
        { icon: "🎟️", text: "Exclusive ticket promotions and personalized offers", tooltip: "Unique ticket deals." },
        { icon: "💶", text: "€10 discount on flight fares from €29.99", tooltip: "Save €10 on fares." },
        { icon: "🧳", text: "€5 discount on checked-in baggages purchased online", tooltip: "Save €5 on baggage." },
        { icon: "🎧", text: "Priority customer care", tooltip: "Faster support." },
        { icon: "👥", text: "Enhanced benefits with partners", tooltip: "Extra partner perks." },
        { icon: "🧳", text: "2 cabin bags & priority", tooltip: "2 cabin bags + priority." },
        { icon: "👑", text: "Premium (unlimited) seat selection", tooltip: "Unlimited seat choice." }
      ]
    },
    {
      title: "Premium Membership",
      gradient: "linear-gradient(90deg, #3b82f6, #60a5fa)",
      price: "€69.99 / year",
      badge: "Most Popular",
      benefits: [
        { icon: "👤", text: "Benefits for you and 1 companion", tooltip: "Share perks with 1 companion." },
        { icon: "✈️", text: "Subscribe when you book your next flight", tooltip: "Join during booking." },
        { icon: "🎫", text: "Special onboard coupons", tooltip: "Premium coupons." },
        { icon: "🎟️", text: "Exclusive ticket promotions and personalized offers", tooltip: "Special offers." },
        { icon: "💶", text: "€10 discount on flight fares from €29.99", tooltip: "Save €10 on flights." },
        { icon: "🧳", text: "€5 discount on checked-in baggages purchased online", tooltip: "Save on baggage." },
        { icon: "🎧", text: "Priority customer care", tooltip: "Priority support." },
        { icon: "👥", text: "Enhanced benefits with partners", tooltip: "Extra partner perks." },
        { icon: "🧳", text: "2 cabin bags & priority", tooltip: "2 bags + priority." },
        { icon: "👑", text: "Premium (unlimited) seat selection", tooltip: "Unlimited seats." },
        { icon: "🎁", text: "Extra seasonal offers", tooltip: "Seasonal offers." },
        { icon: "🎁", text: "Early access to sales", tooltip: "Early sale access." }
      ]
    },
    {
      title: "VIP Membership",
      gradient: "linear-gradient(90deg, #1d4ed8, #3b82f6)",
      price: "€99.99 / year",
      badge: "VIP",
      benefits: [
        { icon: "👤", text: "Benefits for you and 1 companion", tooltip: "VIP perks for 1 companion." },
        { icon: "✈️", text: "Subscribe when you book your next flight", tooltip: "Join VIP during booking." },
        { icon: "🎫", text: "Special onboard coupons", tooltip: "VIP coupons." },
        { icon: "🎟️", text: "Exclusive ticket promotions and personalized offers", tooltip: "Exclusive VIP offers." },
        { icon: "💶", text: "€10 discount on flight fares from €29.99", tooltip: "Save €10 on flights." },
        { icon: "🧳", text: "€5 discount on checked-in baggages purchased online", tooltip: "Baggage discount." },
        { icon: "🎧", text: "Priority customer care", tooltip: "VIP support." },
        { icon: "👥", text: "Enhanced benefits with partners", tooltip: "Partner perks." },
        { icon: "🧳", text: "2 cabin bags & priority", tooltip: "2 bags + priority." },
        { icon: "👑", text: "Premium (unlimited) seat selection", tooltip: "Unlimited seats." },
        { icon: "🎁", text: "Extra seasonal offers", tooltip: "Seasonal deals." },
        { icon: "🎁", text: "Early access to sales", tooltip: "Early access." },
        { icon: "✈️", text: "Flexible ticket changes", tooltip: "Change tickets freely." },
        { icon: "🎉", text: "Special birthday offers", tooltip: "Birthday perks." },
        { icon: "🎧", text: "VIP customer support", tooltip: "Dedicated VIP support." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-5xl text-gray-900 font-bold mb-12 text-center">Memberships</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 justify-items-center items-start">
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
