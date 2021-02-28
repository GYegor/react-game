import React, { PropsWithChildren, useState } from 'react';
import { GameProps, GameSize } from "../App.model";
import '../App.scss';


const Game: React.FC<PropsWithChildren<GameProps>> = ({ size }) => {


  const gamedGrid = Array.from({length: size}, ((_el, i)=> {
    return (
      <div key={`cell-row-${i+1}`} className="Row">
        {Array.from({ length: size }, ((_el, j) => (
          <div key={`cell-col-${j+1}`} className="Cell"></div>
        )))}
      </div>
    );
  }))

  return (
    <>
    <div className="GameWrapper">
      <div className="GridWrapper">
        {gamedGrid}
      </div>
    </div>
    </>
  );
}

export default Game;
