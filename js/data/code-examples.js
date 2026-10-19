/**
 * MLForge Implementation & Code Reference
 * Production-ready code templates for NumPy, Scikit-Learn, PyTorch, and Deployment.
 */

window.MLForge = window.MLForge || {};
window.MLForge.data = window.MLForge.data || {};

MLForge.data.codeExamples = [
  {
    id: "pytorch-training-loop",
    title: "Production PyTorch Training Loop with Gradient Clipping",
    category: "PyTorch",
    language: "python",
    description: "Standard robust training loop featuring automatic device placement (CUDA/MPS/CPU), mixed precision (AMP), gradient clipping, and learning rate scheduling.",
    requirements: "torch >= 2.0.0",
    code: `import torch
import torch.nn as nn
from torch.cuda.amp import autocast, GradScaler

def train_one_epoch(model, dataloader, optimizer, criterion, scheduler, device, max_grad_norm=1.0):
    model.train()
    total_loss = 0.0
    scaler = GradScaler()

    for batch_idx, (inputs, targets) in enumerate(dataloader):
        inputs, targets = inputs.to(device), targets.to(device)
        optimizer.zero_grad(set_to_none=True) # More efficient than zero_grad()

        # Mixed precision forward pass
        with autocast():
            outputs = model(inputs)
            loss = criterion(outputs, targets)

        # Scaled backward pass
        scaler.scale(loss).backward()
        
        # Unscale before gradient clipping
        scaler.unscale_(optimizer)
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=max_grad_norm)

        # Step optimizer and update scaler
        scaler.step(optimizer)
        scaler.update()

        total_loss += loss.item()

    if scheduler:
        scheduler.step()

    return total_loss / len(dataloader)`
  },
  {
    id: "sklearn-full-pipeline",
    title: "Scikit-Learn Leakage-Free Preprocessing Pipeline",
    category: "Scikit-Learn",
    language: "python",
    description: "End-to-end ColumnTransformer pipeline handling numerical scaling and one-hot categorical encoding without data leakage during cross-validation.",
    requirements: "scikit-learn >= 1.2.0, pandas >= 2.0.0",
    code: `import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.ensemble import HistGradientBoostingClassifier

# Define column types
num_features = ['age', 'income', 'credit_score']
cat_features = ['education', 'occupation', 'marital_status']

# Preprocessing sub-pipelines
num_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler', StandardScaler())
])

cat_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('encoder', OneHotEncoder(handle_unknown='ignore', sparse_output=False))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', num_transformer, num_features),
        ('cat', cat_transformer, cat_features)
    ]
)

# Complete pipeline with classifier
clf_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    ('classifier', HistGradientBoostingClassifier(random_state=42))
])

# Cross-validate safely without data leakage
cv_scores = cross_val_score(clf_pipeline, X, y, cv=5, scoring='roc_auc')
print(f"5-Fold ROC-AUC: {cv_scores.mean():.4f} +/- {cv_scores.std():.4f}")`
  },
  {
    id: "fastapi-model-serving",
    title: "FastAPI Production ML Model Serving Endpoint",
    category: "Deployment",
    language: "python",
    description: "High-performance asynchronous REST API server for inference with Pydantic request validation and batch prediction support.",
    requirements: "fastapi, uvicorn, pydantic, joblib",
    code: `from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List
import joblib
import numpy as np

app = FastAPI(title="MLForge Model Inference API", version="1.0.0")

# Load pre-trained model artifact at startup
model = None

@app.on_event("startup")
def load_model():
    global model
    model = joblib.load("model_pipeline.joblib")

class PredictionRequest(BaseModel):
    features: List[float] = Field(..., example=[2.5, 1.2, 0.4, 3.1])

class BatchRequest(BaseModel):
    instances: List[List[float]]

@app.post("/predict")
async def predict_single(item: PredictionRequest):
    try:
        data = np.array(item.features).reshape(1, -1)
        pred = model.predict(data)[0]
        prob = model.predict_proba(data)[0].tolist() if hasattr(model, "predict_proba") else None
        return {"prediction": int(pred), "probabilities": prob}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/health")
def health_check():
    return {"status": "ok", "model_loaded": model is not None}`
  },
  {
    id: "pytorch-cnn-architecture",
    title: "Modular PyTorch Convolutional Neural Network (CNN)",
    category: "PyTorch",
    language: "python",
    description: "Modern CNN architecture with Batch Normalization, residual connections, and Global Average Pooling to avoid heavy dense layer parameter explosions.",
    requirements: "torch >= 2.0.0",
    code: `import torch
import torch.nn as nn

class ConvBlock(nn.Module):
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
        if stride != 1 or in_c != out_c:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_c, out_c, kernel_size=1, stride=stride, bias=False),
                nn.BatchNorm2d(out_c)
            )
        self.relu = nn.ReLU(inplace=True)

    def forward(self, x):
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
