import torch
import torchvision.transforms as transforms
import torchvision.models as models
import torch.nn as nn
from PIL import Image

# ✅ Define device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ✅ Load Model
def load_model(model_path="final-skin.pth"):
    model = models.resnet101(weights=models.ResNet101_Weights.DEFAULT)
    num_ftrs = model.fc.in_features
    model.fc = nn.Sequential(
        nn.Linear(num_ftrs, 256),
        nn.ReLU(),
        nn.Dropout(0.5),
        nn.Linear(256, 2)  # Binary classification: 0 (No Cancer), 1 (Cancer)
    )
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model

model = load_model()

# ✅ Define Image Transformations
transform = transforms.Compose([
    transforms.Resize((128, 128)),
    transforms.ToTensor(),
])

# ✅ Prediction Function
def predict_skin_cancer(image):
    image = transform(image).unsqueeze(0).to(device)  # ✅ Now accepts PIL Image, not file path

    with torch.no_grad():
        output = model(image)
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        confidence, predicted = torch.max(probabilities, dim=0)

    label = "Cancer Detected\n" if predicted.item() == 1 else "No Cancer\n"
    return label, confidence.item() * 100
