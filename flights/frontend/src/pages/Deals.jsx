import { useState, useEffect, useMemo } from "react";
import { MapPinned, PlaneTakeoff, PlaneLanding, Clock, Check, ChevronUp, Search, X } from "lucide-react";
import { GiCommercialAirplane } from "react-icons/gi";

import budapestImage from "../images/budapest.webp";
import romeImage from "../images/rome.avif";
import parisImage from "../images/paris.webp";
import viennaImage from "../images/vienna.webp";
import milanoImage from "../images/milano.webp";
import londonImage from "../images/london.jpg";
import cairoImage from "../images/cairo.jpg";
import istanbulImage from "../images/istanbul.jpg";
import madridImage from "../images/madrid.avif";
import barcelonaImage from "../images/barcelona.webp";

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

  const sampleDeals = useMemo(() => [
    { id: 1, from: "Tirana", title: "Rome", country: "Italy", image: romeImage, departure: "10:20", arrival: "11:50", duration: "1h 30min", price: 46, currency: "EUR" },
    { id: 2, from: "Prishtina", title: "Budapest", country: "Hungary", image: budapestImage, departure: "18:15", arrival: "00:50", duration: "6h 35min", price: 86, currency: "EUR" },
    { id: 3, from: "Tirana", title: "Paris", country: "France", image: parisImage, departure: "10:30", arrival: "12:45", duration: "2h 15min", price: 120, currency: "EUR" },
    { id: 4, from: "Prishtina", title: "Barcelona", country: "Spain", image: barcelonaImage, departure: "22:35", arrival: "12:30", duration: "13h 55min", price: 317, currency: "EUR" },
    { id: 5, from: "Prishtina", title: "Milano", country: "Italy", image: milanoImage, departure: "11:20", arrival: "13:05", duration: "1h 45min", price: 48, currency: "EUR" },
    { id: 7, from: "Tirana", title: "Cairo", country: "Egypt", image: cairoImage, departure: "09:10", arrival: "16:00", duration: "6h 50min", price: 574, currency: "EUR" },
    { id: 8, from: "Prishtina", title: "Istanbul", country: "Turkey", image: istanbulImage, departure: "12:55", arrival: "16:40", duration: "1h 45min", price: 120, currency: "EUR" },
    { id: 9, from: "Tirana", title: "London", country: "UK", image: londonImage, departure: "03:10", arrival: "09:40", duration: "7h 30min", price: 136, currency: "EUR" },
    { id: 10, from: "Prishtina", title: "Rome", country: "Italy", image: romeImage, departure: "02:45", arrival: "10:30", duration: "7h 45min", price: 155, currency: "EUR" },
    { id: 11, from: "Tirana", title: "Madrid", country: "Spain", image: madridImage, departure: "16:05", arrival: "23:50", duration: "7h 45min", price: 234, currency: "EUR" },
    { id: 12, from: "Tirana", title: "Budapest", country: "Hungary", image: budapestImage, departure: "12:15", arrival: "17:15", duration: "5h 00min", price: 219, currency: "EUR" },
    { id: 13, from: "Prishtina", title: "London", country: "UK", image: londonImage, departure: "10:15", arrival: "13:35", duration: "3h 20min", price: 48, currency: "EUR" },
    { id: 14, from: "Tirana", title: "Istanbul", country: "Turkey", image: istanbulImage, departure: "12:00", arrival: "13:35", duration: "1h 35min", price: 128, currency: "EUR" },
    { id: 15, from: "Prishtina", title: "Vienna", country: "Austria", image: viennaImage, departure: "14:30", arrival: "15:45", duration: "1h 15min", price: 110, currency: "EUR" },
    { id: 16, from: "Prishtina", title: "Cairo", country: "Egypt", image: cairoImage, departure: "16:10", arrival: "22:45", duration: "5h 35min", price: 189, currency: "EUR" },
    { id: 17, from: "Tirana", title: "Milano", country: "Italy", image: milanoImage, departure: "12:00", arrival: "14:05", duration: "2h 05min", price: 115, currency: "EUR" },
    { id: 18, from: "Tirana", title: "Barcelona", country: "Spain", image: barcelonaImage, departure: "10:05", arrival: "17:50", duration: "7h 45min", price: 214, currency: "EUR" },
    { id: 19, from: "Prishtina", title: "Madrid", country: "Spain", image: madridImage, departure: "12:05", arrival: "22:10", duration: "10h 05min", price: 147, currency: "EUR" },

  ], []);

  const [query, setQuery] = useState("");
  const [date] = useState("");
  const [maxPrice] = useState("");

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
  }, [query, date, maxPrice, sampleDeals]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <style>{`
        @keyframes shine { 0% { left: -100%; } 100% { left: 100%; } }
        .animate-shine { position: absolute; top: 0; width: 40%; height: 100%; background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent); animation: shine 5s infinite; }
      `}</style>

      {/* Header */}
      <header className="max-w-6xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-xs font-bold tracking-widest uppercase mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live Flight Deals
        </div>

        <h1 className="relative text-2xl md:text-3xl font-black tracking-tight text-slate-800 uppercase mb-3">
          Last Minute Deals
          <span className="animate-shine"></span>
        </h1>

        {/* Modern Search Bar */}
        <div className="relative max-w-md mx-auto mt-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search destination or country..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </header>

      {/* Grid */}
      <main className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((deal) => (
            <article key={deal.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden">

              {/* Image Area */}
              <div className="relative h-52 overflow-hidden rounded-t-[2rem]">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />

                {/* Price Label */}
                <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-white/20">
                  <p className="text-[10px] font-bold text-white leading-none">TOTAL</p>
                  <p className="text-lg font-black text-white leading-none mt-1">{deal.currency} {deal.price}</p>
                </div>

                <div className="absolute bottom-5 left-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-bold text-white uppercase tracking-wider">
                      {deal.country}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">{deal.title}</h3>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{deal.from}</p>
                    <p className="text-lg font-bold text-slate-700">{deal.departure}</p>
                  </div>

                  <div className="flex-1 px-4 flex flex-col items-center">
                    <p className="text-[10px] font-bold text-blue-500 mb-1">{deal.duration}</p>
                    <div className="relative w-full h-px border-t border-dashed border-slate-300 flex items-center justify-center">
                      <GiCommercialAirplane className="absolute text-slate-300 w-4 h-4 bg-white px-0.5" />
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">{deal.title}</p>
                    <p className="text-lg font-bold text-slate-700">{deal.arrival}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    className="flex-1 bg-blue-700 text-white py-3.5 rounded-2xl font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-slate-200 hover:shadow-blue-200"
                    onClick={() => window.location.href = '/flights'}
                  >
                    Explore Flights
                  </button>

                  <div className="relative group/tip">
                    <button className="p-3.5 rounded-2xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 border border-slate-100 transition-all">
                      <Check className="w-5 h-5" />
                    </button>
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-4 w-48 bg-black/45 backdrop-blur-md text-white p-4 rounded-2xl text-[11px] opacity-0 pointer-events-none -mb-0.5 group-hover/tip:opacity-100 group-hover/tip:-translate-y-1 transition-all z-20 shadow-2xl">
                      <div className="space-y-2">
                        <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Round-trip ticket</p>
                        <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> Free carry-on</p>
                        <p className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-green-400" /> All fees included</p>
                      </div>
                      <div className="absolute top-full right-5 border-[6px] border-transparent border-t-slate-900" />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Back to top */}
      {showTopButton && (
        <button onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg border border-blue-200 hover:bg-blue-600 transition-all"
        >
          <ChevronUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}