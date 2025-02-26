import torch
import torch.nn as nn
import torchvision.transforms as transforms
from timm import create_model
from PIL import Image

# ✅ Step 1: Check CUDA Availability
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ✅ Step 2: Load the Trained Model
def load_model(model_path="final_breast_cancer_model.pth"):
    model = create_model("tf_efficientnet_b4", pretrained=False, num_classes=3)  # ✅ Directly set num_classes
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model

model = load_model()

# ✅ Step 3: Define Image Transformations
transform = transforms.Compose([
    transforms.Resize((380, 380)),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5])
])

# ✅ Step 4: Define Prediction Function
def predict_breast_cancer(image):
    image = transform(image).unsqueeze(0).to(device)  # ✅ Now accepts PIL Image, not file path

    with torch.no_grad():
        output = model(image)
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        confidence, predicted = torch.max(probabilities, dim=0)

    classes = ["Benign", "Malignant", "Normal"]
    return classes[predicted.item()], confidence.item() * 100
