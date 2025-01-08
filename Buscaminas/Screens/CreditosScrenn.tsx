import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function CreditosScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Chritopher Aleman</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>ChristopherDetken</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Franklin Polacin</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Franklin-hub10</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Isaac Tonato</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Isaac-TC</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Fondo negro
    padding: 20,
  },
  textContainer: {
    backgroundColor: '#1c1c1c', // Fondo del contenedor ligeramente más claro
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: '80%', // Ancho del contenedor
    alignItems: 'center',
  },
  text: {
    color: '#fff', // Letras blancas
    fontSize: 18,
    fontWeight: 'bold',
  },
})
