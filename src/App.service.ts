import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import { TileConfig, GameSize } from './App.model';


export const getCellMatrix = (size: GameSize) => {
    return Array.from({ length: size }).reduce<TileConfig[]>((acc, val, i) => {
    acc.push(...Array.from({ length: size }, (_el, j) => ({
        row: i + 1,
        col: j + 1,
    } as TileConfig)));
    return acc
    }, [])
}

export const getEmptyCells = (tileList: TileConfig[], cellMatrix: TileConfig[]) =>
    cellMatrix.filter((cell) => !tileList.find((tile) => tile.row === cell.row && tile.col === cell.col)
);

export const tilesAddedTileList = (cellMatrix: TileConfig[], tileList: TileConfig[], setTleList: React.Dispatch<React.SetStateAction<TileConfig[]>>) => {
    const clonedTileList = cloneDeep(tileList);
    let emtyCells = getEmptyCells(tileList, cellMatrix);
    clonedTileList.push({ ...emtyCells[Math.floor(Math.random() * emtyCells.length)], value: 2, key: uuidv4()})
    emtyCells = getEmptyCells(clonedTileList, cellMatrix);
    clonedTileList.push({ ...emtyCells[Math.floor(Math.random() * emtyCells.length)], value: 2, key: uuidv4()})
    setTleList(clonedTileList);
}
