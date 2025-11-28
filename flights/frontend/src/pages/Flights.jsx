import React, { useState, useEffect } from "react";
import { Plane, Heart, ChevronUp } from "lucide-react";
import { useLocation, useSearchParams } from "react-router-dom";
import CustomDropdown from "../components/CustomDropdown";
import { baseFlights } from "../data/FlightsData";
import Calendar from "../components/Calendar";
import PaymentForm from "../components/PaymentForm";

// Gjenerimi i variantëve me orare të ndryshme
const generateFlightVariants = (flight, count = 5, intervalHours = 2) => {
  if (!flight.oneWay) return [];

  const variants = [];
  for (let i = 0; i < count; i++) {
    const dep = new Date(`1970-01-01T${flight.oneWay.departure}:00`);
    const arr = new Date(`1970-01-01T${flight.oneWay.arrival}:00`);
    dep.setHours(dep.getHours() + i * intervalHours);
    arr.setHours(arr.getHours() + i * intervalHours);

    // One-way flight
    variants.push({
      ...flight,
      id: `${flight.id}-oneWay-${i}`,
      oneWay: {
        departure: dep.toTimeString().slice(0, 5),
        arrival: arr.toTimeString().slice(0, 5),
        duration: flight.oneWay.duration,
        price: flight.oneWay.price
      },
      return: null,
      isReturn: false
    });

    // Return flight
    if (flight.return) {
      const retDep = new Date(`1970-01-01T${flight.return.departure}:00`);
      const retArr = new Date(`1970-01-01T${flight.return.arrival}:00`);
      retDep.setHours(retDep.getHours() + i * intervalHours);
      retArr.setHours(retArr.getHours() + i * intervalHours);

      variants.push({
        ...flight,
        id: `${flight.id}-return-${i}`,
        oneWay: {
          departure: dep.toTimeString().slice(0, 5),
          arrival: arr.toTimeString().slice(0, 5),
          duration: flight.oneWay.duration,
          price: flight.oneWay.price
        },
        return: {
          departure: retDep.toTimeString().slice(0, 5),
          arrival: retArr.toTimeString().slice(0, 5),
          returnTo: flight.return.returnTo,
          returnToCode: flight.return.returnToCode
        },
        isReturn: true
      });
    }
  }
  return variants;
};
// Gjenerojmë të gjitha fluturimet
const flights = baseFlights.flatMap(f => generateFlightVariants(f, 5, 2));

//Bllokim i scroll-it
const useBodyScrollLock = (isLocked) => {
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLocked]);
};

const FlightCard = ({ flight, openModal, favorites = [], setFavorites }) => {
  const isReturn = !!flight.return;
  const price = isReturn ? Math.round(flight.oneWay.price * 1.6) : flight.oneWay.price;
  const displayPrice = `€${price}`;
  const isFavorite = favorites.some(f => f.id === flight.id);

  const toggleFavorite = (flight) => {
    const updated = isFavorite
      ? favorites.filter(f => f.id !== flight.id)
      : [...favorites, flight];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="bg-white relative rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300 w-full mx-auto">
      {/* Favorite Heart */}
      <div
        className="absolute top-4 right-4 cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); toggleFavorite(flight); }}
      >
        <Heart className={`w-6 h-6 transition-all ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`} />
      </div>

      <div className="p-3 pb-1">
        <div className="flex items-center justify-between mb-4">
          <img src={flight.airline} alt="Airline Logo" className="w-16 h-16 object-contain" />
        </div>

        {/* One-way segment */}
        <div className="flex items-center justify-between gap-4 -mt-5">
          <div>
            <h3 className="text-2xl font-bold ml-4">{flight.from}</h3>
            <p className="text-gray-400 text-sm ml-4">{flight.fromCode}</p>
            <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.oneWay.departure}</p>
          </div>

          <div className="flex items-center justify-center w-full relative mt-4">
            <div className="absolute top-1/2 -left-5 right-5 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
            <div className="absolute -left-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute right-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
              <Plane className="w-6 h-6 text-gray-600 bg-white animate-flight" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold">{flight.to}</h3>
            <p className="text-gray-400 text-sm">{flight.toCode}</p>
            <p className="text-gray-800 font-semibold text-xl mt-1 mr-4">{flight.oneWay.arrival}</p>
          </div>
        </div>

        {/* Return segment */}
        {isReturn && (
          <div className="mt-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl font-bold ml-4">{flight.to}</h3>
                <p className="text-gray-400 text-sm ml-4">{flight.toCode}</p>
                <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.return.departure}</p>
              </div>
              <div className="flex items-center justify-center w-full relative mt-4">
                <div className="absolute top-1/2 -left-5 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                <div className="absolute -left-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute right-0 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                  <Plane className="w-6 h-6 text-gray-600 bg-white animate-flight" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold ml-4">{flight.return.returnTo}</h3>
                <p className="text-gray-400 text-sm ml-4">{flight.return.returnToCode}</p>
                <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">{flight.return.arrival}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-2 font-semibold">Return Flight</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between px-4">
        <span className="text-sm text-gray-600">Duration: {flight.oneWay.duration}</span>
        <span className="text-blue-600 font-bold text-lg">{displayPrice}</span>
      </div>
      <div className="border-t border-dashed border-gray-300 my-2"></div>
      <div className="p-4 pt-1">
        <button onClick={() => openModal(flight)} className="bg-blue-700 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
      {/*circles*/}
      <div className="absolute top-1/2 -left-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-r-full"></div>
      <div className="absolute top-1/2 -right-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-l-full"></div>
    </div>
  );
};

const FlightsSection = () => {
  const [isReturn, setIsReturn] = useState(false);
  const [modalFlight, setModalFlight] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");
  const [favorites, setFavorites] = useState([]);
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate());
  const [showTopButton, setShowTopButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const flightsPerPage = 20;
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const searchFrom = params.get("from");
  const searchTo = params.get("to");
  const searchTrip = params.get("trip"); // oneway / return
  const [, setSearchParams] = useSearchParams();
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  // Filtrimi i SearchBar sipas query params
  const filteredFlights = flights.filter(flight => {
    // FROM / TO nga dropdown ose search params
    const matchesFrom = fromFilter ?
      flight.from.toLowerCase() === fromFilter.toLowerCase() :
      (searchFrom ? flight.from.toLowerCase() === searchFrom.toLowerCase() : true);

    const matchesTo = toFilter ?
      flight.to.toLowerCase() === toFilter.toLowerCase() :
      (searchTo ? flight.to.toLowerCase() === searchTo.toLowerCase() : true);

    // Trip type (OneWay / Return)
    const matchesTrip = !searchTrip ||
      (searchTrip === "oneway" && !flight.isReturn) ||
      (searchTrip === "return" && flight.isReturn);

    return matchesFrom && matchesTo && matchesTrip;
  });

  // 2. Ruaj vetëm një fluturim për secilën id bazë
  const uniqueFlights = [];
  const seenIds = new Set();

  filteredFlights.forEach(f => {
    if (!seenIds.has(f.id)) {
      uniqueFlights.push(f);
      seenIds.add(f.id);
    }
  });

  // 3. Filtron fluturimet sipas tipit OneWay / Return
  const flightsByType = filteredFlights.filter(f => f.isReturn === isReturn);

  // 4. Llogarit pagination mbi fluturimet e filtruar
  const totalPages = Math.ceil(flightsByType.length / flightsPerPage);
  const indexOfLastFlight = currentPage * flightsPerPage;
  const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;

  // 5. Bën pagination
  const currentFlights = flightsByType.slice(indexOfFirstFlight, indexOfLastFlight);

  // Funksion për pagination 1 2 3 ... 9
  const getPages = (totalPages, currentPage) => {
    const pages = [];
    if (totalPages <= 7) {
      // Nëse janë pak faqe, i shfaq të gjitha
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Nëse janë më shumë se 7 faqe
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, "...", totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  useBodyScrollLock(!!modalFlight);

  useEffect(() => {
    if (returnDate && departureDate && returnDate < departureDate) {
      setReturnDate(null);
    }
  }, [departureDate, returnDate]);

  const openModal = (flight) => {
    setModalFlight(flight);
    setModalStep(1);
    setDepartureDate(null);
    setReturnDate(null);
    setPersons(1);
    setPassengerInfo([]);
    setCurrentPassengerIndex(0);
  };

  const closeModal = () => {
    setModalFlight(null);
    setModalStep(1);
    setDepartureDate(null);
    setReturnDate(null);
    setPersons(1);
    setPassengerInfo([]);
    setCurrentPassengerIndex(0);
  };

  const fromCities = [...new Set(baseFlights.map(f => f.from))];
  const toCities = [...new Set(baseFlights.map(f => f.to))];

  filteredFlights.map((flight, index) => (
    <FlightCard
      key={flight.id}
      flight={flight}
      isReturn={flight.isReturn}
      openModal={openModal}
      favorites={favorites}
      setFavorites={setFavorites}
    />
  ))

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("Error parsing favorites from localStorage:", error);
        setFavorites([]);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) { // show button after scrolling 300px
        setShowTopButton(true);
      } else {
        setShowTopButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // state për numrin e personave
  const [persons, setPersons] = useState(1);

  // llogaritja e çmimit total
  const basePrice = modalFlight
    ? (modalFlight.return ? Math.round(modalFlight.oneWay.price * 1.6) : modalFlight.oneWay.price)
    : 0;

  const totalPrice = basePrice * persons;

  const [modalStep, setModalStep] = useState(1);
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  // Reset passengerInfo sa herë që ndryshon numri i personave ose modalFlight
  useEffect(() => {
    if (modalFlight) {
      setPassengerInfo(
        Array.from({ length: persons }, () => ({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          passportNumber: "",
          dob: "",
          nationality: "",
        }))
      );
      setCurrentPassengerIndex(0);
    }
  }, [modalFlight, persons]);

  const handleInputChange = (field, value) => {
    const updated = [...passengerInfo];
    updated[currentPassengerIndex][field] = value;
    setPassengerInfo(updated);
  };

  return (
    <section className="py-20 w-full -mt-10 flex flex-col items-center">
      {/* Buttons OneWay/Return */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setIsReturn(false)} className={`px-6 py-2 rounded-xl font-semibold transition ${!isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>OneWay</button>
        <button onClick={() => setIsReturn(true)} className={`px-6 py-2 rounded-xl font-semibold transition ${isReturn ? "bg-blue-600 text-white" : "bg-white text-gray-800 border border-gray-300"}`}>Return</button>
      </div>

      {/* Custom Dropdown Filters */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
        {/* FROM Dropdown */}
        <div className="w-auto min-w-[140px] max-w-[180px]">
          <CustomDropdown
            options={fromCities}
            selected={fromFilter}
            setSelected={(val) => { setFromFilter(val); setCurrentPage(1); }}
            placeholder="From"
          />
        </div>

        {/* TO Dropdown */}
        <div className="w-auto min-w-[140px] max-w-[180px]">
          <CustomDropdown
            options={toCities}
            selected={toFilter}
            setSelected={(val) => { setToFilter(val); setCurrentPage(1); }}
            placeholder="To"
          />
        </div>

        {/* RESET Button */}
        <div className="w-auto">
          <button
            onClick={() => {
              setFromFilter("");
              setToFilter("");

              // Reset query params → kjo fshin filtrat e SearchBar
              setSearchParams({});
            }}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Shfaqim FlightCards */}
      <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {currentFlights.length > 0 ? (
          currentFlights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              isReturn={isReturn}
              openModal={openModal}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No flights found</p>
        )}
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {getPages(totalPages, currentPage).map((page, index) =>
          page === "..." ? (
            <span key={index} className="px-3 py-1 text-gray-500">...</span>
          ) : (
            <button
              key={page}
              onClick={() => {
                setCurrentPage(page);
                window.scrollTo(0, 0); // direkt në top
              }}
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
      {/* Modal */}
      {modalFlight && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-96 max-h-[90vh] overflow-hidden relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Step 1: Dates */}
            {modalStep === 1 && (
              <>
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold">{modalFlight.from} → {modalFlight.to}</h2>
                </div>
                <div className="p-6 flex-1 overflow-y-auto space-y-4">
                  <div>
                    <p className="mb-2 font-semibold">Departure Date</p>
                    <Calendar
                      selectedDate={departureDate}
                      setSelectedDate={setDepartureDate}
                      minDate={today}
                      maxDate={maxDate}
                      availableFlights={[modalFlight]}
                    />
                  </div>
                  {modalFlight?.return && (
                    <div>
                      <p className="mb-2 mt-4 font-semibold">Return Date</p>
                      <Calendar
                        selectedDate={returnDate}
                        setSelectedDate={setReturnDate}
                        minDate={departureDate || today}
                        maxDate={maxDate}
                        availableFlights={[modalFlight]}
                      />
                    </div>
                  )}
                </div>
                <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                  <div className="-ml-3">
                    <select
                      value={persons}
                      onChange={(e) => setPersons(Number(e.target.value))}
                      className="w-full border p-2 rounded-lg"
                    >
                      {[1, 2, 3, 4, 5, 6].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                      ))}
                    </select>
                  </div>
                  <div className="text-lg font-semibold">
                    Total Price: €{basePrice * persons}
                  </div>
                  <button
                    onClick={() => {
                      if (!departureDate) { alert("Choose a departure date"); return; }
                      if (modalFlight.return && !returnDate) { alert("Choose a return date"); return; }
                      setModalStep(2);
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white -mr-3 hover:bg-blue-700 transition"
                  > Next
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Passenger Info */}
            {modalStep === 2 && (
              <>
                <div className="p-6 flex-1 flex flex-col gap-4 overflow-y-auto">
                  <h3 className="text-lg font-semibold mb-2">
                    Passenger {currentPassengerIndex + 1} of {persons}
                  </h3>

                  {["firstName", "lastName", "email", "phone", "passportNumber", "dob", "nationality"].map((field) => (
                    <input
                      key={field}
                      type={field === "email" ? "email" : field === "phone" ? "tel" : field === "dob" ? "date" : "text"}
                      placeholder={field.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
                      className="border p-2 rounded-lg"
                      value={passengerInfo[currentPassengerIndex][field]}
                      onChange={(e) => handleInputChange(field, e.target.value)}
                    />
                  ))}
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-between items-center">
                  <button
                    onClick={() => {
                      if (currentPassengerIndex > 0) {
                        setCurrentPassengerIndex(prev => prev - 1);
                      } else {
                        setModalStep(1); // kthe tek calendar
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      const p = passengerInfo[currentPassengerIndex];
                      // kontrollo fushat e domosdoshme
                      if (!p.firstName || !p.lastName || !p.email || !p.phone || !p.passportNumber || !p.dob || !p.nationality) {
                        alert("Please fill all required fields");
                        return;
                      }

                      if (currentPassengerIndex < persons - 1) {
                        setCurrentPassengerIndex(prev => prev + 1);
                      } else {
                        // Instead of alert, open PaymentForm modal
                        setShowPaymentForm(true);
                      }
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    {currentPassengerIndex < persons - 1 ? "Next Passenger" : "Next"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg border border-blue-200 hover:bg-blue-600 transition-all"
        > <ChevronUp size={24} />
        </button>
      )}

      {showPaymentForm && (
        <PaymentForm
          title="Payment"
          amount={`€${totalPrice}`}
          onClose={() => setShowPaymentForm(false)}
          onSubmit={() => {
            alert(`Booking confirmed for ${persons} passenger(s)\nTotal Price: €${totalPrice}`);
            setShowPaymentForm(false);
            closeModal(); // close main modal too
          }}
        />
      )}

    </section>
  );
};

export default FlightsSection;