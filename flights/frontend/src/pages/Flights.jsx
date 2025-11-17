import React, { useState } from "react";
import { TicketsPlane } from "lucide-react";

const flights = [
  { from: "Prishtina", to: "Istanbul", price: "€120", duration: "2h 15min", airline: "Turkish Airlines", departure: "14:00", arrival: "16:15", returnDeparture: "18:30", returnArrival: "20:45", returnTo: "Prishtina" },
  { from: "Prishtina", to: "London", price: "€250", duration: "4h 30min", airline: "British Airways", departure: "10:00", arrival: "14:30", returnDeparture: "20:30", returnArrival: "01:00", returnTo: "Prishtina" },
  { from: "Tirana", to: "Rome", price: "€90", duration: "1h 50min", airline: "Alitalia", departure: "09:30", arrival: "11:20", returnDeparture: "17:15", returnArrival: "19:05", returnTo: "Tirana" },
  { from: "Tirana", to: "Paris", price: "€200", duration: "3h 40min", airline: "Air France", departure: "12:45", arrival: "16:25", returnDeparture: "21:00", returnArrival: "00:40", returnTo: "Tirana" }
];

const FlightCard = ({ flight, isReturn }) => (
  <div className="relative bg-white rounded-3xl shadow-md overflow-hidden border border-gray-300 hover:shadow-xl transition-all duration-300 w-full mx-auto">
    <div className="p-7 pb-5">
      {/* Airline + Icon */}
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-800">{flight.airline}</span>
        <TicketsPlane className="text-blue-600 w-6 h-6" />
      </div>

      {/* ROUTE */}
      <div className="flex flex-col gap-4">
        {/* Departure leg */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{flight.from}</h3>
            <p className="text-gray-400 text-sm">PRN</p>
            <p className="text-gray-800 font-semibold text-xl mt-1">{flight.departure}</p>
          </div>
          <div className="text-4xl">→</div>
          <div>
            <h3 className="text-2xl font-bold">{flight.to}</h3>
            <p className="text-gray-400 text-sm">IST</p>
            <p className="text-gray-800 font-semibold text-xl mt-1">{flight.arrival}</p>
          </div>
        </div>

        {/* Return leg */}
        {isReturn && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{flight.to}</h3>
                <p className="text-gray-400 text-sm">IST</p>
                <p className="text-gray-800 font-semibold text-xl mt-1">{flight.returnDeparture}</p>
              </div>
              <div className="text-4xl">→</div>
              <div>
                <h3 className="text-2xl font-bold">{flight.returnTo}</h3>
                <p className="text-gray-400 text-sm">PRN</p>
                <p className="text-gray-800 font-semibold text-xl mt-1">{flight.returnArrival}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-semibold">Return Flight</p>
          </div>
        )}
      </div>

      {/* Duration + Price */}
      <div className="mt-4 flex justify-between">
        <span className="text-gray-600">Duration: {flight.duration}</span>
        <span className="text-blue-600 font-bold text-lg">{flight.price}</span>
      </div>
    </div>

    <div className="border-t border-dashed border-gray-300 my-2"></div>

    {/* Bottom button */}
    <div className="p-6 pt-4">
      <button className="bg-blue-600 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition">
        Book Now
      </button>
    </div>

    {/* Ticket holes */}
    <div className="absolute top-1/2 -left-4 w-8 h-8 bg-gray-100 rounded-full border border-gray-300"></div>
    <div className="absolute top-1/2 -right-4 w-8 h-8 bg-gray-100 rounded-full border border-gray-300"></div>
  </div>
);

const FlightsSection = () => {
  const [isReturn, setIsReturn] = useState(false);

  return (
    <section className="py-20 bg-gray-100 w-full -mt-10 flex flex-col items-center">
      {/* OneWay / Return buttons */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={() => setIsReturn(false)}
          className={`px-6 py-2 rounded-xl font-semibold transition ${!isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}
        >
          OneWay
        </button>
        <button
          onClick={() => setIsReturn(true)}
          className={`px-6 py-2 rounded-xl font-semibold transition ${isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}
        >
          Return
        </button>
      </div>

      {/* Flight cards */}
      <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} isReturn={isReturn} />
        ))}
      </div>
    </section>
  );
};

export default FlightsSection;
