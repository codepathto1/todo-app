import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Alert, TextInput, TouchableOpacity, View } from "react-native";

const TodoInput = () => {
  const [newTodo, setNewTodo] = useState("");
  const { colors } = useTheme();
  const addTodo = useMutation(api.todos.addTodo);
  const styles = createHomeStyles(colors);
  const handleAddTodo = async () => {
    try {
      if (newTodo.trim()) {
        await addTodo({ text: newTodo });
        setNewTodo("");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to add Todo");
      console.log("error in adding todo", error);
    }
  };
  return (
    <View style={styles.inputSection}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Add todo"
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={handleAddTodo}
          //   multiline
          placeholderTextColor={colors.textMuted}
        />
        <TouchableOpacity
          onPress={handleAddTodo}
          activeOpacity={0.8}
          disabled={!newTodo.trim()}
        >
          <LinearGradient
            colors={
              newTodo.trim() ? colors.gradients.primary : colors.gradients.muted
            }
            style={[
              styles.addButton,
              newTodo.trim() && styles.addButtonDisabled,
            ]}
          >
            <Ionicons name="add" size={24} color={"#fff"} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoInput;
