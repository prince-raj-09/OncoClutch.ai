import { useState } from "react";
import axios from "axios";

export default function CancerDetection() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [category, setCategory] = useState("lung");
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Only image files are allowed.");
        return;
      }
      setError(null);
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDetect = async () => {
    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setPrediction(null);
    
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("category", category);

    try {
      const response = await axios.post("http://127.0.0.1:5000/predict", formData);
      setPrediction(response.data.prediction);
    } catch (error) {
      setError(error.response?.data?.error || "Server issue. Try again.");
    }
    
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold mb-4">OncoClutch AI Detection</h1>

      {/* Category Selection */}
      <select 
        className="mb-4 p-2 bg-gray-800 text-white rounded"
        value={category} 
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="lung">Lung Cancer</option>
        <option value="skin">Skin Cancer</option>
        <option value="breast">Breast Cancer</option>
      </select>

      {/* Upload Box */}
      <label className="border-2 border-dashed border-pink-500 p-10 rounded-lg text-center cursor-pointer w-80">
        <p>Drop file here or click to upload</p>
        <input 
          type="file" 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileChange} 
        />
      </label>

      {/* Error Message */}
      {error && <p className="mt-2 text-red-400">{error}</p>}

      {/* Image Preview */}
      {preview && <img src={preview} alt="Preview" className="mt-4 w-40 h-40 object-cover rounded-lg shadow-lg" />}

      {/* Detect Button */}
      <button 
        className={`mt-4 px-6 py-2 rounded text-white ${loading ? "bg-gray-500" : "bg-pink-600 hover:bg-pink-500"}`}
        onClick={handleDetect} 
        disabled={loading}
      >
        {loading ? "Detecting..." : "Detect Cancer"}
      </button>

      {/* Prediction Result */}
      {prediction && (
        <div className="mt-4 p-3 bg-gray-800 rounded text-lg">
          <strong>Prediction:</strong> {prediction}
        </div>
      )}
    </div>
  );
}
