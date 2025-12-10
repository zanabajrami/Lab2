import { useNavigate, Link } from "react-router-dom";
import { GiCommercialAirplane } from "react-icons/gi";

function IconFacebook() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22 12C22 6.477 17.523 2 12 2S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.88v-6.99H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33V21.88C18.343 21.128 22 16.991 22 12z" fill="currentColor" />
        </svg>
    );
}
function IconInstagram() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.2A3.8 3.8 0 1 0 15.8 12 3.8 3.8 0 0 0 12 8.2zM18.5 6.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z" fill="currentColor" />
        </svg>
    );
}
function IconTwitter() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M22 5.92c-.63.28-1.31.47-2.02.56a3.5 3.5 0 0 0-6 3.19A9.93 9.93 0 0 1 3.1 4.9a3.5 3.5 0 0 0 1.08 4.67c-.52 0-1.02-.16-1.45-.4v.04c0 1.7 1.21 3.12 2.82 3.45a3.5 3.5 0 0 1-1.44.05c.41 1.28 1.6 2.21 3.01 2.24A7.02 7.02 0 0 1 2 18.57a9.9 9.9 0 0 0 5.35 1.57c6.42 0 9.94-5.32 9.94-9.94v-.45A7.1 7.1 0 0 0 22 5.92z" fill="currentColor" />
        </svg>
    );
}

export default function Footer({ onShowContact }) {
    const navigate = useNavigate();

    return (
        <footer className="bg-gradient-to-r from-blue-900 to-blue-500 rounded-t-lg text-white py-10 mt-auto">
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-2xl font-bold mb-3">FlyHigh</h2>
                    <p className="text-sm text-gray-200">
                        Discover affordable flights, exciting destinations, and exclusive
                        travel deals. Fly smarter with FlyHigh <GiCommercialAirplane className="inline ml-1" />
                    </p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Services</h3>
                    <ul className="space-y-2 text-gray-200">
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/flights">Flight Booking</Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">Flight Cancellation</li>
                        <li
                            className="hover:text-gray-900 cursor-pointer"
                            onClick={() => navigate("/baggage")}
                        >
                            Baggage Allowance
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link
                                to="/destinations"
                                state={{ from: "footer" }}
                            >
                                Travel Guide
                            </Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/airport-guide">Airport Guide</Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/travel-tips">Travel Tips</Link>
                        </li>
                        <li
                            className="hover:text-gray-900 cursor-pointer transition"
                            onClick={onShowContact}
                        >
                            Contact Us
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">About</h3>
                    <ul className="space-y-2 text-gray-200">
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/about-us">About Us</Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/faq">FAQs</Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/passager-rights">Passenger Rights & Responsibilities</Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/terms">Terms & Conditions</Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/privacy">Privacy Policy</Link>
                        </li>
                        <li className="hover:text-gray-900 cursor-pointer">
                            <Link to="/cookies">Cookie Policy</Link>
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-3">Deals</h3>
                    <ul className="space-y-2 text-gray-200">
                        <li
                            className="hover:text-gray-900 cursor-pointer"
                            onClick={() => navigate("/deals")}
                        >
                            Last Minute Deals
                        </li>
                        <li
                            className="hover:text-gray-900 cursor-pointer"
                            onClick={() => navigate("/membership")}
                        >
                            Memberships
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-500 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto px-4 text-sm text-gray-300">
                <p>© {new Date().getFullYear()} FlyHigh. All rights reserved.</p>
                <div className="flex gap-5 mt-3 md:mt-0">
                    <span className="cursor-pointer hover:text-white transition"><IconFacebook /></span>
                    <span className="cursor-pointer hover:text-white transition"><IconInstagram /></span>
                    <span className="cursor-pointer hover:text-white transition"><IconTwitter /></span>
                </div>
            </div>
        </footer>
    );
}