export interface GameProps {
  size: GameSize
}

export type GameSize = 4 | 5 | 6;

export interface TileProps {
    tileConfig: TileConfig;
}

export interface TileConfig {
    key: string;
    row:  PositionValue;
    col:  PositionValue;
    value?:  TileValue
}

export type PositionValue = 1 | 2 | 3 | 4;

export type TileValue = 2 | 4 | 8 | 16 | 32 | 64 | 128 | 256 | 512 | 1024 | 2048;

export interface TileListProps {
    tileList: TileConfig[];
}


