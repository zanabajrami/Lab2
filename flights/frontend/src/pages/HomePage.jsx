import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "../components/SearchBar";

//images
import mainImage from "../images/main1.jpg";
//slider images
import italyImage from "../images/italy.webp";
import hungaryImage from "../images/hungary.jpeg";
import franceImage from "../images/france.jpg";
import egyptImage from "../images/cairo.jpg";
import uk4 from "../images/uk4.jpg";
import turkey5 from "../images/turkey5.jpeg";
import austria1 from "../images/austria1.jpg";
import spain5 from "../images/spain5.png";

const images = [
    { src: italyImage, label: "Italy" },
    { src: hungaryImage, label: "Hungary" },
    { src: franceImage, label: "France" },
    { src: egyptImage, label: "Egypt" },
    { src: uk4, label: "UK" },
    { src: turkey5, label: "Turkey" },
    { src: austria1, label: "Austria" },
    { src: spain5, label: "Spain" },
];

const destinations = [
    { src: italyImage, name: "Italy" },
    { src: hungaryImage, name: "Hungary" },
    { src: franceImage, name: "France" },
    { src: egyptImage, name: "Egypt" },
    { src: uk4, name: "UK" },
    { src: turkey5, name: "Turkey" },
    { src: austria1, name: "Austria" },
    { src: spain5, name: "Spain" },
];

export default function Home() {
    const [current, setCurrent] = useState(0);
    const sliderRef = useRef(null);

    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % destinations.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [destinations.length]);

    // Scroll to center current card
    useEffect(() => {
        if (!sliderRef.current) return;
        const slider = sliderRef.current;
        const card = slider.children[current];
        if (card) {
            const offset = card.offsetLeft - slider.offsetWidth / 2 + card.offsetWidth / 2;
            slider.scrollTo({ left: offset, behavior: "smooth" });
        }
    }, [current]);
    return (
        <div className="flex flex-col items-center justify-center w-full text-white overflow-hidden">
            {/* HERO SECTION */}
            <div className="relative w-full h-[95vh] overflow-hidden">
                {/* FOTO */}
                <img
                    src={mainImage}
                    alt="Flight background"
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>

                {/* KONTAINERI me tekst + searchbar */}
                <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-full max-w-6xl text-center px-6 md:px-12 z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-normal leading-snug mb-4 drop-shadow-md">
                            Find the Best Flights
                        </h1>
                        <p className="text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
                            Your next adventure is just a click away.
                        </p>

                    </motion.div>

                    {/* SEARCH BAR */}
                    <motion.div
                        className="mt-10"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <SearchBar />
                    </motion.div>
                </div>
            </div>
            <section className="text-gray-700">
                <h2 className="text-3xl font-bold text-center mb-10 mt-10 drop-shadow-lg">
                    Destinations
                </h2>

                <div className="relative max-w-7xl mx-auto">
                    <div className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8">
                        {destinations.map((dest, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                className="snap-center flex-shrink-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl cursor-pointer overflow-hidden relative"
                            >
                                <img
                                    src={dest.src}
                                    alt={dest.name}
                                    className="w-full h-64 md:h-72 object-cover"
                                />
                                {/* Overlay label */}
                                <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-sm text-white p-4 text-center">
                                    <h3 className="text-2xl font-semibold">{dest.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Optional buttons */}
                    <button
                        onClick={() => {
                            document.querySelector('.snap-x')?.scrollBy({ left: -400, behavior: 'smooth' });
                        }}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition"
                    >
                        &#10094;
                    </button>
                    <button
                        onClick={() => {
                            document.querySelector('.snap-x')?.scrollBy({ left: 400, behavior: 'smooth' });
                        }}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition"
                    >
                        &#10095;
                    </button>
                </div>
            </section>


        </div>
    );
}
