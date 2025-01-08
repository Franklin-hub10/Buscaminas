import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Cell {
  isMine: boolean;
  revealed: boolean;
  neighboringMines: number;
}

// Función para generar el tablero
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

  // Añadir minas al azar
  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);

    if (!board[row][col].isMine) {
      board[row][col] = { ...board[row][col], isMine: true };
      minesPlaced++;
    }
  }

  // Calcular minas vecinas
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

// Componente principal
const BuscaminasScreens: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>([]);
  const [score, setScore] = useState(0);
  const rows = 8;
  const cols = 8;
  const mines = 10;

  useEffect(() => {
    setBoard(generateBoard(rows, cols, mines));
  }, []);

  const revealCell = (row: number, col: number) => {
    const newBoard = [...board];
    const cell = newBoard[row][col];

    if (cell.revealed) return;

    if (cell.isMine) {
      Alert.alert('¡Perdiste!', `Tu puntaje final fue ${score}`);
      setBoard(generateBoard(rows, cols, mines));
      setScore(0);
      return;
    }

    cell.revealed = true;
    setScore(score + 1);

    // Descubrir celdas vecinas si no hay minas alrededor
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
    <SafeAreaView style={{ marginTop: '5%', flex: 1, backgroundColor: '#f0f0f0' }}>
    <View style={styles.container}>
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
                    {cell.isMine ? '💣' : cell.neighboringMines > 0 ? cell.neighboringMines : ''}
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
    backgroundColor: '#f0f0f0', // Fondo claro para consistencia con otros estilos
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Ajuste para evitar bordes pegados
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50', // Verde consistente
    marginBottom: 10,
  },
  score: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333333', // Gris oscuro
    marginBottom: 20,
  },
  board: {
    borderWidth: 2,
    borderColor: '#4CAF50', // Verde consistente
    backgroundColor: '#ffffff', // Fondo blanco
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40, // Tamaño más grande para mejor visibilidad
    height: 40,
    backgroundColor: '#e0e0e0',
    borderWidth: 1,
    borderColor: '#cccccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  revealedCell: {
    backgroundColor: '#bdbdbd',
    borderColor: '#aaaaaa',
  },
  cellText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
});


export default BuscaminasScreens;
