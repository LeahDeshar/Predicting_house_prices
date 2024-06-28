# from fastapi import FastAPI, HTTPException
# from pydantic import BaseModel
# import joblib
# import pandas as pd

# # Load the saved model
# loaded_model = joblib.load('house_price_rf_model.pkl')

# # Initialize FastAPI application
# app = FastAPI()

# # Define request body model using Pydantic
# class HousePredictionRequest(BaseModel):
#     bedrooms: float
#     bathrooms: float
#     sqft_living: float
#     sqft_lot: float
#     floors: float
#     waterfront: int
#     view: int
#     condition: int
#     sqft_above: float
#     sqft_basement: float
#     yr_built: int
#     yr_renovated: int

# # Define endpoint for predicting house prices
# @app.post('/predict')
# def predict_house_price(data: HousePredictionRequest):
#     # Prepare input data as DataFrame
#     input_data = pd.DataFrame([data.dict()])

#     # Make prediction
#     predicted_prices = loaded_model.predict(input_data)

#     # Return prediction as JSON response
#     return {'predicted_price': predicted_prices[0]}

# # Run the FastAPI application using Uvicorn server
# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, host='127.0.0.1', port=8000)
# import numpy as np
# import pandas as pd
# import joblib
# from fastapi import FastAPI, HTTPException, Body
# from fastapi.middleware.cors import CORSMiddleware

# # Load the trained model
# model = joblib.load('improved_house_price_rf_model.pkl')

# app = FastAPI()

# # CORS middleware
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# @app.post('/predict-house-price/')
# async def predict_house_price(data: dict = Body(...)):
#     try:
#         # Convert JSON data to DataFrame
#         df = pd.DataFrame([data])

#         # Ensure the input data contains the correct columns
#         expected_columns = {
#             'bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors',
#             'waterfront', 'view', 'condition', 'sqft_above', 'sqft_basement',
#             'yr_built', 'yr_renovated'
#         }
#         if not expected_columns.issubset(df.columns):
#             raise HTTPException(
#                 status_code=400, 
#                 detail=f"Invalid input data. Required columns: {expected_columns}"
#             )

#         # Make prediction
#         predictions = model.predict(df[expected_columns])

#         # Prepare response
#         result = {
#             "input_data": data,
#             "predicted_price": float(predictions[0])
#         }
#         return result

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# if __name__ == '__main__':
#     import uvicorn
#     uvicorn.run(app, host='0.0.0.0', port=8000)
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
