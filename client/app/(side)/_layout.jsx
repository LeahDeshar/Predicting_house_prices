import "react-native-gesture-handler";
import * as React from "react";
import { Drawer } from "expo-router/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Home",
          title: "",
          drawerIcon: () => (
            <MaterialCommunityIcons name="home" size={24} color="#000000" />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="settings"
        options={{
          drawerLabel: "Settings",
          title: "",
        }}
      /> */}
    </Drawer>
  );
}
