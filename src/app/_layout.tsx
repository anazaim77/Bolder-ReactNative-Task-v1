import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/store";
import FlashMessage from "react-native-flash-message";
import { FABDeveloperMenu } from "@/components";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(developer)" options={{ headerShown: false }} />
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="not-found" options={{ title: "Oh no!" }} />
        </Stack>
        <FABDeveloperMenu />
        <FlashMessage position="bottom" floating />
      </PersistGate>
    </Provider>
  );
}
