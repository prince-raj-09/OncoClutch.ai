from fastapi import FastAPI, File, UploadFile
import torch
from torchvision import models, transforms
from PIL import Image
import io

# Initialize FastAPI app
app = FastAPI()

# Load pre-trained AI model (ResNet for image classification)
model = models.resnet50(pretrained=True)
model.eval()

# Define image transformations
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Function to predict cancer risk from an image
def predict_cancer(image: Image.Image):
    img_tensor = transform(image).unsqueeze(0)
    with torch.no_grad():
        outputs = model(img_tensor)
    prediction = torch.nn.functional.softmax(outputs[0], dim=0)
    return prediction.tolist()

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        prediction = predict_cancer(image)
        return {"prediction": prediction}
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
def home():
    return {"message": "OncoClutch AI Backend is Running!"}
