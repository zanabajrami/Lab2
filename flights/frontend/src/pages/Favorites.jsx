import React, { useEffect, useState } from "react";
import {
  Plane,
  Heart,
  ChevronDown,
  ChevronUp,
  Ticket,
  Briefcase,
  Receipt,
} from "lucide-react";
import { airlineLogos } from "../data/airlines";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [openDetails, setOpenDetails] = useState({});

  /* LOAD FAVORITES */
  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  /* REMOVE FAVORITE (ID është unik)*/
  const removeFavorite = (flightId) => {
    const updated = favorites.filter((f) => f.id !== flightId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  /* TOGGLE DETAILS */
  const toggleDetails = (index) => {
    setOpenDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (!favorites.length) {
    return (
      <p className="text-gray-500 text-lg font-medium italic text-center mt-10">
        No favorite flights yet.
      </p>
    );
  }

  return (
    <div className="mt-5 mb-5 py-2 px-4 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
      {favorites.map((flight, index) => {
        const isOneWay = !!flight.oneWay;
        const isReturn = !!flight.hasReturn;

        return (
          <div
            key={flight.id}
            className="bg-white relative rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300"
          >
            {/* REMOVE FAVORITE */}
            <div
              className="absolute top-4 right-4 cursor-pointer z-10"
              onClick={() => removeFavorite(flight.id)}
            >
              <Heart className="w-6 h-6 text-red-500 " />
            </div>

            <div className="p-5 pb-4">
              {/* AIRLINE LOGO */}
              <div className="flex items-center justify-between mb-4">
                <img
                  src={airlineLogos[flight.airline] || "/images/default.png"}
                  alt={flight.airline}
                  className="w-16 h-16 object-contain"
                />
              </div>

              {/* ONE WAY */}
              {isOneWay && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 -mt-3 mb-4 font-semibold">
                    Outbound Flight
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold ml-3">{flight.from}</h3>
                      <p className="text-gray-400 text-sm ml-3">
                        {flight.fromCode}
                      </p>
                      <p className="text-gray-800 font-semibold text-xl mt-1 ml-3">
                        {flight.oneWay.departure}
                      </p>
                    </div>

                    <div className="flex items-center justify-center w-full relative mt-4">
                      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-300" />
                      <div className="absolute left-4 top-1/2 w-2 h-2 bg-gray-600 rounded-full -translate-y-1/2" />
                      <div className="absolute right-4 top-1/2 w-2 h-2 bg-gray-600 rounded-full -translate-y-1/2" />
                      <Plane className="w-6 h-6 text-gray-600 rotate-45" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold">{flight.to}</h3>
                      <p className="text-gray-400 text-sm">{flight.toCode}</p>
                      <p className="text-gray-800 font-semibold text-xl mt-1">
                        {flight.oneWay.arrival}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* RETURN */}
              {isReturn && flight.return && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 -mt-3 mb-4 font-semibold">
                    Return Flight
                  </p>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold ml-4">
                        {flight.to}
                      </h3>
                      <p className="text-gray-400 text-sm ml-4">
                        {flight.toCode}
                      </p>
                      <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">
                        {flight.return.departure}
                      </p>
                    </div>

                    <div className="flex items-center justify-center w-full relative mt-4">
                      <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-300" />
                      <Plane className="w-6 h-6 text-gray-600 rotate-45" />
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold ml-4">
                        {flight.return.returnTo}
                      </h3>
                      <p className="text-gray-400 text-sm ml-4">
                        {flight.return.returnToCode}
                      </p>
                      <p className="text-gray-800 font-semibold text-xl mt-1 ml-4">
                        {flight.return.arrival}
                      </p>
                    </div>
                  </div>


                </div>
              )}

              {/* DURATION + PRICE */}
              <div className="mt-4 flex justify-between">
                <span className="text-gray-600 text-sm ml-2">
                  Duration:{" "}
                  {isOneWay
                    ? flight.oneWay.duration
                    : flight.return.duration}
                </span>

                <span className="text-gray-800 font-bold text-lg mr-2">
                  €
                  {isOneWay
                    ? flight.oneWay.price
                    : flight.return.price}
                </span>
              </div>
            </div>

            {/* INCLUDES */}
            <div className="border-t border-dashed border-gray-300">
              <button
                onClick={() => toggleDetails(index)}
                className="w-full flex items-center justify-between p-4 font-semibold hover:bg-gray-50"
              >
                <span className="flex items-center gap-2">
                  Includes
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                    Details
                  </span>
                </span>
                {openDetails[index] ? (
                  <ChevronUp size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {openDetails[index] && (
                <div className="px-5 pb-5 pt-2 space-y-3 bg-blue-50/30">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Ticket size={18} />
                    Ticket for 1 person
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Briefcase size={18} />
                    10 kg baggage included
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Receipt size={18} />
                    All taxes and fees included
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
