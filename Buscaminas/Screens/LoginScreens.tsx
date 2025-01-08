import { Button, Keyboard, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react'
import { ref, set } from "firebase/database";
import { db } from '../config/Config';
<<<<<<< HEAD
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../Browser/BottomNavigator';

=======
 
 
>>>>>>> 8faeaad3bae6b7c8b9e992543c78edc9874dd9f2
 
export default function LoginScreen() {
 
  const navigation = useNavigation<NavigationProp<RootStackParams>>();


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
 
const handleLogin = async () => {
};
 
  return (
    <View>
      <Text>Login</Text>                                                                          
      <Text style={styles.title}>Bienvenido</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo Electrónico"
              placeholderTextColor="#aaa"
             // onChangeText={setEmail}
             // value={email}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                //onChangeText={setPassword}
                //value={password}
                //secureTextEntry={hiddenPassword}
                autoCapitalize="none"
              />

            </View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Acceder</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('RegistroScreen')}>
              <Text style={styles.registerText}>¿Eres nuevo? Regístrate aquí</Text>
            </TouchableOpacity>
  
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
 
},
title:{

},
passwordContainer:{

},
button:{

},
buttonText:{
},
registerText:{}
})