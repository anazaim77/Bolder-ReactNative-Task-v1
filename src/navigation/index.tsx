import {
  InitialState,
  NavigationContainer,
  NavigationContainerRef,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import LoginScreen from "@/screens/Login";
import MainTabsNavigator from "./MainTabsNavigator";
import { RootStackParamList } from "./index.type";

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  initialState?: InitialState;
  onStateChange?: (state: any) => void;
}

const AppNavigator = React.forwardRef<
  NavigationContainerRef<any>,
  AppNavigatorProps
>(({ initialState, onStateChange }, ref) => {
  const isLoggedIn = false;

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={onStateChange}
      ref={ref}
    >
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Login"
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="MainTabs" component={MainTabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default AppNavigator;
