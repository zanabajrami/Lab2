import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);

  // KTU RUHEN TE DHENAT PAS SIGNUP
  const [user, setUser] = useState(null);

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  // Ky funksion merret nga Signup
  const handleSignupSuccess = (data) => {
    setUser(data);      // ruan user-in
    setShowSignup(false);
  };

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

          </Routes>
        </main>

        <Footer onShowContact={() => setShowContact(true)} />

        {showLogin && (
          <Login
            isOpen={showLogin}
            onClose={() => setShowLogin(false)}
            onSwitchToRegister={handleSwitchToSignup}
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

      </div>
    </Router>
  );
}

export default App;
