import { Colors } from "@/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MaterialTopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function TabLayout() {
  const { top } = useSafeAreaInsets();
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.text_black,
        tabBarIndicatorStyle: {
          backgroundColor: Colors.primary,
          height: 3,
        },
        tabBarStyle: {
          backgroundColor: Colors.background_white,
          paddingTop: top,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <MaterialTopTabs.Screen name="home" options={{ title: "Home" }} />
      <MaterialTopTabs.Screen name="explore" options={{ title: "Explore" }} />
      <MaterialTopTabs.Screen name="history" options={{ title: "History" }} />
    </MaterialTopTabs>
  );
}
