import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0a1a2a] flex items-center justify-center p-6 text-white">
      <div className="bg-[#1b3a52] shadow-lg rounded-2xl p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to our Breast Cancer Detection System. Our mission is to leverage
          cutting-edge AI technology to assist in the early detection of breast
          cancer, helping individuals and medical professionals make informed
          decisions.
        </p>
        <h2 className="text-xl font-semibold mt-6">Our Goal</h2>
        <p className="mb-4">
          We aim to provide a fast, reliable, and accessible AI-based detection
          system for breast cancer, empowering early diagnosis and treatment.
        </p>
        <h2 className="text-xl font-semibold mt-6">Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out at
          <span className="text-blue-400 font-medium"> support@cancerdetect.com</span>.
        </p>
      </div>
    </div>
  );
};

export default About;
