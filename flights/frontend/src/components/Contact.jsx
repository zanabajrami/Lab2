import React, { useState, useEffect } from "react";
import axios from "axios";

function Contact({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  // bllokon scroll kur modal hapet
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // rikthen scroll kur modal mbyllet
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
      document.body.style.overflow = "auto";
    }, 300); // koha duhet të përputhet me animacionin
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8800/api/messages",
        {
          name,
          email,
          message,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert("Your message has been sent! 📩");

      setName("");
      setEmail("");
      setMessage("");
      handleClose();
    } catch (error) {
      console.error("Message send error:", error);
      alert("Something went wrong. Please try again ❌");
    }
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose?.()}
      className={`fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md z-50 transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"
        }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-[95%] md:max-w-md p-10 rounded-3xl relative
       bg-gradient-to-br from-slate-900 via-slate-0 to-blue-900
       border border-slate-700 backdrop-blur-lg shadow-xl shadow-black/40
       animate-formGlow transform transition-all duration-500 ${isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-90 translate-y-5"
          }`}
      >
        <h2
          className="text-xl md:text-2xl font-serif font-medium italic text-center text-slate-400
               tracking-wide mb-6 uppercase
               relative before:content-[''] before:block before:w-10 before:h-[2px]
               before:bg-slate-400 before:mx-auto before:mb-2"
        >
          Contact Us
        </h2>

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
                       shadow-lg shadow-blue-800/50
                       transition-all duration-300 hover:ring-blue-300/50 animate-glowPulse"
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
                       shadow-lg shadow-blue-800/50
                       transition-all duration-300 hover:ring-blue-300/50 animate-glowPulse"
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
                       shadow-lg shadow-blue-800/50
                       transition-all duration-300 hover:ring-blue-300/50 resize-none animate-glowPulse"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-950 to-blue-750
                       text-slate-100 font-semibold font-serif tracking-wide text-base
                       shadow-lg shadow-blue-900/50
                       hover:shadow-xl hover:shadow-blue-800/60
                       transition-all duration-500 ease-out transform hover:scale-[1.03] animate-pulseButton"
          >
            Send Message
          </button>
        </form>
      </div>

      <style>{`
        @keyframes heavyPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        .animate-heavyPop { animation: heavyPop 0.5s ease-out forwards; }

        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(59,130,246,0.4); }
          50% { box-shadow: 0 0 20px rgba(59,130,246,0.7); }
        }
        .animate-glowPulse { animation: glowPulse 2s infinite; }

        @keyframes pulseButton {
          0%, 100% { box-shadow: 0 0 15px rgba(59,130,246,0.5); }
          50% { box-shadow: 0 0 25px rgba(59,130,246,0.8); }
        }
        .animate-pulseButton { animation: pulseButton 2s infinite; }

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

        @keyframes formGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 40px rgba(59,130,246,0.6); }
        }
        .animate-formGlow { animation: formGlow 3s infinite; }
      `}</style>
    </div>
  );
}

export default Contact;
