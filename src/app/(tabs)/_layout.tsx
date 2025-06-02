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
          fontFamily: "Inter_600SemiBold",
          fontSize: 14,
          textTransform: "none",
        },
      }}
    >
      <MaterialTopTabs.Screen
        name="workout-planner"
        options={{ title: "Workout" }}
      />
      <MaterialTopTabs.Screen
        name="workout-session"
        options={{ title: "Session" }}
      />
      <MaterialTopTabs.Screen
        name="workout-history"
        options={{ title: "History" }}
      />
    </MaterialTopTabs>
  );
}
