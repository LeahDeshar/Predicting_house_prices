import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function TabLayout() {
  return (
    // add icon to header
    <Tabs
      screenOptions={{
        headerLeft: () => <DrawerToggleButton tintColor="#000" />,
        headerTitle: "House Price Predictor",
        headerStyle: { backgroundColor: "#3492eb" },
        headerStatusBarHeight: 55,
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#3492eb" : "grey"}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "chatbubble" : "chatbubble-ellipses-outline"}
              size={24}
              color={focused ? "#3492eb" : "grey"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
