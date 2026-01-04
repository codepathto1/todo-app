import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Settings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
    </View>
  )
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

}})


export default Settings