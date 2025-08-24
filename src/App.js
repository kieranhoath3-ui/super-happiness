import React, { useState, Suspense } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import gamesList from './games';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #f4f6fb;
    color: #222;
  }
`;

const Container = styled.div`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #f4f6fb;
  border-radius: 18px;
  box-shadow: 0 4px 32px rgba(42,61,102,0.10);
  margin: 2rem auto 2rem auto;
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 1000px;
`;
const Header = styled.header`
  width: 100vw;
  background: #1d2947;
  color: #fff;
  padding: 1.2rem 0 1.2rem 0;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  box-shadow: 0 2px 8px rgba(42,61,102,0.08);
`;

const Footer = styled.footer`
  width: 100vw;
  background: #2a3d66;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  font-size: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 10;
`;

const NavBar = styled.nav`
  width: 100%;
  background: #2a3d66;
  display: flex;
  justify-content: center;
  padding: 0.5rem 0;
  margin-bottom: 2rem;
`;

const Tab = styled.button`
  background: ${({ active }) => (active ? '#fff' : 'transparent')};
  color: ${({ active }) => (active ? '#2a3d66' : '#fff')};
  border: none;
  border-radius: 6px 6px 0 0;
  margin: 0 0.5rem;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  outline: none;
  &:hover {
    background: #e6eaf5;
    color: #2a3d66;
  }
`;

const SearchBar = styled.input`
  margin: 0 0 2rem 0;
  padding: 0.7rem 1.2rem;
  border-radius: 6px;
  border: 1px solid #bfc8e6;
  font-size: 1rem;
  width: 300px;
  max-width: 90vw;
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
`;

const GameCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(42,61,102,0.07);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PlayButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  background: #2a3d66;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.2s;
  &:hover {
    background: #1d2947;
  }
`;


const Title = styled.h1`
  font-size: 2.8rem;
  color: #6366f1;
  margin: 1.5rem 0 0.5rem 0;
  font-weight: 900;
  letter-spacing: 1px;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: #4a5a7a;
  margin-bottom: 2rem;
  text-align: center;
`;


const categories = ['All', ...Array.from(new Set(gamesList.map(g => g.category)))];

function App() {
  const [selectedTab, setSelectedTab] = useState('All');
  const [search, setSearch] = useState('');
  const [activeGame, setActiveGame] = useState(null);

  const filteredGames = gamesList.filter(game => {
    const matchesCategory = selectedTab === 'All' || game.category === selectedTab;
    const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase()) || (game.description && game.description.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <GlobalStyle />
      <Header>
        <span style={{
          display: 'inline-block',
          width: 40,
          height: 40,
          background: 'linear-gradient(135deg, #6366f1 0%, #60a5fa 100%)',
          borderRadius: 10,
          marginRight: 12,
          verticalAlign: 'middle',
          textAlign: 'center',
          lineHeight: '40px',
          fontWeight: 900,
          fontSize: 22,
          color: '#fff',
          boxShadow: '0 2px 8px rgba(42,61,102,0.13)'
        }}>ZP</span>
        ZapPlay Game Suite
      </Header>
      <NavBar>
        {categories.map(cat => (
          <Tab key={cat} active={selectedTab === cat} onClick={() => { setSelectedTab(cat); setActiveGame(null); }}>{cat}</Tab>
        ))}
      </NavBar>
      <Container>
        <section style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'center',marginBottom:'2.5rem'}}>
    <Title>ZapPlay Game Suite</Title>
    <Subtitle>A suite of quick, fun, and addictive web games. Compete, relax, and enjoy!</Subtitle>
        </section>
        {activeGame ? (
          <Suspense fallback={<div>Loading game...</div>}>
            <activeGame.component />
            <PlayButton onClick={() => setActiveGame(null)}>Back to Games</PlayButton>
          </Suspense>
        ) : (
          <>
            <SearchBar
              type="text"
              placeholder="Search games..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <GamesGrid>
              {filteredGames.length === 0 ? (
                <div>No games found.</div>
              ) : (
                filteredGames.map(game => (
                  <GameCard key={game.id}>
                    <h2>{game.name}</h2>
                    <p>{game.description}</p>
                    <PlayButton onClick={() => setActiveGame(game)}>Play</PlayButton>
                  </GameCard>
                ))
              )}
            </GamesGrid>
          </>
        )}
      </Container>
      <Footer>
        &copy; {new Date().getFullYear()} ZapPlay Game Suite &mdash; <span style={{color:'#bfc8e6'}}>zapplay.vercel.app</span>
      </Footer>
    </>
  );
}

export default App;
