import { useEffect } from "react";
import { Luggage, Info, CheckCircle, XCircle } from "lucide-react";
import { BsSuitcase2Fill } from "react-icons/bs";
import { GiRollingSuitcase } from "react-icons/gi";
import { BsBackpack3Fill } from "react-icons/bs";

export default function BaggageAllowance() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const baggageData = [
        {
            type: "Carry-on Bag",
            icon: <BsBackpack3Fill className="w-10 h-10 text-green-600" />,
            allowance: "Onboard",
            weight: "10 KG",
            size: "40 x 30 x 20 cm",
            wheels: "Allowed / Not mandatory",
            price: "Free",
            note: "Must fit under the seat; laptop bag, purse or small backpack allowed.",
            color: "green",
        },
        {
            type: "Trolley Bag",
            icon: <GiRollingSuitcase className="w-12 h-12 text-blue-600" />,
            allowance: "Onboard",
            weight: "10 KG",
            size: "55 x 40 x 23 cm",
            wheels: "Allowed / Not mandatory",
            price: "Paid",
            note: "Must fit in the overhead compartment.",
            color: "blue",
        },
        {
            type: "Checked-in Bag",
            icon: <BsSuitcase2Fill className="w-10 h-10 text-purple-600" />,
            allowance: "Checked",
            weight: "10–32 KG",
            size: "149 x 119 x 171 cm",
            wheels: "Allowed / Not mandatory",
            price: "Paid",
            note: "Up to 6 checked bags per passenger.",
            color: "purple",
        },
    ];

    const colorMap = {
        green: "bg-green-600 text-white",
        blue: "bg-blue-600 text-white",
        purple: "bg-purple-600 text-white",
        yellow: "bg-yellow-500 text-white",
        red: "bg-red-500 text-white",
    };

    return (
        <div className="min-h-screen bg-white text-gray-800">
            <div className="px-6 py-10 max-w-6xl mx-auto space-y-12">
                <h1 className="text-3xl font-bold text-center mb-10flex items-center justify-center gap-3">
                    Baggage Allowance
                </h1>

                {/* Baggage Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {baggageData.map((bag) => (
                        <section
                            key={bag.type}
                            className={`p-6 rounded-2xl shadow-md border bg-gray-50 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                        >
                            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                                {bag.icon} {bag.type.toUpperCase()}
                            </h2>
                            <p><strong>Allowance:</strong> {bag.allowance}</p>

                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-200 font-medium mt-2">
                                <span className="font-bold">Size:</span> {bag.size}
                            </div>

                            <p className="text-sm text-gray-600 mt-3">{bag.note}</p>
                            <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-semibold mt-3 ${colorMap[bag.color]}`}>
                                {bag.price === "Free" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                                {bag.price.toUpperCase()}
                            </span>
                        </section>
                    ))}
                </div>

                {/* Comparison Table */}
                <section className="overflow-x-auto mt-12">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Luggage className="w-5 h-5 text-gray-700" /> Baggage Comparison
                    </h2>
                    <table className="min-w-full table-auto border-collapse border border-gray-300 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border px-4 py-2">Type</th>
                                <th className="border px-4 py-2">Weight</th>
                                <th className="border px-4 py-2">Wheels</th>
                                <th className="border px-4 py-2">Size</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Included</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {baggageData.map((bag, idx) => (
                                <tr key={bag.type} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                    <td className="border px-4 py-2">{bag.type}</td>
                                    <td className="border px-4 py-2">{bag.weight}</td>
                                    <td className="border px-4 py-2">{bag.wheels}</td>
                                    <td className="border px-4 py-2">{bag.size}</td>
                                    <td className="border px-4 py-2">{bag.price}</td>
                                    <td className="border px-4 py-2">{bag.price === "Free" ? "✅" : "❌"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Important Info Boxes */}
                <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:scale-105 transition-transform duration-300">
                        <CheckCircle className="w-5 h-5 inline mr-2" /> Every passenger is allowed one free Carry-on Bag.
                    </div>
                    <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold hover:scale-105 transition-transform duration-300">
                        <Info className="w-5 h-5 inline mr-2" /> Size does not include handles/wheels (wheels may add up to 5 cm).
                    </div>
                    <div className="p-4 rounded-xl shadow-md bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:scale-105 transition-transform duration-300">
                        <XCircle className="w-5 h-5 inline mr-2" /> Exceeding baggage limits will incur additional fees.
                    </div>
                </section>
            </div>
        </div>
    );

}
