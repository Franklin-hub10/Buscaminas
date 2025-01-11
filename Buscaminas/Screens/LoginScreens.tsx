import { Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { child, get, ref } from "firebase/database";
import { db } from '../config/Config';

import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../Browser/MainNavigator';

 


export default function LoginScreen() {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Por favor, ingrese su correo y contraseña.');
            return;
        }

        try {
            // Referencia a la base de datos
            const dbRef = ref(db);
            const snapshot = await get(child(dbRef, 'usuarios'));
            if (snapshot.exists()) {
                const usuarios = snapshot.val();

                // Buscar el usuario con email y password
                const usuarioEncontrado = Object.values(usuarios).find(
                    (usuario: any) => usuario.email === email && usuario.password === password
                );

                if (usuarioEncontrado) {
                    Alert.alert('Éxito', 'Inicio de sesión exitoso.');
                    navigation.navigate('Juego'); // Redirigir a la pantalla deseada
                } else {
                    Alert.alert('Error', 'Correo o contraseña incorrectos.');
                }
            } else {
                Alert.alert('Error', 'No hay usuarios registrados.');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Hubo un problema al validar el usuario.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenido</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                placeholderTextColor="#aaa"
                onChangeText={setemail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Acceder</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Botton')}>
                <Text style={styles.registerText}>¿Eres nuevo? Regístrate aquí</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 20,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    registerText: {
        marginTop: 10,
        fontSize: 16,
        color: '#4CAF50',
        textDecorationLine: 'underline',
    },
});
