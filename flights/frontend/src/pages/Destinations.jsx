import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronUp } from "lucide-react";
import { useLocation } from "react-router-dom";
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

import italy1 from "../images/italy1.jpg"; import italy2 from "../images/italy2.jpg"; import italy3 from "../images/italy3.avif";
import italy4 from "../images/italy4.jpg"; import italy5 from "../images/italy5.jpeg"; import italy6 from "../images/italy6.jpg";

import hungary1 from "../images/hungary1.webp"; import hungary2 from "../images/hungary2.webp"; import hungary3 from "../images/hungary3.jpg";
import hungary4 from "../images/hungary4.jpg"; import hungary5 from "../images/hungary5.webp"; import hungary6 from "../images/hungary6.jpg";

import spain1 from "../images/spain1.webp"; import spain2 from "../images/spain2.webp"; import spain3 from "../images/spain3.jpg";
import spain4 from "../images/spain4.jpg"; import spain5 from "../images/spain5.png"; import spain6 from "../images/spain6.jpg";

import egypt1 from "../images/egypt1.jpg"; import egypt2 from "../images/egypt2.avif"; import egypt3 from "../images/egypt3.jpg";
import egypt4 from "../images/egypt4.jpg"; import egypt5 from "../images/egypt5.jpeg"; import egypt6 from "../images/egypt6.avif";

import france1 from "../images/france1.avif"; import france2 from "../images/france2.webp"; import france3 from "../images/france3.avif";
import france4 from "../images/france4.jpg"; import france5 from "../images/france5.webp"; import france6 from "../images/france6.jpg";

import austria1 from "../images/austria1.jpg"; import austria2 from "../images/austria2.jpg"; import austria3 from "../images/austria3.jpg";
import austria4 from "../images/austria4.jpg"; import austria5 from "../images/austria5.avif"; import austria6 from "../images/austria6.webp";

import turkey1 from "../images/turkey1.webp"; import turkey2 from "../images/turkey2.jpg"; import turkey3 from "../images/turkey3.avif";
import turkey4 from "../images/turkey4.avif"; import turkey5 from "../images/turkey5.jpeg"; import turkey6 from "../images/turkey6.png";

import uk1 from "../images/uk1.jpg"; import uk2 from "../images/uk2.jpg"; import uk3 from "../images/uk3.webp";
import uk4 from "../images/uk4.jpg"; import uk5 from "../images/uk5.jpg"; import uk6 from "../images/uk6.jpg";

function Destinations() {
    const [searchTerm, setSearchTerm] = useState("");
    const [current, setCurrent] = useState(0);
    const [showTopButton, setShowTopButton] = useState(false);
    const location = useLocation();
    const scrollTo = location.state?.scrollTo;
    const navigate = useNavigate();

    const italyRef = useRef(null);
    const hungaryRef = useRef(null);
    const franceRef = useRef(null);
    const spainRef = useRef(null);
    const egyptRef = useRef(null);
    const ukRef = useRef(null);
    const turkeyRef = useRef(null);
    const austriaRef = useRef(null);

    const destinationsMap = useMemo(() => ({
    italy: italyRef, hungary: hungaryRef, france: franceRef, spain: spainRef, egypt: egyptRef, uk: ukRef, turkey: turkeyRef, austria: austriaRef
    }), []);

    const slides = [
        { country: "Italy", image: italyImage, desc: "Discover Rome, Milano and many more cities." },
        { country: "Hungary", image: hungaryImage, desc: "Experience Budapest’s charm and thermal baths." },
        { country: "France", image: franceImage, desc: "Enjoy Paris, the Riviera and fine cuisine." },
        { country: "Spain", image: spainImage, desc: "Feel the sun in Barcelona and Madrid." },
        { country: "Egypt", image: egyptImage, desc: "Explore the pyramids and the Nile River." },
        { country: "UK", image: ukImage, desc: "Discover London’s culture and the beauty of the countryside." },
    ];

    useEffect(() => {
        if (scrollTo && destinationsMap[scrollTo]?.current) {
            destinationsMap[scrollTo].current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, [scrollTo, destinationsMap]);

    const handleSearch = (e) => {
        e.preventDefault();
        const key = searchTerm.trim().toLowerCase();
        const ref = destinationsMap[key];

        if (ref && ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
            setSearchTerm("");
        } else {
            alert("Destination not found!");
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowTopButton(true);
            } else {
                setShowTopButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Funksioni për scroll lart
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

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
                    className="flex items-center w-full max-w-xs sm:max-w-md md:max-w-2xl bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-gray-200 transition-all focus-within:shadow-2xl"
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
                        className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 sm:px-6 py-3 m-1 rounded-full font-medium hover:from-blue-600 hover:to-blue-700 transition-all
             -ml-10 sm:-ml-0"
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
            <section ref={italyRef} className="py-16 text-gray-800 px-6 md:px-20">
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
                            <span className="text-4xl mb-3">🕒</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +1</p>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in Rome
                    </h2>

                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "9°C", desc: "Cold", icon: "❄️" },
                            { month: "February", temp: "10°C", desc: "Cold", icon: "❄️" },
                            { month: "March", temp: "13°C", desc: "Mild", icon: "🌤️" },
                            { month: "April", temp: "16°C", desc: "Mild", icon: "🌤️" },
                            { month: "May", temp: "20°C", desc: "Warm", icon: "☀️" },
                            { month: "June", temp: "24°C", desc: "Hot", icon: "☀️" },
                            { month: "July", temp: "27°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "27°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "24°C", desc: "Warm", icon: "🌤️" },
                            { month: "October", temp: "20°C", desc: "Mild", icon: "🌤️" },
                            { month: "November", temp: "14°C", desc: "Cool", icon: "🌤️" },
                            { month: "December", temp: "10°C", desc: "Cold", icon: "❄️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>

                </section>
            </section>

            {/* Hungary */}
            <section ref={hungaryRef} className="py-16 text-gray-800 px-6 md:px-20">
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
                        Visitor Reviews
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
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-green-700 rounded-full font-semibold text-gray-200 text-lg">
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
                            <span className="text-4xl mb-3">🏰</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Budapest</p>
                        </div>

                        {/* Currency */}
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💲</span>
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
                            <span className="text-4xl mb-3">⏰</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +1</p>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in Budapest
                    </h2>

                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "0°C", desc: "Cold", icon: "❄️" },
                            { month: "February", temp: "1°C", desc: "Cold", icon: "❄️" },
                            { month: "March", temp: "5°C", desc: "Cool", icon: "🌤️" },
                            { month: "April", temp: "11°C", desc: "Mild", icon: "🌤️" },
                            { month: "May", temp: "16°C", desc: "Warm", icon: "☀️" },
                            { month: "June", temp: "20°C", desc: "Warm", icon: "☀️" },
                            { month: "July", temp: "22°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "22°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "18°C", desc: "Mild", icon: "🌤️" },
                            { month: "October", temp: "13°C", desc: "Cool", icon: "🌤️" },
                            { month: "November", temp: "6°C", desc: "Cold", icon: "🌤️" },
                            { month: "December", temp: "2°C", desc: "Cold", icon: "❄️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>

                </section>
            </section>

            <section className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Spain
                </h2>
                <div ref={spainRef} className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in Spain
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Discover Spain’s most iconic landmarks, from historic palaces to vibrant plazas.
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
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {[
                        {
                            name: "Sagrada Familia",
                            img: spain1,
                            rating: "⭐ 4.8 (150,000 reviews)",
                            desc: "Antoni Gaudí’s unfinished masterpiece in Barcelona, a stunning example of modernist architecture.",
                        },
                        {
                            name: "Park Güell",
                            img: spain2,
                            rating: "⭐ 4.6 (95,000 reviews)",
                            desc: "A whimsical park in Barcelona with colorful mosaics and unique architectural features by Gaudí.",
                        },
                        {
                            name: "Plaza Mayor",
                            img: spain3,
                            rating: "⭐ 4.5 (80,000 reviews)",
                            desc: "Historic central square in Madrid, surrounded by traditional architecture and lively cafes.",
                        },
                        {
                            name: "La Rambla",
                            img: spain4,
                            rating: "⭐ 4.4 (65,000 reviews)",
                            desc: "Famous pedestrian street in Barcelona filled with shops, restaurants, and street performers.",
                        },
                        {
                            name: "Royal Palace of Madrid",
                            img: spain5,
                            rating: "⭐ 4.7 (70,000 reviews)",
                            desc: "The official residence of the Spanish Royal Family, featuring grand halls, gardens, and historic artifacts.",
                        },
                        {
                            name: "Casa Batlló",
                            img: spain6,
                            rating: "⭐ 4.7 (68,000 reviews)",
                            desc: "Another Gaudí masterpiece in Barcelona, famous for its colorful façade and creative interior design.",
                        }
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Visitor Reviews */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Carlos M.",
                                location: "Barcelona, ES",
                                contributions: 48,
                                attraction: "Sagrada Familia",
                                review: "Incredible design! Gaudí’s work is absolutely mesmerizing. The towers offer breathtaking views of the city.",
                                date: "10 October 2025",
                            },
                            {
                                name: "Lucia R.",
                                location: "Madrid, ES",
                                contributions: 32,
                                attraction: "Plaza Mayor",
                                review: "A lively square full of energy, history, and great tapas! Perfect for people-watching.",
                                date: "18 November 2025",
                            },
                            {
                                name: "Sofia L.",
                                location: "Madrid, ES",
                                contributions: 38,
                                attraction: "Royal Palace of Madrid",
                                review: "The Royal Palace is absolutely magnificent. The interiors are lavish and the gardens are perfect for a stroll. A must-visit in Madrid!",
                                date: "15 October 2025",
                            },
                            {
                                name: "Lucas R.",
                                location: "Barcelona, ES",
                                contributions: 44,
                                attraction: "Park Güell",
                                review: "Park Güell is whimsical and colorful. Walking around Gaudí’s creations feels like entering a fairy tale. Loved the mosaic work!",
                                date: "20 November 2025",
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-red-600 rounded-full font-semibold text-gray-200 text-lg">
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

                {/* Facts about Spain */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about Spain
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💃🏽</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Madrid</p>
                        </div>
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💵</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-center">Euro (EUR)</p>
                        </div>
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">👤</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">47,450,795</p>
                        </div>
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">Spanish</p>
                        </div>
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">⏱️</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +1</p>
                        </div>
                    </div>
                </section>

                {/* Weather */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in Spain
                    </h2>

                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "16°C", desc: "Cool", icon: "🌤️" },
                            { month: "February", temp: "17°C", desc: "Cool", icon: "🌤️" },
                            { month: "March", temp: "17°C", desc: "Cool", icon: "🌤️" },
                            { month: "April", temp: "19°C", desc: "Cool", icon: "🌤️" },
                            { month: "May", temp: "22°C", desc: "Warm", icon: "☀️" },
                            { month: "June", temp: "25°C", desc: "Hot", icon: "☀️" },
                            { month: "July", temp: "28°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "28°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "26°C", desc: "Warm", icon: "☀️" },
                            { month: "October", temp: "22°C", desc: "Warm", icon: "🌤️" },
                            { month: "November", temp: "18°C", desc: "Cool", icon: "🌤️" },
                            { month: "December", temp: "16°C", desc: "Cool", icon: "🌤️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>
                </section>
            </section>

            <section ref={egyptRef} className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Egypt
                </h2>

                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in Egypt
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Explore Egypt’s iconic landmarks, from ancient pyramids to vibrant bazaars.
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
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {[
                        {
                            name: "Pyramids of Giza",
                            img: egypt1,
                            rating: "⭐ 4.9 (200,000 reviews)",
                            desc: "The most famous Egyptian pyramids, a must-visit ancient wonder just outside Cairo.",
                        },
                        {
                            name: "The Egyptian Museum",
                            img: egypt2,
                            rating: "⭐ 4.7 (120,000 reviews)",
                            desc: "Home to thousands of ancient artifacts, including King Tutankhamun’s treasures.",
                        },
                        {
                            name: "Khan El Khalili",
                            img: egypt3,
                            rating: "⭐ 4.5 (80,000 reviews)",
                            desc: "A bustling market in Cairo with spices, jewelry, souvenirs, and local delicacies.",
                        },
                        {
                            name: "Cairo Citadel",
                            img: egypt4,
                            rating: "⭐ 4.6 (70,000 reviews)",
                            desc: "A historic Islamic-era fortress offering panoramic views of Cairo and stunning mosques.",
                        },
                        {
                            name: "Al-Azhar Mosque",
                            img: egypt5,
                            rating: "⭐ 4.6 (65,000 reviews)",
                            desc: "One of Cairo’s oldest mosques and a center of Islamic learning.",
                        },
                        {
                            name: "Coptic Cairo",
                            img: egypt6,
                            rating: "⭐ 4.5 (60,000 reviews)",
                            desc: "Explore ancient churches, monasteries, and Christian heritage in the heart of Cairo.",
                        }
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Visitor Reviews */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Ahmed S.",
                                location: "Cairo, EG",
                                contributions: 40,
                                attraction: "Pyramids of Giza",
                                review: "An unforgettable experience! Standing next to these ancient wonders is surreal.",
                                date: "12 October 2025",
                            },
                            {
                                name: "Laila M.",
                                location: "Cairo, EG",
                                contributions: 25,
                                attraction: "The Egyptian Museum",
                                review: "The artifacts are mind-blowing, especially King Tut’s treasures. A must for history lovers.",
                                date: "20 November 2025",
                            },
                            {
                                name: "Omar H.",
                                location: "Cairo, EG",
                                contributions: 30,
                                attraction: "Khan El Khalili",
                                review: "The market is vibrant and full of life. Great place to shop and experience local culture.",
                                date: "5 October 2025",
                            },
                            {
                                name: "Sara F.",
                                location: "Cairo, EG",
                                contributions: 28,
                                attraction: "Cairo Citadel",
                                review: "Amazing views of Cairo from the top. The mosques inside are stunning!",
                                date: "22 November 2025",
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-pink-600 rounded-full font-semibold text-gray-200 text-lg">
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

                {/* Facts about Egypt */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about Egypt
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🐫</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Cairo</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💰</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-center">Egyptian Pound (EGP)</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">👨🏻‍👩🏻‍👦🏻‍👦🏻</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">109,000,000</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">Arabic</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">⏰</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +2</p>
                        </div>
                    </div>
                </section>

                {/* Weather */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in Egypt
                    </h2>

                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "19°C", desc: "Mild", icon: "🌤️" },
                            { month: "February", temp: "20°C", desc: "Mild", icon: "🌤️" },
                            { month: "March", temp: "22°C", desc: "Warm", icon: "🌤️" },
                            { month: "April", temp: "25°C", desc: "Warm", icon: "☀️" },
                            { month: "May", temp: "28°C", desc: "Hot", icon: "☀️" },
                            { month: "June", temp: "32°C", desc: "Hot", icon: "☀️" },
                            { month: "July", temp: "34°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "34°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "32°C", desc: "Hot", icon: "☀️" },
                            { month: "October", temp: "29°C", desc: "Warm", icon: "☀️" },
                            { month: "November", temp: "25°C", desc: "Warm", icon: "🌤️" },
                            { month: "December", temp: "21°C", desc: "Mild", icon: "🌤️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>
                </section>
            </section>

            <section ref={franceRef} className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    France
                </h2>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in France
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Discover France’ world-famous landmarks, museums, and charming streets.
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
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {[
                        {
                            name: "Eiffel Tower",
                            img: france1,
                            rating: "⭐ 4.8 (250,000 reviews)",
                            desc: "The iconic symbol of Paris, offering breathtaking views from its observation decks.",
                        },
                        {
                            name: "Louvre Museum",
                            img: france2,
                            rating: "⭐ 4.7 (180,000 reviews)",
                            desc: "World-famous museum housing the Mona Lisa, ancient artifacts, and master artworks.",
                        },
                        {
                            name: "Notre-Dame Cathedral",
                            img: france3,
                            rating: "⭐ 4.6 (120,000 reviews)",
                            desc: "Historic Gothic cathedral known for its architecture and stained-glass windows.",
                        },
                        {
                            name: "Montmartre",
                            img: france4,
                            rating: "⭐ 4.5 (100,000 reviews)",
                            desc: "Artistic neighborhood with charming streets, cafés, and the Sacré-Cœur Basilica.",
                        },
                        {
                            name: "Champs-Élysées & Arc de Triomphe",
                            img: france5,
                            rating: "⭐ 4.7 (90,000 reviews)",
                            desc: "Famous avenue with shops, cafes, and the monumental Arc de Triomphe at its center.",
                        },
                        {
                            name: "Palace of Versailles",
                            img: france6,
                            rating: "⭐ 4.8 (85,000 reviews)",
                            desc: "Lavish palace outside Paris with magnificent gardens and historic halls.",
                        }
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Visitor Reviews */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Marie L.",
                                location: "Paris, FR",
                                contributions: 50,
                                attraction: "Eiffel Tower",
                                review: "Stunning views from the top! The city looks magical at night.",
                                date: "15 October 2025",
                            },
                            {
                                name: "Julien R.",
                                location: "Paris, FR",
                                contributions: 35,
                                attraction: "Louvre Museum",
                                review: "Incredible artworks and history. I could spend days exploring here.",
                                date: "20 November 2025",
                            },
                            {
                                name: "Sophie M.",
                                location: "Paris, FR",
                                contributions: 40,
                                attraction: "Montmartre",
                                review: "Charming streets and artistic vibes. Loved the cafés and Sacré-Cœur view.",
                                date: "5 October 2025",
                            },
                            {
                                name: "Lucas T.",
                                location: "Paris, FR",
                                contributions: 38,
                                attraction: "Palace of Versailles",
                                review: "The palace and gardens are breathtaking. Truly a royal experience!",
                                date: "22 November 2025",
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-purple-600 rounded-full font-semibold text-gray-200 text-lg">
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

                {/* Facts about France */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about France
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗼</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Paris</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💰</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-center">Euro (EUR)</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">👥</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">67,800,000</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">French</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">⏱</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +1</p>
                        </div>
                    </div>
                </section>

                {/* Weather */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in France
                    </h2>

                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "5°C", desc: "Cold", icon: "❄️" },
                            { month: "February", temp: "6°C", desc: "Cold", icon: "❄️" },
                            { month: "March", temp: "10°C", desc: "Mild", icon: "🌤️" },
                            { month: "April", temp: "13°C", desc: "Mild", icon: "🌤️" },
                            { month: "May", temp: "17°C", desc: "Warm", icon: "☀️" },
                            { month: "June", temp: "20°C", desc: "Warm", icon: "☀️" },
                            { month: "July", temp: "23°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "23°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "20°C", desc: "Warm", icon: "🌤️" },
                            { month: "October", temp: "15°C", desc: "Mild", icon: "🌤️" },
                            { month: "November", temp: "10°C", desc: "Cool", icon: "🌤️" },
                            { month: "December", temp: "6°C", desc: "Cold", icon: "❄️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>
                </section>
            </section>

            <section ref={austriaRef} className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Austria
                </h2>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in Austria
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Explore Austria’s historic landmarks, palaces, and vibrant cultural spots.
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
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {[
                        {
                            name: "Schönbrunn Palace",
                            img: austria1,
                            rating: "⭐ 4.8 (120,000 reviews)",
                            desc: "Historic Baroque palace with stunning gardens and the former summer residence of the Habsburgs.",
                        },
                        {
                            name: "St. Stephen's Cathedral",
                            img: austria2,
                            rating: "⭐ 4.7 (100,000 reviews)",
                            desc: "Iconic Gothic cathedral in the heart of Vienna with its famous multicolored roof.",
                        },
                        {
                            name: "Belvedere Palace",
                            img: austria3,
                            rating: "⭐ 4.7 (85,000 reviews)",
                            desc: "Baroque palace complex housing Austrian art, including works by Gustav Klimt.",
                        },
                        {
                            name: "Vienna State Opera",
                            img: austria4,
                            rating: "⭐ 4.6 (70,000 reviews)",
                            desc: "One of the world’s leading opera houses with historic architecture and grand performances.",
                        },
                        {
                            name: "Prater & Giant Ferris Wheel",
                            img: austria5,
                            rating: "⭐ 4.5 (60,000 reviews)",
                            desc: "Historic amusement park with the famous Riesenrad Ferris Wheel offering great city views.",
                        },
                        {
                            name: "Museum Quartier",
                            img: austria6,
                            rating: "⭐ 4.6 (55,000 reviews)",
                            desc: "A vibrant cultural complex with museums, cafes, and contemporary art exhibits.",
                        }
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Visitor Reviews */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Anna K.",
                                location: "Vienna, AT",
                                contributions: 40,
                                attraction: "Schönbrunn Palace",
                                review: "Absolutely stunning! The gardens are beautiful, and the palace is like stepping back in time.",
                                date: "10 October 2025",
                            },
                            {
                                name: "Lukas M.",
                                location: "Vienna, AT",
                                contributions: 35,
                                attraction: "St. Stephen's Cathedral",
                                review: "A must-see in Vienna! The architecture and intricate details are breathtaking.",
                                date: "18 November 2025",
                            },
                            {
                                name: "Sophie B.",
                                location: "Vienna, AT",
                                contributions: 30,
                                attraction: "Belvedere Palace",
                                review: "Amazing art collection and the palace gardens are gorgeous.",
                                date: "5 October 2025",
                            },
                            {
                                name: "Michael H.",
                                location: "Vienna, AT",
                                contributions: 28,
                                attraction: "Vienna State Opera",
                                review: "Wonderful performances in a historic and elegant building.",
                                date: "22 November 2025",
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-red-600 rounded-full font-semibold text-gray-200 text-lg">
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

                {/* Facts about Austria */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about Austria
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🎻</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Vienna</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💸</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-center">Euro (EUR)</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">👨‍👩‍👧‍👦</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">8,900,000</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">German</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">⏱️</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +1</p>
                        </div>
                    </div>
                </section>

                {/* Weather */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in Austria
                    </h2>

                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "0°C", desc: "Cold", icon: "❄️" },
                            { month: "February", temp: "1°C", desc: "Cold", icon: "❄️" },
                            { month: "March", temp: "6°C", desc: "Cool", icon: "🌤️" },
                            { month: "April", temp: "12°C", desc: "Mild", icon: "🌤️" },
                            { month: "May", temp: "17°C", desc: "Warm", icon: "☀️" },
                            { month: "June", temp: "20°C", desc: "Warm", icon: "☀️" },
                            { month: "July", temp: "23°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "22°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "18°C", desc: "Mild", icon: "🌤️" },
                            { month: "October", temp: "13°C", desc: "Cool", icon: "🌤️" },
                            { month: "November", temp: "6°C", desc: "Cold", icon: "🌤️" },
                            { month: "December", temp: "2°C", desc: "Cold", icon: "❄️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>
                </section>
            </section>

            <section ref={turkeyRef} className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    Turkey
                </h2>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in Istanbul
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Discover Istanbul’s rich history, stunning mosques, and vibrant bazaars.
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
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {[
                        {
                            name: "Hagia Sophia",
                            img: turkey1,
                            rating: "⭐ 4.8 (200,000 reviews)",
                            desc: "Historic architectural marvel, combining Byzantine and Ottoman influences.",
                        },
                        {
                            name: "Blue Mosque",
                            img: turkey2,
                            rating: "⭐ 4.7 (180,000 reviews)",
                            desc: "Famous mosque with six minarets and beautiful blue Iznik tiles inside.",
                        },
                        {
                            name: "Topkapi Palace",
                            img: turkey3,
                            rating: "⭐ 4.6 (150,000 reviews)",
                            desc: "Opulent palace of Ottoman sultans with rich collections and stunning courtyards.",
                        },
                        {
                            name: "Grand Bazaar",
                            img: turkey4,
                            rating: "⭐ 4.5 (120,000 reviews)",
                            desc: "Historic covered market with thousands of shops selling spices, jewelry, and souvenirs.",
                        },
                        {
                            name: "Galata Tower",
                            img: turkey5,
                            rating: "⭐ 4.6 (100,000 reviews)",
                            desc: "Medieval tower offering panoramic views of Istanbul and the Bosphorus.",
                        },
                        {
                            name: "Bosphorus Cruise",
                            img: turkey6,
                            rating: "⭐ 4.7 (90,000 reviews)",
                            desc: "Scenic boat ride along the Bosphorus connecting Europe and Asia.",
                        }
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Visitor Reviews */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Emre T.",
                                location: "Istanbul, TR",
                                contributions: 45,
                                attraction: "Hagia Sophia",
                                review: "Absolutely breathtaking! The history and architecture are mind-blowing.",
                                date: "10 October 2025",
                            },
                            {
                                name: "Ayşe K.",
                                location: "Istanbul, TR",
                                contributions: 38,
                                attraction: "Blue Mosque",
                                review: "Magnificent mosque with beautiful tiles and peaceful atmosphere.",
                                date: "18 November 2025",
                            },
                            {
                                name: "Mustafa B.",
                                location: "Istanbul, TR",
                                contributions: 32,
                                attraction: "Topkapi Palace",
                                review: "Rich in history and beautiful artifacts. Loved the palace gardens!",
                                date: "5 October 2025",
                            },
                            {
                                name: "Selin A.",
                                location: "Istanbul, TR",
                                contributions: 30,
                                attraction: "Grand Bazaar",
                                review: "A shopper’s paradise! The colors, smells, and vibe are amazing.",
                                date: "22 November 2025",
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-orange-600 rounded-full font-semibold text-gray-200 text-lg">
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

                {/* Facts about Turkey */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about Turkey
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🌉</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">Ankara</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">💶</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-center">Turkish Lira (TRY)</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">👥</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">85,000,000</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">Turkish</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">⏰</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +3</p>
                        </div>
                    </div>
                </section>

                {/* Weather */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in Istanbul
                    </h2>
                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "8°C", desc: "Cold", icon: "❄️" },
                            { month: "February", temp: "9°C", desc: "Cold", icon: "❄️" },
                            { month: "March", temp: "12°C", desc: "Mild", icon: "🌤️" },
                            { month: "April", temp: "16°C", desc: "Mild", icon: "🌤️" },
                            { month: "May", temp: "20°C", desc: "Warm", icon: "☀️" },
                            { month: "June", temp: "25°C", desc: "Hot", icon: "☀️" },
                            { month: "July", temp: "28°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "28°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "24°C", desc: "Warm", icon: "🌤️" },
                            { month: "October", temp: "20°C", desc: "Mild", icon: "🌤️" },
                            { month: "November", temp: "15°C", desc: "Cool", icon: "🌤️" },
                            { month: "December", temp: "10°C", desc: "Cold", icon: "❄️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>
                </section>
            </section>

            <section ref={ukRef} className="py-16 text-gray-800 px-6 md:px-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                    United Kingdom
                </h2>
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800">
                        Top Attractions in London
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Explore London’s iconic landmarks, royal palaces, and historic streets.
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
                        { breakpoint: 1024, settings: { slidesToShow: 2 } },
                        { breakpoint: 640, settings: { slidesToShow: 1 } },
                    ]}
                >
                    {[
                        {
                            name: "Tower of London",
                            img: uk1,
                            rating: "⭐ 4.7 (200,000 reviews)",
                            desc: "Historic fortress and former royal palace, home to the Crown Jewels.",
                        },
                        {
                            name: "Buckingham Palace",
                            img: uk2,
                            rating: "⭐ 4.6 (180,000 reviews)",
                            desc: "The official residence of the Queen, famous for the Changing of the Guard ceremony.",
                        },
                        {
                            name: "London Eye",
                            img: uk3,
                            rating: "⭐ 4.5 (150,000 reviews)",
                            desc: "Giant Ferris wheel on the South Bank offering panoramic city views.",
                        },
                        {
                            name: "Big Ben & Houses of Parliament",
                            img: uk4,
                            rating: "⭐ 4.7 (120,000 reviews)",
                            desc: "Iconic clock tower and historic government buildings along the River Thames.",
                        },
                        {
                            name: "British Museum",
                            img: uk5,
                            rating: "⭐ 4.6 (100,000 reviews)",
                            desc: "World-class museum with artifacts from all over the globe, including the Rosetta Stone.",
                        },
                        {
                            name: "Covent Garden",
                            img: uk6,
                            rating: "⭐ 4.5 (90,000 reviews)",
                            desc: "Vibrant shopping and entertainment district with street performers and markets.",
                        }
                    ].map((place, index) => (
                        <div key={index} className="px-3">
                            <div className="group relative rounded-2xl overflow-hidden border border-transparent transition-all duration-500">
                                <div className="overflow-hidden rounded-2xl">
                                    <img
                                        src={place.img}
                                        alt={place.name}
                                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-2xl"></div>
                                <div className="relative z-10 p-5 bg-white/90 backdrop-blur-sm rounded-b-2xl shadow-md group-hover:shadow-xl transition-shadow duration-500">
                                    <h3 className="text-xl font-semibold mb-1">{place.name}</h3>
                                    <p className="text-yellow-500 font-medium">{place.rating}</p>
                                    <p className="text-gray-600 mt-2">{place.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                {/* Visitor Reviews */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Visitor Reviews
                    </h2>

                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Oliver W.",
                                location: "London, UK",
                                contributions: 42,
                                attraction: "Tower of London",
                                review: "A fascinating place full of history. Loved the Crown Jewels exhibit!",
                                date: "10 October 2025",
                            },
                            {
                                name: "Emma R.",
                                location: "London, UK",
                                contributions: 38,
                                attraction: "Buckingham Palace",
                                review: "The Changing of the Guard ceremony is truly a sight to behold. Beautiful palace!",
                                date: "18 November 2025",
                            },
                            {
                                name: "Harry P.",
                                location: "London, UK",
                                contributions: 35,
                                attraction: "London Eye",
                                review: "Amazing views over London! The experience was unforgettable.",
                                date: "5 October 2025",
                            },
                            {
                                name: "Sophia L.",
                                location: "London, UK",
                                contributions: 30,
                                attraction: "British Museum",
                                review: "World-class museum with incredible artifacts. Highly recommend!",
                                date: "22 November 2025",
                            }
                        ].map((review, index) => (
                            <div key={index} className="flex-1 min-w-[250px] max-w-[350px] bg-black/5 rounded-xl p-5 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col">
                                <div className="flex items-center mb-3">
                                    <div className="w-10 h-10 mr-4 flex items-center justify-center bg-teal-600 rounded-full font-semibold text-gray-200 text-lg">
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

                {/* Facts about UK */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 -mt-14 text-center">
                        Facts about United Kingdom
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🎡</span>
                            <h3 className="text-xl font-semibold mb-1">Capital</h3>
                            <p className="text-gray-700 text-base">London</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🪙</span>
                            <h3 className="text-xl font-semibold mb-1">Currency</h3>
                            <p className="text-gray-700 text-center">Pound Sterling (GBP)</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">👨🏻‍👩🏻‍👦🏻‍👦🏻</span>
                            <h3 className="text-xl font-semibold mb-1">Population</h3>
                            <p className="text-gray-700 text-base">68,000,000</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">🗣️</span>
                            <h3 className="text-xl font-semibold mb-1">Language</h3>
                            <p className="text-gray-700 text-base">English</p>
                        </div>

                        <div className="flex-1 min-w-[180px] max-w-[220px] bg-black/5 rounded-xl p-6 shadow-xl hover:shadow-md transition-shadow duration-300 flex flex-col items-center">
                            <span className="text-4xl mb-3">⏱</span>
                            <h3 className="text-xl font-semibold mb-1">Time Zone</h3>
                            <p className="text-gray-700 text-base">GMT +0</p>
                        </div>
                    </div>
                </section>

                {/* Weather */}
                <section className="py-16 bg-white text-gray-800 px-6 md:px-20">
                    <h2 className="text-3xl md:text-3xl font-bold text-gray-800 mb-10 text-center">
                        Average Weather in United Kingdom
                    </h2>
                    <div className="flex overflow-x-auto gap-6 max-w-full py-4 scrollbar-thin scrollbar-thumb-gray-300">
                        {[
                            { month: "January", temp: "6°C", desc: "Cold", icon: "❄️" },
                            { month: "February", temp: "6°C", desc: "Cold", icon: "❄️" },
                            { month: "March", temp: "9°C", desc: "Cool", icon: "🌤️" },
                            { month: "April", temp: "11°C", desc: "Mild", icon: "🌤️" },
                            { month: "May", temp: "15°C", desc: "Warm", icon: "☀️" },
                            { month: "June", temp: "18°C", desc: "Warm", icon: "☀️" },
                            { month: "July", temp: "21°C", desc: "Hot", icon: "☀️" },
                            { month: "August", temp: "21°C", desc: "Hot", icon: "☀️" },
                            { month: "September", temp: "18°C", desc: "Mild", icon: "🌤️" },
                            { month: "October", temp: "14°C", desc: "Cool", icon: "🌤️" },
                            { month: "November", temp: "9°C", desc: "Cold", icon: "🌤️" },
                            { month: "December", temp: "7°C", desc: "Cold", icon: "❄️" },
                        ].map((weather, index) => (
                            <div
                                key={index}
                                className="flex-none w-40 bg-black/5 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center"
                            >
                                <h3 className="text-lg font-semibold mb-2">{weather.month}</h3>
                                <div className="text-4xl mb-2">{weather.icon}</div>
                                <p className="text-2xl font-bold mb-1">{weather.temp}</p>
                                <p className="text-gray-600 text-sm">{weather.desc}</p>
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        className="px-8 py-4 rounded-2xl mt-10 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-black/80 font-bold text-lg shadow-lg border border-blue-800 hover:shadow-[0_0_40px_rgba(30,64,175,0.5)] transition-all duration-500 transform hover:-translate-y-1 hover:scale-105 mx-auto block"
                    >
                        Book Your Ticket
                    </button>
                </section>
            </section>

            {/* Scroll To Top Button */}
            {showTopButton && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg border border-blue-200 hover:bg-blue-600 transition-all"
                >
                    <ChevronUp size={24} />
                </button>
            )}
        </div>
    );
}

export default Destinations;