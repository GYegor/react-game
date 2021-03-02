import React, { PropsWithChildren, useEffect, useState } from 'react';
import { getCellMatrix, addRandomTiles as addRandomTiles, getCollapsedTileList } from '../App.service';
import { defaultTilesToAddQuantity as quantity, boardWidth, CollapseDirection, GameProps, Keys, TileConfig, tileGap, TileProps, tileWidth } from '../App.model';
import '../App.scss';
import TileList from './TileList';


const Game: React.FC<PropsWithChildren<GameProps>> = ({ size }) => {
  const [ tileList, setTileList ] = useState([] as TileConfig[]);   // set tileList !!!

  const cellMatrix = getCellMatrix(size)

  const gamedGrid = Array.from({length: size}, ((_el, i)=> {
    return (
      <div key={`cell-row-${i+1}`} className='Row' style={{ height: tileWidth, marginBottom: tileGap }}>
        {Array.from({ length: size }, ((_el, j) => (
          <div key={`cell-col-${j+1}`} className='Cell' style={{ height: tileWidth, width: tileWidth, marginRight: tileGap }}></div>
        )))}
      </div>
    );
  }))

  // срабатывает полсе каждого рендера, при условии что изменились зависимости ( ..., [ ...] )
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { code } = event
      let direction: CollapseDirection = '' as CollapseDirection;
      if (code === Keys.ArrowUp || code === Keys.KeyUp) {
        direction = 'up';
      } else if  (code === Keys.ArrowDown || code === Keys.KeyDown) {
        direction = 'down';
      }  else if  (code === Keys.ArrowRight || code === Keys.KeyRight) {
        direction = 'right';
      } else if  (code === Keys.ArrowLeft || code === Keys.KeyLeft) {
        direction = 'left';
      }
      if (direction) {
        const collapsedList = getCollapsedTileList(tileList, direction, size);
        // setTileList(collapsedList)
          const expandedList = addRandomTiles(cellMatrix, collapsedList, quantity);
          setTileList(expandedList)


        direction = '' as CollapseDirection;
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      console.log('remove listener');
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [tileList])

  const gameWrapperStyle = {
    height: boardWidth,
    width: boardWidth,
    padding: tileGap
  }

  return (
    <>
      <div className='GameWrapper' style={gameWrapperStyle}>
				<div className='GridWrapper'>{gamedGrid}</div>
        <TileList tileList={tileList} />
	      </div>
      <button
        onClick={() => setTileList(addRandomTiles(cellMatrix, tileList, quantity))}
      >Add two random tiles</button>
    </>
  );
}

export default Game;
