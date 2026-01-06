import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { useMutation, useQuery } from "convex/react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { toggleTheme } = useTheme();
  const todos = useQuery(api.todos.getTodos);

  console.log(todos);

  const addTodo = useMutation(api.todos.addTodo);
  const clearAll = useMutation(api.todos.deleteAllTodos);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={styles.button}>Toggle Theme</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => addTodo({ text: "Add todo" })}>
        <Text style={styles.button}>Add Todo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => clearAll()}>
        <Text style={styles.button}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    color: "white",
  },
  button: {
    paddingTop: 20,
    fontSize: 18,
    fontWeight: "300",
    fontStyle: "italic",
    color: "white",
  },
});
