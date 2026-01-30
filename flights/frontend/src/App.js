import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'leaflet/dist/leaflet.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './index.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./components/Contact";
import Membership from "./pages/Membership";
import Deals from "./pages/Deals";
import Destinations from "./pages/Destinations";
import HomePage from "./pages/HomePage";
import Flights from "./pages/Flights";
import Favorites from "./pages/Favorites";
import Baggage from "./pages/Baggage";
import Faq from "./pages/Faq";
import AboutUs from "./pages/AboutUs";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cookies from "./pages/Cookies";
import CookiesModal from "./components/CookiesModal";
import PassagerRights from "./pages/PassagerRights";
import AirportGuide from "./pages/AirportGuide";
import TravelTips from "./pages/TravelTips";
import Account from "./pages/Account";
import Dashboard from "./pages/admin/Dashboard";
import AdminRoute from "./routes/AdminRoute";
import Users from "./pages/admin/Users";
import Layout from "./pages/admin/Layout";
import Settings from "./pages/admin/Settings";
import FlightsList from "./pages/admin/Flights";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  // KTU RUHEN TE DHENAT PAS SIGNUP
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  const handleSignupSuccess = (data) => {
    setUser(data);          // ruan user
    setShowSignup(false);
    setShowAccount(true);   // hap Account direkt
  }

  const [favorites, setFavorites] = useState(() => {
    // Merr favoritet nga localStorage kur aplikohet faqja
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  return (
    <Router>
        <div className="flex flex-col min-h-screen">
          <Header
            openLogin={() => setShowLogin(true)}
            openSignup={() => setShowSignup(true)}
            openContact={() => setShowContact(true)}
            userData={user}
            setUserData={setUser}
          />
          <CookiesModal />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/membership" element={<Membership />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/flights" element={<Flights favorites={favorites} setFavorites={setFavorites} />} />
              <Route path="/favorites" element={<Favorites favorites={favorites} setFavorites={setFavorites} />} />
              <Route path="/baggage" element={<Baggage />} />
              <Route path="/faq" element={<Faq onShowContact={() => setShowContact(true)} />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cookies" element={<Cookies />} />
              <Route path="/passager-rights" element={<PassagerRights />} />
              <Route path="/airport-guide" element={<AirportGuide />} />
              <Route path="/travel-tips" element={<TravelTips />} />
              <Route path="/admin" element={
                <AdminRoute>
                  <Layout user={user} />
                </AdminRoute>
              }>
                <Route index element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="flights-list" element={<FlightsList />} />
              </Route>

            </Routes>
          </main>

          <Footer onShowContact={() => setShowContact(true)} />

          {showLogin && (
            <Login
              isOpen={showLogin}
              onClose={() => setShowLogin(false)}
              onSwitchToRegister={handleSwitchToSignup}
              onLoginSuccess={(userData) => {
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData)); // ruaj localStorage
                setShowLogin(false);
                setShowAccount(true);
              }}
            />
          )}

          {showSignup && (
            <Signup
              isOpen={showSignup}
              onClose={() => setShowSignup(false)}
              onSwitchToLogin={handleSwitchToLogin}
              onSignupSuccess={handleSignupSuccess}
            />
          )}

          {showContact && (
            <Contact onClose={() => setShowContact(false)} />
          )}

          {showAccount && user && (
            <Account
              isOpen={showAccount}
              onClose={() => setShowAccount(false)}
              userData={user}
              setUserData={setUser}
            />
          )}

        </div>
    </Router>
  );
}

export default App;
