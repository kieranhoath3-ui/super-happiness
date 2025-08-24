import React, { useState } from 'react';
import styled from 'styled-components';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 60px);
  grid-gap: 10px;
  margin: 20px auto;
`;
const Card = styled.button`
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

const symbols = ['🍎','🍌','🍒','🍇','🍉','🍋','🍓','🍍'];
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const MemoryGame = () => {
  const [cards, setCards] = useState(() => shuffle([...symbols, ...symbols]));
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);

  function handleClick(idx) {
    if (flipped.length === 2 || flipped.includes(idx) || matched.includes(idx)) return;
    const newFlipped = [...flipped, idx];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [i, j] = newFlipped;
      if (cards[i] === cards[j]) {
        setMatched([...matched, i, j]);
        setTimeout(() => setFlipped([]), 800);
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  }

  function handleReset() {
    setCards(shuffle([...symbols, ...symbols]));
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  }

  let status = matched.length === cards.length ? `You won in ${moves} moves!` : `Moves: ${moves}`;

  return (
    <div>
      <Status>{status}</Status>
      <Grid>
        {cards.map((val, i) => (
          <Card key={i} onClick={() => handleClick(i)}>
            {flipped.includes(i) || matched.includes(i) ? val : '?'}
          </Card>
        ))}
      </Grid>
      <button onClick={handleReset}>Restart</button>
    </div>
  );
};

export default MemoryGame;
