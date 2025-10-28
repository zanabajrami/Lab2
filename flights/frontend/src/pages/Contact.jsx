import React, { useState } from "react";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill out all fields!");
      return;
    }

    alert("📧Your message has been sent.");
    
    // Pas alert mund të pastrohen fushat
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-indigo-200 via-blue-200 to-cyan-200 font-[Poppins] p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/50 backdrop-blur-lg border border-gray-300 p-10 rounded-2xl shadow-2xl w-full max-w-lg text-gray-800"
      >
        <h2 className="text-3xl text-center font-semibold mb-6 text-gray-800">
          Contact Us
        </h2>
        <p className="text-md text-center text-gray-700 mb-8">
          We’d love to hear from you! Fill out the form below.
        </p>

        {/* Name */}
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-3 mb-4 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Message */}
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={5}
          className="w-full p-3 mb-6 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          Send Message
        </button>

      </form>
    </div>
  );
}

export default Contact;
