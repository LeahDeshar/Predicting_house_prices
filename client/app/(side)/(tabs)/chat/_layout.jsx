import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Sentiment from "../../../../components/Sentiment";

const ChatScreen = () => {
  return (
    <View>
      <Text>ChatScreen</Text>
      <Sentiment />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
