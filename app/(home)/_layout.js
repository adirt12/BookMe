import { Stack } from "expo-router";
import index from "./index";
import users from "./users"
import login from "./login"
import HomePage from "./homePage";
import signUpForm from "./signUpForm"
import carMaint from "./carMaint"

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="users"/>
      <Stack.Screen name="login" />
      <Stack.Screen name="homePage" />
      <Stack.Screen name="signUpForm" />
      <Stack.Screen name="carMaint" />
    </Stack>
  );
}