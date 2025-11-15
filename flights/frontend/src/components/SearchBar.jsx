import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { PlaneTakeoff, PlaneLanding, Ban } from "lucide-react";

// Custom Dropdown Component
function CustomDropdown({ label, options, value, onChange, isOpen, onToggle }) {
  return (
    <div className="relative w-full">
      {/* Button */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-3 rounded-xl border border-gray-300 bg-white/90 
                   text-gray-800 font-medium flex justify-between items-center
                   focus:outline-none focus:ring-2 focus:ring-blue-500 
                   hover:border-blue-400 transition-all duration-300 cursor-pointer
                   shadow-sm focus:shadow-md focus:shadow-blue-100"
      >
        {value || label}
        <span className={`text-blue-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* Dropdown options */}
      {isOpen && (
        <ul className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg
                       overflow-y-auto max-h-48 animate-fadeIn">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => onChange(option)}
              className="px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 cursor-pointer transition-all duration-150"
            >
              {option}
            </li>
          ))}
        </ul>
      )}

      {/* Fade-in animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease forwards; }
      `}</style>
    </div>
  );
}

// Main Search Bar
export default function SearchBar() {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);

  // Track which dropdown/picker is open
  const [openDropdown, setOpenDropdown] = useState(null);
  // possible values: 'from', 'to', 'departure', 'return', 'passengers', null

  // Ref for detecting clicks outside
  const formRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenDropdown(null); // close all dropdowns
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!from || !to || !departureDate) {
      alert("Please fill all required fields!");
      return;
    }

    const text =
      tripType === "oneway"
        ? `Searching one-way flight from ${from} to ${to} on ${departureDate.toLocaleDateString()} for ${passengers} passenger(s).`
        : `Searching return flight from ${from} to ${to}, departing ${departureDate.toLocaleDateString()} and returning ${returnDate ? returnDate.toLocaleDateString() : "N/A"} for ${passengers} passenger(s).`;

    alert(text);
    setOpenDropdown(null); // close all after submit
  };

  return (
    <div className="w-full max-w-full mx-auto mt-8 md:mt-12 px-4 md:px-6 max-w-[75%] md:max-w-5xl">
      {/* Trip type buttons */}
      <div className="flex justify-center gap-6 mb-6 text-gray-700 font-medium">
        {["oneway", "return"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300
              ${tripType === type
                ? "bg-blue-600 text-white shadow-md shadow-blue-300 scale-[1.05]"
                : "bg-white/70 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:scale-[1.03]"}`}
          >
            {type === "oneway" ? "One Way" : "Return"}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form
        ref={formRef} // <-- attach ref
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl px-6 py-6 flex flex-col md:flex-row gap-4 items-center transition duration-300 hover:shadow-blue-200/50"
      >
        {/* From */}
        <div className="basis-1/5 w-full">
          <CustomDropdown
            label={
              <div className="flex items-center gap-2">
                <PlaneTakeoff className="w-5 h-5 text-blue-500" />
                From
              </div>
            }
            value={from}
            onChange={(val) => { setFrom(val); setOpenDropdown(null); }}
            options={["Prishtina (PRN)", "Tirana (TIA)"]}
            isOpen={openDropdown === "from"}
            onToggle={() => setOpenDropdown(openDropdown === "from" ? null : "from")}
          />
        </div>

        {/* To */}
        <div className="basis-1/5 w-full">
          <CustomDropdown
            label={
              <div className="flex items-center gap-2">
                <PlaneLanding className="w-5 h-5 text-blue-500" />
                To
              </div>
            }
            value={to}
            onChange={(val) => { setTo(val); setOpenDropdown(null); }}
            options={[
              "London (LHR)", "Paris (CDG)", "Rome (FCO)", "Vienna (VIE)",
              "Istanbul (IST)", "Zurich (ZRH)", "Berlin (BER)", "Athens (ATH)"
            ]}
            isOpen={openDropdown === "to"}
            onToggle={() => setOpenDropdown(openDropdown === "to" ? null : "to")}
          />
        </div>

        {/* Departure Date */}
        <div className="relative basis-1/5 w-full max-w-[95%]">
          <DatePicker
            selected={departureDate}
            onChange={(date) => { setDepartureDate(date); setOpenDropdown(null); }}
            minDate={new Date()}
            maxDate={returnDate || null}
            placeholderText="Departure"
            dateFormat="MM/dd/yyyy"
            onFocus={() => setOpenDropdown("departure")}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 hover:border-blue-400 transition-all duration-300 cursor-pointer"
          />
        </div>

        {/* Return Date */}
        <div className="relative basis-1/5 w-full max-w-[98%] group">
          <DatePicker
            selected={returnDate}
            onChange={(date) => setReturnDate(date)}
            minDate={departureDate || new Date()}
            placeholderText="Return"
            dateFormat="MM/dd/yyyy"
            disabled={tripType === "oneway"}
            onFocus={() => tripType === "return" && setOpenDropdown("return")}
            className={`w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 transition-all duration-300 cursor-pointer
              ${tripType === "oneway" ? "opacity-40 cursor-not-allowed" : "hover:border-blue-400 opacity-100"}`}
          />
          {tripType === "oneway" && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <Ban className="w-4 h-4" />
            </span>
          )}
        </div>

        {/* Passengers */}
        <div className="basis-1/6 w-full relative">
          <input
            type="number"
            min="1"
            value={passengers}
            onChange={(e) => setPassengers(e.target.value)}
            placeholder="Passengers"
            onFocus={() => setOpenDropdown("passengers")}
            onBlur={() => setOpenDropdown(null)}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 placeholder-gray-500 hover:border-blue-400 transition-all duration-300"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-500 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-blue-900/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          Search
        </button>
      </form>
    </div>
  );
}
