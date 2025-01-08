import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'

 //FIREBASE
 import { getDatabase, ref, set } from "firebase/database";
 import { db } from '../config/Config';

export default function RegistroScreen() {

    const [cedula, setcedula] = useState('')
    const [nombre, setnombre] = useState('')
    const [edad, setedad] = useState(0)
    const [correo, setcorreo] = useState('')

   
/// GUARDAR ///
    function guardar() {
        
        set(ref(db, 'usuarios/' + cedula), {
          name: nombre,
          age: edad,
          email: correo
        });
        limpiar()
      }

      function limpiar(){
        setnombre('')
        setedad(0)
      }

      useEffect(() => {
       if( Number.isNaN(edad)){
            setedad(0)
       }
      }, [edad])
      

    return (
        <View>
            <Text>Registro</Text>
            <TextInput
                placeholder='Ingresar cedula'
                style={styles.input}
                onChangeText={(texto) => setcedula(texto)} />

            <TextInput
                placeholder='Ingrese Nombre'
                style={styles.input}
                onChangeText={(texto) => setnombre(texto)}
                    value={nombre}
                
            />


            <TextInput
                placeholder='Ingrese Edad'
                style={styles.input}
                onChangeText={(texto) => setedad(+texto)}
                value={edad.toString()}
            />


            <TextInput
                placeholder='Ingrese Correo'
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}
            />
            <Button title='Guardar' onPress={()=>guardar()}/>


        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 50,
        fontSize: 30,
        backgroundColor: '#99ac95cf',
        margin: 10,
        borderRadius: 10,
        paddingHorizontal: 20
    }
})