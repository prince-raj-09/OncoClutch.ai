import { useState } from "react";
import axios from "axios";

export default function BreastCancerDetection() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/predict", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setPrediction(response.data.prediction);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to get a prediction.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Breast Cancer Detection</h1>
      <input type="file" onChange={handleFileChange} className="mb-4 p-2 border rounded" />
      <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded">
        Upload & Predict
      </button>
      {prediction && <p className="mt-4 text-lg font-semibold">Prediction: {prediction}</p>}
    </div>
  );
}
    