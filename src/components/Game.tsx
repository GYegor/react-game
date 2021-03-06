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
  boardWidth,
} from '../App.model';
import '../App.scss';
import TileList from './TileList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Controls from './Controls';
import Settings from './Settings';
import { IconName } from '@fortawesome/fontawesome-svg-core';
import click from  '../assets/click.wav'
import ControlKeys from './ControlKeys';


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
    isDarkTheme: false,
    gameCount: 0,
  }

  const list = localStorage.getItem('tileList')
  const [ tileList, setTileList ] = useState(list ?  JSON.parse(list) as TileConfig[] : [] as TileConfig[]);   // set tileList !!!

  const config = localStorage.getItem('gameConfig')
  const [ gameConfig, setGameConfig ] = useState(config ?  JSON.parse(config) as GameConfig : defaultGameConfig);  
  const [ startBtnIcon, setStartbtnico ] = useState((list && JSON.parse(list).length) ? 'sync-alt' : 'gamepad' as IconName);
  const [ gameOn, setGameOn ] = useState(false);

  const [ musicConfig, setMusicConfig ] = useState(playMusicConfig)
  const [ modalOpened, setModalOpened ] = useState(false)
  const [ controlKeysOpened, setControlKeysOpened ] = useState(false)

  const [ play, { stop, sound } ] = useSound(backgroundMusic);
  const [ swish ] = useSound(swishSound);
  const [ clickSound ] = useSound(click, { volume: 0.5 });


  // const [ gameConfig, setGameConfig ] = useState(defaultGameConfig);

  const cellMatrix = getCellMatrix(gameConfig.size)


  const setGameGrid = (gridConfig: GameConfig) => (
    Array.from({length: gridConfig.size}, ((_el, i)=> {
      return (
        <div key={`cell-row-${i+1}`} className='Row' style={{ height: gridConfig.tileWidth, marginBottom: gridConfig.tileGap }}>
          {Array.from({ length: gridConfig.size }, ((_el, j) => (
            <div key={`cell-col-${j+1}`} className={`Cell ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`} style={{ height: gridConfig.tileWidth, width: gridConfig.tileWidth, marginRight: gridConfig.tileGap }}></div>
          )))}
        </div>
      );
    }))
  )

  // срабатывает полсе каждого рендера, при условии что изменились зависимости ( ..., [ ...] )
  useEffect(() => {
    localStorage.setItem('gameConfig', JSON.stringify(gameConfig));
    localStorage.setItem('tileList', JSON.stringify(tileList));

    // if (gameOn) {
    const handleKeyPress = (event: KeyboardEvent) => {
        const { code } = event
        let sound = swish;
        let direction: CollapseDirection = '' as CollapseDirection;
        if (startBtnIcon === 'sync-alt') {

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
        }
        
        if  (code === Keys.EscapeSettings) {
          setModalOpened(false);
          setFsbtnico('expand-alt');
        } if  (code === Keys.Settings) {
          toggleModal(modalOpened)
        } if  (code === Keys.NewGame) {
          startNewGame();
        } 
        if (direction) {
          sound()
          const collapsedList = getCollapsedTileList(tileList, direction, gameConfig.size);
          if (collapsedList.find(tile => tile.value === 2048)) {
            setResult('You WIN!!!');
            setStartbtnico('gamepad');
          }
          
          const addedCount = collapsedList.reduce((sum, tile) => {
            if (tile.merged && tile.value) {
              sum += tile.value
            }
            return sum;
          }, 0)

          const gameCount = gameConfig.gameCount ? gameConfig.gameCount + addedCount : addedCount;
          setGameConfig({ ...gameConfig, gameCount })

          const expandedList = addRandomTiles(cellMatrix, collapsedList, gameConfig.newTilesQuantity).tileList;
          if (addRandomTiles(cellMatrix, collapsedList, gameConfig.newTilesQuantity).statusResult &&
          addRandomTiles(cellMatrix, collapsedList, gameConfig.newTilesQuantity).statusResult === 'over') {
            setResult('Game over...');
            setStartbtnico('gamepad');
            setMusicConfig(stopMusicConfig);
            setTileList([]);
            setGameConfig({
              ...gameConfig,
              gameCount: 0
            })
            localStorage.setItem('tileList', JSON.stringify(tileList));
          }

          setTileList(expandedList);

          direction = '' as CollapseDirection;
        }
    }
    window.addEventListener('keydown', handleKeyPress);


    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    }
    // }
  }, [tileList, play])

  const setGameWrapperStyle = () => ({
    height: boardWidth,
    width: boardWidth,
    padding: gameConfig.tileGap
  })

//#region STARTGAME
const startNewGame = (shouldStopAutoplay: boolean = true) => {
  if (shouldStopAutoplay) {
    setAutoplay(false);
    setApbtnico('play')
    setGameOn(!gameOn);

    if (startBtnIcon === 'gamepad') {
      setStartbtnico('sync-alt')
      setResult('');
      let id: any
      stop(id);
      setMusicConfig(stopMusicConfig)
      
      const expandedList = addRandomTiles(cellMatrix, [], gameConfig.newTilesQuantity).tileList;
      setTileList(expandedList)
      id = play()
      sound.loop(true);
      sound.fade(0,0.2,2000, id)
    } else {
      setStartbtnico('gamepad')
      stop();
      setMusicConfig(stopMusicConfig);
      setTileList([]);
      setGameConfig({
        ...gameConfig,
        gameCount: 0
      })
    }
  } else {
    setResult('');
    let id: any
    stop(id);
    setMusicConfig(stopMusicConfig)
    
    const expandedList = addRandomTiles(cellMatrix, [], gameConfig.newTilesQuantity).tileList;
    setTileList(expandedList)
    id = play()
    sound.loop(true);
    sound.fade(0,0.2,2000, id)
  }

}
//#endregion STARTGAME

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

const toggleControlKeys = (isOpened: boolean) => {
  setControlKeysOpened(!isOpened)
}


//#region AUTOPLAY
const [ isAutoplay, setAutoplay ] = useState(false);
const [ apBtnIcon, setApbtnico ] = useState('play' as IconName);
const toggleAutoplay = () => {
    setResult('');
    clickSound();
    setAutoplay(!isAutoplay);
    if (!isAutoplay) {
      setApbtnico('times-circle')
      startNewGame(false);
    } else {
      setApbtnico('play')
      stop();
      setMusicConfig(stopMusicConfig);
      setTileList([]);
    }
  }
useEffect(() => {
  if (isAutoplay) {
    const timeoutIdx = setTimeout(() => {
      const idx = Math.floor(Math.random() * 4)
      const direction = ['up', 'down', 'right', 'left'][Math.floor(Math.random() * 4)] as CollapseDirection;
      const collapsedList = getCollapsedTileList(tileList, direction, gameConfig.size);
      const expandedList = addRandomTiles(cellMatrix, collapsedList, gameConfig.newTilesQuantity).tileList;
      setTileList(expandedList)
    }, 600);
    return () => {
      clearInterval(timeoutIdx);
    }
  }
}, [tileList, play])
//#endregion AUTOPLAY

//#region FULLSCREEN 
  const [ fsBtnIcon, setFsbtnico ] = useState('expand-alt' as IconName)
  const toggleFullScreen = () => {
    clickSound();
    if (fsBtnIcon === 'expand-alt') {
      (document.documentElement as HTMLElement & {
        webkitRequestFullscreen(): Promise<void>;
      }).webkitRequestFullscreen();
    } else {
      (document as Document & {
        webkitExitFullscreen(): Promise<void>;
      }).webkitExitFullscreen();
    }
  }
  useEffect(() => {
    const handleFullscreen = () => {
      if (fsBtnIcon !== 'expand-alt') {
        setFsbtnico('expand-alt')
      } else {
        setFsbtnico('compress-alt');
      }
    }
    document.addEventListener('webkitfullscreenchange', handleFullscreen)
    return () => { document.removeEventListener('webkitfullscreenchange', handleFullscreen); }
  }, [toggleFullScreen])
//#endregion FULLSCREEN 

//#region RESULT HANDLING 
const [ result, setResult ] = useState('');

//#endregion RESULT HANDLING 


  return (
    <div className={`GameWrapper ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}>

      <div style={{
          position: 'fixed',
          top: '25px',
          right: '50%',
          transform: 'translate(230px)'}}>
        <button className="Button IconWrapper IconWrapper__upperBtn">
          <FontAwesomeIcon className={ startBtnIcon === 'sync-alt' ? 'HideBtn' : ''} icon={['fas', apBtnIcon ]} onClick={() => toggleAutoplay()} title='Autoplay on/off'/>
        </button>
        <button className="Button IconWrapper IconWrapper__upperBtn" title='Game controlls'>
          <FontAwesomeIcon icon={['fas', 'list-alt' ]} onClick={() => toggleControlKeys(controlKeysOpened)}/>
        </button>
        <button className="Button IconWrapper IconWrapper__upperBtn" title='Last 10 results'>
          <FontAwesomeIcon icon={['fas', 'list-ol' ]} onClick={() => toggleControlKeys(controlKeysOpened)}/>
        </button>
        <button className="Button IconWrapper IconWrapper__upperBtn"  onClick={() => toggleFullScreen()} title='Full screen on/off'>
          <FontAwesomeIcon icon={['fas', fsBtnIcon ]}/>
        </button>
      </div>

      <div className={`BoardWrapper ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`} style={setGameWrapperStyle()}>
        <div className={`ResultOverLay ${result ? 'ShowResult' : ''} ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}
          onClick ={() => setResult('')}
          >
          {result}
        </div>
        <div className="GridWrapper">{setGameGrid(gameConfig)}</div>
        <TileList tileList={tileList} gameConfig={gameConfig} />
      </div>
      <Controls
        startNewGame={() => startNewGame()}
        startBtnIcon={startBtnIcon}
        toggleMusic={() => toggleMusic(musicConfig)}
        musicConfig={musicConfig}
        openSettings={() => toggleModal(modalOpened)}
      />
      <div style={{fontSize: '64px', fontWeight: 'bold'}}>{gameConfig.gameCount}</div>      
      <Settings
        openModal={modalOpened}
        passToParentGameConfig={(newConfig: GameConfig) => { setGameConfig(newConfig); }}
        closeSettings={() => toggleModal(true)}
        gameConfig={gameConfig}
      />
      <ControlKeys
        openModal={controlKeysOpened}
        passToParentGameConfig={(newConfig: GameConfig) => { setGameConfig(newConfig); }}
        closeSettings={() => toggleControlKeys(true)}
        gameConfig={gameConfig}
      />
    </div>
  );
}

export default Game;
