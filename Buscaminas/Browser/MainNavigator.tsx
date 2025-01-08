import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BuscaminasScrenns from '../Screens/BuscaminasScrenns'
import LoginScreens from '../Screens/LoginScreens'
import RegistroScreens from '../Screens/RegistroScreens'
import ScoreScreen from '../Screens/ScoreScreen'
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const top= createMaterialTopTabNavigator();

function MyTops(){
return(
<top.Navigator>
<top.Screen name="Welcome" component={BuscaminasScrenns}/>
<top.Screen name="Guardar" component={LoginScreens}/>
<top.Screen name="leer" component={RegistroScreens}/>
<top.Screen name="editar" component={ScoreScreen}/>
</top.Navigator>
);

}

export default function MainNavigator() {
  return (
    <MyTops/>
  )
}

const styles = StyleSheet.create({})