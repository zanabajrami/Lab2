import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import Membership from "./pages/Membership";
import Deals from "./pages/Deals";
import Destinations from "./pages/Destinations";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleSwitchToSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignup(false);
    setShowLogin(true);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header
          openLogin={() => setShowLogin(true)}
          openSignup={() => setShowSignup(true)}
          openContact={() => setShowContact(true)}
        />

        <main className="flex-grow">
          <Routes>
            <Route path="/membership" element={<Membership />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/destinations" element={<Destinations />} />

          </Routes>
        </main>

        <Footer />

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
          />
        )}

        {showContact && <Contact onClose={() => setShowContact(false)} />}
      </div>
    </Router>
  );
}

export default App;
