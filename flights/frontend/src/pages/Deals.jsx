import React, { useState,useEffect, useMemo } from "react";
import { Plane, MapPinned, MapPlus, PlaneTakeoff, PlaneLanding, Clock, Check, ChevronUp} from "lucide-react";

import budapestImage from "../images/budapest.webp";
import romeImage from "../images/rome.avif";
import parisImage from "../images/paris.webp";
import viennaImage from "../images/vienna.webp";
import milanoImage from "../images/milano.webp";
import londonImage from "../images/london.jpg";
import cairoImage from "../images/cairo.jpg";
import istanbulImage from "../images/istanbul.jpg";

export default function LastMinuteDeals() {
  const [showTopButton, setShowTopButton] = useState(false);

  // Funksioni për scroll
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Shfaq/hiq button bazuar në scroll
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

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const sampleDeals = [
    { id: 1, from: "Tirana", title: "Rome", country: "Italy", image: romeImage, departureDate: "2025-11-10", returnDate: "2025-11-14", duration: "4 days", price: 129, currency: "EUR" },
    { id: 2, from: "Prishtina", title: "Budapest", country: "Hungary", image: budapestImage, departureDate: "2025-11-15", returnDate: "2025-11-18", duration: "3 days", price: 199, currency: "EUR" },
    { id: 3, from: "Tirana", title: "Paris", country: "France", image: parisImage, departureDate: "2025-11-08", returnDate: "2025-11-12", duration: "4 days", price: 259, currency: "EUR" },
    { id: 4, from: "Prishtina", title: "Vienna", country: "Austria", image: viennaImage, departureDate: "2025-11-12", returnDate: "2025-11-15", duration: "3 days", price: 109, currency: "EUR" },
    { id: 5, from: "Prishtina", title: "Milano", country: "Italy", image: milanoImage, departureDate: "2025-11-08", returnDate: "2025-11-11", duration: "3 days", price: 189, currency: "EUR" },
    { id: 7, from: "Prishtina", title: "Cairo", country: "Egypt", image: cairoImage, departureDate: "2025-11-20", returnDate: "2025-11-25", duration: "5 days", price: 359, currency: "EUR" },
    { id: 8, from: "Prishtina", title: "Istanbul", country: "Turkey", image: istanbulImage, departureDate: "2025-11-14", returnDate: "2025-11-17", duration: "3 days", price: 149, currency: "EUR" },
    { id: 9, from: "Prishtina", title: "London", country: "UK", image: londonImage, departureDate: "2025-11-08", returnDate: "2025-11-13", duration: "5 days", price: 279, currency: "EUR" },
  ];

  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [currency] = useState("EUR");

  const filtered = useMemo(() => {
    return sampleDeals.filter((d) => {
      const matchesQuery =
        query.trim() === "" ||
        d.title.toLowerCase().includes(query.toLowerCase()) ||
        d.country.toLowerCase().includes(query.toLowerCase());
      const matchesDate =
        date === "" || d.departureDate === date || d.returnDate === date;
      const matchesPrice = maxPrice === "" || d.price <= Number(maxPrice);
      return matchesQuery && matchesDate && matchesPrice;
    });
  }, [query, date, maxPrice]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white p-6 md:p-12">
      <header className="max-w-7xl mx-auto text-center relative">
        <h1 className="relative text-2xl md:text-3xl font-extrabold text-gray-800 mb-2 tracking-wide uppercase drop-shadow-sm overflow-hidden flex items-center justify-center gap-2">
          <Plane className="w-7 h-7 text-blue-900" />
          Last Minute Deals
          <Plane className="w-7 h-7 text-blue-900" />
          <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shine pointer-events-none"></span>
        </h1>
        <p className="text-gray-700 mb-8 italic transition-colors duration-300 hover:text-blue-900">
          Discover the best deals for instant flights — book your trip now!
        </p>
      </header>

      <style jsx>{`
        @keyframes shine {
          0% { left: -75%; }
          50% { left: 100%; }
          100% { left: 100%; }
        }
        .animate-shine { animation: shine 2.5s infinite; }
      `}</style>

      {/* Deals grid */}
      <main className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((deal) => (
            <article
              key={deal.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative h-52 md:h-64 w-full rounded-2xl overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  loading="eager"
                  className="object-cover w-full h-full transform hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{deal.title}</h3>
                  <p className="text-sm flex items-center gap-1 opacity-90">
                    <MapPinned className="w-4 h-4 text-blue-500" />
                    Prishtina →
                    <MapPlus className="w-4 h-4 text-blue-500" />
                    {deal.title}
                  </p>

                </div>
                <div className="absolute right-4 top-4 bg-white/30 backdrop-blur-sm text-gray-700 px-3 py-1.5 rounded-lg text-base font-semibold shadow-md transform transition duration-300 hover:scale-110 hover:bg-white/50">
                  {deal.currency} {deal.price}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div className="flex flex-wrap gap-4 text-xs text-slate-600 mt-2 items-center">
                  <span className="flex items-center gap-1">
                    <PlaneTakeoff className="w-4 h-4 text-blue-900" />
                    {deal.departureDate}
                  </span>

                  <span className="flex items-center gap-1">
                    <PlaneLanding className="w-4 h-4 text-blue-900" />
                    {deal.returnDate}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-blue-900" />
                    {deal.duration}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between relative">
                  <button className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md transition transform duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg hover:scale-105">
                    Book
                  </button>

                  {/* Shiko më shumë me tooltip */}
                  <div className="relative group">
                    <button className="text-sm text-slate-500 underline hover:text-slate-700">
                      More
                    </button>
                    <div className="absolute bottom-full mb-2 left-1/1 -translate-x-1/2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg p-3 text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <p className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-blue-500" />
                        Ticket for 1 person
                      </p>

                      <p className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-blue-500" />
                        10 kg baggage
                      </p>

                      <p className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-blue-500" />
                        All taxes included
                      </p>

                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Scroll To Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg border border-blue-200 hover:bg-blue-600 transition-all z-50"
        >
          <ChevronUp size={24} />
        </button>
      )}

    </div>
  );
}
