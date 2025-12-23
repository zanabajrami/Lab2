import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Plane, Headset, ShieldCheck, Globe2, MapPin, Clock, Flame, ChevronUp, AlertCircle, ArrowRight } from "lucide-react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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

//deals images
import romeImage from "../images/rome.avif";
import milanoImage from "../images/milano.webp";
import londonImage from "../images/london.jpg";
import viennaImage from "../images/vienna.webp";

const destinations = [
    { src: italyImage, name: "Italy" },
    { src: hungaryImage, name: "Hungary" },
    { src: franceImage, name: "France" },
    { src: egyptImage, name: "Egypt" },
    { src: uk4, name: "UK" },
    { src: turkey5, name: "Turkey" },
    { src: austria3, name: "Austria" },
    { src: spain6, name: "Spain" }
];

const mapDestinations = [
    { src: italyImage, name: "Rome,Italy", lat: 41.8719, lng: 12.5674 },
    { src: italyImage, name: "Milano,Italy", lat: 45.4642, lng: 9.1900 },
    { src: hungaryImage, name: "Budapest,Hungary", lat: 47.4979, lng: 19.0402 },
    { src: franceImage, name: "Paris,France", lat: 48.8566, lng: 2.3522 },
    { src: egyptImage, name: "Cairo,Egypt", lat: 30.0444, lng: 31.2357 },
    { src: uk4, name: "London,UK", lat: 51.5074, lng: -0.1278 },
    { src: turkey5, name: "Istanbul,Turkey", lat: 41.0082, lng: 28.9784 },
    { src: austria3, name: "Wien,Austria", lat: 48.2082, lng: 16.3738 },
    { src: spain6, name: "Madrid,Spain", lat: 40.4168, lng: -3.7038 },
    { src: spain6, name: "Barcelona,Spain", lat: 41.3851, lng: 2.1734 }
];

const deals = [
    { id: 1, from: "Tirana", title: "Rome", country: "Italy", image: romeImage, duration: "4 days", price: 46, currency: "EUR" },
    { id: 5, from: "Prishtina", title: "Milano", country: "Italy", image: milanoImage, duration: "3 days", price: 48, currency: "EUR" },
    { id: 9, from: "Prishtina", title: "London", country: "UK", image: londonImage, duration: "5 days", price: 48, currency: "EUR" },
    { id: 4, from: "Prishtina", title: "Vienna", country: "Austria", image: viennaImage, duration: "3 days", price: 110, currency: "EUR" }
];

function RefreshMap() {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize(); // e detyron Leaflet të ripërcaktojë dimensionet
    }, [map]);
    return null;
}

export default function Home() {
    const [current, setCurrent] = useState(0);
    const sliderRef = useRef(null);
    const navigate = useNavigate();
    const [showTopButton, setShowTopButton] = useState(false);

    const previewCards = [
        { title: "Standard", price: "€49.99 / year", icon: <Flame className="w-7 h-7 text-blue-400" />, highlight: "Best for beginners" },
        { title: "Premium", price: "€69.99 / year", icon: <Flame className="w-7 h-7 text-blue-600" />, highlight: "Most popular choice" },
        { title: "VIP", price: "€99.99 / year", icon: <Flame className="w-7 h-7 text-blue-900" />, highlight: "All perks included" },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const destinationsArray = destinations;

    const goToDestination = (name) => {
        navigate("/destinations", { state: { scrollTo: name.toLowerCase() } });
    };


    // Auto-slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % destinations.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [destinationsArray.length]);

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

    //Scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
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

    const goToMapDestination = (dest) => {
        // Extract the country from name (after comma)
        const country = dest.name.split(",")[1]?.trim().toLowerCase();
        if (country) {
            navigate("/destinations", { state: { scrollTo: country } });
        } else {
            // fallback if country is missing
            navigate("/destinations");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full text-white overflow-hidden">
            {/* HERO SECTION */}
            <div className="relative w-full h-[95vh] md:h-[85vh] sm:h-[70vh] overflow-hidden flex items-center justify-center">
                {/* FOTO */}
                <img
                    src={mainImage}
                    alt="Flight background"
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />

                {/* gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent"></div>

                {/* KONTAINERI me tekst + searchbar */}
                <div className="relative z-20 w-full max-w-6xl text-center flex flex-col items-center gap-6 px-4 sm:px-6 md:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <h1 className="-mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-normal leading-snug drop-shadow-md">
                            Find the Best Flights
                        </h1>
                        <p className="text-sm sm:text-base md:text-lg text-gray-200 max-w-xl mx-auto leading-relaxed drop-shadow-sm">
                            Your next adventure is just a click away.
                        </p>
                    </motion.div>

                    {/* SEARCH BAR */}
                    <motion.div
                        className="w-full -mt-5 sm:mt-6"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        <SearchBar />
                    </motion.div>
                </div>
            </div>

            {/* Destinations */}
            <section className="py-24 text-gray-600">
                <div className="-mt-12 relative w-full max-w-5xl mx-auto h-[300px] md:h-[400px] flex items-center justify-center relative z-0">
                    {destinations.map((dest, index) => {
                        let pos = index - current;
                        if (pos < -Math.floor(destinations.length / 2)) pos += destinations.length;
                        if (pos > Math.floor(destinations.length / 2)) pos -= destinations.length;

                        const scale = pos === 0 ? 1 : 0.82;
                        const zIndex = pos === 0 ? 30 : 10;
                        const xOffset = pos * 280;

                        const baseWidth = 310;
                        const width = baseWidth / scale;

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
                                <img src={dest.src} alt={dest.name} className="w-full h-full object-cover" />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent backdrop-blur-sm text-white p-5 text-center">
                                    <h3 className="text-2xl font-semibold tracking-wide drop-shadow-md">{dest.name}</h3>
                                    <div className="mt-1 w-16 mx-auto h-[2px] bg-gradient-to-r from-blue-400 to-white rounded-full"></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* MAP */}
            <section className="py-24 w-full flex justify-center text-white">
                <div className="w-full max-w-[1100px] -mt-12 rounded-2xl shadow-lg overflow-hidden">
                    <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px]">
                        <MapContainer
                            center={[48, 11]}
                            zoom={3}
                            minZoom={3}
                            maxZoom={10}
                            scrollWheelZoom={true}
                            style={{ width: "100%", height: "100%" }}
                            maxBounds={[[20, -30], [70, 50]]}
                            maxBoundsViscosity={1.0}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; OpenStreetMap'
                            />
                            <RefreshMap />

                            {mapDestinations.map((dest, i) => {
                                const blueDivIcon = L.divIcon({
                                    className: "custom-marker",
                                    html: `
              <div class="relative w-6 h-6">
                <div class="absolute inset-0 w-full h-full bg-blue-900 rounded-full border-2 border-white shadow-lg animate-ping"></div>
                <div class="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
        `,
                                });

                                return (
                                    <Marker
                                        key={i}
                                        position={[dest.lat, dest.lng]}
                                        icon={blueDivIcon}
                                        eventHandlers={{ click: () => goToMapDestination(dest) }}
                                    >
                                        <Tooltip
                                            direction="top"
                                            offset={[0, -10]}
                                            opacity={1}
                                            permanent={false}
                                            className="bg-gray-900 text-white px-3 py-1 rounded-lg shadow-lg text-sm font-semibold"
                                        >
                                            {dest.name}
                                        </Tooltip>
                                    </Marker>
                                );
                            })}
                        </MapContainer>
                    </div>
                </div>
            </section>

            {/* Deals */}
            <motion.section
                className="w-full py-20"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.2,
                        },
                    },
                }}
            >
                <div className="max-w-6xl mx-auto px-4 -mt-5">

                    {/* Header */}
                    <motion.div
                        className="flex flex-col items-center mb-12"
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
                        }}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <span className="h-1 w-10 bg-blue-600 rounded-full"></span>
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                                Special Offers
                            </span>
                            <span className="h-1 w-10 bg-blue-600 rounded-full"></span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 text-center">
                            Last Minute Deals
                        </h2>
                    </motion.div>

                    {/* Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {deals.map((item, i) => (
                            <motion.div
                                key={item.id}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-2xl 
                     transition-all duration-500 overflow-hidden 
                     border border-gray-100"
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        transition: { duration: 0.6, ease: "easeOut" },
                                    },
                                }}
                                whileHover={{ y: -12, scale: 1.05 }}
                            >

                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-sm px-3 py-1 rounded-lg shadow-lg">
                                        <span className="text-white/80 font-bold text-lg">
                                            {item.price}{item.currency}
                                        </span>
                                    </div>

                                    <div className="absolute bottom-3 left-4">
                                        <p className="text-white font-bold text-xl tracking-tight">
                                            {item.title}
                                        </p>
                                        <p className="text-blue-200 text-xs font-medium uppercase tracking-wider">
                                            {item.country}
                                        </p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="p-5">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center justify-between text-xs text-gray-500 font-medium">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3.5 h-3.5 text-blue-500" /> {item.from}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5 text-blue-500" /> {item.duration}
                                            </span>
                                        </div>

                                        <div className="pt-3 border-t border-gray-50">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="bg-blue-50 p-2 rounded-lg">
                                                    <AlertCircle className="w-4 h-4 text-blue-900 animate-pulse" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] uppercase text-gray-400 leading-none">
                                                        Status
                                                    </span>
                                                    <span className="font-bold text-blue-900">
                                                        Only {Math.floor(Math.random() * 5) + 1} seats left!
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <Link
                                        to="/flights"
                                        className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl 
                         group-hover:bg-blue-600 transition-colors duration-300 
                         flex items-center justify-center gap-2 text-center"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    {/* View All Deals */}
                    <div className="mt-10 -mb-10 flex justify-center">
                        <button
                            onClick={() => navigate("/deals")}
                            className="group flex items-center gap-2 px-6 py-2.5 border-2 border-gray-700 text-gray-900 text-sm font-bold rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
                        >
                            View All Deals
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>
                </div>
            </motion.section>

            {/* Memberships*/}
            <section className="py-24 relative overflow-hidden">

                <motion.div
                    className="max-w-6xl mx-auto px-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.15 } }
                    }}
                >
                    {/* Header */}
                    <motion.div
                        className="text-center mb-16"
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 }
                        }}
                    >
                        <span className="text-blue-600 font-bold tracking-widest text-xs uppercase bg-blue-50 px-4 py-1.5 rounded-full">
                            Membership Plans
                        </span>
                        <h2 className="text-4xl md:text-4xl font-black text-slate-900 mt-4 mb-6 tracking-tight">
                            Elevate Your Journey
                        </h2>
                        <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                            Unlock a world of exclusive travel benefits, priority support, and hidden deals tailored just for you.
                        </p>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                        {previewCards.map((card, i) => {
                            const isPremium = i === 1; // Supozojmë se plani i dytë (index 1) është më i popullarizuari

                            return (
                                <motion.div
                                    key={i}
                                    className={`relative rounded-3xl p-8 transition-all duration-500 ${isPremium
                                        ? "bg-slate-900 text-white shadow-2xl scale-110 z-10 border-none py-12"
                                        : "bg-white text-slate-800 shadow-xl border border-slate-100 hover:border-blue-200"
                                        }`}
                                    variants={{
                                        hidden: { opacity: 0, y: 30 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                >
                                    {isPremium && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                                            Most Popular
                                        </div>
                                    )}

                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isPremium ? "bg-blue-600" : "bg-blue-50"
                                        }`}>
                                        <div className={isPremium ? "text-white [&>svg]:stroke-white" : "text-blue-600 [&>svg]:stroke-blue-600"}>
                                            {card.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-2">{card.title}</h3>
                                    <p className={`text-sm mb-6 ${isPremium ? "text-slate-400" : "text-slate-500"}`}>
                                        {card.highlight}
                                    </p>

                                    <div className="mb-8">
                                        <span className="text-4xl font-black tracking-tight">{card.price}</span>
                                        <span className={`text-sm ${isPremium ? "text-slate-400" : "text-slate-500"}`}></span>
                                    </div>

                                    <button
                                        onClick={() => navigate("/membership")}
                                        className={`w-full py-4 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 ${isPremium
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : "bg-slate-900 hover:bg-blue-600 text-white"
                                            }`}
                                    >
                                        Get Started
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </section>

            {/* TRAVELERS REVIEWS */}
            <motion.section
                className="py-24"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                <motion.h2
                    variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-4xl font-bold text-center mb-12 drop-shadow-md"
                >
                    <span className="text-gray-900">Travelers </span>
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
                        Reviews
                    </span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
                    {[
                        {
                            text: "Amazing experience! Booking was smooth and support was top-notch.",
                            name: "Arbër K.",
                            letter: "A",
                            color: "bg-gray-600",
                        },
                        {
                            text: "Great deals and professional help. Will definitely use again.",
                            name: "Elira S.",
                            letter: "E",
                            color: "bg-blue-600",
                        },
                        {
                            text: "The trip was organized flawlessly and a very pleasant experience.",
                            name: "Besim L.",
                            letter: "B",
                            color: "bg-purple-600",
                        },
                    ].map((review, i) => (
                        <motion.div
                            key={i}
                            variants={{
                                hidden: { opacity: 0, y: 40, scale: 0.95 },
                                visible: { opacity: 1, y: 0, scale: 1 },
                            }}
                            transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className="bg-white p-8 rounded-xl shadow-lg flex flex-col justify-between"
                        >
                            <p className="text-gray-700 mb-6 italic">
                                "{review.text}"
                            </p>

                            <div className="flex items-center gap-3">
                                <div
                                    className={`w-12 h-12 rounded-full ${review.color} text-white flex items-center justify-center font-bold text-lg`}
                                >
                                    {review.letter}
                                </div>
                                <span className="font-semibold text-gray-900">{review.name}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* WHY CHOOSE US SECTION */}
            <motion.section
                className="w-full py-24 px-6 text-gray-100 -mt-12 "
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 }, // animohen nje nga nje
                    },
                }}
            >
                <div className="max-w-6xl mx-auto text-center">
                    {/* Titulli */}
                    <motion.h2
                        variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.8 }}
                        className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent drop-shadow-md"
                    >
                        Why Choose <span className="text-gray-900">FlyHigh Agency</span> ?
                    </motion.h2>

                    {/* Përshkrimi */}
                    <motion.p
                        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="text-gray-500 max-w-2xl mx-auto mb-16 text-lg"
                    >
                        Experience seamless travel planning with unbeatable prices and trusted service.
                    </motion.p>

                    {/* Kartat */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {[
                            {
                                title: "Best Flight Deals",
                                desc: "Compare hundreds of airlines to find the lowest fares for your journey.",
                                icon: <Plane className="w-8 h-8 text-white" />,
                                gradient: "from-blue-900 to-blue-700",
                            },
                            {
                                title: "24/7 Support",
                                desc: "Our team is available day and night to help with your travel needs.",
                                icon: <Headset className="w-8 h-8 text-white" />,
                                gradient: "from-blue-800 to-blue-500",
                            },
                            {
                                title: "Secure Payments",
                                desc: "Book confidently with our encrypted and trusted payment systems.",
                                icon: <ShieldCheck className="w-8 h-8 text-white" />,
                                gradient: "from-cyan-800 to-blue-400",
                            },
                            {
                                title: "Worldwide Destinations",
                                desc: "Fly to many destinations around the world with ease.",
                                icon: <Globe2 className="w-8 h-8 text-white" />,
                                gradient: "from-indigo-900 to-cyan-600",
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                variants={{ hidden: { opacity: 0, y: 40, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                                transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                                whileHover={{ scale: 1.05, y: -10 }}
                                className={`rounded-2xl p-8 shadow-2xl hover:shadow-3xl border border-gray-800 text-center transition-transform transform bg-gradient-to-br ${item.gradient}`}
                            >
                                <motion.div
                                    animate={{
                                        y: [0, -4, 0],
                                        rotate: [0, 1, -1, 0],
                                    }}
                                    transition={{
                                        duration: 5 + i * 0.3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.9,
                                    }}
                                >
                                    <div className="flex items-center justify-center mb-5">
                                        <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shadow-lg ring-1 ring-white/20">
                                            {item.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-semibold mb-3 text-white">{item.title}</h3>
                                    <p className="text-white/90 text-sm leading-relaxed">{item.desc}</p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

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
