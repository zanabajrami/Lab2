import { useEffect } from "react";
import { motion } from "framer-motion";
import { TbUserStar } from "react-icons/tb";
import { RxUpdate } from "react-icons/rx";
import { FaRegHandshake } from "react-icons/fa6";
import { GiWorld } from "react-icons/gi";
import { RiTeamFill } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";
import team_member1 from "../images/team_member1.png";
import team_member2 from "../images/team_member2.png";
import team_member3 from "../images/team_member3.png";
import team_member4 from "../images/team_member4.png";
import team_member5 from "../images/team_member5.png";
import team_member6 from "../images/team_member6.png";

export default function AboutUs() {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    const teamMembers = [
        { name: "Alice Johnson", role: "CEO & Founder", img: team_member1 },
        { name: "Michael Miller", role: "Head of Operations", img: team_member2 },
        { name: "Ava Williams", role: "Customer Support Manager", img: team_member3 },
        { name: "Daniel Davis", role: "Senior Flight Coordinator", img: team_member4 },
        { name: "Emma Anderson", role: "Marketing & Partnerships Director", img: team_member5 },
        { name: "Liam Harris", role: "Travel Experience Designer", img: team_member6 },
    ];

    const values = [
        { icon: <TbUserStar />, title: "Customer First", desc: "Everything we do focuses on our users' happiness." },
        { icon: <RxUpdate />, title: "Innovation", desc: "We constantly improve our platform and services." },
        { icon: <FaRegHandshake />, title: "Integrity", desc: "We are transparent, honest, and trustworthy." },
        { icon: <GiWorld />, title: "Empower Travel", desc: "We encourage everyone to explore the world." },
        { icon: <RiTeamFill />, title: "Teamwork", desc: "Collaboration is at the core of our success." },
        { icon: <MdSecurity />, title: "Reliability", desc: "We ensure safe, secure, and dependable booking experiences." }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-16">
            <header className="text-center space-y-3 mb-10">
                <h1 className="text-3xl font-bold text-blue-900">About FlyHigh Agency</h1>
                <p className="text-gray-500 max-w-xl mx-auto">
                    Learn more about our story, mission, values, and the amazing team behind our agency.
                </p>
            </header>

            {/* Our Story */}
            <section className="grid md:grid-cols-2 gap-12 items-center bg-gradient-to-r from-blue-50 to-white rounded-3xl p-10 shadow-lg mb-14">
                <div className="space-y-4">
                    <h2 className="text-3xl font-semibold text-blue-900">Our Story</h2>
                    <p className="text-gray-700">
                        FlyHigh was founded in 2018 with a simple mission: to make travel planning seamless, enjoyable, and accessible for everyone. Booking flights online could often be stressful, confusing, and time-consuming, so we wanted to offer a smarter way.
                    </p>
                    <p className="text-gray-700">
                        Beginning as a small team of passionate travel enthusiasts, we dedicated ourselves to building a platform that is intuitive, reliable, and tailored to the needs of modern travelers. Every feature was carefully designed to help users find the best flights, compare options, and book confidently.
                    </p>
                </div>
                <div className="space-y-4">
                    <p className="text-gray-700">
                        From humble beginnings, FlyHigh has grown steadily, now providing flight booking services, exclusive deals, and memberships that empower travelers worldwide. Our commitment to quality, customer satisfaction, and innovation has allowed thousands to explore the world with ease and comfort.
                    </p>
                    <p className="text-gray-700">
                        Over the years, we continuously refined our platform, listened to user feedback, and introduced innovative features. Today, FlyHigh is more than a booking platform – it’s a trusted companion for travelers seeking convenience, savings, and memorable journeys.
                    </p>
                </div>
            </section>

            {/* Our Journey */}
            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-6 text-blue-900 mt-10">Our Journey</h2>
                <div className="relative border-l-2 border-blue-400 ml-4">
                    <div className="mb-8 ml-6">
                        <span className="absolute -left-4 top-0 w-8 h-8 bg-blue-600 rounded-full"></span>
                        <h3 className="font-semibold text-lg text-blue-800">2018</h3>
                        <p className="text-gray-700">FlyHigh was founded with a mission to simplify travel planning and make booking flights easier for everyone.</p>
                    </div>
                    <div className="mb-8 ml-6">
                        <span className="absolute -left-4 top-0 w-8 h-8 bg-blue-600 rounded-full"></span>
                        <h3 className="font-semibold text-lg text-blue-800">2020</h3>
                        <p className="text-gray-700">We reached 100,000 users and expanded our services to 10 popular destinations across Europe.</p>
                    </div>
                    <div className="mb-8 ml-6">
                        <span className="absolute -left-4 top-0 w-8 h-8 bg-blue-600 rounded-full"></span>
                        <h3 className="font-semibold text-lg text-blue-800">2023</h3>
                        <p className="text-gray-700">Introduced premium membership benefits and exclusive flight deals for our loyal travelers.</p>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mb-16 grid md:grid-cols-2 gap-12">
                <motion.div whileHover={{ scale: 1.03 }} className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold mb-3 text-blue-800">Our Mission</h2>
                    <p className="text-gray-700">
                        To simplify travel by offering reliable booking services, exclusive deals, and exceptional support.
                        Empowering travelers to explore the world with confidence.
                    </p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.03 }} className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-lg transition">
                    <h2 className="text-2xl font-semibold mb-3 text-blue-800">Our Vision</h2>
                    <p className="text-gray-700">
                        To be the most trusted travel platform, known for innovation, reliability, and excellence in user experience.
                    </p>
                </motion.div>
            </section>

            {/* Meet the Team */}
            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-8 text-blue-800 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-xl shadow p-6 text-center"
                        >
                            <img src={member.img} alt={member.name} className="mx-auto rounded-full w-32 h-32 object-cover mb-4" />
                            <h3 className="font-semibold text-lg">{member.name}</h3>
                            <p className="text-gray-500">{member.role}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Our Values */}
            <section className="mb-16">
                <h2 className="text-3xl font-semibold mb-8 text-blue-800 text-center">Our Values</h2>
                <div className="grid md:grid-cols-3 gap-8 ">
                    {values.map((value, idx) => (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.05 }}
                            className="bg-blue-50 rounded-xl shadow p-6 text-center"
                        >
                            <div className="text-4xl text-blue-900 mb-4 flex justify-center">{value.icon}</div>
                            <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                            <p className="text-gray-700">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
