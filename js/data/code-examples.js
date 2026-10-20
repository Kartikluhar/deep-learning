/**
 * MLForge Implementation & Code Reference
 * Practical Python code templates explained in clear, simple English for beginners and developers.
 */

window.MLForge = window.MLForge || {};
window.MLForge.data = window.MLForge.data || {};

MLForge.data.codeExamples = [
  {
    id: "pytorch-training-loop",
    title: "Standard PyTorch Training Loop",
    category: "PyTorch",
    language: "python",
    description: "A clean, reliable Python training loop used to train a neural network. It sends batches of data to the model, calculates the error, computes gradients with backpropagation, and updates the weights.",
    explanation: "This loop does three main things: 1) Forward pass: passes input data to the model to get predictions and checks the loss. 2) Backward pass: runs backpropagation (scaler.scale(loss).backward()) to find how weights need to change. 3) Optimizer step: nudges the weights to lower the error.",
    inputs: "A PyTorch model, a dataloader with training batches (inputs and true answers), an optimizer (like Adam), and a loss function.",
    outputs: "An updated model with lower error, plus the average training loss for the epoch.",
    requirements: "torch >= 2.0.0",
    code: `import torch
import torch.nn as nn
from torch.cuda.amp import autocast, GradScaler

def train_one_epoch(model, dataloader, optimizer, criterion, scheduler, device, max_grad_norm=1.0):
    # Set the model to training mode (enables Dropout and BatchNorm)
    model.train()
    total_loss = 0.0
    scaler = GradScaler()

    for batch_idx, (inputs, targets) in enumerate(dataloader):
        # Move data to GPU or CPU
        inputs, targets = inputs.to(device), targets.to(device)
        
        # Clear out old gradients from previous step
        optimizer.zero_grad(set_to_none=True)

        # 1. Forward Pass: make prediction and calculate error
        with autocast():
            outputs = model(inputs)
            loss = criterion(outputs, targets)

        # 2. Backward Pass: calculate gradients (backpropagation)
        scaler.scale(loss).backward()
        
        # 3. Prevent exploding gradients by capping step size
        scaler.unscale_(optimizer)
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=max_grad_norm)

        # 4. Update model weights
        scaler.step(optimizer)
        scaler.update()

        total_loss += loss.item()

    if scheduler:
        scheduler.step()

    # Return the average error across all batches
    return total_loss / len(dataloader)`
  },
  {
    id: "sklearn-full-pipeline",
    title: "Safe Data Preprocessing Pipeline (Scikit-Learn)",
    category: "Scikit-Learn",
    language: "python",
    description: "A complete data preparation pipeline that fills in missing values, scales numbers, and converts text categories to numbers—without accidentally leaking test data into the training set.",
    explanation: "A Pipeline bundles your data cleaning and your model into one single object. When you call fit(), it calculates averages only on the training set, completely protecting you from data leakage bugs.",
    inputs: "Raw tabular data with numbers (like age, income) and text categories (like education, city).",
    outputs: "Clean predictions and a cross-validation score showing how well the model works on unseen data.",
    requirements: "scikit-learn >= 1.2.0, pandas >= 2.0.0",
    code: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import HistGradientBoostingClassifier

# 1. Separate features into numbers and text categories
num_features = ['age', 'income', 'credit_score']
cat_features = ['education', 'occupation', 'marital_status']

# 2. Fill missing numbers with median, then scale them
num_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

# 3. Fill missing text with most frequent word, then one-hot encode
cat_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

# 4. Combine transformers into a preprocessor
preprocessor = ColumnTransformer(
    transformers=[
        ('num', num_transformer, num_features),
        ('cat', cat_transformer, cat_features)
    ]
)

# 5. Connect preprocessor directly to the classifier
clf_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', HistGradientBoostingClassifier(random_state=42))
])

# 6. Test safely with 5-fold cross-validation without data leakage
cv_scores = cross_val_score(clf_pipeline, X, y, cv=5, scoring='roc_auc')
print(f"5-Fold ROC-AUC: {cv_scores.mean():.4f} +/- {cv_scores.std():.4f}")`
  },
  {
    id: "fastapi-model-serving",
    title: "Deploying an ML Model as a Web API (FastAPI)",
    category: "Deployment",
    language: "python",
    description: "A simple web server that lets websites and apps send data to your trained model and receive predictions in real-time.",
    explanation: "FastAPI listens for incoming HTTP POST requests. It checks that the incoming numbers are valid, passes them to your saved model, and returns the prediction and probability as clean JSON data.",
    inputs: "A JSON request containing a list of numbers (e.g. features: [2.5, 1.2, 0.4, 3.1]).",
    outputs: "A JSON response containing the prediction (e.g. prediction: 1) and confidence probability.",
    requirements: "fastapi, uvicorn, pydantic, joblib",
    code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
import joblib
import numpy as np

# Create the web application
app = FastAPI(title="MLForge Model Inference API", version="1.0.0")

model = None

# Load the saved model into memory once when server starts
@app.on_event("startup")
def load_model():
    global model
    model = joblib.load("model_pipeline.joblib")

# Define the expected input format
class PredictionRequest(BaseModel):
    features: List[float] = Field(..., example=[2.5, 1.2, 0.4, 3.1])

# The prediction endpoint: other apps send data here
@app.post("/predict")
async def predict_single(item: PredictionRequest):
    try:
        data = np.array(item.features).reshape(1, -1)
        pred = model.predict(data)[0]
        prob = model.predict_proba(data)[0].tolist() if hasattr(model, "predict_proba") else None
        return {"prediction": int(pred), "probabilities": prob}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

# Health check endpoint to verify server is alive
@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}`
  },
  {
    id: "pytorch-cnn-architecture",
    title: "Simple ResNet CNN for Image Classification (PyTorch)",
    category: "PyTorch",
    language: "python",
    description: "A modern Convolutional Neural Network (CNN) with skip connections (ResNet) that learns image patterns without suffering from vanishing gradients.",
    explanation: "This network uses Conv2D layers with BatchNorm and ReLU. It includes a shortcut connection (self.conv(x) + self.shortcut(x)) that lets gradients flow backward freely, so the network trains reliably without getting stuck.",
    inputs: "A batch of images with shape [batch_size, 3 color channels, height, width].",
    outputs: "Classification scores across 10 classes (e.g. airplane, automobile, bird, cat, dog...).",
    requirements: "torch >= 2.0.0",
    code: `import torch
import torch.nn as nn

class ConvBlock(nn.Module):
    """A building block with two convolution layers and a shortcut skip connection."""
    def __init__(self, in_c, out_c, stride=1):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_c, out_c, kernel_size=3, stride=stride, padding=1, bias=False),
            nn.BatchNorm2d(out_c),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_c, out_c, kernel_size=3, stride=1, padding=1, bias=False),
            nn.BatchNorm2d(out_c)
        )
        self.shortcut = nn.Sequential()
        # Adjust shortcut dimension if image size shrinks
        if stride != 1 or in_c != out_c:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_c, out_c, kernel_size=1, stride=stride, bias=False),
                nn.BatchNorm2d(out_c)
            )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
        # Add the original input x directly to the output (residual shortcut)
        return self.relu(self.conv(x) + self.shortcut(x))

class MiniResNet(nn.Module):
    def __init__(self, in_channels=3, num_classes=10):
        super().__init__()
        self.prep = nn.Sequential(
            nn.Conv2d(in_channels, 64, kernel_size=3, padding=1, bias=False),
            nn.BatchNorm2d(64),
            nn.ReLU(inplace=True)
        )
        self.layer1 = ConvBlock(64, 128, stride=2)
        self.layer2 = ConvBlock(128, 256, stride=2)
        self.gap = nn.AdaptiveAvgPool2d((1, 1))
        self.fc = nn.Linear(256, num_classes)

    def forward(self, x):
        x = self.prep(x)
        x = self.layer1(x)
        x = self.layer2(x)
        x = self.gap(x)
        x = torch.flatten(x, 1)
        return self.fc(x)`
  }
];
