import { Stack } from "expo-router";

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" 
      options={{ headerShown: false }} />

      <Stack.Screen name="(auth)/Signup/index" 
      options={{ headerShown: false }} />

      <Stack.Screen name="(panel)/Home/index" 
      options={{ headerShown: false }} />
    </Stack>
  );
}