// Favorites.jsx
import React, { useState, useEffect } from "react";
import { Plane, Heart } from "lucide-react";

import swiss from "../images/swiss.png";
import turkish from "../images/turkish.png";
import wizz from "../images/wizz.png";
import pegasus from "../images/pegasus.png";
import a_jet from "../images/a_jet.png";
import airAlbania from "../images/air_alb.png";
import austrian from "../images/austrian.png";
import ryan_air from "../images/ryan_air.png";
import british from "../images/british.png";

// Mapping për logot
const airlineLogos = {
    turkish,
    wizz,
    pegasus,
    swiss,
    ryan_air,
    airAlbania,
    austrian,
    british,
    a_jet,
};

const Favorites = ({ openModal }) => {
    const [favorites, setFavorites] = useState([]);

    // Merr favorites nga localStorage
    useEffect(() => {
        const stored = localStorage.getItem("favorites");
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    // Toggle remove nga favorites
    const removeFavorite = (flight) => {
        const updated = favorites.filter(
            (f) => !(f.id === flight.id && f.isReturn === flight.isReturn)
        );
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    if (favorites.length === 0)
        return <p className="text-center mt-10">No favorite flights yet.</p>;

    return (
        <div className="py-10 px-4 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                        {/* Logo + plane icon */}
                        <div className="flex items-center justify-between mb-4">
                            <img src={flight.airline} alt="Airline Logo" className="w-16 h-16 object-contain" />
                            <Plane className="text-blue-600 w-6 h-6" />
                        </div>

                        {/* One-way flight */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-2xl font-bold">{flight.from}</h3>
                                <p className="text-gray-400 text-sm">{flight.fromCode}</p>
                                <p className="text-gray-800 font-semibold text-xl mt-1">
                                    {flight.departure}
                                </p>
                            </div>

                            <div className="flex items-center justify-center w-full relative mt-4">
                                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                                <div className="absolute left-0 top-1/2 w-2 h-2 bg-black rounded-full transform -translate-y-1/2"></div>
                                <div className="absolute right-0 top-1/2 w-2 h-2 bg-black rounded-full transform -translate-y-1/2"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                                    <Plane className="w-6 h-6 text-black animate-flight" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold">{flight.to}</h3>
                                <p className="text-gray-400 text-sm">{flight.toCode}</p>
                                <p className="text-gray-800 font-semibold text-xl mt-1">
                                    {flight.arrival}
                                </p>
                            </div>
                        </div>

                        {/* Return flight */}
                        {flight.isReturn && (
                            <div className="mt-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold">{flight.to}</h3>
                                        <p className="text-gray-400 text-sm">{flight.toCode}</p>
                                        <p className="text-gray-800 font-semibold text-xl mt-1">
                                            {flight.returnDeparture}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-center w-full relative mt-4">
                                        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>
                                        <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-900 rounded-full transform -translate-y-1/2"></div>
                                        <div className="absolute right-0 top-1/2 w-2 h-2 bg-blue-900 rounded-full transform -translate-y-1/2"></div>
                                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45">
                                            <Plane className="w-6 h-6 text-blue-900 animate-flight" />
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold">{flight.returnTo}</h3>
                                        <p className="text-gray-400 text-sm">{flight.returnToCode}</p>
                                        <p className="text-gray-800 font-semibold text-xl mt-1">
                                            {flight.returnArrival}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-2 font-semibold">
                                    Return Flight
                                </p>
                            </div>
                        )}

                        {/* Duration + price */}
                        <div className="mt-4 flex justify-between">
                            <span className="text-gray-600">Duration: {flight.duration}</span>
                            <span className="text-blue-600 font-bold text-lg">
                                €{flight.oneWayPrice}
                            </span>
                        </div>
                    </div>

                    {/* Book Now */}
                    <div className="border-t border-dashed border-gray-300 my-2"></div>
                    <div className="p-6 pt-4">
                        <button
                            onClick={() => openModal && openModal(flight)}
                            className="bg-blue-600 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Favorites;
