import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const about = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>about</Text>
    </View>
  )
}

export default about

const styles=StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"gray"
  },
  text:{
    fontSize:24,
    fontWeight:"bold",
    fontStyle:"italic",
    color:"white"    

  }
})
