import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Ai from "./pages/Ai";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Footer from "./components/Footer";


const App = () => {
  return (
    <div className="bg-[#0a0f1c] min-h-screen text-white">
      {/* Navbar */}
      <Navbar />

      {/* Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Ai />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
