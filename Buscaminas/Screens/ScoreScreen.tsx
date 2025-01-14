import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../config/Config";

export default function ScoreScreen() {
  const [globalScores, setGlobalScores] = useState<{ username: string; score: number; time: number }[]>([]);
  const [userScores, setUserScores] = useState<{ score: number; time: number; date: string }[]>([]);
  const userId = auth.currentUser?.uid || "unknown";

  useEffect(() => {
    const scoresRef = ref(db, "scores/");

    const unsubscribe = onValue(scoresRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const globalScoresTemp: { [key: string]: { score: number; time: number } } = {};
      const userScoresTemp: { score: number; time: number; date: string }[] = [];

      Object.keys(data).forEach((uid) => {
        const userGames = data[uid];
        Object.values(userGames).forEach((game: any) => {
          if (uid === userId) {
            userScoresTemp.push({ score: game.score, time: game.time, date: game.date });
          }
          if (
            !globalScoresTemp[uid] ||
            game.score > globalScoresTemp[uid].score ||
            (game.score === globalScoresTemp[uid].score && game.time < globalScoresTemp[uid].time)
          ) {
            globalScoresTemp[uid] = { score: game.score, time: game.time };
          }
        });
      });

      setUserScores(userScoresTemp.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
      setGlobalScores(
        Object.entries(globalScoresTemp)
          .map(([username, { score, time }]) => ({ username, score, time }))
          .sort((a, b) => (b.score === a.score ? a.time - b.time : b.score - a.score))
      );
    });

    return () => unsubscribe();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Puntajes (Usuario Logueado)</Text>
      <FlatList
        data={userScores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.score}>Puntaje: {item.score}</Text>
            <Text style={styles.time}>Tiempo: {item.time}s</Text>
            <Text style={styles.date}>Fecha: {new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
      />
      <Text style={styles.title}>Mejores Puntajes Globales</Text>
      <FlatList
        data={globalScores}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.scoreItem}>
            <Text style={styles.username}>Usuario: {item.username}</Text>
            <Text style={styles.score}>Puntaje: {item.score}</Text>
            <Text style={styles.time}>Tiempo: {item.time}s</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  scoreItem: {
    flexDirection: "column",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 5,
  },
  username: {
    fontSize: 18,
    color: "#333",
  },
  score: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  time: {
    fontSize: 16,
    color: "#666",
  },
  date: {
    fontSize: 14,
    color: "#999",
  },
});
