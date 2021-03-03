import React, { PropsWithChildren, useEffect, useState } from 'react';
import useSound from 'use-sound';

import backgroundMusic from '../assets/bensound-dreams.mp3'
import swishSound from  '../assets/throw.mp3'
import { getCellMatrix, addRandomTiles as addRandomTiles, getCollapsedTileList } from '../App.service';
import {
  defaultTilesToAddQuantity as quantity,
  boardWidth,
  CollapseDirection,
  GameProps,
  Keys,
  TileConfig,
  tileGap,
  tileWidth,
} from '../App.model';
import '../App.scss';
import TileList from './TileList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


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

  const [ swish ] = useSound(swishSound);


  // срабатывает полсе каждого рендера, при условии что изменились зависимости ( ..., [ ...] )
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { code } = event
      let sound = swish;
      let direction: CollapseDirection = '' as CollapseDirection;
      if (code === Keys.ArrowUp || code === Keys.KeyUp) {
        direction = 'up';
        sound = swish;
      } else if  (code === Keys.ArrowDown || code === Keys.KeyDown) {
        sound = swish;
        direction = 'down';
      }  else if  (code === Keys.ArrowRight || code === Keys.KeyRight) {
        sound = swish;
        direction = 'right';
      } else if  (code === Keys.ArrowLeft || code === Keys.KeyLeft) {
        sound = swish;
        direction = 'left';
      }
      if (direction) {
        sound()
        const collapsedList = getCollapsedTileList(tileList, direction, size);
        // setTileList(collapsedList)
          const expandedList = addRandomTiles(cellMatrix, collapsedList, quantity);
          setTileList(expandedList)


        direction = '' as CollapseDirection;
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [tileList])

  const gameWrapperStyle = {
    height: boardWidth,
    width: boardWidth,
    padding: tileGap
  }

  const [ play, { stop, sound, pause } ] = useSound(backgroundMusic);
  let bmId: string;
  let notMuted = true;


  const startNewGame = () => {
    sound.fade(0.3,0,1500)
    stop()

    setTileList(addRandomTiles(cellMatrix, [], quantity))

    bmId = sound.play()
    sound.fade(0,0.3,3000, bmId)
  }

  const toggleMuteMusic = () => {
    sound.mute(notMuted, bmId);
    sound.volume(0.3, bmId);
    //   sound.pause(bmId);
    notMuted = !notMuted;
  }

  return (
    <>
      <div className='GameWrapper' style={gameWrapperStyle}>
        <div className='GridWrapper'>{gamedGrid}</div>
        <TileList tileList={tileList} />
      </div>
      <button onClick={() => startNewGame()} title='Новая игра'>
        <FontAwesomeIcon icon={['fas', 'gamepad']} size='lg' />
      </button>
      <button onClick={() => toggleMuteMusic()} title='Отключить музыку'>
        <FontAwesomeIcon icon={['fas', 'volume-mute']} size='lg' />
      </button>
      

    </>
  );
}

export default Game;
