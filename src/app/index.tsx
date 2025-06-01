import {
  Inter_300Light,
  Inter_500Medium,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Redirect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { View } from "react-native";

const Index = () => {
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

  if (!fontsLoaded) return <View />;
  return <Redirect href="/(tabs)/home" />;
};

export default Index;
