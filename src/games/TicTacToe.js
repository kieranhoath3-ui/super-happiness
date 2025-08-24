import React, { useState } from 'react';
import styled from 'styled-components';

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-gap: 8px;
  margin: 20px auto;
`;
const Cell = styled.button`
  width: 60px;
  height: 60px;
  font-size: 2rem;
  background: #fff;
  border: 2px solid #2a3d66;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #e6eaf5;
  }
`;
const Status = styled.div`
  margin: 10px 0;
  font-size: 1.1rem;
`;

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
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div>
      <Status>{status}</Status>
      <Board>
        {squares.map((val, i) => (
          <Cell key={i} onClick={() => handleClick(i)}>{val}</Cell>
        ))}
      </Board>
      <button onClick={handleReset}>Restart</button>
    </div>
  );
};

export default TicTacToe;
