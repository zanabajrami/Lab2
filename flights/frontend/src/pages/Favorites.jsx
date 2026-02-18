import React, { useState, useEffect } from "react";
import { Plane, Heart, ChevronDown, ChevronUp, Ticket, Briefcase, Receipt } from "lucide-react";

const Favorites = ({ openModal }) => {
  const [favorites, setFavorites] = useState([]);
  const [openDetails, setOpenDetails] = useState({});

  // Merr favorites nga localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("favorites");
      if (stored) setFavorites(JSON.parse(stored));
    } catch (err) {
      console.error("Error parsing favorites from localStorage:", err);
    }
  }, []);

  // Hiq favorite
  const removeFavorite = (flight) => {
    const updated = favorites.filter(
      (f) => !(f.id === flight.id && f.isReturn === flight.isReturn)
    );
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (!favorites.length) {
    return (
      <p className="text-gray-500 text-lg font-medium text-center mt-10">
        No favorite flights yet.
      </p>
    );
  }

  // Funksioni për të hapur/mbyllur detajet
  const toggleDetails = (index) => {
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="mt-5 mb-5 py-2 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
      {favorites.map((flight, index) => (
        <div
          key={index}
          className="bg-white relative rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300 w-full mx-auto"
        >
          {/* Favorite Heart */}
          <div
            className="absolute top-4 right-4 cursor-pointer z-10"
            onClick={() => removeFavorite(flight)}
          >
            <Heart className="w-6 h-6 text-red-500" />
          </div>

          <div className="p-5 pb-4">
            {/* Airline Logo */}
            {flight.airline && (
              <div className="flex items-center justify-between mb-4">
                <img
                  src={flight.airline}
                  alt="Airline Logo"
                  className="w-16 h-16 object-contain"
                />
              </div>
            )}

            {/* One-way flight */}
            {flight.oneWay && (
              <div className="flex items-center justify-between mb-4 -mt-5">
                <div>
                  <h3 className="text-2xl font-bold ml-3">{flight.from}</h3>
                  <p className="text-gray-400 text-sm ml-3">{flight.fromCode}</p>
                  <p className="text-gray-800 font-semibold text-xl mt-1 ml-3">
                    {flight.departureTime || "—"}
                  </p>
                </div>

                <div className="flex items-center justify-center w-full relative mt-4">
                  <div className="absolute top-1/2 -left-5 right-5 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                  <div className="absolute -left-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute right-5 top-1/2 w-2 h-2 bg-gray-600 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                    <Plane className="w-6 h-6 text-gray-600 animate-flight" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold">{flight.to}</h3>
                  <p className="text-gray-400 text-sm">{flight.toCode}</p>
                  <p className="text-gray-800 font-semibold text-xl mt-1">
                    {flight.arrivalTime || "—"}
                  </p>
                </div>
              </div>
            )}

            {/* Return flight */}
            {flight.isReturn && flight.return && (
              <div className="mt-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold ml-4">{flight.to}</h3>
                    <p className="text-gray-400 text-sm ml-4">{flight.toCode}</p>
                    <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">
                      {flight.return.departure || "—"}
                    </p>
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
                    <h3 className="text-2xl font-bold ml-4">{flight.return.returnTo}</h3>
                    <p className="text-gray-400 text-sm ml-4">
                      {flight.return.returnToCode}
                    </p>
                    <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">
                      {flight.return.arrival || "—"}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-2 font-semibold">Return Flight</p>
              </div>
            )}

            {/* Duration + price */}
            {flight.oneWay && (
              <div className="mt-4 flex justify-between -mb-3">
                <span className="text-gray-600 text-sm ml-2">
                  Duration: {flight.oneWay.duration || "—"}
                </span>
                <span className="text-gray-800 font-bold text-lg mr-2">
                  €
                  {flight.isReturn
                    ? Math.round(flight.oneWay.price * 1.6)
                    : flight.oneWay.price || "—"}
                </span>
              </div>
            )}
          </div>

          {/* SECTION: INCLUDES (Zëvendëson Book Now) */}
          <div className="border-t border-dashed border-gray-300">
            <button
              onClick={() => toggleDetails(index)}
              className="w-full flex items-center justify-between p-4 text-gray-700 font-semibold hover:bg-gray-50 hover:rounded-full transition-colors"
            >
              <span className="flex items-center gap-2">
                Includes <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">Details</span>
              </span>
              {openDetails[index] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {/* Detajet që shfaqen kur klikohet butoni */}
            {openDetails[index] && (
              <div className="px-5 pb-5 pt-2 space-y-3 bg-blue-50/30 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-center gap-3 text-gray-600">
                  <Ticket size={18} className="text-gray-700" />
                  <span className="text-sm">Ticket for 1 person</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Briefcase size={18} className="text-gray-700" />
                  <span className="text-sm">10 kg baggage included</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Receipt size={18} className="text-gray-700" />
                  <span className="text-sm">All taxes and fees included</span>
                </div>
              </div>
            )}
          </div>

          {/* Decorative Circles */}
          <div className="absolute top-1/2 -left-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-r-full"></div>
          <div className="absolute top-1/2 -right-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-l-full"></div>
        </div>
      ))}
    </div>
  );
};

export default Favorites;
