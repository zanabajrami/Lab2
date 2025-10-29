import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Contact from "./pages/Contact"; // import Contact

function App() {
  const [showContact, setShowContact] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header openContact={() => setShowContact(true)} />

        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>

        <Footer />

        {/* Contact modal */}
        {showContact && (
          <Contact onClose={() => setShowContact(false)} />
        )}
      </div>
    </Router>
  );
}

export default App;
