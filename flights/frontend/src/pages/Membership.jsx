import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Users, TicketPercent, Utensils, CircleDollarSign, HandPlatter, BadgeCheck, Luggage, Calendar, TicketsPlane, Feather } from "lucide-react";

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

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <motion.div
      className="w-full max-w-[90%] sm:max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl border border-gray/70 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-visible cursor-pointer"
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: "0 15px 40px rgba(59,130,246,0.3)",
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 25,
      }}
      layoutId={`card-${title}`}
    >
      {badge && (
        <div className="absolute top-2 right-3 px-2 py-1 rounded-full font-bold text-base text-white bg-white/20 border border-white/30 z-20 transition-all duration-300 hover:scale-105 hover:bg-white/30">
          {badge}
        </div>
      )}

      <div
        className="flex flex-col sm:flex-row items-center p-4 sm:p-4 rounded-t-[2rem]"
        style={{ background: "linear-gradient(135deg, rgba(25, 29, 149, 0.9), rgba(59,130,246,0.8))" }}
      >
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center sm:text-left break-words mt-4 flex items-center justify-center sm:justify-start">
          {title}
          <motion.span
            className="ml-2"
            animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <Flame className="w-6 h-6 text-blue-400" />
          </motion.span>
        </h2>
      </div>

      <div className="p-4 relative">
        <p className="text-2xl sm:text-2xl md:text-2xl font-extrabold mb-6 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-500 to-gray-900 animate-gradient">
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

        <ul className="space-y-1 sm:space-y-2 md:space-y-3 text-sm sm:text-sm md:text-base mb-6 text-gray-700 relative">
          {benefits.map((b, i) => (
            <li
              key={i}
              className="flex items-center p-2 sm:p-2 md:p-2.5 rounded-2xl transition-all duration-300 relative hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(59,130,246,0.3)] hover:border hover:border-blue-300/50"
              onClick={(e) => { e.stopPropagation(); toggleTooltip(i); }}
            >
              <span className="mr-2 sm:mr-3 text-base sm:text-xl">{b.icon}</span>
              <span>{b.text}</span>

              <AnimatePresence>
                {activeTips[i] && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1, boxShadow: "0 0 25px rgba(59,130,246,0.8)" }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute bottom-full left-0 transform -translate-y-full mb-3 bg-gradient-to-r from-blue-500/90 to-purple-600/90 text-white text-sm px-4 py-2 rounded-2xl backdrop-blur-md shadow-xl z-50 border border-blue-300/50"
                  >
                    {b.tooltip}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        <button className="w-full py-3.5 text-white font-semibold text-lg rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 shadow-[0_0_25px_rgba(30,64,175,0.35)] hover:shadow-[0_0_50px_12px_rgba(30,64,175,0.55)] transition-all duration-500 ease-out relative overflow-hidden group transform hover:-translate-y-1 hover:scale-[1.03]">
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1 group-hover:tracking-wider">
            Join Now
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300/25 to-transparent animate-shine"></span>
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
        { icon: <Users className="w-5 h-5 text-blue-800" />, text: "Benefits for you and 1 companion", tooltip: "Share perks with 1 companion." },
        { icon: <TicketPercent className="w-5 h-5 text-blue-800" />,text: "Special onboard coupons", tooltip: "Get onboard coupons." },
        { icon:  <Utensils className="w-5 h-5 text-blue-800" />, text: "10% discount at selected airport restaurants", tooltip: "Save while dining before departure." },
        { icon: <CircleDollarSign className="w-5 h-5 text-blue-800" />, text: "€10 discount on flight fares from €49.99", tooltip: "Save €10 on fares." },
      ]
    },
    {
      title: "Premium Membership",
      gradient: "linear-gradient(90deg, #3b82f6, #60a5fa)",
      price: "€69.99 / year",
      badge: "Most Popular",
      benefits: [
        { icon: <Users className="w-5 h-5 text-blue-800" />, text: "Benefits for you and 1 companion", tooltip: "Share perks with 1 companion." },
        { icon: <TicketPercent className="w-5 h-5 text-blue-800" />, text: "Special onboard coupons", tooltip: "Premium coupons." },
        { icon: <Luggage className="w-5 h-5 text-blue-800" />, text: "Priority baggage tag", tooltip: "Your luggage arrives faster." },
        { icon: <HandPlatter className="w-5 h-5 text-blue-800" />, text: "Priority customer care", tooltip: "Priority support." },
        { icon: <BadgeCheck className="w-5 h-5 text-blue-800" />, text: "Priority check-in", tooltip: "Dedicated counter for faster service." },
        { icon: <CircleDollarSign className="w-5 h-5 text-blue-800" />, text: "€10 discount on flight fares from €39.99", tooltip: "Save €10 on fares." },
      ]
    },
    {
      title: "VIP Membership",
      gradient: "linear-gradient(90deg, #1d4ed8, #3b82f6)",
      price: "€99.99 / year",
      badge: "VIP",
      benefits: [
        { icon: <Users className="w-5 h-5 text-blue-500" />, text: "Benefits for you and 1 companion", tooltip: "Share perks with 1 companion." },
        { icon: <HandPlatter className="w-5 h-5 text-blue-800" />, text: "Priority customer care", tooltip: "VIP support." },
        { icon: <Luggage className="w-5 h-5 text-blue-800" />, text: "Extra baggage allowance", tooltip: "Get an additional 5kg of checked baggage." },
        { icon: <TicketsPlane className="w-5 h-5 text-blue-800" />, text: "Priority boarding", tooltip: "Skip the line and board first." },
        { icon: <Calendar className="w-5 h-5 text-blue-800" />, text: "Flexible booking dates", tooltip: "Change flight dates without extra fees." },
        { icon: <Feather className="w-5 h-5 text-blue-800" />, text: "Wellness & spa vouchers", tooltip: "Relax with exclusive spa discounts." },
        { icon: <CircleDollarSign className="w-5 h-5 text-blue-800" />, text: "€10 discount on flight fares from €29.99", tooltip: "Save €10 on flights." },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white p-12">
      <h1 className="text-3xl font-bold -mt-9 mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-900 via-gray-500 to-gray-900 animate-gradient-text">
        Memberships
        <style>{`
    @keyframes gradientMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient-text {
      background-size: 200% 200%;
      animation: gradientMove 4s ease infinite;
    }
  `}</style>
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-4 md:gap-3 justify-items-center items-start">
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
