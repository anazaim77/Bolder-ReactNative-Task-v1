import { Colors } from "@/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MaterialTopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function TabLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: Colors.white,
          tabBarInactiveTintColor: Colors.secondary,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.primary,
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: Colors.primary,
          },
          tabBarLabelStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <MaterialTopTabs.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <MaterialTopTabs.Screen
          name="explore"
          options={{
            title: "Explore",
          }}
        />
        <MaterialTopTabs.Screen
          name="history"
          options={{
            title: "History",
          }}
        />
      </MaterialTopTabs>
    </SafeAreaView>
  );
}
