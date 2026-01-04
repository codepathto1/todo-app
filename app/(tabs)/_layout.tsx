import React from 'react'
import { Tabs } from 'expo-router'

import {Ionicons} from "@expo/vector-icons"

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
        tabBarActiveTintColor:"#2bed57",
        tabBarInactiveTintColor:"#9784b3",
        tabBarStyle:{
            backgroundColor:"#737368",
            borderTopWidth:1,
            borderBottomWidth:0,
            height:100,
            paddingTop:10,
            paddingBottom:30
        },
        tabBarLabelStyle:{
            fontSize:12,
            fontWeight:600,
            color:"white",
            gap:2,
            textTransform:"capitalize"
        }
        
    }}>
        <Tabs.Screen name='index' options={{
            headerShown:false,
            title:"Todos",
            tabBarIcon:({size,color})=>(<Ionicons size={size} color={color} name='flash-off' />)
        }}/>

        <Tabs.Screen name='settings' options={{
            headerShown:false,
            title:"Settings",
            tabBarIcon:({size,color})=>(<Ionicons name='settings' size={size} color={color}/>),
            
        }}/>
    </Tabs>
  )
}

export default TabsLayout