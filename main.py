# main.py
import uvicorn
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np

# Load the trained model
model = joblib.load('house_price_rf_model.pkl')

app = FastAPI()

# Define a request model
class HouseData(BaseModel):
    bedrooms: int
    bathrooms: int
    sqft: int

# Define a response model
class PricePrediction(BaseModel):
    predicted_price: float

@app.post("/predict", response_model=PricePrediction)
def predict(house_data: HouseData):
    try:
        data = np.array([house_data.bedrooms, house_data.bathrooms, house_data.sqft]).reshape(1, -1)
        prediction = model.predict(data)[0]
        return PricePrediction(predicted_price=prediction)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


