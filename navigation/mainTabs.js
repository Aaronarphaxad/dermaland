import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "../pages/HomePage";
import { LearnPage } from "../pages/Learn";
import { ProfilePage } from "../pages/Profile";

const Tab = createBottomTabNavigator();

export function HomeTabs() {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: "#EADDD3",
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={HomePage}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "home" : "home-outline"}
                color={focused ? "#59b2ab" : "#fff"}
                size={35}
              />
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Learn"
          component={LearnPage}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "book" : "book-outline"}
                color={focused ? "#59b2ab" : "#fff"}
                size={30}
              />
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfilePage}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <MaterialCommunityIcons
                name={focused ? "account" : "account-outline"}
                color={focused ? "#59b2ab" : "#fff"}
                size={35}
              />
            ),
            tabBarShowLabel: false,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </>
  );
}
