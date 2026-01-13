import { createHomeStyles } from "@/assets/styles/home.style";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoComponent from "@/components/TodoComponent";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {}

export default function Index() {
  const { toggleTheme, colors } = useTheme();
  const todos = useQuery(api.todos.getTodos);
  const isLoading = todos === undefined;

  // console.log(todos);
  const homeStyles = createHomeStyles(colors);

  const addTodo = useMutation(api.todos.addTodo);
  const clearAll = useMutation(api.todos.deleteAllTodos);
  if (isLoading) return <LoadingSpinner />;
  return (
    <SafeAreaView style={homeStyles.container}>
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
        <Header />

        <TodoInput />

        <TodoComponent />
    </LinearGradient>
      </SafeAreaView>
  );
}
