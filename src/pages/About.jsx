import { useState } from "react";

export default function LandingPage() {
  const [showFeatures, setShowFeatures] = useState(false);

  return (
    <div className="min-h-screen bg-cover bg-center text-white p-5" style={{ backgroundImage: "url('bg.webp')" }}>
      <div className="max-w-6xl mx-auto p-5 bg-gray-900 bg-opacity-90 rounded-lg">
        <header className="flex justify-between items-center p-5">
          <div className="text-3xl font-bold">Clutch.ai</div>
        </header>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <img src="t.jpeg" alt="Trail Image" className="w-full md:w-1/2 border-4 border-gray-300 rounded-lg" />
          <div className="md:w-1/2 text-right">
            <h1 className="text-5xl font-bold">About Clutch.ai</h1>
            <p className="text-gray-300 mt-4">
              The Clutch.ai project is an AI-driven platform designed to enhance cancer diagnosis and treatment. By leveraging advanced machine learning algorithms, it aims to provide accurate predictions and personalized treatment plans for cancer patients.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
              onClick={() => setShowFeatures(!showFeatures)}
            >
              {showFeatures ? "Show Less" : "Read More"}
            </button>
          </div>
        </div>

        {showFeatures && (
          <div className="mt-6 p-5 bg-gray-800 rounded-lg animate-fade-in">
            <h2 className="text-2xl font-bold">Key Features & Capabilities:</h2>
            <div className="mt-4 space-y-4">
              <Feature title="AI-Driven Diagnosis & Prognosis" details={["Utilizes deep learning models to analyze medical imaging.", "Assists oncologists in early cancer detection and risk assessment."]} />
              <Feature title="Personalized Treatment Recommendations" details={["Uses predictive analytics to tailor treatment strategies.", "Incorporates patient history and genetic data for better therapy selection."]} />
              <Feature title="Seamless Integration with Healthcare Systems" details={["Compatible with Electronic Health Records (EHR).", "Facilitates streamlined workflows for medical professionals."]} />
              <Feature title="Data Security & Compliance" details={["Adheres to HIPAA & GDPR for data security.", "Implements encryption and anonymization techniques."]} />
              <Feature title="Continuous Learning & Model Improvement" details={["Enhances accuracy using real-world clinical data.", "Employs federated learning for secure AI improvements."]} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Feature({ title, details }) {
  return (
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <ul className="list-disc ml-5 text-gray-300">
        {details.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
