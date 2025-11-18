import { useState, useEffect, Fragment } from "react";
import { TicketsPlane, Check, ChevronDown } from "lucide-react";
import { Listbox, Transition } from "@headlessui/react";

const baseFlights = [
  { from: "Prishtina", fromCode: "PRN", to: "Istanbul", toCode: "IST", oneWayPrice: 75, duration: "1h 45min", airline: "Turkish Airlines", departure: "08:55", arrival: "12:40", returnDeparture: "08:25", returnArrival: "08:05", returnTo: "Prishtina", returnToCode: "PRN" },
  { from: "Prishtina", fromCode: "PRN", to: "London", toCode: "LHR", oneWayPrice: 84, duration: "3h 30min", airline: "British Airways", departure: "11:00", arrival: "13:30", returnDeparture: "20:30", returnArrival: "00:00", returnTo: "Prishtina", returnToCode: "PRN" },
  { from: "Tirana", fromCode: "TIA", to: "Rome", toCode: "FCO", oneWayPrice: 90, duration: "1h 50min", airline: "Alitalia", departure: "09:30", arrival: "11:20", returnDeparture: "17:15", returnArrival: "19:05", returnTo: "Tirana", returnToCode: "TIA" },
  { from: "Tirana", fromCode: "TIA", to: "Paris", toCode: "CDG", oneWayPrice: 200, duration: "3h 40min", airline: "Air France", departure: "12:45", arrival: "16:25", returnDeparture: "21:00", returnArrival: "00:40", returnTo: "Tirana", returnToCode: "TIA" }
];

// Gjenerimi i variantëve me orare të ndryshme
const generateFlightVariants = (flight, count = 10, intervalHours = 2) => {
  const variants = [];
  for (let i = 0; i < count; i++) {
    const dep = new Date(`1970-01-01T${flight.departure}:00`);
    dep.setHours(dep.getHours() + i * intervalHours);
    const arr = new Date(`1970-01-01T${flight.arrival}:00`);
    arr.setHours(arr.getHours() + i * intervalHours);

    const retDep = new Date(`1970-01-01T${flight.returnDeparture}:00`);
    retDep.setHours(retDep.getHours() + i * intervalHours);
    const retArr = new Date(`1970-01-01T${flight.returnArrival}:00`);
    retArr.setHours(retArr.getHours() + i * intervalHours);

    variants.push({
      ...flight,
      departure: dep.toTimeString().slice(0, 5),
      arrival: arr.toTimeString().slice(0, 5),
      returnDeparture: retDep.toTimeString().slice(0, 5),
      returnArrival: retArr.toTimeString().slice(0, 5)
    });
  }
  return variants;
};

// Gjenerojmë të gjitha variantet
const flights = baseFlights.flatMap(f => generateFlightVariants(f, 10, 2));

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

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          &lt;
        </button>
        <span className="font-semibold">{currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}</span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          &gt;
        </button>
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
              className={`w-10 h-10 flex items-center justify-center rounded-full transition ${
                disabled ? "text-gray-300 cursor-not-allowed" : isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"
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
const FlightCard = ({ flight, isReturn, openModal }) => {
  const price = isReturn ? Math.round(flight.oneWayPrice * 1.6) : flight.oneWayPrice;
  const displayPrice = `€${price}`;

  return (
    <div className="bg-white relative rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300 w-full mx-auto">
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
          <span className="text-blue-600 font-bold text-lg">{displayPrice}</span>
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
};
const CustomDropdown = ({ options, selected, setSelected, placeholder }) => {
  return (
<Listbox value={selected} onChange={setSelected}>
  <div className="relative w-40">
    <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-300 rounded-lg py-2 px-3 text-left shadow-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500">
      <span className="truncate">{selected || placeholder}</span>
      <ChevronDown className="w-5 h-5 text-gray-500" />
    </Listbox.Button>

    <Transition
      as={Fragment}
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
        {options.map((option) => (
          <Listbox.Option
            key={option}
            value={option}
            className={({ active, selected }) =>
              `cursor-pointer select-none relative py-2 pl-3 pr-8 ${
                active ? "bg-blue-100 text-blue-900" : "text-gray-700"
              } ${selected ? "font-semibold" : ""}`
            }
          >
            {({ selected }) => (
              <>
                <span className={`block truncate ${selected ? "font-semibold" : ""}`}>
                  {option}
                </span>
                {selected && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                    <Check className="w-5 h-5" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Transition>
  </div>
</Listbox>

  );
};

const FlightsSection = () => {
  const [isReturn, setIsReturn] = useState(false);
  const [modalFlight, setModalFlight] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [fromFilter, setFromFilter] = useState("");
  const [toFilter, setToFilter] = useState("");

  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate());

  useEffect(() => {
    if (returnDate && departureDate && returnDate < departureDate) {
      setReturnDate(null);
    }
  }, [departureDate]);

  const handleConfirm = () => {
    if (!departureDate) {
      alert("Choose a departure date");
      return;
    }
    if (isReturn && !returnDate) {
      alert("Choose a return date");
      return;
    }
    alert(`Departure: ${departureDate.toDateString()}\nReturn: ${returnDate ? returnDate.toDateString() : "N/A"}`);
  };

  const openModal = (flight) => setModalFlight(flight);
  const closeModal = () => {
    setModalFlight(null);
    setDepartureDate(null);
    setReturnDate(null);
  };

  const filteredFlights = flights.filter(flight =>
    (!fromFilter || flight.from === fromFilter) &&
    (!toFilter || flight.to === toFilter)
  );

  const fromCities = [...new Set(baseFlights.map(f => f.from))];
  const toCities = [...new Set(baseFlights.map(f => f.to))];

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
            setSelected={setFromFilter}
            placeholder="From"
          />
        </div>

        {/* TO Dropdown */}
        <div className="w-auto min-w-[140px] max-w-[180px]">
          <CustomDropdown
            options={toCities}
            selected={toFilter}
            setSelected={setToFilter}
            placeholder="To"
          />
        </div>

        {/* RESET Button */}
        <div className="w-auto">
          <button
            onClick={() => { setFromFilter(""); setToFilter(""); }}
            className="
        px-4 py-2 
        bg-gray-200 text-gray-700 
        rounded-xl 
        hover:bg-gray-300 
        transition-all duration-200 
        shadow-sm
      "
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Shfaqim FlightCards */}
      <div className="w-full max-w-[1400px] px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {filteredFlights.map((flight, index) => (
          <FlightCard key={index} flight={flight} isReturn={isReturn} openModal={openModal} />
        ))}
      </div>

      {/* Modal */}
      {modalFlight && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl w-96 max-h-[90vh] overflow-hidden relative flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">{modalFlight.from} → {modalFlight.to}</h2>
            </div>
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
              <div className="mt-4 text-lg font-semibold">
                Price: €{isReturn ? Math.round(modalFlight.oneWayPrice * 1.6) : modalFlight.oneWayPrice}
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button onClick={() => {
                if (!departureDate) { alert("You didn't choose a departure date"); return; }
                if (isReturn && !returnDate) { alert("You didn't choose a return date"); return; }
                alert(`Departure: ${departureDate.toDateString()}\nReturn: ${returnDate ? returnDate.toDateString() : "N/A"}\nPrice: €${isReturn ? Math.round(modalFlight.oneWayPrice * 1.6) : modalFlight.oneWayPrice}`);
                closeModal();
              }} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
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