import numpy as np
import pandas as pd
import joblib
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

# Load the trained model
model = joblib.load('house_price_rf_model.pkl')

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/predict-house-price/')
async def predict_house_price(data: dict = Body(...)):
    try:
        # Convert JSON data to DataFrame
        df = pd.DataFrame([data])

        # Ensure the input data contains the correct columns
        expected_columns = {'bedrooms', 'bathrooms', 'sqft'}
        if not expected_columns.issubset(df.columns):
            raise HTTPException(status_code=400, detail="Invalid input data. Required columns: bedrooms, bathrooms, sqft")

        # Extract features for prediction
        features = df[['bedrooms', 'bathrooms', 'sqft']].values
        predictions = model.predict(features)

        # Prepare response
        result = {
            "input_data": data,
            "predicted_price": float(predictions[0])
        }
        return result

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)
