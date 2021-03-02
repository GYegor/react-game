import React from 'react';
import { defaultSize } from './App.model';
import './App.scss';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      2048 by GYegor
        <Game size={defaultSize} />
    </div>
  );
}

export default App;
