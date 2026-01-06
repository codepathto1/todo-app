import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "@/hooks/useTheme";

export default function Index() {
const {toggleTheme}=useTheme()
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text style={styles.button}>Toggle Theme</Text>
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
