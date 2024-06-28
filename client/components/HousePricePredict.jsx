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
  { name: "bedrooms", placeholder: "Number of Bedrooms" },
  { name: "bathrooms", placeholder: "Number of Bathrooms" },
  { name: "sqft_living", placeholder: "Square Foot Living Area" },
  { name: "sqft_lot", placeholder: "Square Foot Lot Area" },
  { name: "floors", placeholder: "Number of Floors" },
  { name: "waterfront", placeholder: "Waterfront (0 or 1)" },
  { name: "view", placeholder: "View Rating" },
  { name: "condition", placeholder: "Condition Rating" },
  { name: "sqft_above", placeholder: "Square Foot Above Ground" },
  { name: "sqft_basement", placeholder: "Square Foot Basement" },
  { name: "yr_built", placeholder: "Year Built" },
  { name: "yr_renovated", placeholder: "Year Renovated" },
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
      console.log(form);
      const response = await axios.post(
        "http://127.0.0.1:8000/predict-house-price/",
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
      {formFields.map((field, index) => (
        <View key={index}>
          <Text>{field.placeholder}</Text>
          <TextInput
            key={field.name}
            style={styles.input}
            value={form[field.name]}
            onChangeText={(value) => handleChange(field.name, value)}
            keyboardType="numeric"
          />
        </View>
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
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
