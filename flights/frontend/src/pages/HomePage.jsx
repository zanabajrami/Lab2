import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import { motion } from "framer-motion";
import mainImage from "../images/main1.jpg";

export default function Home() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

            {/* FEATURED DESTINATIONS */}
            <div className="w-full mt-28 px-6 md:px-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900">
                    Destinacionet më të njohura 🌍
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { city: "Paris", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34" },
                        { city: "Dubai", img: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a" },
                        { city: "New York", img: "https://images.unsplash.com/photo-1549924231-f129b911e442" },
                    ].map((d, i) => (
                        <motion.div
                            key={i}
                            className="rounded-2xl overflow-hidden shadow-lg relative cursor-pointer group"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.3 }}
                        >
                            <img
                                src={d.img}
                                alt={d.city}
                                className="w-full h-64 object-cover group-hover:brightness-75 transition-all duration-300"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold text-white drop-shadow-lg">
                                    {d.city}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
