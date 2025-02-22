import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import cancerCell from "../assets/images/cancer-cell.jpg";
import Cards from "../components/Cards";
import "../styles/Home.css";

const smoothTransition = {
  duration: 1.2,
  ease: "easeInOut", // Smoother easing curve
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate loading for 2 seconds
  }, []);

  const handleTouchStart = (e) => {
    e.currentTarget.classList.add("blink-blue");
    e.currentTarget.classList.add("glow");
  };

  const handleTouchEnd = (e) => {
    e.currentTarget.classList.remove("blink-blue");
    e.currentTarget.classList.remove("glow");
  };

  if (loading) {
    return (
      <div className="loading-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Hero Section with Animation */}
      <section className="hero-section">
        <motion.div 
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={smoothTransition}
        >
          <h1 className="hero-heading">Welcome to CLUTCH.AI</h1>
          <motion.p 
            className="hero-subtext"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, ...smoothTransition }}
          >
            Spot. Detect. Protect. <br /> AI for Early Cancer Detection.
          </motion.p>
          <motion.p 
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...smoothTransition }}
          >
            Your trusted platform for AI-powered cancer diagnosis and research.
          </motion.p>
        </motion.div>

        <motion.div 
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={smoothTransition}
        >
          <img src={cancerCell} alt="Cancer Cell" className="hero-image" />
        </motion.div>
      </section>

      {/* Mission Section with Animated Cards */}
      <section className="mission-section">
        <motion.div 
          className="mission-text"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={smoothTransition}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="mission-heading">Our Mission</h2>
          <p className="mission-description">
            We aim to revolutionize cancer diagnosis and research through the power of AI.
          </p>
        </motion.div>

        {/* Cards Component */}
        <Cards />
      </section>
      <div className="w-full px-6 md:px-16 lg:px-32 py-10 space-y-16">
      {/* ORIGIN Section */}
      <section className="text-center min-h-screen flex flex-col justify-center text-white">
        <h2 className="text-3xl font-bold mb-4">ORIGIN</h2>
        <p className="max-w-3xl mx-auto">
          Cancer, a complex and multifaceted disease, has been a subject of scientific inquiry for centuries. Its origins are deeply rooted in cellular biology, with various theories proposed to explain its development.
        </p>
        <h3 className="text-2xl font-semibold mt-6">Historical Perspectives on Cancer's Origin</h3>
        <p className="max-w-3xl mx-auto">
          In 1858, Rudolf Virchow, a pioneering German pathologist, posited that cancer arises from the body's own cells. He suggested that chronic irritation could trigger the transformation of normal cells into malignant ones, leading to uncontrolled proliferation. This concept laid the foundation for understanding cancer as a disease of cellular origin.
        </p>
        <p className="max-w-3xl mx-auto">
          Building upon Virchow's work, the early 20th century saw the development of the Armitage–Doll multistage model of carcinogenesis. Proposed in 1954 by Peter Armitage and Richard Doll, this statistical model suggests that cancer results from a series of genetic mutations accumulating over time. Their research indicated that the likelihood of developing cancer increases with age, as the probability of multiple mutations occurring rises.
        </p>
        <h3 className="text-2xl font-semibold mt-6">The Warburg Hypothesis</h3>
        <p className="max-w-3xl mx-auto">
          In 1924, Otto Warburg introduced a metabolic perspective on cancer's origin. He observed that cancer cells predominantly generate energy through glycolysis, even in the presence of sufficient oxygen—a phenomenon now known as the Warburg effect. Warburg hypothesized that this metabolic shift results from impaired mitochondrial respiration, leading to uncontrolled cell growth.
        </p>
        <h3 className="text-2xl font-semibold mt-6">Impact of Delayed Detection on Cancer Outcomes</h3>
        <p className="max-w-3xl mx-auto">
          Timely detection and treatment of cancer are critical for improving patient outcomes. Delays in diagnosis can lead to disease progression and reduced survival rates. A systematic review and meta-analysis published in *The BMJ* highlighted that even a four-week delay in cancer treatment is associated with increased mortality across various interventions, including surgery, systemic therapy, and radiotherapy. For instance, a one-month delay in cancer treatment can increase the risk of death by approximately 6% to 13%, depending on the cancer type.
        </p>
        <p className="max-w-3xl mx-auto">
          The COVID-19 pandemic has exacerbated challenges in cancer detection and treatment. Disruptions in healthcare services led to significant declines in cancer screenings and diagnoses. Research indicates that approximately one million new cancer cases were missed worldwide during the pandemic due to healthcare interruptions. This gap underscores the necessity for resilient healthcare systems capable of maintaining cancer care services amid global crises.
        </p>
        <h3 className="text-2xl font-semibold mt-6">Conclusion</h3>
        <p className="max-w-3xl mx-auto">
          Understanding the origins of cancer and the critical importance of early detection provides valuable insights into combating this complex disease. Historical and contemporary research emphasizes that prompt diagnosis and treatment are paramount in improving survival rates and patient outcomes.
        </p>
      </section>

      {/* WHY DO YOU NEED US Section - Separate Page */}
      <section 
        className="text-center bg-primary p-10 rounded-xl shadow-lg min-h-screen flex flex-col justify-center" // Changed bg-gray-100 to bg-primary
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <h2 className="text-3xl font-bold text-white mb-4">WHY DO YOU NEED US?</h2> {/* Changed text-gray-800 to text-white */}
        <p className="text-white max-w-3xl mx-auto mb-6"> {/* Changed text-gray-600 to text-white */}
          Our AI-driven cancer detection model provides an early, accurate, and accessible diagnosis. With 74% accuracy, 
          it serves as a crucial tool for identifying lung, skin, and breast cancer in the initial stages, potentially saving lives.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-primary-light p-6 rounded-lg shadow-md w-80"> {/* Changed bg-white to bg-primary-light */}
            <h3 className="text-xl font-semibold text-white">Early Detection</h3> {/* Changed text-gray-700 to text-white */}
            <p className="text-white"> {/* Changed text-gray-500 to text-white */}
              Identifying cancer at an early stage increases the chances of successful treatment.
            </p>
          </div>
          <div className="bg-primary-light p-6 rounded-lg shadow-md w-80"> {/* Changed bg-white to bg-primary-light */}
            <h3 className="text-xl font-semibold text-white">Affordable & Accessible</h3> {/* Changed text-gray-700 to text-white */}
            <p className="text-white"> {/* Changed text-gray-500 to text-white */}
              AI-driven screening reduces costs and makes cancer detection widely available.
            </p>
          </div>
          <div className="bg-primary-light p-6 rounded-lg shadow-md w-80"> {/* Changed bg-white to bg-primary-light */}
            <h3 className="text-xl font-semibold text-white">Improving Healthcare</h3> {/* Changed text-gray-700 to text-white */}
            <p className="text-white"> {/* Changed text-gray-500 to text-white */}
              Assisting doctors in faster and more accurate diagnoses.
            </p>
          </div>
        </div>
      </section>
    </div>
    </div> 
     );
};
export default Home;
