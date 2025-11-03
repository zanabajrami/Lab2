import React, { useState, useMemo } from "react";
import budapestImage from "../images/budapest.webp";
import romeImage from "../images/rome.avif";
import parisImage from "../images/paris.webp";
import viennaImage from "../images/vienna.webp";
import milanoImage from "../images/milano.webp";
import bratislavaImage from "../images/bratislava.webp";
import londonImage from "../images/london.jpg";
import cairoImage from "../images/cairo.jpg";
import istanbulImage from "../images/istanbul.jpg";

export default function LastMinuteDeals() {
    const sampleDeals = [
        {
            id: 1,
            from: "Prishtina",
            title: "Rome",
            country: "Italy",
            image: romeImage,
            departureDate: "2025-11-10",
            returnDate: "2025-11-14",
            duration: "4 days",
            price: 129,
            currency: "EUR",
        },
        {
            id: 2,
            from: "Prishtina",
            title: "Budapest",
            country: "Hungary",
            image: budapestImage,
            departureDate: "2025-11-15",
            returnDate: "2025-11-18",
            duration: "3 days",
            price: 199,
            currency: "EUR",
        },
        {
            id: 3,
            from: "Prishtina",
            title: "Paris",
            country: "France",
            image: parisImage,
            departureDate: "2025-11-08",
            returnDate: "2025-11-12",
            duration: "4 days",
            price: 259,
            currency: "EUR",
        },
        {
            id: 4,
            from: "Prishtina",
            title: "Vienna",
            country: "Austria",
            image: viennaImage,
            departureDate: "2025-11-12",
            returnDate: "2025-11-15",
            duration: "3 days",
            price: 109,
            currency: "EUR",
        },
        {
            id: 5,
            from: "Prishtina",
            title: "Milano",
            country: "Italy",
            image: milanoImage,
            departureDate: "2025-11-08",
            returnDate: "2025-11-11",
            duration: "3 days",
            price: 189,
            currency: "EUR",
        },
        {
            id: 6,
            from: "Prishtina",
            title: "Bratislava",
            country: "Slovakia",
            image: bratislavaImage,
            departureDate: "2025-11-12",
            returnDate: "2025-11-15",
            duration: "3 days",
            price: 99,
            currency: "EUR",
        },
        {
            id: 7,
            from: "Prishtina",
            title: "Cairo",
            country: "Egypt",
            image: cairoImage,
            departureDate: "2025-11-20",
            returnDate: "2025-11-25",
            duration: "5 days",
            price: 359,
            currency: "EUR",
        },
        {
            id: 8,
            from: "Prishtina",
            title: "Istanbul",
            country: "Turkey",
            image: istanbulImage,
            departureDate: "2025-11-14",
            returnDate: "2025-11-17",
            duration: "3 days",
            price: 149,
            currency: "EUR",
        },
        {
            id: 9,
            from: "Prishtina",
            title: "London",
            country: "UK",
            image: londonImage,
            departureDate: "2025-11-08",
            returnDate: "2025-11-13",
            duration: "5 days",
            price: 279,
            currency: "EUR",
        },
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
            const matchesPrice =
                maxPrice === "" || d.price <= Number(maxPrice);
            return matchesQuery && matchesDate && matchesPrice;
        });
    }, [query, date, maxPrice]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-100 to-white p-6 md:p-12">
            <header className="max-w-7xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-2">
                    ✈️ Last Minute Deals
                </h1>
                <p className="text-slate-600 mb-8">
                    Zbulo ofertat më të mira për fluturime të menjëhershme — rezervoni udhëtimin tuaj tani!
                </p>
            </header>

            {/* Deals grid */}
            <main className="max-w-7xl mx-auto mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((deal) => (
                        <article
                            key={deal.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: deal.id * 0.1 }}
                            className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                        >
                            <div className="relative h-48 w-full">
                                <img
                                    src={deal.image}
                                    alt={deal.title}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute left-3 top-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                    {deal.country}
                                </div>
                                <div className="absolute right-3 top-3 bg-white/90 text-slate-900 px-3 py-1 rounded-full text-sm font-semibold">
                                    {deal.currency} {deal.price}
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        {deal.from} → {deal.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 mt-1">
                                        Nisja:{" "}
                                        <span className="font-medium text-slate-700">
                                            {deal.departureDate}
                                        </span>{" "}
                                        • Kthimi:{" "}
                                        <span className="font-medium text-slate-700">
                                            {deal.returnDate}
                                        </span>
                                    </p>
                                    <p className="text-sm text-slate-500">
                                        Kohëzgjatja: <span className="font-medium">{deal.duration}</span>
                                    </p>
                                </div>

                                <div className="mt-4 flex items-center justify-between">
                                    <button className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition">
                                        Rezervo
                                    </button>
                                    <button className="text-sm text-slate-500 underline hover:text-slate-700">
                                        Shiko më shumë
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}

                </div>
            </main>

        </div>
    );
}
