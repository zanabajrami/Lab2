import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
import austria3 from "../images/austria3.jpg";
import spain6 from "../images/spain6.jpg";

const destinations = [
    { src: italyImage, name: "Italy" },
    { src: hungaryImage, name: "Hungary" },
    { src: franceImage, name: "France" },
    { src: egyptImage, name: "Egypt" },
    { src: uk4, name: "UK" },
    { src: turkey5, name: "Turkey" },
    { src: austria3, name: "Austria" },
    { src: spain6, name: "Spain" },
];


export default function Home() {
    const [current, setCurrent] = useState(0);
    const sliderRef = useRef(null);
    const navigate = useNavigate();

    const italyRef = useRef(null);
    const hungaryRef = useRef(null);
    const franceRef = useRef(null);
    const spainRef = useRef(null);
    const egyptRef = useRef(null);
    const ukRef = useRef(null);
    const turkeyRef = useRef(null);
    const austriaRef = useRef(null);

    const destinationsMap = {
        italy: italyRef,
        hungary: hungaryRef,
        france: franceRef,
        spain: spainRef,
        egypt: egyptRef,
        uk: ukRef,
        turkey: turkeyRef,
        austria: austriaRef,
    };

const goToDestination = (name) => {
    navigate("/destinations", { state: { scrollTo: name.toLowerCase() } });
};

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

            {/* Destinations */}
            <section className="py-24 text-gray-600">
                <div className="-mt-12 relative w-full max-w-6xl mx-auto h-[420px] md:h-[500px] flex items-center justify-center">
                    {destinations.map((dest, index) => {
                        let pos = index - current;
                        if (pos < -Math.floor(destinations.length / 2))
                            pos += destinations.length;
                        if (pos > Math.floor(destinations.length / 2))
                            pos -= destinations.length;

                        // përmasat & pozicioni
                        const scale = pos === 0 ? 1 : 0.82;
                        const zIndex = pos === 0 ? 30 : 10;
                        const xOffset = pos * 280;

                        // width konstant, pavarësisht scale
                        const baseWidth = 310; // në px (≈ w-80)
                        const width = baseWidth / scale; // kompenso efektin e scale

                        return (
                            <motion.div
                                key={index}
                                animate={{
                                    x: xOffset,
                                    scale: scale,
                                    zIndex: zIndex,
                                    rotateY: pos * -18,
                                    opacity: Math.abs(pos) > 2 ? 0 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                                whileHover={{ scale: pos === 0 ? 1.07 : 0.88 }}
                                style={{ width: `${width}px` }}
                                className="absolute top-0 h-full rounded-2xl shadow-2xl cursor-pointer overflow-hidden bg-gray-200"
                                onClick={() => goToDestination(dest.name)}
                            >
                                <img
                                    src={dest.src}
                                    alt={dest.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent backdrop-blur-sm text-white p-5 text-center">
                                    <h3 className="text-2xl font-semibold tracking-wide drop-shadow-md">{dest.name}</h3>
                                    <div className="mt-1 w-16 mx-auto h-[2px] bg-gradient-to-r from-blue-400 to-white rounded-full"></div>
                                </div>

                            </motion.div>
                        );
                    })}
                </div>
            </section>


        </div>
    );
}
