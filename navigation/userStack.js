import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LearnPage } from "../pages/Learn";
import { ProfilePage } from "../pages/Profile";
import { HomeTabs } from "./mainTabs";
import ProductsPage from "../pages/Products";
import RoutineScreen from "../pages/RoutineScreen";
import { RoutineTimer } from "../pages/RoutineTimer";
import { BlogScreen } from "../pages/BlogScreen";
import { StreakScreen } from "../pages/Streak";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: false }}
          component={HomeTabs}
        />
        <Stack.Screen
          name="Learn"
          options={{ headerShown: false }}
          component={LearnPage}
        />
        <Stack.Screen
          name="Profile"
          options={{ headerShown: false }}
          component={ProfilePage}
        />
        <Stack.Screen
          name="Products"
          // options={{ headerShown: false }}
          component={ProductsPage}
        />
        <Stack.Screen
          name="Routine"
          // options={{ headerShown: false }}
          component={RoutineScreen}
        />
        <Stack.Screen
          name="Timer"
          // options={{ headerShown: false }}
          component={RoutineTimer}
        />
        <Stack.Screen
          name="Blog"
          // options={{ headerShown: false }}
          component={BlogScreen}
        />
        <Stack.Screen
          name="Streak"
          // options={{ headerShown: false }}
          component={StreakScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
