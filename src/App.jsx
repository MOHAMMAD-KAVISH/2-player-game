import { useState } from "react";
import "./App.css";

function App() {
  const initialBoard = Array(9).fill(null);
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);

  const winner = calculateWinner(board);

  function handleClick(index) {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  function resetGame() {
    setBoard(initialBoard);
    setIsXNext(true);
  }

  function renderCell(index) {
    return (
      <button className="cell" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  }

  return (
    <div className="container">
      <h1>Tic-Tac-Toe</h1>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="row" key={row}>
            {renderCell(row * 3)}
            {renderCell(row * 3 + 1)}
            {renderCell(row * 3 + 2)}
          </div>
        ))}
      </div>
      <div className="status">
        {winner ? (
          <h2>🎉 Winner: {winner}</h2>
        ) : (
          <h2>Next Player: {isXNext ? "X" : "O"}</h2>
        )}
        <button onClick={resetGame} className="reset-btn">Reset Game</button>
      </div>
    </div>
  );
}

// Helper function to check winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
