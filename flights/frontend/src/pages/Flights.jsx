import React from "react";

const flights = [
  {
    from: "Prishtina",
    to: "Istanbul",
    price: "€120",
    duration: "2h 15min",
  },
  {
    from: "Prishtina",
    to: "London",
    price: "€250",
    duration: "4h 30min",
  },
  {
    from: "Tirana",
    to: "Rome",
    price: "€90",
    duration: "1h 50min",
  },
  {
    from: "Tirana",
    to: "Paris",
    price: "€200",
    duration: "3h 40min",
  },
];

const FlightCard = ({ flight }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300">
    <h3 className="text-xl font-bold mb-2">{flight.from} → {flight.to}</h3>
    <p className="text-gray-600 mb-2">Duration: {flight.duration}</p>
    <p className="text-blue-600 font-semibold mb-4">{flight.price}</p>
    <button className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition">
      Book Now
    </button>
  </div>
);

const FlightsSection = () => (
  <section className="py-20 bg-gray-100 w-full flex justify-center">
    <div className="w-full max-w-[1100px] px-4">
      <h2 className="text-3xl font-bold mb-10 text-center">Flights from Prishtina & Tirana</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} />
        ))}
      </div>
    </div>
  </section>
);

export default FlightsSection;
