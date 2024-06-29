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

export default function Sentiment() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.7:8000/predict-sentiment/",
        { text }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "There was an error making the prediction");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Sentiment Analysis</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={text}
        onChangeText={setText}
      />
      <Button title="Analyze Sentiment" onPress={handleSubmit} />
      {result && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Sentiment: {result.label}</Text>
          <Text style={styles.resultText}>
            Confidence: {(result.score * 100).toFixed(2)}%
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

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
    marginBottom: 20,
    paddingLeft: 8,
  },
  resultContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    marginVertical: 5,
  },
});
