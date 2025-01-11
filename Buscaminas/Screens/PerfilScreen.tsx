import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'



export default function PerfilScreen() {


const [cedula, setcedula] = useState('')
    const [nombre, setnombre] = useState('')
    const [correo, setcorreo] = useState('')
    const [password, setPassword] = useState('')


    return (
      <View style={styles.container}>
        
        <View style={styles.result}>
          <Text>Información del registro:</Text>
          <Text>cedula: {cedula}</Text>
          <Text>Nombre: {nombre}</Text>
          <Text>correo: {correo}</Text>
        <Text> contrasena:{password}</Text>

        <TouchableOpacity style={styles.button} >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    input: {
      height: 50,
      fontSize: 18,
      backgroundColor: '#ffffff',
      marginVertical: 10,
      borderRadius: 10,
      paddingHorizontal: 20,
      width: '100%',
      borderWidth: 1,
      borderColor: '#ccc',
    },
    button: {
      marginTop: 20,
      backgroundColor: '#4CAF50',
      borderRadius: 10,
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    result: {
      marginTop: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      backgroundColor: '#f9f9f9',
    },
  });
  
  
  
  

function getAuth() {
    throw new Error('Function not implemented.');
}

function updateProfile(currentUser: any, arg1: { displayName: string; photoURL: string; }) {
    throw new Error('Function not implemented.');
}
  