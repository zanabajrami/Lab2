import React from "react";
import { motion } from "framer-motion";

import spainImage from "../images/spain.jpg";
import italyImage from "../images/italy.webp";
import franceImage from "../images/france.jpg";
import ukImage from "../images/uk.avif";
import hungaryImage from "../images/hungary.jpeg";

const destinations = [
  {
    name: "Spain",
    rentals: "166,514 vacation rentals",
    image: spainImage,
  },
  {
    name: "Italy",
    rentals: "179,454 vacation rentals",
    image: italyImage,
  },
  {
    name: "France",
    rentals: "181,734 vacation rentals",
    image: franceImage,
  },
  {
    name: "UK",
    rentals: "60,560 vacation rentals",
    image: ukImage,
  },
  {
    name: "Hungary",
    rentals: "14,211 vacation rentals",
    image: hungaryImage,
  },
];

function Destinations() {
  return (
    <div className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Popular Destinations
        </h2>
        <p className="text-gray-500 text-lg">
          Find your next adventure across Europe
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4">
        {destinations.map((dest, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {dest.name}
              </h3>
              <p className="text-gray-500 text-sm mb-3">{dest.rentals}</p>
              <button className="px-5 py-2 border border-blue-500 text-blue-500 rounded-xl font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
                Explore
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Destinations;
