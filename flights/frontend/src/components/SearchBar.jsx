import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CustomDropdown({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-3 rounded-xl border border-gray-300 bg-white/90 
                   text-gray-800 font-medium flex justify-between items-center
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   hover:border-blue-400 transition-all duration-300 cursor-pointer
                   shadow-sm focus:shadow-md focus:shadow-blue-100"
      >
        {value || label}
        <span
          className={`text-blue-500 transition-transform duration-300 ${open ? "rotate-180" : ""
            }`}
        >
          ▼
        </span>
      </button>

      {open && (
        <ul
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl 
                     shadow-lg overflow-hidden animate-fadeIn"
        >
          {options.map((option) => (
            <li
              key={option}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 
                         cursor-pointer transition-all duration-150"
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease forwards;
        }
      `}</style>
    </div>
  );
}

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
    <div className="w-full max-w-5xl mx-auto mt-8 md:mt-12">
      {/* Trip type buttons */}
      <div className="flex justify-center gap-6 mb-6 text-gray-700 font-medium">
        <button
          type="button"
          onClick={() => setTripType("oneway")}
          className={`px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300
            ${tripType === "oneway"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300 scale-[1.05]"
              : "bg-white/70 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:scale-[1.03]"
            }`}
        >
          One Way
        </button>

        <button
          type="button"
          onClick={() => setTripType("return")}
          className={`px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300
            ${tripType === "return"
              ? "bg-blue-600 text-white shadow-md shadow-blue-300 scale-[1.05]"
              : "bg-white/70 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:scale-[1.03]"
            }`}
        >
          Return
        </button>
      </div>

      {/* Search form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-6 py-6 flex flex-col md:flex-row gap-4 items-center 
             transition duration-300 hover:shadow-blue-200/50"
      >
        {/* Custom Dropdowns */}
        <div className="basis-1/3 w-full">
          <CustomDropdown
            label="✈️ From"
            value={from}
            onChange={setFrom}
            options={["Prishtina (PRN)", "Tirana (TIA)"]}
          />
        </div>

        <div className="basis-1/3 w-full">
          <CustomDropdown
            label="🧳 To"
            value={to}
            onChange={setTo}
            options={[
              "London (LHR)",
              "Paris (CDG)",
              "Rome (FCO)",
              "Vienna (VIE)",
              "Istanbul (IST)",
              "Zurich (ZRH)",
              "Berlin (BER)",
              "Athens (ATH)",
            ]}
          />
        </div>

        {/* Departure Date */}
        <div className="relative basis-1/5 w-full">
          <DatePicker
            selected={departureDate}
            onChange={(date) => setDepartureDate(date)}
            minDate={new Date()}
            maxDate={returnDate || null} // <-- nuk lejon të zgjedhesh pas Return
            placeholderText="Departure"
            dateFormat="MM/dd/yyyy"
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70
       focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700
       hover:border-blue-400 transition-all duration-300 cursor-pointer"
          />
        </div>

        {/* Return Date */}
        <div className="relative basis-1/5 w-full group">
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            minDate={departureDate || new Date()}
            placeholderText="Return"
            dateFormat="MM/dd/yyyy"
            disabled={tripType === "oneway"}
            className={`w-full p-3 rounded-xl border border-gray-300 bg-white/70
       focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700
       transition-all duration-300 cursor-pointer
       ${tripType === "oneway"
                ? "opacity-40 cursor-not-allowed"
                : "hover:border-blue-400 opacity-100"}`}
          />

          {tripType === "oneway" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              🚫
            </span>
          )}
        </div>

        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          placeholder="Passengers"
          className="basis-1/6 p-3 rounded-xl border border-gray-300 bg-white/70 
                     focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 
                     placeholder-gray-500 hover:border-blue-400 transition-all duration-300 w-full"
        />

        {/* Button */}
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 
                     hover:from-blue-700 hover:via-blue-500 hover:to-blue-700 
                     text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-blue-900/40
                     transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          Search
        </button>
      </form>
    </div>
  );
}
