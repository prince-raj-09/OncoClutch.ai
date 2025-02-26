import torch
import timm
import torch.nn as nn
from torchvision import transforms
from PIL import Image

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

def load_model(model_path="final_efficientnet_lung_cancer.pth"):
    model = timm.create_model("tf_efficientnet_b4", pretrained=False, num_classes=3)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.to(device)
    model.eval()
    return model

model = load_model()

transform = transforms.Compose([
    transforms.Resize((380, 380)),
    transforms.ToTensor(),
    transforms.Normalize([0.5], [0.5])
])

def predict_lung_cancer(image):
    image = transform(image).unsqueeze(0).to(device)  # ✅ PIL Image se Tensor
    with torch.no_grad():
        output = model(image)
        probabilities = torch.nn.functional.softmax(output[0], dim=0)
        confidence, predicted = torch.max(probabilities, dim=0)

    classes = ["Benign", "Malignant", "Normal"]
    return classes[predicted.item()], confidence.item() * 100
