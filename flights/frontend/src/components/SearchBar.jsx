import React, { useState } from "react";

export default function SearchBar() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      alert("Please fill in all fields!");
      return;
    }
    alert(`Searching flights from ${from} to ${to} on ${date} for ${passengers} passenger(s).`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto mt-6 md:mt-10 bg-white/80 backdrop-blur-md shadow-2xl 
                 rounded-3xl px-6 py-5 md:px-8 md:py-6 flex flex-col md:flex-row gap-4 items-center 
                 transition duration-300 hover:shadow-blue-200/60"
    >
      {/* FROM */}
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="flex-1 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 text-gray-700 placeholder-gray-500"
      >
        <option value="">From</option>
        <option value="Prishtina">Prishtina (PRN)</option>
        <option value="Tirana">Tirana (TIA)</option>
      </select>

      {/* TO */}
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="flex-1 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 text-gray-700 placeholder-gray-500"
      >
        <option value="">To</option>
        <option value="London">London (LHR)</option>
        <option value="Paris">Paris (CDG)</option>
        <option value="Rome">Rome (FCO)</option>
        <option value="Vienna">Vienna (VIE)</option>
        <option value="Istanbul">Istanbul (IST)</option>
        <option value="Zurich">Zurich (ZRH)</option>
        <option value="Berlin">Berlin (BER)</option>
        <option value="Athens">Athens (ATH)</option>
      </select>

      {/* DATE */}
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="flex-1 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 text-gray-700"
      />

      {/* PASSENGERS */}
      <input
        type="number"
        min="1"
        value={passengers}
        onChange={(e) => setPassengers(e.target.value)}
        placeholder="Passengers"
        className="flex-1 w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
                   focus:ring-blue-500 text-gray-700 placeholder-gray-500"
      />

      {/* SEARCH BUTTON */}
      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 
                   rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Search Flights
      </button>
    </form>
  );
}
