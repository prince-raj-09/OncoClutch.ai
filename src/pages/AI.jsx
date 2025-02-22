import { useState } from "react";

const AI = () => {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setPrediction(data.prediction);
        setConfidence((data.confidence * 100).toFixed(2) + "%");
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to get prediction");
    }
  };

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-4">AI Cancer Detection</h1>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload & Predict
      </button>
      {prediction && (
        <div className="mt-4">
          <h2 className="text-xl">Prediction: {prediction}</h2>
          <p>Confidence: {confidence}</p>
        </div>
      )}
    </div>
  );
};

export default AI;
  