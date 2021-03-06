import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSound from 'use-sound';
import click from  '../assets/click.wav'

import { boardWidth, ControlsProps, GameConfig, RowSize, SettingRecordType, SettingsProps } from '../App.model';
import SettingRecord from './SettingRecord';

const Settings: React.FC<SettingsProps> = ({ openModal, passToParentGameConfig, gameConfig, closeSettings }) => {

  const [ curGameConfig, setGameConfig ] = useState(gameConfig)
  const [ clickSound ] = useSound(click, { volume: 0.5 });


  const setGridConfig = ( size: RowSize): Omit<GameConfig, 'newTilesQuantity'> => {
    const gapCoeff = 1/8
    const tileWidth = boardWidth / (size + size * gapCoeff + gapCoeff);
    const tileGap = tileWidth*gapCoeff;
    return ({ size, tileWidth, tileGap })
  } 

  const setNewRowSize = (size: RowSize) => {
    setGameConfig({...curGameConfig, ...setGridConfig(size)});
    passToParentGameConfig({...curGameConfig, ...setGridConfig(size)});
  }
  const setNewTilesQuantitys = (newTilesQuantity: number) => {
    setGameConfig(curGameConfig);
    setGameConfig({...curGameConfig, newTilesQuantity});
    passToParentGameConfig({...curGameConfig, newTilesQuantity});
  }

  const setColorTheme = (isDarkTheme: boolean) => {
    setGameConfig({...curGameConfig, isDarkTheme});
    passToParentGameConfig({...curGameConfig, isDarkTheme});

  }


  return (
    <>
      <div className={`BackDrop ${openModal && "SetBackDrop"}`}></div>
      <div className={`ModalDlg Description ${openModal && "OpenModal"} ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}>
        <div className="SettingsContentWrapper">
          <h3>Game settins:</h3>
          <SettingRecord
            gameConfig={gameConfig}
            settingRecordType={SettingRecordType.RowSize}
            value={curGameConfig.size}
            getNewValue={(value) => setNewRowSize(value)}
          />
          <SettingRecord
            gameConfig={gameConfig}
            settingRecordType={SettingRecordType.NewTiles}
            value={curGameConfig.newTilesQuantity}
            getNewValue={(value) => setNewTilesQuantitys(value)}
          />
          <SettingRecord
            gameConfig={gameConfig}
            settingRecordType={SettingRecordType.ColorTheme}
            booleanValue={curGameConfig.isDarkTheme}
            getNewBooleanValue={(value) => setColorTheme(value)}
          />
          {/* <SettingRecord settingRecordType={SettingRecordType.ColorTheme} value={colorTheme} getNewValue={(value) => setColorTheme(value as string)} /> */}
          <button className={`Button IconWrapper IconWrapper__closeBtn ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}>
            <FontAwesomeIcon
              icon={["fas", "times"]}
              onClick={() =>  (clickSound(), closeSettings())}
              title="Close (Esc)"
            />
          </button>
        </div>
      </div>
    </>
  );
};


export default Settings