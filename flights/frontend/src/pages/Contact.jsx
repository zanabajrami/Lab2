import React, { useState } from "react";

function Contact({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent! 📩");
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && typeof onClose === "function") {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md p-10 rounded-3xl relative
                   bg-gradient-to-br from-slate-900 via-slate-750 to-blue-900
                   border border-slate-700 backdrop-blur-lg transform scale-95 animate-heavyPop shadow-xl shadow-black/40"
      >
        {/* Title */}
        <h2
          className="text-[1.25rem] md:text-[1.45rem] font-serif italic text-center text-slate-200 
                     tracking-wide mb-8 relative before:content-[''] before:block before:w-16 before:h-[1px] 
                     before:bg-gradient-to-r from-slate-500 via-blue-400 to-slate-500 before:mx-auto before:mb-3"
        >
          Contact Us
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-2xl border border-slate-600
                       bg-slate-900/70 placeholder-slate-400 text-slate-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400/60
                       transition-all duration-300 hover:ring-blue-300/50 shadow-sm shadow-blue-900/20"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-2xl border border-slate-600
                       bg-slate-900/70 placeholder-slate-400 text-slate-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400/60
                       transition-all duration-300 hover:ring-blue-300/50 shadow-sm shadow-blue-900/20"
          />
          <textarea
            rows="4"
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className="w-full px-5 py-3 rounded-2xl border border-slate-600
                       bg-slate-900/70 placeholder-slate-400 text-slate-100
                       focus:outline-none focus:ring-2 focus:ring-blue-400/60
                       transition-all duration-300 hover:ring-blue-300/50 shadow-sm shadow-blue-900/20 resize-none"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-800 via-slate-500 to-blue-600
                       text-slate-100 font-semibold tracking-wide text-base
                       shadow-md shadow-blue-900/40
                       hover:from-blue-700 hover:via-slate-500 hover:to-blue-500
                       hover:shadow-lg hover:shadow-blue-800/30
                       transition-all duration-500 ease-out transform hover:scale-[1.03]"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Animations + Autofill Fix */}
      <style>
        {`
          @keyframes heavyPop {
            0% { transform: scale(0.7); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-heavyPop {
            animation: heavyPop 0.5s ease-out forwards;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover, 
          input:-webkit-autofill:focus, 
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px #0f172a inset;
            -webkit-text-fill-color: #e2e8f0;
            transition: background-color 5000s ease-in-out 0s;
          }
        `}
      </style>
    </div>
  );
}

export default Contact;
