import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../config/Config';
import { onValue, ref, update } from 'firebase/database';
import { signOut } from 'firebase/auth';

export default function PerfilScreen({ navigation }: any) {
  const [userData, setUserData] = useState<any>(null); // Datos del usuario
  const [isEditing, setIsEditing] = useState(false); // Modo de edición
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchUserData = () => {
      const user = auth.currentUser;

      if (user) {
        const userRef = ref(db, `usuarios/${user.uid}`);
        onValue(
          userRef,
          (snapshot) => {
            const data = snapshot.val();
            if (data) {
              setUserData(data);
            } else {
              Alert.alert("Error", "No se encontraron datos del usuario.");
            }
            setIsLoading(false);
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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Sesión cerrada", "Has cerrado sesión exitosamente.");
        navigation.navigate("Login");
      })
      .catch(() => {
        Alert.alert("Error", "No se pudo cerrar sesión. Por favor, intenta nuevamente.");
      });
  };

  const handleSave = () => {
    if (auth.currentUser) {
      const userRef = ref(db, `usuarios/${auth.currentUser.uid}`);
      update(userRef, userData)
        .then(() => {
          Alert.alert('Éxito', 'Los datos se han actualizado correctamente.');
          setIsEditing(false);
        })
        .catch((error) => {
          Alert.alert('Error', 'No se pudieron actualizar los datos: ' + error.message);
        });
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando datos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>
      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={userData?.nick || ''}
            onChangeText={(text) => setUserData({ ...userData, nick: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Edad"
            value={userData?.edad || ''}
            onChangeText={(text) => setUserData({ ...userData, edad: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo"
            value={userData?.correo || ''}
            onChangeText={(text) => setUserData({ ...userData, correo: text })}
            keyboardType="email-address"
          />
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.profileContainer}>
          {userData?.image ? (
            <Image source={{ uri: userData.image }} style={styles.profileImage} />
          ) : (
            <Icon name="person-circle-outline" size={100} color="#ccc" />
          )}
          <Text style={styles.profileText}>Nombre: {userData?.nick || 'N/A'}</Text>
          <Text style={styles.profileText}>Correo: {userData?.correo || 'N/A'}</Text>
          <Text style={styles.profileText}>Edad: {userData?.edad || 'N/A'}</Text>
          <TouchableOpacity style={styles.button} onPress={() => setIsEditing(true)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutIcon} onPress={handleLogout}>
            <Icon name="log-out-outline" size={30} color="#4CAF50" />
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
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
    color: '#333',
    marginBottom: 10,
  },
  logoutIcon: {
    marginTop: 20,
    alignItems: 'center',
  },
});
