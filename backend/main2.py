import os
import torch
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
from timm import create_model
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Define the model loading function
def load_model():
    model = create_model('tf_efficientnet_b4', pretrained=False)
    num_features = model.classifier.in_features
    model.classifier = nn.Linear(num_features, 3)  # 3 classes: benign, malignant, normal
    model.load_state_dict(torch.load("final_breast_cancer_model.pth", map_location=torch.device('cpu')))
    model.eval()
    return model

model = load_model()

# Define image transformations
def transform_image(image_path):
    transform = transforms.Compose([
        transforms.Resize((380, 380)),
        transforms.ToTensor(),
        transforms.Normalize([0.5], [0.5])
    ])
    image = Image.open(image_path).convert("RGB")
    return transform(image).unsqueeze(0)

# Prediction function
def predict(image_path):
    class_names = ['Benign', 'Malignant', 'Normal']
    image_tensor = transform_image(image_path)
    with torch.no_grad():
        output = model(image_tensor)
        _, predicted = torch.max(output, 1)
    return class_names[predicted.item()]

# API route to handle image upload
@app.route("/predict", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file part"})
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No selected file"})
    filename = secure_filename(file.filename)
    file_path = os.path.join(UPLOAD_FOLDER, filename)
    file.save(file_path)
    result = predict(file_path)
    os.remove(file_path)  # Clean up after prediction
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)
