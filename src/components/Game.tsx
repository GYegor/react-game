import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import useSound from 'use-sound';

import backgroundMusic from '../assets/bensound-dreams.mp3'
import swishSound from  '../assets/throw.mp3'
import { getCellMatrix, addRandomTiles as addRandomTiles, getCollapsedTileList, calculateFontSize } from '../App.service';
import {
  CollapseDirection,
  GameProps,
  Keys,
  TileConfig,
  MusicConfig,
  RowSize,
  GameConfig,
  quantity,
  boardWidth,
} from '../App.model';
import '../App.scss';
import TileList from './TileList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Controls from './Controls';
import Settings from './Settings';
import { IconName } from '@fortawesome/fontawesome-svg-core';

const Game: React.FC = () => {

  const playMusicConfig: MusicConfig = {
    musicOn: false,
    icon: 'music',
    title: 'Play music (M)'
  }

  const stopMusicConfig: MusicConfig = {
    musicOn: true,
    icon: 'stop',
    title: 'Play music (M)'
  }

  const defaultGameConfig: GameConfig = {
    size: 4,
    tileWidth: 100,
    tileGap: 10,
    newTilesQuantity: 2,
  }

  const [ tileList, setTileList ] = useState([] as TileConfig[]);   // set tileList !!!
  const [ musicConfig, setMusicConfig ] = useState(playMusicConfig)
  const [ modalOpened, setModalOpened ] = useState(false)
  const [ fsbtnico, setFsbtnico ] = useState('expand-alt' as IconName)

  const [ play, { stop, sound } ] = useSound(backgroundMusic);
  const [ swish ] = useSound(swishSound);
  const [ gameConfig, setGameConfig ] = useState(defaultGameConfig);


  const cellMatrix = getCellMatrix(gameConfig.size)


  const setGameGrid = (gridConfig: GameConfig) => (
    Array.from({length: gridConfig.size}, ((_el, i)=> {
      return (
        <div key={`cell-row-${i+1}`} className='Row' style={{ height: gridConfig.tileWidth, marginBottom: gridConfig.tileGap }}>
          {Array.from({ length: gridConfig.size }, ((_el, j) => (
            <div key={`cell-col-${j+1}`} className='Cell' style={{ height: gridConfig.tileWidth, width: gridConfig.tileWidth, marginRight: gridConfig.tileGap }}></div>
          )))}
        </div>
      );
    }))
  )

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
        } else if  (code === Keys.EscapeSettings) {
          setModalOpened(false);
          setFsbtnico('expand-alt');

        } if  (code === Keys.NewGame) {
          startNewGame()
        } if  (code === Keys.Settings) {
          toggleModal(true)
        }

        if (direction) {
          sound()
            const collapsedList = getCollapsedTileList(tileList, direction, gameConfig.size);
            // setTileList(collapsedList)
            const expandedList = addRandomTiles(cellMatrix, collapsedList, quantity);
            setTileList(expandedList)


          direction = '' as CollapseDirection;
        }
    }
    window.addEventListener('keyup', handleKeyPress);


    return () => {
      window.removeEventListener('keyup', handleKeyPress);
    }
  }, [tileList, play])

  const setGameWrapperStyle = () => ({
    height: boardWidth,
    width: boardWidth,
    padding: gameConfig.tileGap
  })

  const startNewGame = () => {
    let id: any
    stop(id);
    setMusicConfig(stopMusicConfig)

    const expandedList = addRandomTiles(cellMatrix, [], quantity);
    setTileList(expandedList)
    id = play()
    sound.loop(true);
    sound.fade(0,0.2,2000, id)
  }

  const toggleMusic = (config: MusicConfig) => {
    // setMusicConfig(true)
    if (config.musicOn) {
      sound.fade(0.2,0,2000);
      stop();
      setMusicConfig(playMusicConfig);
    } else {
      play();
      sound.loop(true);
      sound.fade(0,0.2,2000);
      setMusicConfig(stopMusicConfig);
    }
  }

  const toggleModal = (isOpened: boolean) => {
    setModalOpened(!isOpened)
  }

  // const changeGridSize = (newSize) => {
  //   const arr = [2,4,5,6,10]
  //   const newIdx = arr.indexOf(size) + 1;
  //   if (arr[newIdx]) {
  //     setSize(arr[newIdx] as GameSize)
  //   }
  // }

  // const toggleFullScreen = () => {
  //   // toggleFs(!fs);
  //   if (fsbtnico === 'expand-alt') {
  //     (document.documentElement as HTMLElement & {
  //       webkitRequestFullscreen(): Promise<void>;
  //     }).webkitRequestFullscreen();
  //   } else {
  //     (document as Document & {
  //       webkitExitFullscreen(): Promise<void>;
  //     }).webkitExitFullscreen();
  //   }
  // }

  // useEffect(() => {
  //   if (!isGameOn
  //   ) {

  //   }

  // }, [tileList])



  const toggleAutoplay = () => {
    // toggleFs(!fs);
    let a;
    // if (fsbtnico === 'play') {
      startNewGame();
      setInterval(() => {
        const idx = Math.floor(Math.random() * 4)
        const direction = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)] as CollapseDirection;
        const collapsedList = getCollapsedTileList(tileList, direction, gameConfig.size);
        const expandedList = addRandomTiles(cellMatrix, collapsedList, quantity);
        setTileList(expandedList)
      }, 1000);


    // } else {
    //   (document as Document & {
    //     webkitExitFullscreen(): Promise<void>;
    //   }).webkitExitFullscreen();
    // }
  }

  // const [fs, toggleFs] = useState(false)

  const toggleFullScreen = () => {
    // toggleFs(!fs);
    if (fsbtnico === 'expand-alt') {
      (document.documentElement as HTMLElement & {
        webkitRequestFullscreen(): Promise<void>;
      }).webkitRequestFullscreen();
      // setFsbtnico('compress-alt');


    } else {
      (document as Document & {
        webkitExitFullscreen(): Promise<void>;
      }).webkitExitFullscreen();
      // setFsbtnico('expand-alt')

    }
  }

  const [fs, toggleFs] = useState(false)

  useEffect(() => {
    const handleFullscreen = () => {
      toggleFs(!fs);
        if (fsbtnico !== 'expand-alt') {
          setFsbtnico('expand-alt')
        } else {
          setFsbtnico('compress-alt');
        }
    }



    document.addEventListener('webkitfullscreenchange', handleFullscreen)

    return () => {
      document.removeEventListener('webkitfullscreenchange', handleFullscreen);
    }
  }, [toggleFullScreen])



  return (
    <div className="GameWrapper">
      <div style={{
          position: 'fixed',
          top: 0,
          right: '50%',
          transform: 'translate(250px)'}}>
        <button className="Button IconWrapper IconWrapper__settingRecord"  onClick={() => toggleAutoplay()} title='Autoplay on/off'>
          <FontAwesomeIcon icon={['fas', fsbtnico ]}/>
        </button>

        <button className="Button IconWrapper IconWrapper__settingRecord"  onClick={() => toggleFullScreen()} title='Full Screen on/off'>
          <FontAwesomeIcon icon={['fas', fsbtnico ]}/>
        </button>
      </div>

      <div className="BoardWrapper" style={setGameWrapperStyle()}>
        <div className="GridWrapper">{setGameGrid(gameConfig)}</div>
        <TileList tileList={tileList} gridConfig={gameConfig} />
      </div>
      <Controls
        startNewGame={startNewGame}
        toggleMusic={() => toggleMusic(musicConfig)}
        musicConfig={musicConfig}
        openSettings={() => toggleModal(modalOpened)}
      />
      <div className="Description">
        <h3>Controlls:</h3>
        <p>
          <b>Gameplay</b>: Arrows or W, S, A, D
        </p>
        <p>
          <b>Start new game</b>: N
        </p>
        <p>
          <b>Start/stop music</b>: M
        </p>
        <p>
          <b>Game settings</b>: C
        </p>
        <p>
          <b>Escape game settings</b>: Esc / C
        </p>
      </div>
      <Settings
        openModal={modalOpened}
        passToParentGameConfig={(newConfig: GameConfig) => { setGameConfig(newConfig); }}
        closeSettings={() => toggleModal(true)}
        gameConfig={gameConfig}
      />
    </div>
  );
}

export default Game;
