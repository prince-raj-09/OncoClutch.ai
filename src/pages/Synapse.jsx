import React from "react";

const Synapse = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-fixed text-gray-300 p-5" style={{ backgroundImage: "url('./cancer.img.webp')" }}>
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 border-2 border-pink-500 bg-black bg-opacity-80 rounded-lg mx-4 mt-10">
        <h1 className="text-5xl font-bold mb-3">Welcome to Synapse</h1>
        <p className="text-xl glow-text">
          {"Welcome to Synapse—a curated platform providing access to authentic, peer-reviewed research papers designed to enrich your knowledge and inspire informed insights.".split(" ").map((word, index) => (
            <span key={index} className="inline-block transition-transform duration-300 hover:-translate-y-2 hover:text-pink-400 animate-glow">{word} </span>
          ))}
        </p>
      </div>
      
      {/* Boxes Section */}
      <div className="relative z-10 flex flex-wrap justify-around mt-10 px-5 gap-5">
        {['LUNG', 'SKIN', 'BREAST'].map((type) => (
          <div key={type} className="flex-1 min-w-[250px] border border-gray-500 p-5 text-center bg-gray-800 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-400">
            Research synapse of {type}
          </div>
        ))}
      </div>
      
      {/* PDF Links Section */}
      <div className="relative z-10 text-center mt-10">
        {[
          { name: "Bronchogenic Carcinoma", file: "LUNG.pdf" },
          { name: "Cutaneous Carcinoma", file: "SKIN.pdf" },
          { name: "Mammary Carcinoma", file: "BREAST.pdf" }
        ].map(({ name, file }) => (
          <a key={file} href={file} target="_blank" rel="noopener noreferrer" className="inline-block m-3 px-6 py-3 border border-gray-700 bg-gray-800 text-gray-300 rounded-lg transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-pink-400">
            {name}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Synapse;

// Tailwind CSS Glow Animation
// Add this in your global styles (if needed)
// @keyframes glow {
//   0%, 100% { text-shadow: 0 0 5px #ff6b81, 0 0 10px #ff6b81; }
//   50% { text-shadow: 0 0 15px #ff6b81, 0 0 25px #ff6b81; }
// }
// .animate-glow:hover { animation: glow 1.5s infinite ease-in-out; }
