import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";

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
    <div className="flex flex-col min-h-screen">
      <Header
        openLogin={() => setShowLogin(true)}
        openSignup={() => setShowSignup(true)}
        openContact={() => setShowContact(true)}
      />

      <main className="flex-grow"></main>

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

      {showContact && (
        <Contact onClose={() => setShowContact(false)} />
      )}
    </div>
  );
}

export default App;
