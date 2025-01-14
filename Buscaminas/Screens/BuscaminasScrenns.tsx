import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ref, push } from "firebase/database";
import { db, auth } from "../config/Config";

interface Cell {
  isMine: boolean;
  revealed: boolean;
  neighboringMines: number;
}

const generateBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  const board: Cell[][] = Array(rows)
    .fill(null)
    .map(() =>
      Array(cols).fill({
        isMine: false,
        revealed: false,
        neighboringMines: 0,
      })
    );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (!board[row][col].isMine) {
      board[row][col] = { ...board[row][col], isMine: true };
      minesPlaced++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (!board[r][c].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
              count++;
            }
          }
        }
        board[r][c] = { ...board[r][c], neighboringMines: count };
      }
    }
  }

  return board;
};

const BuscaminasScreens: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const rows = 8;
  const cols = 8;
  const mines = 10;
  const userId = auth.currentUser?.uid || "unknown"; // ID del usuario logueado

  useEffect(() => {
    setBoard(generateBoard(rows, cols, mines));
    setStartTime(Date.now()); // Inicia el tiempo
  }, []);

  const saveScore = (finalScore: number) => {
    const endTime = Date.now();
    const duration = Math.floor((endTime - (startTime || 0)) / 1000); // Tiempo en segundos

    const scoreRef = ref(db, `scores/${userId}`);
    push(scoreRef, { score: finalScore, time: duration, date: new Date().toISOString() });
  };

  const revealCell = (row: number, col: number) => {
    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.revealed) return;

    if (cell.isMine) {
      saveScore(score);
      Alert.alert("¡Perdiste!", `Tu puntaje final fue ${score}`);
      setBoard(generateBoard(rows, cols, mines));
      setScore(0);
      setStartTime(Date.now());
      return;
    }

    cell.revealed = true;
    setScore(score + 1);

    if (cell.neighboringMines === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = row + dr;
          const nc = col + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            revealCell(nr, nc);
          }
        }
      }
    }

    setBoard(newBoard);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Buscaminas</Text>
        <Text style={styles.score}>Puntaje: {score}</Text>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <TouchableOpacity
                  key={colIndex}
                  style={[styles.cell, cell.revealed && styles.revealedCell]}
                  onPress={() => revealCell(rowIndex, colIndex)}
                >
                  {cell.revealed && (
                    <Text style={styles.cellText}>
                      {cell.isMine ? "💣" : cell.neighboringMines > 0 ? cell.neighboringMines : ""}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    color: "#333",
    marginBottom: 20,
  },
  board: {
    borderWidth: 2,
    borderColor: "#4CAF50",
    backgroundColor: "#ffffff",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    width: 40,
    height: 40,
    backgroundColor: "#e0e0e0",
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
  },
  revealedCell: {
    backgroundColor: "#bdbdbd",
    borderColor: "#aaa",
  },
  cellText: {
    fontSize: 18,
    color: "#333",
  },
});

export default BuscaminasScreens;
