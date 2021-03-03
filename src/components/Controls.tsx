import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSound from 'use-sound';
import swishTiles from  '../assets/swish.mp3'

import { ControlsProps } from '../App.model';

const Controls: React.FC<ControlsProps> = ({ startNewGame, toggleMusic, musicConfig  }) => {

  // const soundUrl = '/sounds/909-drums.mp3';

  

  return (
    <div className="Controls">
      <div className="ButtonWrapper">
        <button className="Button IconWrapper" onClick={() => toggleMusic()} title={musicConfig.title}>
          <FontAwesomeIcon icon={['fas', musicConfig.icon]}/>
        </button>   
      </div>
      <div className="ButtonWrapper">
        <button className="Button IconWrapper" onClick={() => startNewGame()} title='New game (N)'>
          <FontAwesomeIcon icon={['fas', 'gamepad']}/>
        </button>
        </div>
      <div className="ButtonWrapper">
        <button className="Button IconWrapper" onClick={() => toggleMusic()} title={musicConfig.title}>
          <FontAwesomeIcon icon={['fas', 'cog']}/>
        </button>   
      </div>
    </div>
  );
};

interface AudioCintrols {
  pause?: boolean,
  mute?: boolean,
  volume?: number,
}


const MusicButtons: React.FC = (props) => {



  return (
    <div className="Controls">

      {/* <button onClick={swish}>Swish!</button> */}
    </div>
  );
};






















export default Controls