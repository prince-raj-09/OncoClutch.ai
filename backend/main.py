import os
import torch
import timm
import torch.nn as nn
from torchvision import transforms
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# Define device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the model with the same architecture
def load_model(model_path):
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"❌ Model file '{model_path}' not found!")
    
    model = timm.create_model("tf_efficientnet_b4", pretrained=False, num_classes=3)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model

# Load the trained model
MODEL_PATH = "final_efficientnet_lung_cancer.pth"
model = load_model(MODEL_PATH)
print("✅ Model Loaded Successfully!")

# Define transformation (must match training transforms)
transform = transforms.Compose([
    transforms.Resize((380, 380)),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5])
])

# Function to predict a single image
def predict_image(image):
    image = image.convert("RGB")
    image = transform(image).unsqueeze(0).to(device)  # Add batch dimension

    with torch.no_grad():
        output = model(image)
        probabilities = torch.nn.functional.softmax(output, dim=1)
        confidence, predicted = torch.max(probabilities, 1)
    
    classes = ["benign", "malignant", "normal"]  # Adjust according to your labels
    return classes[predicted.item()], confidence.item()

# Flask Web App
app = Flask(__name__)
CORS(app)

# Ensure 'uploads' directory exists
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route("/upload", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)
    return jsonify({"message": "File uploaded successfully!", "file_path": file_path})

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    try:
        image = Image.open(file)
        label, confidence = predict_image(image)
        return jsonify({"prediction": label, "confidence": confidence})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=8000)
