import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Sentiment from "../../../../components/Sentiment";
import NLTKSentiment from "../../../../components/NLTKSentiment";

const ChatScreen = () => {
  return (
    <View>
      <Text>ChatScreen</Text>
      {/* <Sentiment /> */}
      <NLTKSentiment />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
