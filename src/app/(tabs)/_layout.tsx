import { Container, SafeAreaApp, TextApp } from "@/components";
import { Colors } from "@/constants";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";

const MaterialTopTabs = withLayoutContext(
  createMaterialTopTabNavigator().Navigator
);

export default function TabLayout() {
  return (
    <SafeAreaApp flex={1} backgroundColor={Colors.primary}>
      <Container alignItems="center" justifyContent="center" padding={24}>
        <TextApp size={"2xl"} variant="bold" marginTop={34} color="text_white">
          Workout Logger
        </TextApp>
        <TextApp size={"lg"} variant="medium" marginTop={16} color="text_white">
          Redux Offline Demo
        </TextApp>
      </Container>
      <MaterialTopTabs
        screenOptions={{
          tabBarActiveTintColor: Colors.primary_dark,
          tabBarInactiveTintColor: Colors.text_black,
          tabBarIndicatorStyle: {
            backgroundColor: Colors.primary_dark,
            height: 3,
          },
          tabBarStyle: {
            backgroundColor: Colors.background_white,
            // paddingTop: top,
          },
          tabBarLabelStyle: {
            fontFamily: "Inter_700Bold",
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
    </SafeAreaApp>
  );
}
