import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WorkoutPlannerScreen from "@/screens/WorkoutPlanner";
import WorkoutSessionScreen from "@/screens/WorkoutSession";
import WorkoutHistoryScreen from "@/screens/WorkoutHistory";
import { SafeAreaView } from "react-native-safe-area-context"; // For better layout on notches
import { MainTabsParamList } from "./index.type";

const Tab = createMaterialTopTabNavigator<MainTabsParamList>();

const MainTabsNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      <Tab.Navigator
        initialRouteName="WorkoutPlanner"
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12, fontFamily: "Inter_700Bold" },
          tabBarStyle: { backgroundColor: "white" }, // Or your theme color
          tabBarIndicatorStyle: { backgroundColor: "blue" }, // Or your theme color
        }}
      >
        <Tab.Screen
          name="WorkoutPlanner"
          component={WorkoutPlannerScreen}
          options={{ tabBarLabel: "Planner" }}
        />
        <Tab.Screen
          name="WorkoutSession"
          component={WorkoutSessionScreen}
          options={{ tabBarLabel: "Session" }}
        />
        <Tab.Screen
          name="WorkoutHistory"
          component={WorkoutHistoryScreen}
          options={{ tabBarLabel: "History" }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MainTabsNavigator;
