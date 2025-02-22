import React from "react";
import { motion } from "framer-motion";
import "../styles/Home.css"; // Importing CSS file

const cardsData = [
  {
    title: "Early Detection",
    description: "Our AI helps identify cancer at an early stage.",
    content: "Detecting cancer early significantly increases treatment success. Our AI scans medical images to find early cancer signs."
  },
  {
    title: "Accurate Diagnosis",
    description: "We use AI models to provide precise and reliable diagnosis.",
    content: "AI reduces misinterpretation by analyzing biopsy samples, radiology scans, and pathology reports with high accuracy."
  },
  {
    title: "Research & Innovation",
    description: "Continuously improving AI models through research.",
    content: "Our AI research focuses on enhancing cancer detection and patient outcomes through advanced machine learning models."
  },
  {
    title: "Pathology",
    description: "AI-driven pathology analysis for faster and better insights.",
    content: "AI assists pathologists in analyzing tissue samples, ensuring more accurate and faster diagnosis."
  },
  {
    title: "Biopsy",
    description: "Enhancing biopsy analysis with deep learning.",
    content: "AI speeds up biopsy sample analysis, identifying cancerous cells more accurately and efficiently."
  },
  {
    title: "Radiology",
    description: "AI-powered radiology scans for quick and accurate assessment.",
    content: "AI detects abnormalities in X-rays, CT scans, and MRIs, assisting doctors in diagnosing diseases faster."
  }
];

const Cards = () => {
  return (
    <div className="cards-container">
      {cardsData.map((card, index) => (
        <motion.div 
          key={index}
          className="mission-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 * index, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="card-title">{card.title}</h3>
          <p className="card-description">{card.description}</p>
          <p className="card-content">{card.content}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Cards;
