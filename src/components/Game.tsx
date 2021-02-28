import React, { PropsWithChildren, useState } from 'react';
import { getCellMatrix, tilesAddedTileList as addRandomTiles } from '../App.service';
import { GameProps, TileConfig } from "../App.model";
import '../App.scss';
import TileList from './TileList';


const Game: React.FC<PropsWithChildren<GameProps>> = ({ size }) => {

  const [ tileList, setTileList] = useState([] as TileConfig[]);

  const gamedGrid = Array.from({length: size}, ((_el, i)=> {
    return (
      <div key={`cell-row-${i+1}`} className="Row">
        {Array.from({ length: size }, ((_el, j) => (
          <div key={`cell-col-${j+1}`} className="Cell"></div>
        )))}
      </div>
    );
  }))

  const cellMatrix = getCellMatrix(size)

  return (
    <>
      <div className="GameWrapper">
        <div className="GridWrapper">{gamedGrid}</div>
        <TileList tileList={tileList} />
      </div>
      <button
        onClick={() => addRandomTiles(cellMatrix, tileList, setTileList)}
      >Add two random tiles</button>
    </>
  );
}

export default Game;
