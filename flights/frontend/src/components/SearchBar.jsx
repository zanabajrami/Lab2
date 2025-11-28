import { useState, useRef, useEffect } from "react";
import { PlaneTakeoff, PlaneLanding } from "lucide-react";
import { useNavigate } from "react-router-dom";

// ===== Calendar Component =====
const Calendar = ({ selectedDate, setSelectedDate, minDate, maxDate, type, returnDate }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const daysArray = [];

  for (let i = 0; i < firstDay; i++) daysArray.push(null);
  for (let i = 1; i <= daysInMonth; i++)
    daysArray.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i));

  const nextMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const prevMonth = () =>
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));

  // bllokon scroll kur modal hapet
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // rikthen scroll kur modal mbyllet
    };
  }, []);

  return (
    <div>
      <div className="text-gray-800 flex justify-between items-center mb-2">
        <button
          onClick={prevMonth}
          className="px-2 py-1 rounded text-gray-800 hover:bg-gray-200 transition"
        >
          &lt;
        </button>
        <span className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>
        <button
          onClick={nextMonth}
          className="px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center text-gray-800">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="font-semibold">
            {d}
          </div>
        ))}

        {daysArray.map((day, idx) => {
          let disabled = !day || (minDate && day < minDate) || (maxDate && day > maxDate);
          if (type === "departure" && returnDate && day > returnDate) disabled = true;

          const isSelected =
            day && selectedDate && day.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={idx}
              onClick={() => {
                if (disabled) return;
                setSelectedDate(day);
              }}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition
                ${disabled
                  ? "text-gray-300 cursor-not-allowed"
                  : isSelected
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100"}`}
            >
              {day ? day.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ===== Custom Dropdown =====
function CustomDropdown({ label, options, value, onChange, isOpen, onToggle }) {
  return (
    <div className="relative w-full">
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
        <span
          className={`text-blue-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
            }`}
        >
          ▼
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg
                       overflow-y-auto max-h-48 animate-fadeIn"
        >
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

// ===== Search Bar =====
export default function SearchBar() {
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openDateModal, setOpenDateModal] = useState(null);
  const isReturn = tripType === "return";
  const formRef = useRef();
  const today = new Date();
  const maxDate = new Date(today.getFullYear(), today.getMonth() + 12, today.getDate());
  const navigate = useNavigate();

  // mbyll dropdown kur klikon jashtë
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!from || !to || !departureDate || (tripType === "return" && !returnDate)) {
      alert("Please fill all required fields!");
      return;
    }

    // Përgatit parametrat e URL-së
    const params = new URLSearchParams({
      from,
      to,
      dep: departureDate.toISOString(),
      ret: returnDate ? returnDate.toISOString() : "",
      trip: tripType,
    });

    // Navigo në faqen flights me filtrat
    navigate(`/flights?${params.toString()}`);

    // Reset form fields after search
    setFrom("");
    setTo("");
    setDepartureDate(null);
    setReturnDate(null);
    setTripType("oneway");

    // Mbyll dropdowns dhe modals
    setOpenDateModal(null);
    setOpenDropdown(null);
  };

  return (
    <div className="w-full max-w-full mx-auto mt-8 md:mt-12 px-4 md:px-6 max-w-[75%] md:max-w-5xl">
      {/* Trip Type */}
      <div className="flex justify-center gap-6 mb-6 text-gray-700 font-medium">
        {["oneway", "return"].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setTripType(type)}
            className={`px-6 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300
              ${tripType === type
                ? "bg-blue-600 text-white shadow-md shadow-blue-300 scale-[1.05]"
                : "bg-white/70 text-gray-700 border border-gray-300 hover:bg-gray-100 hover:scale-[1.03]"
              }`}
          >
            {type === "oneway" ? "One Way" : "Return"}
          </button>
        ))}
      </div>

      {/* Search Form */}
      <form
        ref={formRef}
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
            onChange={(val) => {
              setFrom(val);
              setOpenDropdown(null);
            }}
            options={["Prishtina", "Tirana"]}
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
            onChange={(val) => {
              setTo(val);
              setOpenDropdown(null);
            }}
            options={[
              "Istanbul",
              "Rome",
              "London",
              "Vienna",
              "Madrid",
              "Milano",
              "Paris",
              "Barcelona",
              "Budapest",
              "Cairo",
            ]}
            isOpen={openDropdown === "to"}
            onToggle={() => setOpenDropdown(openDropdown === "to" ? null : "to")}
          />
        </div>

        {/* Departure Date */}
        <div className="basis-1/5 w-full">
          <button
            type="button"
            onClick={() => setOpenDateModal("departure")}
            className="w-full p-3 rounded-xl border border-gray-300 bg-white/70 text-gray-800 hover:border-blue-400 transition text-left"
          >
            {departureDate ? departureDate.toLocaleDateString() : "Departure"}
          </button>
        </div>

        {/* Return Date */}
        <div className="basis-1/5 w-full">
          <button
            type="button"
            onClick={() => isReturn && setOpenDateModal("return")}
            className={`w-full p-3 rounded-xl border border-gray-300 bg-white/70 text-gray-700 transition-all duration-300 text-left ${!isReturn
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-blue-400"
              }`}
          >
            {returnDate ? returnDate.toLocaleDateString() : "Return"}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-blue-800 via-blue-600 to-blue-800 hover:from-blue-700 hover:via-blue-500 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-2xl shadow-lg shadow-blue-900/40 transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          Search
        </button>
      </form>

      {/* ===== DATE MODAL ===== */}
      {openDateModal && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm flex items-center justify-center z-[999] pointer-events-auto"
          onClick={() => setOpenDateModal(null)}
        >
          <div
            className="bg-white rounded-2xl w-86 max-h-[90vh] overflow-hidden relative flex flex-col z-[1010]"
            onClick={(e) => e.stopPropagation()} // mos lejo klik jashtë modalit
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold">
                {openDateModal === "departure"
                  ? "Select Departure Date"
                  : "Select Return Date"}
              </h2>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <Calendar
                selectedDate={openDateModal === "departure" ? departureDate : returnDate}
                setSelectedDate={
                  openDateModal === "departure" ? setDepartureDate : setReturnDate
                }
                minDate={openDateModal === "departure" ? today : departureDate || today}
                maxDate={maxDate}
                type={openDateModal}
                returnDate={returnDate}
              />
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setOpenDateModal(null)}
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}