import { useState } from "react";

export default function AirportGuide() {
    const [search, setSearch] = useState("");

    const airports = [
        {
            name: "Pristina International Airport (PRN)",
            city: "Pristina, Kosovo",
            tips: [
                "Arrive at least 2 hours before departure",
                "Fast security check, but mornings can be busy",
                "Limited lounges, mainly for business class",
                "Short-term and long-term parking available",
                "Taxi and ride-share services outside the terminal"
            ]
        },
        {
            name: "Tirana International Airport (TIA)",
            city: "Tirana, Albania",
            tips: [
                "Airport is open 24/7",
                "Security is usually quick for domestic flights",
                "VIP lounge accessible with membership cards",
                "Parking available near terminal with shuttle service",
                "Duty-free shopping available inside"
            ]
        },
        {
            name: "Istanbul Airport (IST)",
            city: "Istanbul, Turkey",
            tips: [
                "Arrive 3 hours before international flights",
                "Multiple lounges with snacks and showers",
                "Extensive parking options with shuttle buses",
                "Good duty-free shopping and restaurants",
                "Efficient public transport connection to the city"
            ]
        },
        {
            name: "Sabiha Gökçen Airport (SAW)",
            city: "Istanbul, Turkey",
            tips: [
                "Fast security for domestic flights",
                "Limited lounges, mainly for business class",
                "Budget airlines operate here",
                "Parking available but limited spaces",
                "Shuttle buses and taxis to the city"
            ]
        },
        {
            name: "Rome Fiumicino Airport (FCO)",
            city: "Rome, Italy",
            tips: [
                "Arrive at least 3 hours before international flights",
                "Multiple lounges with food and drinks",
                "Efficient train connection to city center",
                "Short-term and long-term parking available",
                "Many restaurants and duty-free shops"
            ]
        },
        {
            name: "Rome Ciampino Airport (CIA)",
            city: "Rome, Italy",
            tips: [
                "Smaller airport, easier to navigate",
                "Budget airlines mainly operate here",
                "Taxi and shuttle services to city",
                "Security queues are usually short",
                "Limited lounges available"
            ]
        },
        {
            name: "Vienna International Airport (VIE)",
            city: "Vienna, Austria",
            tips: [
                "Arrive 2 hours before international flights",
                "Multiple lounges with snacks and Wi-Fi",
                "Train connection to city is convenient",
                "Parking available for short-term and long-term",
                "Efficient check-in and security"
            ]
        },
        {
            name: "Milan Malpensa Airport (MXP)",
            city: "Milan, Italy",
            tips: [
                "Arrive early, especially during peak hours",
                "Multiple lounges with food and Wi-Fi",
                "Airport shuttle to central Milan",
                "Duty-free shops available",
                "Long-term and short-term parking options"
            ]
        },
        {
            name: "Milan Linate Airport (LIN)",
            city: "Milan, Italy",
            tips: [
                "Close to city center, easy access",
                "Small airport, fast check-in and security",
                "Limited lounge options",
                "Parking available near terminal",
                "Good cafes and snack options inside"
            ]
        },
        {
            name: "Madrid Barajas Airport (MAD)",
            city: "Madrid, Spain",
            tips: [
                "Large airport, plan extra time for security",
                "Multiple lounges with food and drinks",
                "Train and metro connection to city center",
                "Long-term and short-term parking available",
                "Good restaurants and shopping inside terminals"
            ]
        },
        {
            name: "London Heathrow Airport (LHR)",
            city: "London, UK",
            tips: [
                "Arrive 3 hours before international flights",
                "Many lounges across terminals",
                "Multiple terminals, plan transport accordingly",
                "Extensive parking options including valet",
                "Good duty-free and shopping experience"
            ]
        },
        {
            name: "London Gatwick Airport (LGW)",
            city: "London, UK",
            tips: [
                "Fast security lanes available for some airlines",
                "Train connection to London city",
                "Budget airline operations, check terminal info",
                "Parking lots available near terminals",
                "Limited lounges, mainly for business class"
            ]
        },
        {
            name: "London Stansted Airport (STN)",
            city: "London, UK",
            tips: [
                "Low-cost airlines mainly operate here",
                "Small airport, easier navigation",
                "Bus connections to city available",
                "Security can be fast but check schedules",
                "Limited lounge options"
            ]
        },
        {
            name: "Budapest Ferenc Liszt Airport (BUD)",
            city: "Budapest, Hungary",
            tips: [
                "Fast check-in and security",
                "Small airport, easy to navigate",
                "Public transport options to city",
                "Parking available near terminal",
                "Some lounges with snacks and drinks"
            ]
        },
        {
            name: "Cairo International Airport (CAI)",
            city: "Cairo, Egypt",
            tips: [
                "Arrive at least 3 hours before international flights",
                "Security can be slow during peak hours",
                "Multiple lounges with refreshments",
                "Parking available for short and long term",
                "Many shops and restaurants inside"
            ]
        },
        {
            name: "Barcelona-El Prat Airport (BCN)",
            city: "Barcelona, Spain",
            tips: [
                "Train and bus connection to city",
                "Multiple lounges with food and Wi-Fi",
                "Good restaurants and cafes inside",
                "Parking options for short and long-term",
                "Security is generally efficient"
            ]
        },
        {
            name: "Paris Charles de Gaulle Airport (CDG)",
            city: "Paris, France",
            tips: [
                "Large airport, arrive 3 hours early",
                "Multiple lounges with food and drinks",
                "Train connection to city center",
                "Parking available near terminals",
                "Many restaurants and duty-free shops"
            ]
        },
        {
            name: "Paris Orly Airport (ORY)",
            city: "Paris, France",
            tips: [
                "Smaller airport, easier navigation",
                "Budget airlines mainly operate here",
                "Taxi and shuttle options to city",
                "Limited lounge availability",
                "Security generally fast"
            ]
        }
    ];

    const filteredAirports = airports.filter(
        (airport) =>
            airport.name.toLowerCase().includes(search.toLowerCase()) ||
            airport.city.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-gray-700 mb-3">
                        Airport Guide
                    </h1>
                    <p className="text-gray-600">
                        Find helpful tips about airports, security, lounges and parking.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search airport or city..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Airport List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredAirports.map((airport, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-between hover:shadow-lg transition"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                                    {airport.name}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    {airport.city}
                                </p>

                                <h3 className="text-md font-semibold text-blue-600 mb-2">
                                    Useful Tips:
                                </h3>
                                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                                    {airport.tips.map((tip, i) => (
                                        <li key={i}>{tip}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-5 grid grid-cols-3 gap-2 text-xs text-center">
                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">
                                    Security
                                </span>
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg">
                                    Lounges
                                </span>
                                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-lg">
                                    Parking
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredAirports.length === 0 && (
                    <div className="text-center text-gray-500 mt-10">
                        No airports found. Try another search.
                    </div>
                )}
            </div>
        </div>
    );
}
