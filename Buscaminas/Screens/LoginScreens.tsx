import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
    const [correo, setcorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ver, setver] = useState(false)
    const [correoRestablecer, setcorreoRestablecer] = useState('')

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigation.navigate('Juego');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                let titulo;
                let mensaje;

                if (errorCode === 'auth/wrong-password') {
                    titulo = 'Error en la contraseña';
                    mensaje = 'Contraseña incorrecta. Por favor, verifica los datos ingresados.';
                } else if (errorCode === 'auth/user-not-found') {
                    titulo = 'Usuario no encontrado';
                    mensaje = 'Por favor verifica el email ingresado.';
                } else {
                    titulo = 'Error';
                    mensaje = 'Verifica tus credenciales.';
                }

                Alert.alert(titulo, mensaje);
            });
    }

    function restablecer(){
        const auth = getAuth();
sendPasswordResetEmail(auth, correoRestablecer)
  .then(() => {
    // Password reset email sent!
    // ..
    Alert.alert('mensaje' , 'se a enviado correo ')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    Alert.alert(errorCode, errorMessage)
  });

    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                placeholderTextColor="#aaa"
                onChangeText={(texto) => setcorreo(texto)}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#aaa"
                onChangeText={(texto) => setContrasenia(texto)}
                secureTextEntry={true}
                autoCapitalize="none"
            />

            <TouchableOpacity style={styles.button} onPress={login}>
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí</Text>
            </TouchableOpacity>

            
            <TouchableOpacity onPress={() => setver (!ver)} >
                <Text style={styles.registerText }>olvido la contrasenia. da click aqui</Text>
            </TouchableOpacity>

            <Modal visible= {ver} transparent={false}>
                <View>
                    <TextInput  style={styles.input}
                    placeholder='ingresar correo'
                    onChangeText={(texto)=> setcorreoRestablecer}
                    />
                    <Button  title='enviar' onPress={()=> restablecer ()} />
                    <Button title='cerrar' onPress={()=> setver(!ver)} color={'red'}/>
                </View>
                
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 30,
    },
    input: {
        height: 50,
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginVertical: 10,
        borderRadius: 8,
        paddingHorizontal: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 2,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    registerText: {
        marginTop: 15,
        fontSize: 16,
        color: '#4CAF50',
        textDecorationLine: 'underline',
    },
});