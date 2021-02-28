import React from 'react';
import './App.scss';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      2048 by GYegor
        <Game size={4} />
    </div>
  );
}

export default App;
