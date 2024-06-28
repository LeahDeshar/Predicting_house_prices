import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
const formFields = [
  "bedrooms",
  "bathrooms",
  "sqft_living",
  "sqft_lot",
  "floors",
  "waterfront",
  "view",
  "condition",
  "sqft_above",
  "sqft_basement",
  "yr_built",
  "yr_renovated",
];

const HousePricePredict = () => {
  const [form, setForm] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field]: "" }), {})
  );
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/predict-house-price/",
        form
      );
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error making the prediction");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>House Price Predictor</Text>
      {formFields.map((field) => (
        <TextInput
          key={field}
          style={styles.input}
          placeholder={field.replace("_", " ")}
          value={form[field]}
          onChangeText={(value) => handleChange(field, value)}
          keyboardType="numeric"
        />
      ))}
      <Button title="Predict Price" onPress={handleSubmit} />
      {predictedPrice !== null && (
        <Text style={styles.result}>
          Predicted Price: ${predictedPrice.toFixed(2)}
        </Text>
      )}
    </ScrollView>
  );
};

export default HousePricePredict;
