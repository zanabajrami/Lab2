import { useEffect } from "react";
import {Luggage, BaggageClaim, Backpack, Info, CheckCircle, XCircle} from "lucide-react";

export default function BaggageAllowance() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);
    return (
        <div className="min-h-screen bg-white px-6 py-10 text-gray-800">
            <h1 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
                <Luggage className="w-8 h-8 text-blue-600" />
                Baggage Allowance
            </h1>

            <div className="max-w-4xl mx-auto space-y-10">
                {/* Carry-on Bag */}
                <section className="p-6 rounded-2xl shadow-md border bg-gray-50 hover:shadow-lg transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Backpack className="w-6 h-6 text-green-600" />
                        CARRY-ON BAG
                    </h2>

                    <p><strong>Allowance:</strong> Onboard</p>
                    <p><strong>Max Weight:</strong> 10 KG</p>
                    <p><strong>Wheels:</strong> Allowed / Not mandatory</p>
                    <p><strong>Size:</strong> 40 x 30 x 20 cm</p>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-600 text-white font-semibold mt-3">
                        <CheckCircle className="w-4 h-4" />
                        FOR FREE
                    </span>

                    <p className="text-sm text-gray-600 mt-3">
                        *Must fit under the seat; laptop bag, purse or small backpack allowed.
                    </p>
                </section>

                {/* Trolley Bag */}
                <section className="p-6 rounded-2xl shadow-md border bg-gray-50 hover:shadow-lg transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <Luggage className="w-6 h-6 text-blue-600" />
                        TROLLEY BAG
                    </h2>

                    <p><strong>Allowance:</strong> Onboard</p>
                    <p><strong>Max Weight:</strong> 10 KG</p>
                    <p><strong>Wheels:</strong> Allowed / Not mandatory</p>
                    <p><strong>Size:</strong> 55 x 40 x 23 cm</p>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 text-white font-semibold mt-3">
                        <XCircle className="w-4 h-4" />
                        FOR PURCHASE
                    </span>

                    <p className="text-sm text-gray-600 mt-3">
                        *Must fit in the overhead compartment.
                    </p>
                </section>

                {/* Checked-in Bag */}
                <section className="p-6 rounded-2xl shadow-md border bg-gray-50 hover:shadow-lg transition-all duration-300">
                    <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                        <BaggageClaim className="w-6 h-6 text-purple-600" />
                        CHECKED-IN BAG
                    </h2>

                    <p><strong>Allowance:</strong> Checked</p>
                    <p><strong>Max Weight Options:</strong> 10 KG, 20 KG, 26 KG, 32 KG</p>
                    <p><strong>Wheels:</strong> Allowed / Not mandatory</p>
                    <p><strong>Size:</strong> 149 x 119 x 171 cm</p>

                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-600 text-white font-semibold mt-3">
                        <XCircle className="w-4 h-4" />
                        FOR PURCHASE
                    </span>

                    <p className="text-sm text-gray-600 mt-3">
                        *Up to 6 checked bags per passenger.
                    </p>
                </section>

                {/* Types of Baggage */}
                <section className="p-6 rounded-2xl shadow-md border bg-gray-50 hover:shadow-lg transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Luggage className="w-5 h-5 text-gray-700" />
                        Types of Baggage
                    </h2>

                    <ol className="list-decimal pl-6 space-y-2">
                        <li>
                            <strong>Cabin baggage (onboard):</strong><br />
                            Free carry-on bag, trolley bag (purchased).
                        </li>
                        <li>
                            <strong>Checked-in baggage:</strong><br />
                            Dropped at airport check-in desk.
                        </li>
                    </ol>
                </section>

                {/* Important Notes */}
                <section className="p-6 rounded-2xl shadow-md border bg-gray-50 hover:shadow-lg transition-all duration-300">
                    <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <Info className="w-5 h-5 text-yellow-600" />
                        Important Information
                    </h2>

                    <p className="mb-3">
                        Every passenger is allowed one free Carry-on Bag.
                    </p>
                    <p className="mb-3">
                        Size does not include handles/wheels (wheels may add up to 5 cm).
                    </p>
                    <p>All baggage options have size and weight limitations. Exceeding these limits will incur additional fees.</p>
                </section>
            </div>
        </div>
    );
}
