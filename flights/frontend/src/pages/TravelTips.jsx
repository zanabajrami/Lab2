import React, { useState, useEffect } from 'react';
import { FaRegLightbulb, FaSearchLocation } from "react-icons/fa";
import { RiMoneyEuroCircleLine } from "react-icons/ri";
import { FcSmartphoneTablet, FcCableRelease } from "react-icons/fc";
import { GiTiredEye } from "react-icons/gi";
import { MdOutlineLock } from "react-icons/md";
import { FaLanguage } from "react-icons/fa6";

const coreTipsData = [
    {
        icon: <FaRegLightbulb />,
        title: 'Pack Smart, Not Hard',
        description: 'Roll clothes to save space and prevent wrinkles. Use packing cubes for ultimate organization.',
        color: 'bg-blue-100 text-blue-800'
    },
    {
        icon: <FaSearchLocation />,
        title: 'Go Local, Not Tourist',
        description: 'Eat where the locals eat and use public transit. It saves money and offers a real experience.',
        color: 'bg-green-100 text-green-800'
    },
    {
        icon: <RiMoneyEuroCircleLine />,
        title: 'Budget Wisely',
        description: 'Set a daily budget. Notify your bank of travel dates and use a no-foreign-transaction-fee card.',
        color: 'bg-yellow-100 text-yellow-800'
    },
    {
        icon: <FcSmartphoneTablet />,
        title: 'Digital Backup',
        description: 'Keep digital and physical copies of your passport, visa, and reservations separate from the originals.',
        color: 'bg-red-100 text-red-800'
    },
];

const advancedHacksData = [
    {
        icon: <GiTiredEye className='w-10 h-10 text-pink-600' />,
        title: 'Beat Jet Lag',
        description: 'Adjust your watch to the destination time as soon as you board the plane. Prioritize hydration and avoid excessive alcohol.',
    },
    {
        icon: <MdOutlineLock className='w-10 h-10 text-red-600' />,
        title: 'Split Your Cash',
        description: 'Never keep all your cash, cards, and documents in one place. Keep an emergency stash separate (e.g., in a shoe or toiletries bag).',
    },
    {
        icon: <FaLanguage className='w-10 h-10 text-gray-600' />,
        title: 'Offline Translation',
        description: 'Download the language packs for your destination on Google Translate/Maps *before* you lose Wi-Fi access.',
    },
    {
        icon: <FcCableRelease className='w-10 h-10' />,
        title: 'The Power Strip Hack',
        description: 'Bring a small power strip with your universal adapter. It lets you charge all your devices using only one wall plug.',
    },
];

const checklistData = [
    'Passport/Visa copies (physical & digital)',
    'Prescription medicine & basic first aid kit',
    'Universal power adapter & portable charger',
    'Noise-cancelling headphones for flights',
    'Comfortable walking shoes ',
];

const faqData = [
    {
        question: "How far in advance should I book flights?",
        answer: "For international travel, aim for 2-8 months out. For domestic travel, 1-3 months is usually the sweet spot, but always check for deals on a Sunday.",
    },
    {
        question: "Is travel insurance necessary?",
        answer: "Highly recommended! It protects you against unexpected cancellations, medical emergencies, and lost baggage. It's an investment in peace of mind.",
    },
    {
        question: "What is the 'Shoulder Season'?",
        answer: "The period between the peak (high) season and the off (low) season. You get pleasant weather, fewer crowds, and better prices on flights and hotels.",
    }
];

const TravelTips = () => {
    // State for the interactive checklist
    const [checkedItems, setCheckedItems] = useState({});

    // State for the interactive FAQ accordion
    const [openFaq, setOpenFaq] = useState(null);

    const handleCheckChange = (item) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <div className="min-h-screen p-4 sm:p-8">
            {/* 1. Header */}
            <header className="text-center py-8 mb-10 ">
                <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Your Essential Travel Tips
                </h1>
                <p className="mt-3 text-xl text-gray-600 max-w-2xl mx-auto">
                    Pro-tips to make your next adventure seamless and unforgettable.
                </p>
            </header>

            {/* Main Content Container */}
            <main className="max-w-6xl mx-auto space-y-16">

                {/* 2.Tips */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-indigo-200 pb-2">Top Travel Tips </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {coreTipsData.map((tip, index) => (
                            <div
                                key={`core-tip-${index}`}
                                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 border-t-4 border-indigo-500"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold mb-4 ${tip.color}`}>
                                    {tip.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {tip.title}
                                </h3>
                                <p className="text-gray-500">
                                    {tip.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. Traveler Hacks */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-purple-200 pb-2">Traveler Hacks</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {advancedHacksData.map((hack, index) => (
                            <div
                                key={`hack-${index}`}
                                className="p-6 rounded-xl shadow-lg flex items-start space-x-4 border-l-4 border-purple-600"
                            >
                                <span className="text-3xl mt-1">{hack.icon}</span>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                        {hack.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {hack.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4.Packing Checklist */}
                <section className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-gray-500">
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                        Essential Pre-Trip Checklist
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {checklistData.map((item, index) => (
                            <div key={`check-${index}`} className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition duration-150"
                                onClick={() => handleCheckChange(item)}>
                                <input
                                    type="checkbox"
                                    checked={checkedItems[item] || false}
                                    onChange={() => handleCheckChange(item)}
                                    className="form-checkbox h-5 w-5 text-green-600 rounded"
                                />
                                <span className={`text-md ${checkedItems[item] ? 'line-through text-gray-400' : 'text-gray-700 font-medium'}`}>
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. FAQ */}
                <section>
                    <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b-2 border-indigo-200 pb-2">❓ Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqData.map((item, index) => (
                            <div key={`faq-${index}`} className="bg-white rounded-xl shadow-md overflow-hidden">
                                <button
                                    className="w-full text-left p-4 font-semibold text-lg text-gray-800 flex justify-between items-center hover:bg-indigo-50 transition duration-150"
                                    onClick={() => toggleFaq(index)}
                                >
                                    {item.question}
                                    <span className="text-indigo-600 text-xl transition-transform duration-300 transform">
                                        {openFaq === index ? '−' : '+'}
                                    </span>
                                </button>
                                {openFaq === index && (
                                    <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default TravelTips;