import { createHomeStyles } from "@/assets/styles/home.style";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {}

export default function Index() {
  const { toggleTheme, colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);

  // console.log(todos);
  const homeStyles = createHomeStyles(colors);

  const addTodo = useMutation(api.todos.addTodo);
  const clearAll = useMutation(api.todos.deleteAllTodos);
  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        <Header />
        <TouchableOpacity onPress={toggleTheme}>
          <Text style={{ color: colors.text }}>Toggle Theme</Text>
        </TouchableOpacity>
        <TodoInput/>
      </SafeAreaView>
    </LinearGradient>
  );
}
