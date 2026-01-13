import { createSettingsStyles } from "@/assets/styles/setting.style";
import DangerZone from "@/components/DangerZone";
import Preferences from "@/components/Preferences";
import TodoStats from "@/components/TodoStats";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Settings = () => {
  const [autoSync, setAutoSync] = useState(true);
  const [notification, setNotifications] = useState(true);

  const { colors, isDarkMode, toggleTheme } = useTheme();
  const settingStyles = createSettingsStyles(colors);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={settingStyles.container}
    >
      <SafeAreaView style={settingStyles.safeArea}>
        <View style={settingStyles.header}>
          <View style={settingStyles.titleContainer}>
            <LinearGradient
              colors={colors.gradients.primary}
              style={settingStyles.iconContainer}
            >
              <Ionicons name="settings" size={24} color="white" />
            </LinearGradient>
            <Text style={settingStyles.title}>Settings</Text>
          </View>
        </View>
        <ScrollView
          style={settingStyles.scrollView}
          contentContainerStyle={settingStyles.content}
          showsHorizontalScrollIndicator
          showsVerticalScrollIndicator
        >
          <TodoStats />
          <Preferences />
          <DangerZone/>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Settings;
