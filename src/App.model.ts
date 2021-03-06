import { IconName } from "@fortawesome/fontawesome-svg-core";

// export type RowSize = 2 | 4 | 5 | 6 | 10;
export type RowSize = number;

export interface GameProps {
  size: RowSize
}

export interface GameConfig {
  size: RowSize;
  newTilesQuantity: number
  tileWidth: number;
  tileGap: number; 
  isDarkTheme?: boolean;
  soundVolume?: number;
  soundOn?: number;
  gameCount?: number;
 }

export interface ControlsProps {
  startNewGame: () => void;
  openSettings: () => void;
  toggleMusic: () => void;
  musicConfig: MusicConfig;
  startBtnIcon: IconName;
}

export interface SettingsProps {
  gameConfig: GameConfig;
  openModal: boolean;
  passToParentGameConfig: (value: GameConfig) => void;
  closeSettings: () => void;
}

export interface SettingRecordProps {
  gameConfig: GameConfig;
  settingRecordType: SettingRecordType;
  value?: number;
  booleanValue?:boolean;
  getNewValue?: (value: number) => void;
  getNewBooleanValue?: (value: boolean) => void;
}

export enum SettingRecordType {
  RowSize = 'Row size',
  NewTiles  = 'New tiles',
  // Language  = 'Language',
  ColorTheme  = 'Color theme',
  MusicVolume  = 'Music volume', 
  MusicOn  = 'Music play/stop',
  SoundVolime  = 'Sounds volume',
  SoundOn  = 'Mute sounds'
}

export interface MusicConfig {
  musicOn: boolean;
  icon: IconName;
  title: string;
}

export interface TileProps {
  tile: TileConfig;
  enterLeaveStyles: any;
  gameConfig: GameConfig;
}

export interface TileConfig {
  key: string;
  row:  number;
  col:  number;
  value?:  TileValue;
  appeared?: boolean;
  merged?: boolean;
  shouldDelete?: boolean;
}

export type TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

export interface TileListProps {
    tileList: TileConfig[];
    gameConfig: GameConfig;
}

export type CollapseDirection = 'right' | 'left' | 'up' | 'down';

export enum Keys {
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  ArrowLeft = 'ArrowLeft',
  ArrowRight = 'ArrowRight',
  KeyUp = 'KeyW',
  KeyDown = 'KeyS',
  KeyLeft = 'KeyA',
  KeyRight = 'KeyD',
  NewGame = 'KeyN',
  Settings = 'KeyC',
  EscapeSettings = 'Escape',
}

export const quantity = 2;

export const boardWidth = 450

