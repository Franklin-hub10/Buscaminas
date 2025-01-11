import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function PerfilScreen() {
  const [cedula, setCedula] = useState(''); 
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [isEditing, setIsEditing] = useState(false); 

  const handleSave = () => {
   
    Alert.alert('Éxito', 'Los datos se han actualizado correctamente');
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del Registro</Text>
      
      {isEditing ? (
        
        <View>
          <TextInput
            style={styles.input}
            placeholder="Cédula"
            value={cedula}
            onChangeText={setCedula}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        
        <View style={styles.result}>
          <Text>Cédula: {cedula}</Text>
          <Text>Nombre: {nombre}</Text>
          <Text>Correo: {correo}</Text>
          <Text>Contraseña: {password}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
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


  