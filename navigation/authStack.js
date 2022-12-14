import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { LoginPage } from "../pages/Login";
import { RegisterPage } from "../pages/Register";
import { ForgotPassword } from "../pages/ForgotPassword";
import { WelcomeSlider } from "../components/WelcomeSlider";

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen
          name="Welcome"
          options={{ headerShown: false }}
          component={WelcomeSlider}
        />
        <Stack.Screen
          name="Sign Up"
          options={{ headerShown: false }}
          component={RegisterPage}
        />
        <Stack.Screen
          name="Sign In"
          options={{ headerShown: false }}
          component={LoginPage}
        />
        <Stack.Screen
          name="Forgot Password"
          options={{ headerShown: false }}
          component={ForgotPassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
