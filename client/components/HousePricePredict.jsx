import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  Button,
  View,
  ScrollView,
  Alert,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
// const axiosInstance = axios.create({
//   baseURL: "http://192.168.1.6:8000",
//   timeout: 10000, // 10 seconds timeout
// });
export default function HousePricePredict() {
  const [form, setForm] = useState(
    formFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [predictedPrice, setPredictedPrice] = useState(null);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log(form);
      const formData = {
        bedrooms: parseInt(form.bedrooms),
        bathrooms: parseFloat(form.bathrooms),
        sqft_living: parseInt(form.sqft_living),
        sqft_lot: parseInt(form.sqft_lot),
        floors: parseFloat(form.floors),
        waterfront: parseInt(form.waterfront),
        view: parseInt(form.view),
        condition: parseInt(form.condition),
        sqft_above: parseInt(form.sqft_above),
        sqft_basement: parseInt(form.sqft_basement),
        yr_built: parseInt(form.yr_built),
        yr_renovated: parseInt(form.yr_renovated),
      };
      const response = await axios.post(
        "http://192.168.1.6:8000/predict-house-price/",
        formData
      );
      setPredictedPrice(response.data.predicted_price);
    } catch (error) {
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
      console.error(error);
      Alert.alert("Error", `There was an error making the prediction ${error}`);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={{
            width: 200,
            height: 200,
            resizeMode: "center",
            alignSelf: "center",
            position: "absolute",
            top: 0,
          }}
          source={require("../assets/home.png")}
        />
        <Text style={styles.title}>
          Enter the Value: Your Gateway to Predicting House Prices!
        </Text>
        <View
          style={{
            top: 135,
          }}
        >
          {formFields.map((field, index) => (
            <View key={index}>
              <TextInput
                key={field.name}
                style={styles.input}
                placeholder={field.placeholder}
                placeholderTextColor={"grey"}
                value={form[field.name]}
                onChangeText={(value) => handleChange(field.name, value)}
                keyboardType="numeric"
              />
            </View>
          ))}
          <TouchableOpacity
            style={{
              backgroundColor: "#4698e4",
              padding: 10,
              borderRadius: 25,
              alignItems: "center",
              top: 10,
            }}
            onPress={handleSubmit}
          >
            <Text>Predict Price</Text>
          </TouchableOpacity>
          {/* <Button title="Predict Price" onPress={handleSubmit} /> */}
          {predictedPrice !== null && (
            <Text style={styles.result}>
              Predicted Price: ${predictedPrice.toFixed(2)}
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingBottom: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    paddingTop: 18,
    paddingBottom: 10,
    color: "#063663",
    top: 150,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderRadius: 25,
    borderColor: "#80808052",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    paddingVertical: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
