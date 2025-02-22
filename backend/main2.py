import torch
import torchvision.models as models
import torch.nn as nn
import torchvision.transforms as transforms
from PIL import Image
import os
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# Load ResNet-101 model
model = models.resnet101(weights=models.ResNet101_Weights.DEFAULT)

# Modify final layer to match our trained model
num_ftrs = model.fc.in_features
model.fc = nn.Sequential(
    nn.Linear(num_ftrs, 256),
    nn.ReLU(),
    nn.Dropout(0.5),
    nn.Linear(256, 2)  # 2 output classes: Cancer (1), No Cancer (0)
)

# Move model to GPU for faster processing
model = model.cuda()

# Load trained weights
model.load_state_dict(torch.load("backend\final_breast_cancer_model.pth"))
model.eval()  # Set model to evaluation mode

print("✅ AI Model Loaded Successfully.")

# Define preprocessing (same as training)
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize for ResNet input
    transforms.ToTensor(),  # Convert to tensor
])

print("✅ Image preprocessing setup is complete.")
