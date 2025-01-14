import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../config/Config';
import { onValue, ref } from 'firebase/database';



export default function PerfilScreen() {
     const [correo, setCorreo] = useState("");
     const [contrasenia, setContrasenia] = useState("");
     const [nick, setNick] = useState("");
     const [edad, setEdad] = useState("");
     const [image, setImage] = useState<string | null>(null);
     const [isModalVisible, setModalVisible] = useState(false); 
  const [isEditing, setIsEditing] = useState(false); 
  const [isLoading, setIsLoading] = useState(true); // Estado para indicar carga
  const [userData, setUserData] = useState<any>(null); // Estado para los datos del usuario
  
  
  useEffect(() => {
    const fetchUserData = () => {
        const user = auth.currentUser;

        if (user) {
            const userRef = ref(db, `usuarios/${user.uid}`); // Referencia al nodo del usuario en Realtime Database

            onValue(
                userRef,
                (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        setUserData(data);
                    } else {
                        Alert.alert("Error", "No se encontraron datos del usuario.");
                    }
                    setIsLoading(false); // Finaliza el estado de carga
                },
                (error) => {
                    console.error("Error al leer los datos del usuario:", error);
                    Alert.alert("Error", "No se pudieron cargar los datos del usuario.");
                    setIsLoading(false);
                }
            );
        } else {
            Alert.alert("Error", "No hay un usuario autenticado.");
            setIsLoading(false);
        }
    };

    fetchUserData();
}, []);

  
  const handleSave = () => {
   
    
    Alert.alert('Éxito', 'Los datos se han actualizado correctamente');
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titles}>Información del Registro</Text>
      
      {isEditing ? (
        
        <View>
          <TextInput
            style={styles.input}
            placeholder="edad"
            value={edad}
            onChangeText={setEdad}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={nick}
            onChangeText={setNick}
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
            value={contrasenia}
            onChangeText={setContrasenia}
            secureTextEntry
          />
          
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        
        <View style={styles.result}>
         {/* Mensaje de bienvenida */}
         <Text style={styles.title}>Bienvenido</Text>

{/* Mostrar datos del perfil del usuario */}
{userData ? (
    <View style={styles.profileContainer}>
        {/* Mostrar imagen del usuario si está disponible */}
        {userData.image ? (
            <Image source={{ uri: userData.image }} style={styles.profileImage} />
        ) : (
            <Icon name="person-circle-outline" size={100} color="#ccc" />
        )}
        <Text style={styles.profileText}>Nombre: {userData.nombre}</Text>
        <Text style={styles.profileText}>Correo: {userData.correo}</Text>
        <Text style={styles.profileText}>Teléfono: {userData.telefono}</Text>
    </View>
) : (
    <Text style={styles.errorText}>No se pudieron cargar los datos del usuario.</Text>
)}
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
  titles: {
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
  },loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
},
logoutIcon: {
    position: "absolute",
    top: 20,
    right: 20,
    padding: 10,
},
title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
},
profileContainer: {
    alignItems: "center",
    marginTop: 20,
},
profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
},
profileText: {
    fontSize: 18,
    color: "#333",
    marginBottom: 10,
},
errorText: {
    fontSize: 16,
    color: "#FF5252",
    marginTop: 20,
},
})