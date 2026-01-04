import { Link, Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
   <View style={styles.container}>
      <Text style={styles.text}>Home</Text>
   </View>
  );
}


const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"black"
  },
  text:{
    fontSize:24,
    fontWeight:"bold",
    fontStyle:"normal",
    color:"white"    

  },
  button:{
    paddingTop:20,
    fontSize:18,
    fontWeight:"300",
    fontStyle:"italic",
    color:"white"  
  }
  
  
})
