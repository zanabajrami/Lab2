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

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        openLogin={() => setShowLogin(true)}
        openSignup={() => setShowSignup(true)}
        openContact={() => setShowContact(true)}
      />

      <main className="flex-grow">
        {/* Faqet e tjera mund të vendosen këtu */}
      </main>

      <Footer />

      {showLogin && (
        <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      )}
      {showSignup && (
        <Signup isOpen={showSignup} onClose={() => setShowSignup(false)} />
      )}
      {showContact && (
        <Contact onClose={() => setShowContact(false)} />
      )}
    </div>
  );
}

export default App;
