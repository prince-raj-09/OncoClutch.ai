  import React from "react";
  import { Routes, Route } from "react-router-dom"; // Remove BrowserRouter import
  import Navbar from "./components/Navbar";
  import Home from "./pages/Home";
  import AI from "./pages/AI";
  import About from "./pages/About";
  import Footer from "./components/Footer";
  import Synapse from "./pages/Synapse";
  

  const App = () => {
    return (
      <div className="bg-[#0a0f1c] min-h-screen text-white">
        {/* Navbar */}
        <Navbar />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/about" element={<About />} />
          <Route path="/synapse" element={<Synapse />} /> 
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    );
  };

  export default App;
