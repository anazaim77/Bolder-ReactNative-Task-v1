import {
  InitialState,
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LoginScreen from "@/screens/Login"; // Ensure this path is correct
import MainTabsNavigator from "./MainTabsNavigator"; // To be created
// import { View, Text } from 'react-native'; // No longer needed for placeholder

// Define your stack param list
export type RootStackParamList = {
  Login: undefined;
  MainTabs: undefined; // Or specific params if your MainTabs need them
  // Add other screens here
};

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  initialState?: InitialState;
  onStateChange?: (state: any) => void;
}

const AppNavigator = React.forwardRef<
  NavigationContainerRef<any>,
  AppNavigatorProps
>(({ initialState, onStateChange }, ref) => {
  const isLoggedIn = true;

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={onStateChange}
      ref={ref}
    >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* {isLoggedIn ? ( */}
        <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
        {/* ) : ( */}
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
