import { useState, useEffect, useMemo } from "react";
import { MapPinned, MapPlus, PlaneTakeoff, PlaneLanding, Clock, Check, ChevronUp } from "lucide-react";
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

  const [query] = useState("");
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
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans">
      <style>{`
        @keyframes shine {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        .animate-shine {
          position: absolute;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
          animation: shine 4s infinite;
        }
      `}</style>

      <header className="max-w-7xl mx-auto text-center mb-12">
        <div className="inline-flex items-center justify-center gap-3 mb-3">
          <GiCommercialAirplane className="w-6 h-6 text-blue-600" />
          <h1 className="relative text-2xl md:text-3xl font-black text-slate-800 tracking-tight overflow-hidden px-2 uppercase">
            Last Minute Deals
            <span className="animate-shine"></span>
          </h1>
          <GiCommercialAirplane className="w-6 h-6 text-blue-600 flip-horizontal" style={{ transform: 'scaleX(-1)' }} />
        </div>
        <p className="text-slate-500 text-base md:text-lg italic font-light">
          Grab the best prices for your next adventure — <span className="text-blue-600 font-semibold">book instantly!</span>
        </p>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((deal) => (
            <article
              key={deal.id}
              className="group bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-lg border border-white/20">
                   <span className="text-[10px] font-bold text-slate-400 block leading-none text-right">FROM</span>
                   <span className="text-lg font-extrabold text-blue-600">
                    {deal.currency} {deal.price}
                   </span>
                </div>

                <div className="absolute bottom-4 left-5">
                  <h3 className="text-xl font-bold text-white leading-tight">{deal.title}</h3>
                  <div className="flex items-center gap-2 text-blue-100 text-xs mt-1">
                    <MapPinned className="w-3.5 h-3.5" />
                    <span>{deal.from}</span>
                    <span className="opacity-50">→</span>
                    <span className="bg-blue-500/40 px-2 py-0.5 rounded-md backdrop-blur-sm">{deal.country}</span>
                  </div>
                </div>
              </div>

              {/* Flight Details */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between py-3 border-b border-slate-50 mb-5">
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 uppercase font-bold mb-1">Takeoff</p>
                    <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                      <PlaneTakeoff className="w-3.5 h-3.5 text-blue-500" /> {deal.departure}
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-100"></div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 uppercase font-bold mb-1">Duration</p>
                    <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                      <Clock className="w-3.5 h-3.5 text-blue-500" /> {deal.duration}
                    </div>
                  </div>
                  <div className="h-8 w-px bg-slate-100"></div>
                  <div className="text-center">
                    <p className="text-[9px] text-slate-400 uppercase font-bold mb-1">Landing</p>
                    <div className="flex items-center gap-1 text-slate-700 font-bold text-sm">
                      <PlaneLanding className="w-3.5 h-3.5 text-blue-500" /> {deal.arrival}
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <button
                    className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-bold text-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-95"
                    onClick={() => window.location.href = '/flights'}
                  >
                    Explore Flights
                  </button>

                  <div className="relative group/tooltip">
                    <button className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100">
                      <Check className="w-5 h-5" />
                    </button>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full right-0 mb-3 w-44 bg-slate-800 text-white rounded-xl p-3 text-[11px] shadow-2xl opacity-0 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:translate-y-0 translate-y-2 transition-all duration-300 z-20">
                      <div className="space-y-1.5">
                        <p className="flex items-center gap-2"><Check className="w-3 h-3 text-green-400" /> 1 Passenger Ticket</p>
                        <p className="flex items-center gap-2"><Check className="w-3 h-3 text-green-400" /> 10kg Cabin Bag</p>
                        <p className="flex items-center gap-2"><Check className="w-3 h-3 text-green-400" /> All Taxes Included</p>
                      </div>
                      <div className="absolute top-full right-4 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Back to Top */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 bg-white text-blue-600 rounded-full flex items-center justify-center shadow-xl border border-slate-100 hover:bg-blue-600 hover:text-white transition-all duration-300 z-50 group"
        >
          <ChevronUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      )}
    </div>
  );
}