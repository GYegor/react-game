import React, { PropsWithChildren, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import { GameProps, GameSize, TileConfig } from "../App.model";
import '../App.scss';
import TileList from './TileList';


const Game: React.FC<PropsWithChildren<GameProps>> = ({ size }) => {

  const [ tileList, setTileList] = useState([] as TileConfig[]);

  const getCellMatrix = (size: GameSize) => {
    return Array.from({ length: size }).reduce<TileConfig[]>((acc, val, i) => {
      acc.push(...Array.from({ length: size }, (_el, j) => ({
        row: i + 1,
        col: j + 1,
      } as TileConfig)));
      return acc
    }, [])
  } 

  const gamedGrid = Array.from({length: size}, ((_el, i)=> {
    return (
      <div key={`cell-row-${i+1}`} className="Row">
        {Array.from({ length: size }, ((_el, j) => (
          <div key={`cell-col-${j+1}`} className="Cell"></div>
        )))}
      </div>
    );
  }))

  const getEmptyCells = (tileList: TileConfig[], cellMatrix: TileConfig[]) =>
    cellMatrix.filter((cell) =>
      !tileList.find((tile) => tile.row === cell.row && tile.col === cell.col)
    );

  const addTwoRandomTiles = (tileList: TileConfig[], cellMatrix: TileConfig[]) => {
    const clonedTileList = cloneDeep(tileList);
    let emtyCells = getEmptyCells(tileList, cellMatrix);
    clonedTileList.push({ ...emtyCells[Math.floor(Math.random() * emtyCells.length)], value: 2, key: uuidv4()})
    emtyCells = getEmptyCells(clonedTileList, cellMatrix);
    clonedTileList.push({ ...emtyCells[Math.floor(Math.random() * emtyCells.length)], value: 2, key: uuidv4()})

    setTileList(clonedTileList);
  }


  const cellMatrix = getCellMatrix(size)

  return (
    <>
    <div className="GameWrapper">
      <div className="GridWrapper">
        {gamedGrid}
      </div>
      <TileList tileList={tileList} />
    </div>
    <button onClick={() => addTwoRandomTiles(tileList, cellMatrix)}></button>
    </>
  );
}

export default Game;
