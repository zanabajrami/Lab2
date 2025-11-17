import React, { useState } from "react";
import { TicketsPlane } from "lucide-react";

const flights = [
  { from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "IST", price: "€120", duration: "2h 15min", airline: "Turkish Airlines", departure: "14:00", arrival: "16:15", returnDeparture: "18:30", returnArrival: "20:45", returnTo: "Prishtina", returnToCode: "PRN" },
  { from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LHR", price: "€250", duration: "4h 30min", airline: "British Airways", departure: "10:00", arrival: "14:30", returnDeparture: "20:30", returnArrival: "01:00", returnTo: "Prishtina", returnToCode: "PRN" },
  { from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", price: "€90", duration: "1h 50min", airline: "Alitalia", departure: "09:30", arrival: "11:20", returnDeparture: "17:15", returnArrival: "19:05", returnTo: "Tirana", returnToCode: "TIA" },
  { from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", price: "€200", duration: "3h 40min", airline: "Air France", departure: "12:45", arrival: "16:25", returnDeparture: "21:00", returnArrival: "00:40", returnTo: "Tirana", returnToCode: "TIA" }
];

// Calendar Component
const Calendar = ({ selectedDate, setSelectedDate, minDate, maxDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysArray = [];

  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++) daysArray.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));

  const isDisabled = (day) => {
    if (!day) return true;
    if (minDate && day < minDate) return true;
    if (maxDate && day > maxDate) return true;
    return false;
  };

  const nextMonth = () => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    setCurrentMonth(next);
  };

  const prevMonth = () => {
    const prev = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    if (prev >= minDate) setCurrentMonth(prev);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button onClick={prevMonth} className="px-2 py-1 rounded hover:bg-gray-200 transition">&lt;</button>
        <span className="font-semibold">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</span>
        <button onClick={nextMonth} className="px-2 py-1 rounded hover:bg-gray-200 transition">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold">{d}</div>
        ))}
        {daysArray.map((day, index) => {
          const disabled = isDisabled(day);
          const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();
          return (
            <button
              key={index}
              onClick={() => !disabled && setSelectedDate(day)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition ${disabled ? "text-gray-300 cursor-not-allowed" : isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"
                }`}
            >
              {day ? day.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// FlightCard Component
const FlightCard = ({ flight, isReturn, openModal }) => (
  <div className="relative bg-white rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300 w-full mx-auto">
    <div className="p-7 pb-5">
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold text-gray-800">{flight.airline}</span>
        <TicketsPlane className="text-blue-600 w-6 h-6" />
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">{flight.from}</h3>
            <p className="text-gray-400 text-sm">{flight.fromCode}</p>
            <p className="text-gray-800 font-semibold text-xl mt-1">{flight.departure}</p>
          </div>
          <div className="text-4xl h-12 flex items-center justify-center">→</div>
          <div>
            <h3 className="text-2xl font-bold">{flight.to}</h3>
            <p className="text-gray-400 text-sm">{flight.toCode}</p>
            <p className="text-gray-800 font-semibold text-xl mt-1">{flight.arrival}</p>
          </div>
        </div>

        {isReturn && (
          <div className="mt-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">{flight.to}</h3>
                <p className="text-gray-400 text-sm">{flight.toCode}</p>
                <p className="text-gray-800 font-semibold text-xl mt-1">{flight.returnDeparture}</p>
              </div>
              <div className="text-4xl h-12 flex items-center justify-center">→</div>
              <div>
                <h3 className="text-2xl font-bold">{flight.returnTo}</h3>
                <p className="text-gray-400 text-sm">{flight.returnToCode}</p>
                <p className="text-gray-800 font-semibold text-xl mt-1">{flight.returnArrival}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-semibold">Return Flight</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <span className="text-gray-600">Duration: {flight.duration}</span>
        <span className="text-blue-600 font-bold text-lg">{flight.price}</span>
      </div>
    </div>

    <div className="border-t border-dashed border-gray-300 my-2"></div>

    <div className="p-6 pt-4">
      <button onClick={() => openModal(flight)} className="bg-blue-600 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition">
        Book Now
      </button>
    </div>

    <div className="absolute top-1/2 -left-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-r-full"></div>
    <div className="absolute top-1/2 -right-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-l-full"></div>
  </div>
);

// Flights Section
const FlightsSection = () => {
  const [isReturn, setIsReturn] = useState(false);
  const [modalFlight, setModalFlight] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate()); // 1 year

  const openModal = (flight) => setModalFlight(flight);
  const closeModal = () => {
    setModalFlight(null);
    setDepartureDate(null);
    setReturnDate(null);
  };

  return (
    <section className="py-20 bg-gray-100 w-full -mt-10 flex flex-col items-center">
      <div className="flex gap-4 mb-10">
        <button onClick={() => setIsReturn(false)} className={`px-6 py-2 rounded-xl font-semibold transition ${!isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>OneWay</button>
        <button onClick={() => setIsReturn(true)} className={`px-6 py-2 rounded-xl font-semibold transition ${isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>Return</button>
      </div>

      <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {flights.map((flight, index) => (
          <FlightCard key={index} flight={flight} isReturn={isReturn} openModal={openModal} />
        ))}
      </div>

      {/* Modal */}
      {modalFlight && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-96 max-h-[90vh] overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()} // mos lejo klik brenda modal te mbyll
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">{modalFlight.from} → {modalFlight.to}</h2>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <p className="mb-2 font-semibold">Departure Date</p>
                <Calendar selectedDate={departureDate} setSelectedDate={setDepartureDate} minDate={today} maxDate={maxDate} />
              </div>
              {isReturn && (
                <div>
                  <p className="mb-2 mt-4 font-semibold">Return Date</p>
                  <Calendar selectedDate={returnDate} setSelectedDate={setReturnDate} minDate={departureDate || today} maxDate={maxDate} />
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={() => {
                  if (!departureDate) {
                    alert("You didn't choose a departure date");
                    return;
                  }
                  if (isReturn && !returnDate) {
                    alert("You didn't choose a return date");
                    return;
                  }
                  alert(`Departure: ${departureDate}\nReturn: ${returnDate || "N/A"}`);
                  closeModal();
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}


    </section>
  );
};

export default FlightsSection;
