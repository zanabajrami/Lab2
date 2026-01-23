import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import CustomDropdown from "../components/CustomDropdown";
import Calendar from "../components/flights/Calendar";
import PaymentForm from "../components/PaymentForm";
import FlightCard from "../components/flights/FlightCard";
import { generateFlightVariants, useBodyScrollLock } from "../components/flights/FlightUtils";
import { baseFlights } from "../data/FlightsData";

const flights = baseFlights.flatMap(f => generateFlightVariants(f, 5, 2));

const FlightsSection = () => {
  const [isReturn, setIsReturn] = useState(false);
  const [modalFlight, setModalFlight] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showTopButton, setShowTopButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [persons, setPersons] = useState(1);
  const [modalStep, setModalStep] = useState(1);
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  const flightsPerPage = 20;
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate());

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchFrom = params.get("from");
  const searchTo = params.get("to");
  const searchTrip = params.get("trip");
  const [, setSearchParams] = useSearchParams();

  useBodyScrollLock(!!modalFlight);

  const filteredFlights = flights.filter(flight => {
    const matchesFrom = fromFilter ? flight.from.toLowerCase() === fromFilter.toLowerCase() : (searchFrom ? flight.from.toLowerCase() === searchFrom.toLowerCase() : true);
    const matchesTo = toFilter ? flight.to.toLowerCase() === toFilter.toLowerCase() : (searchTo ? flight.to.toLowerCase() === searchTo.toLowerCase() : true);
    const matchesTrip = !searchTrip || (searchTrip === "oneway" && !flight.isReturn) || (searchTrip === "return" && flight.isReturn);
    return matchesFrom && matchesTo && matchesTrip;
  });

  const flightsByType = filteredFlights.filter(f => f.isReturn === isReturn);
  const totalPages = Math.ceil(flightsByType.length / flightsPerPage);
  const currentFlights = flightsByType.slice((currentPage - 1) * flightsPerPage, currentPage * flightsPerPage);

  const fromCities = [...new Set(baseFlights.map(f => f.from))];
  const toCities = [...new Set(baseFlights.map(f => f.to))];

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored) || []);

    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (modalFlight) {
      setPassengerInfo(Array.from({ length: persons }, () => ({
        firstName: "", lastName: "", email: "", phone: "", passportNumber: "", dob: "", nationality: ""
      })));
      setCurrentPassengerIndex(0);
    }
  }, [modalFlight, persons]);

  const openModal = (flight) => {
    setModalFlight(flight);
    setModalStep(1);
    setPersons(1);
  };

  const closeModal = () => {
    setModalFlight(null);
    setShowPaymentForm(false);
  };

  const basePrice = modalFlight ? (modalFlight.return ? Math.round(modalFlight.oneWay.price * 1.6) : modalFlight.oneWay.price) : 0;
  const totalPrice = basePrice * persons;

  const validatePassenger = (p) => {
    return (
      p.firstName.trim() !== "" &&
      p.lastName.trim() !== "" &&
      p.email.trim() !== "" &&
      p.phone.trim() !== "" &&
      p.passportNumber.trim() !== "" &&
      p.dob.trim() !== "" &&
      p.nationality.trim() !== ""
    );
  };

  const getPages = (total, current) => {
    const pages = [];
    if (total <= 7) { for (let i = 1; i <= total; i++) pages.push(i); }
    else {
      if (current <= 4) pages.push(1, 2, 3, 4, 5, "...", total);
      else if (current >= total - 3) pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
      else pages.push(1, "...", current - 1, current, current + 1, "...", total);
    }
    return pages;
  };

  return (
    <section className="py-20 w-full -mt-10 flex flex-col items-center">
      <div className="flex gap-4 mb-6">
        <button onClick={() => setIsReturn(false)} className={`px-6 py-2 rounded-xl font-semibold transition ${!isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>OneWay</button>
        <button onClick={() => setIsReturn(true)} className={`px-6 py-2 rounded-xl font-semibold transition ${isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>Return</button>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        <CustomDropdown options={fromCities} selected={fromFilter} setSelected={(val) => { setFromFilter(val); setCurrentPage(1); }} placeholder="From" />
        <CustomDropdown options={toCities} selected={toFilter} setSelected={(val) => { setToFilter(val); setCurrentPage(1); }} placeholder="To" />
        <button onClick={() => { setFromFilter(""); setToFilter(""); setSearchParams({}); }} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 shadow-sm">Reset Filters</button>
      </div>

      <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {currentFlights.map(f => (
          <FlightCard
            key={f.id}
            flight={f}
            openModal={openModal}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        ))}
      </div>

      {modalFlight && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-96 max-h-[90vh] overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {modalStep === 1 ? (
              <>
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">{modalFlight.from} → {modalFlight.to}</h2>
                </div>

                <div className="p-6 flex-1 overflow-y-auto space-y-4">
                  <Calendar
                    selectedDate={departureDate}
                    setSelectedDate={setDepartureDate}
                    minDate={today}
                    maxDate={maxDate}
                  />

                  {modalFlight.return && (
                    <Calendar
                      selectedDate={returnDate}
                      setSelectedDate={setReturnDate}
                      minDate={departureDate || today}
                      maxDate={maxDate}
                    />
                  )}
                </div>

                <div className="p-6 border-t flex justify-between items-center">
                  <select
                    value={persons}
                    onChange={(e) => setPersons(Number(e.target.value))}
                    className="border p-2 rounded-lg"
                  >
                    {[1, 2, 3, 4, 5, 6].map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                    ))}
                  </select>

                  <div className="text-lg font-semibold">
                    Total Price: €{basePrice * persons}
                  </div>

                  <button
                    onClick={() => {
                      if (!departureDate) {
                        alert("Choose a departure date");
                        return;
                      }
                      if (modalFlight.return && !returnDate) {
                        alert("Choose a return date");
                        return;
                      }
                      setModalStep(2);
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    Next
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="p-6 flex-1 flex flex-col gap-4 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-2">
                    Passenger {currentPassengerIndex + 1} of {persons}
                  </h3>

                  {["First Name", "Last Name","Birthday","Passport Number", "Nationality", "Email", "Phone Number"].map(field => (
                    <input
                      key={field}
                      type="text"
                      placeholder={field}
                      className="border p-2 rounded-lg"
                      value={passengerInfo[currentPassengerIndex][field]}
                      onChange={(e) => {
                        const copy = [...passengerInfo];
                        copy[currentPassengerIndex][field] = e.target.value;
                        setPassengerInfo(copy);
                      }}
                    />
                  ))}
                </div>

                <div className="p-6 border-t flex justify-between items-center">
                  <button
                    onClick={() => {
                      if (currentPassengerIndex > 0) {
                        setCurrentPassengerIndex(i => i - 1);
                      } else {
                        setModalStep(1);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => {
                      if (!validatePassenger(passengerInfo[currentPassengerIndex])) {
                        alert("Please fill all required passenger fields");
                        return;
                      }

                      if (currentPassengerIndex < persons - 1) {
                        setCurrentPassengerIndex(i => i + 1);
                      } else {
                        setShowPaymentForm(true);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {currentPassengerIndex < persons - 1 ? "Next Passenger" : "Next"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showPaymentForm && (
        <PaymentForm
          amount={`€${totalPrice}`}
          onClose={() => setShowPaymentForm(false)}
          onSubmit={() => {
            alert("Booking confirmed");
            closeModal();
          }}
        />
      )}

      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </section>
  );
};

export default FlightsSection;