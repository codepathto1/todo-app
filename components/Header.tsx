import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Text, View } from "react-native";

const Header = () => {
  const allTodos = useQuery(api.todos.getTodos);
  const totalTodos = allTodos ? allTodos.length : 0;
  const completedTodos = allTodos
    ? allTodos.filter((todo) => todo.isCompleted).length
    : 0;
  const progressPercent = (completedTodos / totalTodos) * 100;
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);

  return (
    <View style={styles.header}>
      <View style={styles.titleContainer}>
        <LinearGradient
          colors={colors.gradients.primary}
          style={styles.iconContainer}
        >
          <Ionicons name="flash-off-outline" size={25} color={"#fff"} />
        </LinearGradient>
        <View>
          <Text style={styles.title}>Today&apos;s Tasks</Text>
          <Text style={styles.subtitle}>
            {completedTodos} / {totalTodos} Completed
          </Text>
        </View>
      </View>
      {totalTodos > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={colors.gradients.success}
                style={[styles.progressFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.round(progressPercent)}%
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Header;
