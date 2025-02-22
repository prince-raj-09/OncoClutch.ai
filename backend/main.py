import torch
import timm
import torch.nn as nn
from torchvision import transforms
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend-backend communication

# Define device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load the model
def load_model(model_path):
    model = timm.create_model("tf_efficientnet_b4", pretrained=False, num_classes=3)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model

model = load_model("final_efficientnet_lung_cancer.pth")
print("✅ Model Loaded Successfully!")

# Define transformation
transform = transforms.Compose([
    transforms.Resize((380, 380)),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5])
])

# Prediction function
def predict_image(image):
    image = transform(image).unsqueeze(0).to(device)  # Add batch dimension

    with torch.no_grad():
        output = model(image)
        _, predicted = torch.max(output, 1)

    classes = ["benign", "malignant", "normal"]
    return classes[predicted.item()]

# Prediction Route
@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    image = Image.open(file).convert("RGB")
    prediction = predict_image(image)

    return jsonify({"prediction": prediction})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
