
import numpy as np
import pandas as pd
import joblib
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware

# Load the trained model
model = joblib.load('improved_house_price_rf_model.pkl')

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# test endpoint
@app.get('/test/')
def test():
    return {'message': 'This is the homepage of the API'}

@app.post('/predict-house-price/')
async def predict_house_price(data: dict = Body(...)):
    try:
        # Convert JSON data to DataFrame
        df = pd.DataFrame([data])

        # Ensure the input data contains the correct columns
        expected_columns = [
            'bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors',
            'waterfront', 'view', 'condition', 'sqft_above', 'sqft_basement',
            'yr_built', 'yr_renovated'
        ]
        if not set(expected_columns).issubset(df.columns):
            raise HTTPException(
                status_code=400, 
                detail=f"Invalid input data. Required columns: {expected_columns}"
            )

        # Make prediction
        predictions = model.predict(df[expected_columns])

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
