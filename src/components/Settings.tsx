import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSound from 'use-sound';
import swishTiles from  '../assets/swish.mp3'

import { boardWidth, ControlsProps, GameConfig, RowSize, SettingRecordType, SettingsProps } from '../App.model';
import SettingRecord from './SettingRecord';

const Settings: React.FC<SettingsProps> = ({ openModal, passToParentGameConfig, gameConfig, closeSettings }) => {

  const [ curGameConfig, setGameConfig ] = useState(gameConfig)

  const setGridConfig = ( size: RowSize): Omit<GameConfig, 'newTilesQuantity'> => {
    const gapCoeff = 1/8
    const tileWidth = boardWidth / (size + size * gapCoeff + gapCoeff);
    const tileGap = tileWidth*gapCoeff;
    return ({ size, tileWidth, tileGap })
  } 

  const setNewRowSize = (size: RowSize) => {
    setGameConfig({...curGameConfig, ...setGridConfig(size)});
    passToParentGameConfig({...curGameConfig, ...setGridConfig(size)});


    // changeGameConfig(setGameConfig(curGameConfig));

  }
  const setNewTilesQuantitys = (size: RowSize) => {
    setGameConfig(curGameConfig);

    // changeGameConfig(setGameConfig(curGameConfig));
  }

  const setColorTheme = (size: string) => {
    // setRowSize(size);
    // changeGridConfig(SetGridConfig(size));
  }


  return (
    <>
      <div className={`BackDrop ${openModal && "SetBackDrop"}`}></div>
      <div className={`ModalDlg Description ${openModal && "OpenModal"}`}>
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
            getNewValue={(value) => setNewTilesQuantitys(value as number)}
          />
          {/* <SettingRecord settingRecordType={SettingRecordType.ColorTheme} value={colorTheme} getNewValue={(value) => setColorTheme(value as string)} /> */}
          <button className="Button IconWrapper IconWrapper__closeBtn">
            <FontAwesomeIcon
              icon={["fas", "times"]}
              onClick={() => closeSettings()}
              title="Close (Esc)"
            />
          </button>
        </div>
      </div>
    </>
  );
};


export default Settings