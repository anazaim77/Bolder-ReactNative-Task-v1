import { Stack } from "expo-router";

export default function DeveloperLayout() {
  return (
    <Stack>
      <Stack.Screen name="developer-menu" options={{ headerShown: false }} />
      <Stack.Screen name="network-logger" options={{ headerShown: false }} />
    </Stack>
  );
}
