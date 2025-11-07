import React, { useState } from "react";

export default function SearchBar() {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !departureDate) {
      alert("Please fill all fields!");
      return;
    }

    const text =
      tripType === "oneway"
        ? `Searching one-way flight from ${from} to ${to} on ${departureDate} for ${passengers} passenger(s).`
        : `Searching return flight from ${from} to ${to}, departing ${departureDate} and returning ${returnDate} for ${passengers} passenger(s).`;

    alert(text);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-10">
      {/* One Way / Return selector */}
      <div className="flex justify-center gap-6 mb-4 text-gray-700 font-medium">
    <div className="flex items-center justify-center gap-3 mt-4">
  <button
    type="button"
    onClick={() => setTripType("oneway")}
    className={`px-5 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300
      ${tripType === "oneway"
        ? "bg-blue-600 text-white shadow-md shadow-blue-300 scale-[1.05]"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.03]"
      }`}
  >
    One Way
  </button>

  <button
    type="button"
    onClick={() => setTripType("return")}
    className={`px-5 py-2 text-sm md:text-base font-medium rounded-full transition-all duration-300
      ${tripType === "return"
        ? "bg-blue-600 text-white shadow-md shadow-blue-300 scale-[1.05]"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-[1.03]"
      }`}
  >
    Return
  </button>
</div>

      </div>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-6 py-5 flex flex-col md:flex-row gap-4 items-center 
             transition duration-300 hover:shadow-blue-200/50"
      >
        {/* FROM */}
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="basis-1/3 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
               focus:ring-blue-500 text-gray-700 w-full"
        >
          <option value="">From</option>
          <option value="Prishtina">Prishtina (PRN)</option>
          <option value="Tirana">Tirana (TIA)</option>
        </select>

        {/* TO */}
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="basis-1/3 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
               focus:ring-blue-500 text-gray-700 w-full"
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

        {/* DEPARTURE DATE */}
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          className="basis-1/4 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
               focus:ring-blue-500 text-gray-700 w-full"
        />

        {/* RETURN DATE */}
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          disabled={tripType === "oneway"}
          className={`basis-1/4 p-3 rounded-xl border border-gray-300 focus:outline-none 
               focus:ring-2 focus:ring-blue-500 text-gray-700 w-full transition-all duration-300 
               ${tripType === "oneway"
              ? "opacity-40 cursor-not-allowed"
              : "opacity-100"
            }`}
        />

        {/* PASSENGERS */}
        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          placeholder="Passengers"
          className="basis-1/6 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 
               focus:ring-blue-500 text-gray-700 placeholder-gray-500 w-full"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 
               rounded-xl transition transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Search
        </button>
      </form>

    </div>
  );
}
