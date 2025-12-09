import React, { useEffect } from "react";
import { Shield, FileText, Luggage, Clock, Ban, AlertTriangle } from "lucide-react";

export default function PassengerRightsResponsibilities() {
    useEffect(() => { window.scrollTo(0, 0); }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-6 flex justify-center">
            <div className="max-w-5xl w-full">
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-indigo-50 p-3 rounded-xl">
                            <Shield className="h-7 w-7" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold">Passenger Rights & Responsibilities</h1>
                            <p className="text-slate-500 text-sm">
                                Important information for passengers before, during, and after their flight.
                            </p>
                        </div>
                    </div>
                    <p className="text-slate-700 leading-relaxed text-sm">
                        This page explains the rights and responsibilities of passengers when traveling by airplane.
                        Please read it carefully to avoid delays, documentation issues, or airport restrictions.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Rights */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                            <FileText className="h-5 w-5" /> Passenger Rights
                        </h2>
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-indigo-500 rounded-full" /> The right to clear information about flight schedules and changes.</li>
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-indigo-500 rounded-full" /> The right to assistance in case of flight delays or cancellations.</li>
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-indigo-500 rounded-full" /> The right to compensation according to airline regulations.</li>
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-indigo-500 rounded-full" /> The right to protection of personal data.</li>
                        </ul>
                    </div>

                    {/* Responsibilities */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                            <AlertTriangle className="h-5 w-5" /> Passenger Responsibilities
                        </h2>
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-orange-500 rounded-full" /> Arrive on time for check-in and at the boarding gate.</li>
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-orange-500 rounded-full" /> Carry valid travel documents.</li>
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-orange-500 rounded-full" /> Follow all safety regulations on board.</li>
                            <li className="flex items-start gap-3"><span className="mt-1 h-2 w-2 bg-orange-500 rounded-full" /> Do not carry prohibited items in your luggage.</li>
                        </ul>
                    </div>

                    {/* Baggage */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                            <Luggage className="h-5 w-5" /> Baggage Rules
                        </h2>
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li>Respect the weight and size limits of your baggage.</li>
                            <li>Label your baggage with your name and contact information.</li>
                            <li>Do not place important documents in checked baggage.</li>
                        </ul>
                    </div>

                    {/* Time */}
                    <div className="bg-white rounded-2xl shadow-lg p-6">
                        <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                            <Clock className="h-5 w-5" /> Timing & Schedules
                        </h2>
                        <ul className="space-y-3 text-sm text-slate-700">
                            <li>Arrive at the airport at least 2 hours early for domestic flights.</li>
                            <li>Arrive 3 hours early for international flights.</li>
                            <li>Check announcements for gate or schedule changes.</li>
                        </ul>
                    </div>
                </div>

                {/* Prohibited items */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
                    <h2 className="flex items-center gap-2 text-xl font-semibold mb-4">
                        <Ban className="h-5 w-5" /> Prohibited Items
                    </h2>
                    <p className="text-sm text-slate-700 mb-4">
                        Some items are not allowed to be transported in baggage for security reasons:
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                            <li>Explosive and flammable materials</li>
                            <li>Firearms without special authorization</li>
                            <li>Dangerous chemical substances</li>
                        </ul>
                        <ul className="list-disc pl-5 text-slate-700 space-y-1">
                            <li>Non-compliant lithium batteries</li>
                            <li>Compressed gases</li>
                            <li>Damaged electronic devices</li>
                        </ul>
                    </div>

                    <div className="mt-4 flex items-start gap-3 p-4 bg-yellow-50 border rounded-xl">
                        <AlertTriangle className="h-5 w-5 mt-1" />
                        <p className="text-sm text-slate-700">
                            Failure to comply with these rules may result in confiscation of items or denial of travel.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
