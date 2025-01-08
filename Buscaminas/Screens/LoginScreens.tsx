import { Button, Keyboard, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ref, set } from "firebase/database";
 
 
 
export default function LoginScreen() {
 
 
const [cedula, setcedula] = useState('')
const [nombre, setnombre] = useState('')
const [edad, setedad] = useState(0)
const [correo, setcorreo] = useState('')
 
//Guardar//
function login() {
    set(ref(db, 'usuarios/' + cedula), {
      name: nombre,
      age: edad,
      email: correo
    });
  }
 
function Limpiar(){
  setnombre('')
  setedad(0)
 
}
useEffect(() => {
  if(Number.isNaN(edad)){
    setedad(0)
  }
}, [])
 
 
  return (
    <View>
      <Text>Login</Text>  
<TextInput
placeholder='Ingrese cedula'
style={styles.input}
onChangeText={(texto)=>setcedula(texto)}/>                                                                        
<TextInput
 placeholder='Ingrese nombre'
style={styles.input}
onChangeText={(texto)=>setnombre(texto)}
value={nombre}/>
<TextInput
placeholder='Ingrese edad'
style={styles.input}
onChangeText={(texto)=>setedad(+texto)} keyboardType='number-pad'
value={edad.toString()}/>
<TextInput
placeholder='Ingrese correo'
style={styles.input}
onChangeText={(texto)=>setcorreo(texto)}/>
 
<Button title='Guardar' onPress={()=>login()}/>
    </View>
  )
}
 
const styles = StyleSheet.create({
input:{
height:55,
fontSize:30,
backgroundColor:'#12f0f8',
margin:10,
borderRadius:10,
 
 
}
 
})