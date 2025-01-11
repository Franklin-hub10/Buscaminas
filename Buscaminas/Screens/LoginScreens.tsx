import { Alert, Button, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/Config';

export default function LoginScreen({ navigation }: any) {
    const [correo, setcorreo] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [ver, setver] = useState(false);
    const [correoRestablecer, setcorreoRestablecer] = useState('');

    function login() {
        signInWithEmailAndPassword(auth, correo, contrasenia)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigation.navigate('Juego');
            })
            .catch((error) => {
                const errorCode = error.code;
                let titulo;
                let mensaje;

                switch (errorCode) {
                    case 'auth/wrong-password':
                        titulo = 'Error en la contraseña';
                        mensaje = 'Contraseña incorrecta. Por favor, verifica los datos ingresados.';
                        break;
                    case 'auth/user-not-found':
                        titulo = 'Usuario no encontrado';
                        mensaje = 'Por favor verifica el email ingresado.';
                        break;
                    default:
                        titulo = 'Error';
                        mensaje = 'Verifica tus credenciales.';
                }

                Alert.alert(titulo, mensaje);
            });
    }

    function restablecer() {
        const auth = getAuth();
        sendPasswordResetEmail(auth, correoRestablecer)
            .then(() => {
                Alert.alert('Mensaje', 'Se ha enviado un correo para restablecer tu contraseña');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                Alert.alert(errorCode, errorMessage);
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
                <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
                <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate aquí</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setver(!ver)}>
                <Text style={styles.forgotPasswordText}>¿Olvidaste la contraseña? Click aquí</Text>
            </TouchableOpacity>

            <Modal visible={ver} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ingresa tu correo"
                            placeholderTextColor="#aaa"
                            onChangeText={(texto) => setcorreoRestablecer(texto)}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={restablecer}>
                            <Text style={styles.modalButtonText}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.closeModalButton} onPress={() => setver(!ver)}>
                            <Text style={styles.closeModalButtonText}>Cerrar</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 25,
    },
    input: {
        height: 50,
        fontSize: 16,
        backgroundColor: '#ffffff',
        marginVertical: 10,
        borderRadius: 12,
        paddingHorizontal: 15,
        width: '100%',
        borderWidth: 1,
        borderColor: '#dcdde1',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#4CAF50',
        borderRadius: 12,
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
        textTransform: 'uppercase',
    },
    registerText: {
        marginTop: 15,
        fontSize: 16,
        color: '#4CAF50',
        textDecorationLine: 'underline',
    },
    forgotPasswordText: {
        marginTop: 15,
        fontSize: 16,
        color: '#34495e',
        textDecorationLine: 'underline',
        opacity: 0.85,
        fontStyle: 'italic',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    modalButton: {
        marginTop: 15,
        backgroundColor: '#2ecc71',
        borderRadius: 12,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
    },
    closeModalButton: {
        marginTop: 10,
        backgroundColor: '#e74c3c',
        borderRadius: 12,
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeModalButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
        textTransform: 'uppercase',
    },
});
