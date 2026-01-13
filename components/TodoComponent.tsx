import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Alert, FlatList, Text, TouchableOpacity, View } from "react-native";
import EmptyState from "./EmptyStateComponent";

type Todo = Doc<"todos">;

const TodoComponent = () => {
  const todos = useQuery(api.todos.getTodos);
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const toggleComplete = useMutation(api.todos.toggleComplete);
  // console.log(todos);

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleComplete({ id });
    } catch (error) {
      console.log("Error completing Todo", error);
      Alert.alert;
    }
  };

  const renderTodo = ({ item }: { item: Todo }) => {
    return (
      <View style={styles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.todoItem}
        >
          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => {
              handleToggleTodo(item._id);
            }}
            activeOpacity={0.7}
          >
            <LinearGradient
              style={[
                styles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
              colors={
                item.isCompleted
                  ? colors.gradients.success
                  : colors.gradients.muted
              }
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={18} color={"#fff"} />
              )}
            </LinearGradient>
          </TouchableOpacity>
          <View style={styles.todoTextContainer}>
            <Text
              style={[
                item.isCompleted ? styles.todoTextCompleted : styles.todoText,
              ]}
            >
              {item.text}
            </Text>
            <View style={styles.todoActions}>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={styles.actionButton}
                >
                  <Ionicons name="pencil" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={styles.actionButton}
                >
                  <Ionicons name="trash" size={14} color={"#fff"} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <FlatList
      data={todos}
      renderItem={renderTodo}
      keyExtractor={(item) => item._id}
      style={styles.todoListContent}
      ListEmptyComponent={<EmptyState />}
      showsVerticalScrollIndicator={true}
    />
  );
};

export default TodoComponent;
