import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
      </main>
      <Footer />
      
    </div>
  );
}

export default App;
