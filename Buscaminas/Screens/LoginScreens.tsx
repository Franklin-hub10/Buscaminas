import { View, Text, TextInputComponent, TouchableOpacity, Button, StyleSheet } from 'react-native';
import React from 'react'

export default function LoginScreens() {
  return (
    <View style={styles.container}>
    
      <Text style={styles.title}>PetPlace</Text>

      
      <TextInputComponent 
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

     
      <TextInputComponent 
        placeholder="Contraseña"
        secureTextEntry
        style={styles.input}
      />

      
      <Button
        title="Iniciar sesión"
        onPress={() => console.log('Iniciar sesión')}
      
      />

      
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => console.log('Recuperar contraseña')}>
          <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Registrarse')}>
          <Text style={styles.linkText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles= 
StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});