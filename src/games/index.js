import React from 'react';
import styled from 'styled-components';

const gamesList = [
  {
    id: 'tictactoe',
    name: 'Tic Tac Toe',
    category: 'Puzzle',
    component: React.lazy(() => import('./TicTacToe')),
    description: 'Classic 2-player tic-tac-toe game.'
  },
  {
    id: 'memory',
    name: 'Memory Game',
    category: 'Memory',
    component: React.lazy(() => import('./MemoryGame')),
    description: 'Flip cards and match pairs in as few moves as possible.'
  },
];

export default gamesList;
