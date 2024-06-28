# model.py
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
import joblib

# Create a synthetic dataset
data = {
    'bedrooms': np.random.randint(1, 6, size=100),
    'bathrooms': np.random.randint(1, 4, size=100),
    'sqft': np.random.randint(500, 3500, size=100),
    'price': np.random.randint(100000, 500000, size=100)
}

df = pd.DataFrame(data)

# Split the dataset into features and target variable
X = df[['bedrooms', 'bathrooms', 'sqft']]
y = df['price']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = RandomForestRegressor()
model.fit(X_train, y_train)

# Save the model
joblib.dump(model, 'house_price_rf_model.pkl')
