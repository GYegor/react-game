import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import click from  '../assets/click.wav'



import { SettingRecordProps, SettingRecordType } from '../App.model';
import useSound from 'use-sound';

const SettingRecord: React.FC<SettingRecordProps> = ({ settingRecordType, value, getNewValue, gameConfig }) => {

  const [ clickSound ] = useSound(click, { volume: 0.5 });


  const handleValue = (increase: boolean) => {
    clickSound();
    if (value) {
      switch (settingRecordType) {
        // case SettingRecordType.ColorTheme:
        //   return value === 'Dark' ? getNewValue('Light') : getNewValue('Dark')
        case SettingRecordType.NewTiles:
        case SettingRecordType.RowSize:
          return increase ? getNewValue(value < 8 ? value += 1 : value)  : getNewValue(value > 4 ? value -= 1 : value);
      }
    }
  }

  return (
    <div className="SettingRecordWrapper">          
      <p><b>{settingRecordType + ': '}</b></p> 
      <button className="Button IconWrapper IconWrapper__settingRecord" onClick={() => handleValue(false)} title='-'>
        <FontAwesomeIcon icon={['fas', 'caret-left']}/>
      </button>  
      <p><b>{value}</b></p> 
      <button className="Button IconWrapper IconWrapper__settingRecord" onClick={() => handleValue(true)} title='+'>
        <FontAwesomeIcon icon={['fas', 'caret-right']}/>
      </button>   
    </div>
  );
};


export default SettingRecord