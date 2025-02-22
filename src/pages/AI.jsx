import React, { useState } from "react";

const AI = () => {
  const [textInput, setTextInput] = useState("");
  const [image, setImage] = useState(null);

  const handleFileUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handlePredict = () => {
    console.log("Processing AI Prediction...");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-xl font-bold text-center mb-4">Cancer AI Detector</h1>
        
        {/* Text Input */}
        <input
          type="text"
          placeholder="Describe your symptoms..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="mb-4 w-full"
        />
        {image && <img src={image} alt="Uploaded" className="w-full h-32 object-cover mb-4" />}

        {/* Predict Button */}
        <button
          onClick={handlePredict}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
        >
          Predict
        </button>
      </div>
    </div>
  );
};

export default AI;
