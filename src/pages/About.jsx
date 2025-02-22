import React, { useState } from "react";

export default function LandingPage() {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat text-white p-5" 
         style={{ backgroundImage: "url('bg.webp')" }}>
      <div className="max-w-6xl mx-auto bg-black bg-opacity-80 p-8 rounded-lg shadow-lg">
        
        {/* Header */}
        <header className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold">Clutch.ai</h1>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row items-center mt-6">
          <img src="t.jpeg" alt="Trail" className="w-full md:w-1/2 rounded-lg border-4 border-gray-400" />
          <div className="md:w-1/2 text-right mt-4 md:mt-0 md:ml-6">
            <h2 className="text-4xl font-bold mb-4">About Clutch.ai</h2>
            <p className="text-gray-300">
              Clutch.ai is an AI-driven platform designed to enhance cancer diagnosis and treatment,
              providing accurate predictions and personalized treatment plans.
            </p>
            <button 
              className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md" 
              onClick={() => setShowFeatures(!showFeatures)}>
              {showFeatures ? "Hide Features" : "Read More"}
            </button>
          </div>
        </div>

        {/* Features Section */}
        {showFeatures && (
          <div className="mt-8 space-y-6">
            {[
              {
                title: "AI-Driven Diagnosis & Prognosis",
                points: [
                  "Uses deep learning to analyze medical imaging & clinical data.",
                  "Assists oncologists with early cancer detection & risk assessment.",
                ],
              },
              {
                title: "Personalized Treatment Recommendations",
                points: [
                  "Predictive analytics for tailored treatment strategies.",
                  "Uses genetic information to optimize therapy selection.",
                ],
              },
              {
                title: "Seamless Healthcare System Integration",
                points: [
                  "Compatible with Electronic Health Records (EHR).",
                  "Enhances workflow efficiency for medical professionals.",
                ],
              },
              {
                title: "Data Security & Compliance",
                points: [
                  "Follows HIPAA & GDPR standards.",
                  "Uses encryption for secure data handling.",
                ],
              },
            ].map(({ title, points }) => (
              <div key={title}>
                <h3 className="text-xl font-semibold">{title}:</h3>
                <ul className="list-disc pl-6 text-gray-300">
                  {points.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
