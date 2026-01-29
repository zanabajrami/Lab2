import React from "react";
import { Plane, Heart } from "lucide-react";
import { airlineLogos } from "../../data/FlightsData";

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
      <div className="absolute top-4 right-4 cursor-pointer z-10" onClick={(e) => { e.stopPropagation(); toggleFavorite(flight); }}>
        <Heart className={`w-6 h-6 transition-all ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`} />
      </div>
      <div className="p-3 pb-1">
        <div className="flex items-center justify-between mb-4">
          <img
            src={airlineLogos[flight.airline]}
            alt={flight.airline}
            className="w-16 h-16 object-contain"
          />
        </div>
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
        <span className="text-gray-900 font-bold text-lg">{displayPrice}</span>
      </div>
      <div className="border-t border-dashed border-gray-300 my-2"></div>
      <div className="p-4 pt-1">
        <button onClick={() => openModal(flight)} className="bg-blue-700 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>
      <div className="absolute top-1/2 -left-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-r-full"></div>
      <div className="absolute top-1/2 -right-0 w-6 h-8 bg-gray-100 border border-gray-300 rounded-l-full"></div>
    </div>
  );
};

export default FlightCard;