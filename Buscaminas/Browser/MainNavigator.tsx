import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BuscaminasScrenns from '../Screens/BuscaminasScrenns'
import LoginScreens from '../Screens/LoginScreens'
import RegistroScreens from '../Screens/RegistroScreens'
import ScoreScreen from '../Screens/ScoreScreen'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function MainNavigator() {
  return (
    <Tab.Navigator>
    <Tab.Screen name="Pagina1" component={BuscaminasScrenns}/>
    <Tab.Screen name="Pagina2" component={LoginScreens}/>
    <Tab.Screen name="Pagina3" component={RegistroScreens}/>
    <Tab.Screen name="Pagina4" component={ScoreScreen}/>
</Tab.Navigator> 
  )
}

const styles = StyleSheet.create({})