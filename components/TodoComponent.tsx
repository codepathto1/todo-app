import { createHomeStyles } from "@/assets/styles/home.style";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import useTheme from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import EmptyState from "./EmptyStateComponent";

type Todo = Doc<"todos">;

const TodoComponent = () => {
  const todos = useQuery(api.todos.getTodos);
  const { colors } = useTheme();
  const styles = createHomeStyles(colors);
  const toggleComplete = useMutation(api.todos.toggleComplete);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const editTodo = useMutation(api.todos.updateTodo);

  const [editingId, setEditingId] = useState<null | Id<"todos">>(null);
  const [editedText, setEditedText] = useState("");
  // console.log(todos);

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleComplete({ id });
    } catch (error) {
      console.log("Error completing Todo", error);
      Alert.alert;
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditedText(todo.text);
    setEditingId(todo._id);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };
  const handleSaveEdit = async () => {
    if (editingId)
      try {
        await editTodo({ id: editingId, text: editedText.trim() });
        setEditedText("");
        setEditingId(null);
      } catch (error) {
        console.log("Error saving edited todo", error);
        Alert.alert("Error Saving Todo", "Something went wrong");
      }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert("Delete Todo", "Are you sure you want to delete todo", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => deleteTodo({ id }),
      },
    ]);
  };

  const renderTodo = ({ item }: { item: Todo }) => {
    const isEditing = editingId === item._id;
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
          {isEditing ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editedText}
                onChangeText={setEditedText}
                autoFocus
                multiline
                placeholder="Edit your todo"
                placeholderTextColor={colors.textMuted}
              />
              <View style={styles.editContainer}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={styles.editButton}
                  >
                    <Ionicons name="checkmark" size={14} color={"#fff"} />
                    <Text style={styles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleCancelEdit}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    style={styles.editButton}
                    colors={colors.gradients.muted}
                  >
                    <Ionicons name="close" size={14} color={"#fff"} />
                    <Text style={styles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.todoTextContainer}>
              <Text
                style={[
                  item.isCompleted ? styles.todoTextCompleted : styles.todoText,
                ]}
              >
                {item.text}
              </Text>
              <View style={styles.todoActions}>
                <TouchableOpacity
                  onPress={() => {
                    handleEditTodo(item);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.warning}
                    style={styles.actionButton}
                  >
                    <Ionicons name="pencil" size={14} color={"#fff"} />
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDeleteTodo(item._id);
                  }}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={styles.actionButton}
                  >
                    <Ionicons name="trash" size={14} color={"#fff"} />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          )}
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
      // showsVerticalScrollIndicator={true}
    />
  );
};

export default TodoComponent;
