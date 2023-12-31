import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="users"/>
      <Stack.Screen name="login" />
      <Stack.Screen name="homePage" />
      <Stack.Screen name="signUpForm" />
      <Stack.Screen name="carMaint" />
      <Stack.Screen name="experimentsEmc"/>
      <Stack.Screen name="bookingPage"/>
    </Stack>
  );
}