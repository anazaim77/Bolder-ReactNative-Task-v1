import { TextApp } from "@/components";
import {
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Redirect, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";
import { startNetworkLogging } from "react-native-network-logger";

const Index = () => {
  const redirectPath = "/onboarding";
  // const redirectPath = "/(tabs)/workout-planner";
  const [fontsLoaded] = useFonts({
    Inter_700Bold,
    Inter_500Medium,
    Inter_300Light,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(function initializeApp() {
    startNetworkLogging();
  }, []);

  if (!fontsLoaded) return <View></View>;
  return <Redirect href={redirectPath} />;
};

export default Index;
