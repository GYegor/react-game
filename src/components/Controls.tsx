import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import click from  '../assets/click.wav'

import { ControlsProps } from '../App.model';
import useSound from 'use-sound';

const Controls: React.FC<ControlsProps> = ({ startNewGame, toggleMusic, musicConfig, openSettings, startBtnIcon  }) => {

  const [ clickSound ] = useSound(click, { volume: 0.5 });

  // const soundUrl = '/sounds/909-drums.mp3';
  return (
    <div className="Controls">
      <div className="ButtonWrapper">
        <button className="Button IconWrapper">
          <FontAwesomeIcon icon={['fas', musicConfig.icon]} onClick={() => (clickSound(),toggleMusic())} title={musicConfig.title}/>
        </button>   
      </div>
      <div className="ButtonWrapper">
        <button className="Button IconWrapper">
          <FontAwesomeIcon icon={['fas', startBtnIcon]}  onClick={() => (clickSound(), startNewGame())} title='Game strat/finish (N)'/>
        </button>
        </div>
      <div className="ButtonWrapper">
        <button className="Button IconWrapper">
          <FontAwesomeIcon className={ startBtnIcon === 'sync-alt' ? 'HideBtn' : ''} icon={['fas', 'cog']}  onClick={() => (clickSound(), openSettings())} title='Game settings (S)'/>
        </button>   
      </div>
    </div>
  );
};


export default Controls