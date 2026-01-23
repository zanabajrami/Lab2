import { useState } from "react";

const Calendar = ({ selectedDate, setSelectedDate, minDate, maxDate, availableFlights }) => {
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

    const validDays = availableFlights?.[0]?.validDays || [0,1,2,3,4,5,6];
    if (!validDays.includes(day.getDay())) return true;

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

        <span className="font-semibold">
          {currentMonth.toLocaleString("default", { month: "long", year: "numeric" })}
        </span>

        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="px-2 py-1 rounded hover:bg-gray-200 transition"
        >
          &gt;
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => (
          <div key={d} className="font-semibold">{d}</div>
        ))}

        {daysArray.map((day, index) => {
          const disabled = isDisabled(day);
          const isSelected = day && selectedDate && day.toDateString() === selectedDate.toDateString();

          return (
            <button
              key={index}
              onClick={() => !disabled && setSelectedDate(day)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition 
                ${disabled ? "text-gray-300 cursor-not-allowed" :
                isSelected ? "bg-blue-600 text-white" : "hover:bg-blue-100"}`}
            >
              {day ? day.getDate() : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
