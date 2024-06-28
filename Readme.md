# House Price Prediction App

This project is an application for predicting house prices based on given features. It consists of a frontend built with Expo React Native and a backend API developed with FastAPI, using a RandomForest algorithm for predictions.

## Features

- **Frontend (Expo React Native):**

  - User-friendly interface for inputting house features.
  - Sends HTTP requests to the backend API for predictions.
  - Displays predicted house prices to the user.

- **Backend (FastAPI):**

  - Receives JSON input containing house features.
  - Validates input data and preprocesses it for prediction.
  - Uses a pre-trained RandomForest model to predict house prices.
  - Returns predicted prices as JSON responses.

- **RandomForest Algorithm:**
  - Trained model for predicting house prices based on features like bedrooms, bathrooms, and square footage.
  - Utilizes scikit-learn library for training and prediction.

## Technologies Used

- **Frontend:**

  - Expo React Native
  - React Navigation (for navigation)
  - Axios (for HTTP requests)

- **Backend:**
  - FastAPI (Python framework)
  - scikit-learn (for machine learning model)
  - joblib (for model serialization)
  - pandas (for data manipulation)
