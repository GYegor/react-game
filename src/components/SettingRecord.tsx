import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import click from  '../assets/click.wav'


import { SettingRecordProps, SettingRecordType } from '../App.model';
import useSound from 'use-sound';

const SettingRecord: React.FC<SettingRecordProps> = ({ settingRecordType, value, booleanValue, getNewValue, getNewBooleanValue, gameConfig }) => {

  const [ clickSound ] = useSound(click, { volume: 0.5 });

  const handleValue = (increase: boolean) => {
    clickSound();
    if (getNewValue && value) {
      switch (settingRecordType) {
        case SettingRecordType.RowSize:
          return increase ? getNewValue(value < 8 ? value += 1 : value)  : getNewValue(value > 4 ? value -= 1 : value);

        case SettingRecordType.NewTiles:
          return increase ? getNewValue(value < 3 ? value += 1 : value)  : getNewValue(value > 1 ? value -= 1 : value);
      }
    } else if (getNewBooleanValue && (booleanValue || booleanValue === false)) {
      return getNewBooleanValue(!booleanValue);
    }
  }

  const shouldHide = (btnOrder: string) => {
    if (
        btnOrder === "open" &&
        (settingRecordType === SettingRecordType.RowSize && value === 4 ||
      settingRecordType === SettingRecordType.NewTiles && value === 1)
    ) {
      return "HideBtn";
    } else if (
      btnOrder === "close" &&
        (settingRecordType === SettingRecordType.RowSize && value === 8 ||
      settingRecordType === SettingRecordType.NewTiles && value === 3)
    ) {
      return "HideBtn";
    }
  };

  const getValueForRender = () => {
    if (value) {
      return value;
    } else {
      return booleanValue ? 'Dark' : 'Light'
    }
  }

  return (
    <div className="SettingRecordWrapper">          
      <p className="Name"><b>{settingRecordType + ': '}</b></p> 
      <button className={`Button IconWrapper IconWrapper__settingRecord IconContainer ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`} >
        <FontAwesomeIcon className={shouldHide('open')} icon={['fas', 'caret-left']} onClick={() => handleValue(false)} title='-'/>
      </button>  
      <p className="Value"><b>{getValueForRender()}</b></p> 
      <button className={`Button IconWrapper IconWrapper__settingRecord IconContainer ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}>
        <FontAwesomeIcon className={shouldHide('close')} icon={['fas', 'caret-right']} onClick={() => handleValue(true)} title='+'/>
      </button>   
    </div>
  );
};


export default SettingRecord