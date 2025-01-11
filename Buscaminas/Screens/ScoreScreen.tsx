import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ref, onValue } from 'firebase/database';
import { db } from '../config/Config';

export default function ScoreScreen() {
  const [userScores, setUserScores] = useState<number[]>([]);
  const [globalScores, setGlobalScores] = useState<{ username: string; score: number }[]>([]);
  const loggedUserId = '123456'; // Reemplazar con el ID del usuario logueado

  useEffect(() => {
    const scoresRef = ref(db, 'scores/');

    onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const userScoresTemp: number[] = [];
      const globalScoresTemp: { username: string; score: number }[] = [];

      // Recorrer los usuarios en la base de datos
      Object.keys(data).forEach((userId) => {
        const userGames = data[userId];

        // Recorrer los juegos de cada usuario
        Object.values(userGames).forEach((game: any) => {
          if (userId === loggedUserId) {
            // Agregar puntajes del usuario logueado
            userScoresTemp.push(game.score);
          }

          // Agregar el puntaje más alto de cada usuario al ranking global
          globalScoresTemp.push({ username: userId, score: game.score });
        });
      });

      setUserScores(userScoresTemp.sort((a, b) => b - a)); // Ordenar de mayor a menor
      setGlobalScores(
        globalScoresTemp
          .sort((a, b) => b.score - a.score) // Ordenar de mayor a menor
      );
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus Mejores Puntajes</Text>
      <FlatList
        data={userScores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.score}>{item}</Text>
          </View>
        )}
      />
      <Text style={styles.title}>Mejores Puntajes Globales</Text>
      <FlatList
        data={globalScores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.score}>{item.score}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    color: '#333',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
});
