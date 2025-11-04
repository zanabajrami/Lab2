import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import destinationsImage from "../images/destinations.jpg";
import italyImage from "../images/italy.webp";
import hungaryImage from "../images/hungary.jpeg";
import franceImage from "../images/france.jpg";
import spainImage from "../images/spain.jpg";
import egyptImage from "../images/cairo.jpg";
import ukImage from "../images/uk1.jpg";

import italy1 from "../images/italy1.jpg";
import italy2 from "../images/italy2.jpg";
import italy3 from "../images/italy3.avif";
import italy4 from "../images/italy4.jpg";
import italy5 from "../images/italy5.jpeg";
import italy6 from "../images/italy6.jpg";

import hungary1 from "../images/hungary1.webp";
import hungary2 from "../images/hungary2.webp";
import hungary3 from "../images/hungary3.jpg";
import hungary4 from "../images/hungary4.jpg";
import hungary5 from "../images/hungary5.webp";
import hungary6 from "../images/hungary6.jpg";

function Destinations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [current, setCurrent] = useState(0);

    const slides = [
        { country: "Italy", image: italyImage, desc: "Discover Rome, Milano and many more cities." },
        { country: "Hungary", image: hungaryImage, desc: "Experience Budapest’s charm and thermal baths." },
        { country: "France", image: franceImage, desc: "Enjoy Paris, the Riviera and fine cuisine." },
        { country: "Spain", image: spainImage, desc: "Feel the sun in Barcelona and Madrid." },
        { country: "Egypt", image: egyptImage, desc: "Explore the pyramids and the Nile River." },
        { country: "UK", image: ukImage, desc: "Discover London’s culture and the beauty of the countryside." },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        console.log("Searching for:", searchTerm);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="min-h-screen bg-white text-gray-800">
            {/* Hero Section */}
            <section
                className="text-center py-20 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${destinationsImage})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <h1 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                    🗺Explore Destinations🗺
                </h1>
            </section>

            {/* Search Bar Section */}
            <div className="flex justify-center -mt-8 -mb-7 px-4">
                <form
                    onSubmit={handleSearch}
                    className="flex items-center w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 transition-all focus-within:shadow-2xl"
                >
                    <div className="pl-5 text-gray-500">
                        <Search size={22} />
                    </div>
                    <input
                        type="text"
                        placeholder="Search destinations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-grow px-4 py-3 text-gray-700 bg-transparent focus:outline-none placeholder-gray-500"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 m-1 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Most Popular Destinations Section */}
            <section className="text-center py-14 px-4 ">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Most Popular Destinations
                </h2>

                {/* Slideshow Container */}
                <div className="relative max-w-5xl mx-auto h-[24rem] overflow-hidden rounded-3xl shadow-2xl">
                    <AnimatePresence>
                        <motion.div
                            key={current}
                            className="absolute inset-0 w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-center"
                            style={{
                                backgroundImage: `url(${slides[current].image})`,
                            }}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 1 }}
                        >
                            {/* Overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                            {/* Slide content */}
                            <div className="relative z-10 px-6 max-w-2xl">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                                    {slides[current].country}
                                </h3>
                                <p className="text-lg md:text-xl text-gray-100 font-light leading-relaxed">
                                    {slides[current].desc}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation dots */}
                <div className="flex justify-center gap-3 mt-6">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrent(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current
                                ? "bg-blue-600 w-6"
                                : "bg-gray-400 hover:bg-gray-500"
                                }`}
                        ></button>
                    ))}
                </div>
            </section>

            {/* Italy */}
            <section className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Italy
                </h2>

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in Italy
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Discover Italy’s most iconic landmarks, from ancient ruins to stunning architecture.
                    </p>
                </div>

                {/* Slider */}
                <Slider
                    dots={true}
                    infinite={true}
                    speed={800}
                    slidesToShow={3}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={3500}
                    pauseOnHover={true}
                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: { slidesToShow: 2 },
                        },
                        {
                            breakpoint: 640,
                            settings: { slidesToShow: 1 },
                        },
                    ]}
                >
                    {[
                        {
                            name: "Colosseum",
                            img: italy1,
                            rating: "⭐ 4.6 (150,940 reviews)",
                            desc: "The ancient Flavian Amphitheater was built by the Flavian emperors in 70 C.E. as a gift to the Roman people.",
                        },
                        {
                            name: "Duomo di Milano",
                            img: italy2,
                            rating: "⭐ 4.7 (59,316 reviews)",
                            desc: "The centerpiece of Milan, the Duomo is one of Europe’s greatest architectural and cultural landmarks.",
                        },
                        {
                            name: "Pantheon",
                            img: italy3,
                            rating: "⭐ 4.7 (80,394 reviews)",
                            desc: "Dedicated to the seven planetary divinities, the Pantheon is one of the most impressive monuments of Rome.",
                        },
                        {
                            name: "Trevi Fountain",
                            img: italy4,
                            rating: "⭐ 4.4 (104,409 reviews)",
                            desc: "The most famous and photographed fountain in Rome — legend says whoever throws a coin will return.",
                        },
                        {
                            name: "Galleria Vittorio Emanuele II",
                            img: italy5,
                            rating: "⭐ 4.5 (30,429 reviews)",
                            desc: "This extravagant 19th-century glass-topped arcade is one of Milan’s most elegant shopping landmarks.",
                        },
                        {
                            name: "St. Peter’s Basilica",
                            img: italy6,
                            rating: "⭐ 4.8 (41,865 reviews)",
                            desc: "One of the finest cathedrals in the world — a Renaissance masterpiece and the heart of Vatican City.",
                        },
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                {/* Image container */}
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Card overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>

                                {/* Content */}
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>

                    ))}
                </Slider>
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Luca M.",
                                location: "Florence, IT",
                                contributions: 112,
                                attraction: "Colosseum",
                                review: "Walking through the Colosseum was like stepping back in time. Every corner tells a story of ancient Rome. The underground tour is an absolute must!",
                                date: "15 October 2025",
                                emoji: "🏛️"
                            },
                            {
                                name: "Sofia R.",
                                location: "Milan, IT",
                                contributions: 78,
                                attraction: "Duomo di Milano",
                                review: "The Duomo is breathtaking! Climbing to the rooftop gives you an amazing view of the city. The stained glass inside is mesmerizing.",
                                date: "22 November 2025",
                                emoji: "⛪"
                            },
                            {
                                name: "Marco P.",
                                location: "Rome, IT",
                                contributions: 64,
                                attraction: "Pantheon",
                                review: "Such an incredible architectural masterpiece. The dome is flawless, and the atmosphere inside is serene and peaceful.",
                                date: "5 September 2025",
                                emoji: "🏛️"
                            },
                            {
                                name: "Elena T.",
                                location: "Venice, IT",
                                contributions: 91,
                                attraction: "Trevi Fountain",
                                review: "A magical place to visit at night. Tossing a coin here is a tradition I loved. It's crowded, but the beauty makes it worthwhile.",
                                date: "30 October 2025",
                                emoji: "💦"
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-blue-700 rounded-full font-semibold text-gray-200 text-lg">
                                        {review.name.charAt(0)}
                                    </div>                                    <div>
                                        <h3 className="text-lg font-semibold">{review.name}</h3>
                                        <p className="text-sm text-gray-500">{review.location} • {review.contributions} contributions</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-2">"{review.review}"</p>
                                <p className="text-sm text-gray-500 mt-auto">Review of: <span className="font-medium">{review.attraction}</span> • {review.date}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about Italy
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {/* Capital */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🏛️</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Rome</p>
                        </div>

                        {/* Currency */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💶</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-base">Euro (EUR)</p>
                        </div>

                        {/* Population */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">👥</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">59,854,860</p>
                        </div>

                        {/* Language */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">Italian</p>
                        </div>

                        {/* Time Zone */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">⏰</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +1</p>
                        </div>
                    </div>
                </section>

            </section>

            {/* Hungary */}
            <section className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Hungary
                </h2>

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in Hungary
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Discover Hungary’s most iconic landmarks, from thermal baths to historic buildings.
                    </p>
                </div>

                {/* Slider */}
                <Slider
                    dots={true}
                    infinite={true}
                    speed={800}
                    slidesToShow={3}
                    slidesToScroll={1}
                    autoplay={true}
                    autoplaySpeed={3500}
                    pauseOnHover={true}
                    responsive={[
                        {
                            breakpoint: 1024,
                            settings: { slidesToShow: 2 },
                        },
                        {
                            breakpoint: 640,
                            settings: { slidesToShow: 1 },
                        },
                    ]}
                >
                    {[
                        {
                            name: "Széchenyi Baths and Pool",
                            img: hungary1,
                            rating: "⭐ 4.0 (34,676 reviews)",
                            desc: "Biggest thermal complex in Eastern Europe with outdoor pools and historic baths.",
                        },
                        {
                            name: "Hungarian Parliament Building",
                            img: hungary2,
                            rating: "⭐ 4.6 (42,861 reviews)",
                            desc: "Iconic government building and architectural masterpiece along the Danube.",
                        },
                        {
                            name: "Fisherman's Bastion",
                            img: hungary3,
                            rating: "⭐ 4.6 (32,706 reviews)",
                            desc: "Historic site with panoramic views of the city and the Parliament building.",
                        },
                        {
                            name: "St. Stephen's Basilica",
                            img: hungary4,
                            rating: "⭐ 4.5 (22,782 reviews)",
                            desc: "Religious site and grand cathedral located in the heart of Budapest.",
                        },
                        {
                            name: "Danube River",
                            img: hungary5,
                            rating: "⭐ 4.6 (14,464 reviews)",
                            desc: "Picturesque river flowing through the heart of Budapest and surrounding cities.",
                        },
                        {
                            name: "Hungarian State Opera House",
                            img: hungary6,
                            rating: "⭐ 4.5 (7,895 reviews)",
                            desc: "Elegant opera house featuring stunning architecture and cultural performances.",
                        },
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                {/* Image container */}
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                {/* Card overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>

                                {/* Content */}
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews - Hungary
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Anna V.",
                                location: "Budapest, HU",
                                contributions: 54,
                                attraction: "Széchenyi Thermal Baths",
                                review: "A relaxing and historic experience. The thermal pools are amazing and perfect for a sunny afternoon. Highly recommend the outdoor pools!",
                                date: "12 October 2025",
                            },
                            {
                                name: "Peter K.",
                                location: "Debrecen, HU",
                                contributions: 37,
                                attraction: "Hungarian Parliament Building",
                                review: "The Parliament is stunning! The guided tour gave me insights into the history and architecture. A must-see when in Budapest.",
                                date: "5 November 2025",
                            },
                            {
                                name: "Zsófia L.",
                                location: "Szeged, HU",
                                contributions: 26,
                                attraction: "Fisherman's Bastion",
                                review: "Amazing panoramic views of the city! Perfect spot for photos and enjoying Budapest’s skyline. The architecture is fairy-tale like.",
                                date: "20 September 2025",
                            },
                            {
                                name: "Gábor T.",
                                location: "Pécs, HU",
                                contributions: 42,
                                attraction: "St. Stephen's Basilica",
                                review: "Beautiful interior and rich history. Climbing to the top was worth it for the view of the Danube and the city.",
                                date: "2 October 2025",
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-blue-700 rounded-full font-semibold text-gray-200 text-lg">
                                        {review.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold">{review.name}</h3>
                                        <p className="text-sm text-gray-500">{review.location} • {review.contributions} contributions</p>
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-2">"{review.review}"</p>
                                <p className="text-sm text-gray-500 mt-auto">Review of: <span className="font-medium">{review.attraction}</span> • {review.date}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about Hungary
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {/* Capital */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">📍</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Budapest</p>
                        </div>

                        {/* Currency */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💰</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-center">Hungarian Forint (HUF)</p>
                        </div>

                        {/* Population */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🧑🏻‍🤝‍🧑🏻</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">9,625,818</p>
                        </div>

                        {/* Language */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">Hungarian</p>
                        </div>

                        {/* Time Zone */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🕒</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +1</p>
                        </div>
                    </div>
                </section>

            </section>

        </div>
    );
}

export default Destinations;
