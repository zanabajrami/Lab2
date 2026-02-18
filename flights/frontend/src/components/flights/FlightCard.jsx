import React from "react";
import { Plane, Heart } from "lucide-react";
import { airlineLogos } from "../../data/airlines";

const FlightCard = ({ flight, openModal, favorites = [], setFavorites }) => {
  // Kontroll për ekzistencën e fluturimeve
  const hasOneWay = !!flight.oneWay;
  const hasReturn = !!flight.return;

  // Fallback price dhe duration
  const price =
    (hasOneWay ? flight.oneWay.price : 0) +
    (hasReturn && !hasOneWay ? flight.return.price : 0);

  const duration =
    hasOneWay ? flight.oneWay.duration :
      hasReturn ? flight.return.duration : "-";

  // Favorite handling
  const isFavorite = favorites.some(f => f.id === flight.id);

  const toggleFavorite = (flight) => {
    const updated = isFavorite
      ? favorites.filter(f => f.id !== flight.id)
      : [...favorites, flight];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  // Flight Segment Component
  const FlightSegment = ({ title, from, fromCode, to, toCode, departure, arrival }) => {
    if (!departure || !arrival || !from || !to) return null;

    return (
      <div className="space-y-2">
        <p className="text-xs uppercase font-bold text-gray-500 tracking-wide">{title}</p>
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-bold ml-2">{from}</h3>
            <p className="text-gray-400 text-sm ml-2">{fromCode}</p>
            <p className="text-gray-800 font-semibold text-lg ml-2">{departure}</p>
          </div>

          <div className="flex items-center justify-center w-full relative mt-4">
            <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-300 -translate-y-1/2" />
            <Plane className="w-5 h-5 text-gray-600 bg-white rotate-45" />
          </div>

          <div>
            <h3 className="text-xl font-bold mr-2">{to}</h3>
            <p className="text-gray-400 text-sm mr-2">{toCode}</p>
            <p className="text-gray-800 font-semibold text-lg mr-2">{arrival}</p>
          </div>
        </div>
      </div>
    );
  };

  // Sigurohuni që returnTo të ketë fallback
  const returnFrom = flight.return?.returnTo || flight.from;
  const returnFromCode = flight.return?.returnToCode || flight.fromCode;

  return (
    <div className="bg-white relative rounded-3xl shadow-md border border-gray-300 hover:shadow-xl transition-all duration-300 w-full">

      {/* Favorite */}
      <div
        className="absolute top-4 right-4 cursor-pointer z-10"
        onClick={(e) => { e.stopPropagation(); toggleFavorite(flight); }}
      >
        <Heart className={`w-6 h-6 ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-400"}`} />
      </div>

      <div className="p-4 space-y-6">

        {/* Airline */}
        <img
          src={airlineLogos[flight.airline] || "/images/default.png"}
          alt={flight.airline}
          className="w-16 h-16 object-contain"
        />

        {/* OUTBOUND */}
        {hasOneWay && (
          <FlightSegment
            title="Outbound flight"
            from={flight.from}
            fromCode={flight.fromCode}
            to={flight.to}
            toCode={flight.toCode}
            departure={flight.oneWay.departure}
            arrival={flight.oneWay.arrival}
          />
        )}

        {/* RETURN */}
        {hasReturn && (
          <>
            <div className="border-t border-dashed border-gray-300 pt-4" />
            <FlightSegment
              title="Return flight"
              from={flight.to}
              fromCode={flight.toCode}
              to={returnFrom}
              toCode={returnFromCode}
              departure={flight.return.departure}
              arrival={flight.return.arrival}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center px-6 py-4 border-t border-dashed border-gray-300">
        <span className="text-sm text-gray-600">Duration: {duration}</span>
        <span className="text-lg font-bold text-gray-900">€{price}</span>
      </div>

      {/* Book */}
      <div className="p-4">
        <button
          onClick={() => openModal(flight)}
          className="bg-blue-700 text-white w-full py-3 rounded-xl font-bold hover:bg-blue-800 transition"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
