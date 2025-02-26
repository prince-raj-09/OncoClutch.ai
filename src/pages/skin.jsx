import React, { useState } from "react";

const SkinCancerDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setPrediction(null);
    setError("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to get prediction.");
      }

      const data = await response.json();
      setPrediction(data);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Skin Cancer Detection</h2>
        
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4 w-full" />
        
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {loading ? "Processing..." : "Upload & Detect"}
        </button>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        {prediction && (
          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">{prediction.label}</p>
            <p className="text-gray-600">Confidence: {prediction.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkinCancerDetector;
