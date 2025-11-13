import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Plane, Headset, ShieldCheck, Globe2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
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

const destinations = [
    { src: italyImage, name: "Italy", lat: 41.8719, lng: 12.5674 },
    { src: hungaryImage, name: "Hungary", lat: 47.4979, lng: 19.0402 },
    { src: franceImage, name: "France", lat: 48.8566, lng: 2.3522 },
    { src: egyptImage, name: "Egypt", lat: 30.0444, lng: 31.2357 },
    { src: uk4, name: "UK", lat: 51.5074, lng: -0.1278 },
    { src: turkey5, name: "Turkey", lat: 41.0082, lng: 28.9784 },
    { src: austria3, name: "Austria", lat: 48.2082, lng: 16.3738 },
    { src: spain6, name: "Spain", lat: 40.4168, lng: -3.7038 },
    { src: spain6, name: "Spain", lat: 41.3851, lng: 2.1734 }
];

function RefreshMap() {
    const map = useMap();
    useEffect(() => {
        map.invalidateSize();
    }, [map]);
    return null;
}

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

            {/* MAP */}
            <section className="py-24 text-white">
                <div className="relative w-[90%] md:w-[1000px] h-[600px] mx-auto rounded-2xl -mt-12 overflow-hidden shadow-lg">
                    <MapContainer
                        center={[48, 11]}
                        zoom={3}
                        minZoom={3}
                        maxZoom={10}
                        scrollWheelZoom={true}
                        style={{ width: "100%", height: "100%", display: "block" }}
                        maxBounds={[
                            [20, -30],  // këndi i poshtëmajtë [lat, lng]
                            [70, 50]    // këndi i sipërm djathtë [lat, lng]
                        ]}
                        maxBoundsViscosity={1.0} // pengon plotësisht të dalësh jashtë bounds
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        />
                        <RefreshMap />

                        {destinations.map((dest, i) => {
                            const blueDivIcon = L.divIcon({
                                className: "custom-marker",
                                html: `
            <div class="relative w-6 h-6 bg-blue-900 rounded-full border-2 border-white shadow-lg animate-pulse-inner">
              <div class="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-900 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            <style>
              @keyframes pulse-inner {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.6); opacity: 0.4; }
                100% { transform: scale(1); opacity: 1; }
              }
              .animate-pulse-inner { animation: pulse-inner 1.5s infinite; }
            </style>
          `,
                            });

                            return (
                                <Marker
                                    key={i}
                                    position={[dest.lat, dest.lng]}
                                    icon={blueDivIcon}
                                    eventHandlers={{ click: () => goToDestination(dest.name) }}
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
                                    <Popup>
                                        <div className="text-center">
                                            <img
                                                src={dest.src}
                                                alt={dest.name}
                                                className="w-32 h-20 object-cover rounded-md mb-2"
                                            />
                                            <h3 className="font-bold">{dest.name}</h3>
                                        </div>
                                    </Popup>
                                </Marker>
                            );
                        })}
                    </MapContainer>
                </div>
            </section>



            {/* WHY CHOOSE US SECTION */}
            <motion.section
                className="w-full py-24 px-6 text-gray-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 }, // animon fëmijët një nga një
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



        </div>
    );
}
