# main.py
import io
import pickle
import numpy as np
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# Load the trained model
with open('house_price_rf_model.pkl', 'rb') as f:
    model = pickle.load(f)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/predict-house-price/')
async def predict_house_price(file: UploadFile = File(...)):
    contents = await file.read()
    df = pd.read_json(io.BytesIO(contents))

    # Ensure the input data contains the correct columns
    expected_columns = {'bedrooms', 'bathrooms', 'sqft'}
    if not expected_columns.issubset(df.columns):
        return {"error": "Invalid input data. Required columns: bedrooms, bathrooms, sqft"}

    # Extract features for prediction
    features = df[['bedrooms', 'bathrooms', 'sqft']].values
    predictions = model.predict(features)

    # Add predictions to the DataFrame and convert to JSON
    df['predicted_price'] = predictions
    return df.to_dict(orient='records')

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
