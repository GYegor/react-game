import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSound from 'use-sound';
import click from  '../assets/click.wav'

import { boardWidth, ControlsProps, GameConfig, RowSize, SettingRecordType, SettingsProps } from '../App.model';
import SettingRecord from './SettingRecord';

const Settings: React.FC<SettingsProps> = ({ openModal, gameConfig, closeSettings }) => {

  const [ curGameConfig, setGameConfig ] = useState(gameConfig)
  const [ clickSound ] = useSound(click, { volume: 0.5 });

return (
    <>
      <div className={`BackDrop ${openModal && "SetBackDrop"}`}></div>
      <div className={`ModalDlg Description ${openModal && "OpenModal"} ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}>
        <div className="SettingsContentWrapper">
          <h3>Controlls:</h3>
          <div className="Description">
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
          <button className={`Button IconWrapper IconWrapper__closeBtn ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}>
            <FontAwesomeIcon
              icon={["fas", "times"]}
              onClick={() => (clickSound(), closeSettings())}
              title="Close (Esc)"
            />
          </button>
        </div>
      </div>
    </>
  );
};


export default Settings