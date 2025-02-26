from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image, UnidentifiedImageError  # 🔹 Handle invalid image formats
import io
from lung_cancer import predict_lung_cancer
from breast_cancer import predict_breast_cancer
from skin_cancer import predict_skin_cancer

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    if "file" not in request.files or "category" not in request.form:
        return jsonify({"error": "No file or category provided"}), 400

    file = request.files["file"]
    category = request.form["category"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    try:
        # ✅ Read image in memory and convert it
        image = Image.open(io.BytesIO(file.read())).convert("RGB")
    except UnidentifiedImageError:
        return jsonify({"error": "Invalid or unsupported image format"}), 400

    # ✅ Predict based on category
    if category == "lung":
        result = predict_lung_cancer(image)
    elif category == "skin":
        result = predict_skin_cancer(image)
    elif category == "breast":
        result = predict_breast_cancer(image)
    else:
        return jsonify({"error": "Invalid category"}), 400

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)
