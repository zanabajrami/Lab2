import React, { useState, useEffect } from "react";
import { ChevronUp, ArrowRight, X } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import CustomDropdown from "../components/CustomDropdown";
import Calendar from "../components/flights/Calendar";
import PaymentForm from "../components/PaymentForm";
import FlightCard from "../components/flights/FlightCard";
import { generateFlightVariants, useBodyScrollLock } from "../components/flights/FlightUtils";
import { baseFlights } from "../data/FlightsData";

const flights = baseFlights.flatMap(f => generateFlightVariants(f));

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

  const handleConfirmPayment = async () => {
    try {
      // VALIDIM PARA SE ME THIRR API
      if (
        !Array.isArray(passengerInfo) ||
        passengerInfo.length !== persons ||
        passengerInfo.some(p =>
          !p.firstName ||
          !p.lastName ||
          !p.email ||
          !p.phone ||
          !p.passportNumber ||
          !p.dob ||
          !p.nationality
        )
      ) {
        alert("Passenger information is incomplete!");
        console.log("DEBUG passengerInfo:", passengerInfo);
        return;
      }

      const res = await fetch("http://localhost:8800/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightId: modalFlight.id,
          departureDate,
          returnDate: modalFlight.isReturn ? returnDate : null,
          passengers: passengerInfo,
          totalPrice
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      alert("Booking successfully confirmed!");
      closeModal();

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
        {currentFlights.length > 0 ? (
          currentFlights.map(f => (
            <FlightCard
              key={f.id}
              flight={f}
              openModal={openModal}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No flights found
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {getPages(totalPages, currentPage).map((page, i) =>
          page === "..." ? (
            <span key={i} className="px-3 py-1 text-gray-500">...</span>
          ) : (
            <button
              key={i}
              onClick={() => { setCurrentPage(page); window.scrollTo(0, 0); }}
              className={`px-3 py-1 rounded-lg border transition ${currentPage === page
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-800 border-gray-300 hover:bg-blue-100"
                }`}
            >
              {page}
            </button>
          )
        )}
      </div>

      {modalFlight && !showPaymentForm && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-4" onClick={closeModal}>
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col animate-in fade-in zoom-in duration-300" onClick={(e) => e.stopPropagation()}>

            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100">
              <div
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: modalStep === 1 ? '50%' : '100%' }}
              />
            </div>

            {/* Header */}
            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-black text-slate-800 flex items-center gap-2 uppercase tracking-tight">
                  {modalFlight.from} <ArrowRight className="text-blue-500" size={18} /> {modalFlight.to}
                </h2>
                <p className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mt-1 inline-block uppercase">
                  {modalStep === 1 ? "Step 1: Dates & Travelers" : `Step 2: Passenger ${currentPassengerIndex + 1} of ${persons}`}
                </p>
              </div>
              <button onClick={closeModal} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 flex-1 overflow-y-auto space-y-6">
              {modalStep === 1 ? (
                <div className="space-y-6">
                  <div className="grid gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <label className="text-xs font-black text-slate-400 uppercase mb-2 block tracking-widest">Departure Date</label>
                      <Calendar selectedDate={departureDate} setSelectedDate={setDepartureDate} minDate={today} maxDate={maxDate} />
                    </div>
                    {modalFlight.isReturn && (
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                        <label className="text-xs font-black text-slate-400 uppercase mb-2 block tracking-widest">Return Date</label>
                        <Calendar selectedDate={returnDate} setSelectedDate={setReturnDate} minDate={departureDate || today} maxDate={maxDate} />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-400 uppercase ml-2 tracking-widest">Number of Passengers</label>
                    <select
                      value={persons}
                      onChange={(e) => setPersons(Number(e.target.value))}
                      className="w-full bg-white border-2 border-slate-200 p-4 rounded-2xl focus:border-blue-500 outline-none font-bold text-slate-700 transition-all cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>)}
                    </select>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 animate-in slide-in-from-right-4">
                  {[
                    { id: 'firstName', label: 'First Name', col: 'col-span-1' },
                    { id: 'lastName', label: 'Last Name', col: 'col-span-1' },
                    { id: 'dob', label: 'Date of Birth', col: 'col-span-2', type: 'date' },
                    { id: 'email', label: 'Email Address', col: 'col-span-2', type: 'email' },
                    { id: 'phone', label: 'Phone Number', col: 'col-span-1' },
                    { id: 'nationality', label: 'Nationality', col: 'col-span-1' },
                    { id: 'passportNumber', label: 'Passport Number', col: 'col-span-2' },
                  ].map((field) => (
                    <div key={field.id} className={`${field.col} space-y-1`}>
                      <label className="text-[10px] font-black text-slate-400 uppercase ml-2 tracking-tighter">{field.label}</label>
                      <input
                        type={field.type || 'text'}
                        className={`w-full bg-slate-50 border-2 p-3 rounded-xl focus:bg-white outline-none transition-all font-semibold text-slate-700 ${passengerInfo[currentPassengerIndex]?.[field.id] ? 'border-blue-100 focus:border-blue-500' : 'border-slate-100'
                          }`}
                        value={passengerInfo[currentPassengerIndex]?.[field.id] || ""}
                        onChange={(e) => {
                          const { value } = e.target;
                          setPassengerInfo(prev => {
                            const newArr = [...prev];
                            newArr[currentPassengerIndex] = { ...newArr[currentPassengerIndex], [field.id]: value };
                            return newArr;
                          });
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase">Total Amount</p>
                  <p className="text-3xl font-black text-slate-900 leading-none">€{totalPrice}</p>
                </div>
                {modalStep === 2 && (
                  <button
                    onClick={() => currentPassengerIndex > 0 ? setCurrentPassengerIndex(i => i - 1) : setModalStep(1)}
                    className="text-slate-400 font-bold hover:text-slate-800 text-sm underline transition-colors"
                  >
                    Back
                  </button>
                )}
              </div>

              <button
                disabled={
                  (modalStep === 1 && (!departureDate || (modalFlight.isReturn && !returnDate))) ||
                  (modalStep === 2 && !validatePassenger(passengerInfo[currentPassengerIndex]))
                }
                onClick={() => {
                  if (modalStep === 1) {
                    setModalStep(2);
                  } else {
                    if (currentPassengerIndex < persons - 1) {
                      setCurrentPassengerIndex(prev => prev + 1);
                    } else {
                      setShowPaymentForm(true);
                    }
                  }
                }}
                className={`w-full py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-xl ${((modalStep === 1 && (!departureDate || (modalFlight.isReturn && !returnDate))) ||
                  (modalStep === 2 && !validatePassenger(passengerInfo[currentPassengerIndex])))
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-blue-600 text-white shadow-blue-200 hover:bg-blue-700'
                  }`}
              >
                {modalStep === 1 ? "Continue to Details" : (currentPassengerIndex < persons - 1 ? "Next Passenger" : "Confirm & Pay Now")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showPaymentForm && passengerInfo.length === persons && (
        <PaymentForm
          amount={totalPrice}
          onClose={() => setShowPaymentForm(false)}
          onSubmit={handleConfirmPayment}
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