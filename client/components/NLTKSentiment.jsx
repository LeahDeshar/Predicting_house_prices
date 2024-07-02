import React, { useState } from "react";
import { StyleSheet, Text, TextInput, Button, View } from "react-native";
import axios from "axios";

const NLTKSentiment = () => {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);

  const analyzeComment = async () => {
    try {
      const response = await axios.post(
        "http://<your-server-ip>:8000/analyze_comment/",
        {
          text: comment,
        }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter your comment"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Analyze" onPress={analyzeComment} />
      {result && (
        <View style={styles.resultContainer}>
          <Text>Sentiment: {result.sentiment}</Text>
          <Text>Emoji: {result.emoji}</Text>
        </View>
      )}
    </View>
  );
};

export default NLTKSentiment;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  resultContainer: {
    marginTop: 20,
  },
});
