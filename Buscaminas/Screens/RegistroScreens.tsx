import { Button, StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

//FIREBASE
import { getDatabase, ref, set } from "firebase/database";
import { db } from '../config/Config';

export default function RegistroScreen() {
    const [cedula, setcedula] = useState('')
    const [nombre, setnombre] = useState('')
    const [correo, setcorreo] = useState('')
    const [password, setPassword] = useState('')

    // GUARDAR
    function guardar() {
        set(ref(db, 'usuarios/' + cedula), {
            name: nombre,
            email: correo,
            password: password 
        });
        limpiar()
    }

    function limpiar() {
        setcedula('')
        setnombre('')
        setcorreo('')
        setPassword('') 
    }

    

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                placeholder='Ingresar cédula'
                style={styles.input}
                onChangeText={(texto) => setcedula(texto)}
                value={cedula} />
            <TextInput
                placeholder='Ingrese Nombre'
                style={styles.input}
                onChangeText={(texto) => setnombre(texto)}
                value={nombre} />
            <TextInput
                placeholder='Ingrese Correo'
                style={styles.input}
                onChangeText={(texto) => setcorreo(texto)}
                value={correo} />
            <TextInput
                placeholder='Ingrese Contraseña'
                style={styles.input}
                secureTextEntry={true} 
                onChangeText={(texto) => setPassword(texto)}
                value={password} />
            <Button title='Guardar' onPress={() => guardar()} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
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
        borderColor: '#ccc'
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
})
