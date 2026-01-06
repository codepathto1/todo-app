import { Tabs } from "expo-router";
import React from "react";
import useTheme from "@/hooks/useTheme";


import { Ionicons } from "@expo/vector-icons";

const TabsLayout = () => {
  const {colors}=useTheme()
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:colors.primary,
        tabBarInactiveTintColor:colors.textMuted,
        tabBarStyle: {
          backgroundColor:colors.surface,
          borderTopColor:colors.border,
          borderTopWidth: 1,
          borderBottomWidth: 0,
          height: 100,
          paddingTop: 10,
          paddingBottom: 30,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 600,
          color: "white",
          gap: 2,
          textTransform: "capitalize",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Todos",
          tabBarIcon: ({ size, color }) => (
            <Ionicons size={25} color={color} name="flash-off" />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: "Settings",
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
