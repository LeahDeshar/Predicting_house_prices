import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useTheme } from "../../../../constants/ThemeProvider";
import HousePricePredict from "../../../../components/HousePricePredict";
const HomeScreen = () => {
  const { colors, setScheme, dark } = useTheme();
  const navigator = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <HousePricePredict />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default HomeScreen;
