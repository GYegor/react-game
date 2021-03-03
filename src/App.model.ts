import { IconName } from "@fortawesome/fontawesome-svg-core";

export type GameSize = 2 | 4 | 5 | 6 | 10;

export interface GameProps {
  size: GameSize
}
export interface ControlsProps {
	startNewGame: () => void;
	openSettings: () => void;
	toggleMusic: () => void;
	musicConfig: MusicConfig;
}
export interface SettingsProps {
	openModal: boolean;
}

export interface MusicConfig {
	musicOn: boolean;
	icon: IconName;
	title: string;
}

export interface TileProps {
	tile: TileConfig;
	enterLeaveStyles: any;
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
	EscapeSettings = 'Escape',
}

export const defaultSize: GameSize = 4;

export const defaultTilesToAddQuantity = 2;

export const boardWidth = 450

export const tileWidth = 10*boardWidth/(11*defaultSize + 1) ;

export const tileGap = tileWidth/10;