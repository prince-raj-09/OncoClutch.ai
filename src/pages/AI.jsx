import React, { useState } from "react";

const Ai = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [prediction, setPrediction] = useState("");

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreview(URL.createObjectURL(file)); // Show image preview
        }
    };

    // Upload and get prediction
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select an image first.");
            return;
        }

        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://127.0.0.1:5000/predict", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            setPrediction(data.prediction);
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to get prediction.");
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>AI Cancer Detection</h2>
            <input type="file" onChange={handleFileChange} />
            <br />
            {preview && (
                <img
                    src={preview}
                    alt="Preview"
                    style={{ width: "300px", marginTop: "20px" }}
                />
            )}
            <br />
            <button onClick={handleUpload} style={{ marginTop: "10px" }}>
                Predict
            </button>
            <p>{prediction && `🩺 Prediction: ${prediction}`}</p>
        </div>
    );
};

export default Ai;
