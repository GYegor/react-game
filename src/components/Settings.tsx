import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useSound from 'use-sound';
import swishTiles from  '../assets/swish.mp3'

import { ControlsProps, SettingsProps } from '../App.model';

const Settings: React.FC<SettingsProps> = ({ openModal }) => {

  // const soundUrl = '/sounds/909-drums.mp3';

  

  return (
    <div className={`Settings ${openModal && 'OpenModal'}`}>

    </div>
  );
};


export default Settings