import { v4 as uuidv4 } from 'uuid';
import cloneDeep from 'lodash/cloneDeep';
import { TileConfig, GameSize, CollapseDirection } from './App.model';


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

export const addTwoRandomTiles = (
    cellMatrix: TileConfig[], 
    tileList: TileConfig[], 
    setTleList: React.Dispatch<React.SetStateAction<TileConfig[]>>
) => {
    const clonedTileList = cloneDeep(tileList);
    let emtyCells = getEmptyCells(tileList, cellMatrix);
    clonedTileList.push({ ...emtyCells[Math.floor(Math.random() * emtyCells.length)], value: 2, key: uuidv4(), appeared: true})
    emtyCells = getEmptyCells(clonedTileList, cellMatrix);
    clonedTileList.push({ ...emtyCells[Math.floor(Math.random() * emtyCells.length)], value: 2, key: uuidv4(), appeared: true})
    // clonedTileList.forEach(tile => delete tile.merged);
    setTleList(clonedTileList);
}

const reduceTileLine = (line: TileConfig[]) => (
    line.reduce<TileConfig[]>((acc, curTile, curIdx, line) => {
        if (curIdx + 1 < line.length && curTile.value === line[curIdx + 1].value) {
            curTile.merged = true;
            curTile.value && (curTile.value *= 2);
            line.splice(curIdx + 1, 1);
        }
        acc.push(curTile)
      return acc;  
    }, [] as TileConfig[])
);

const getCollapsedTileLine = (line: TileConfig[], collapseDirection: CollapseDirection, size: GameSize) => {
    const clonedLine = cloneDeep(line);
    switch (collapseDirection) {
        case 'right': {
            clonedLine.sort((a, b) => b.col - a.col) // sort from more to less
            let newCol = size;
            return reduceTileLine(clonedLine).map(tile => {
                tile.col = newCol;
                newCol -= 1;
                return tile;
            }).sort((a, b) => a.col - b.col);
        }
        case 'left': {
            clonedLine.sort((a, b) => a.col - b.col) // sort from less to more
            return reduceTileLine(clonedLine).map((tile, i) => {
                tile.col = i + 1;
                return tile;
            });
        }
        case 'up': {
            clonedLine.sort((a, b) => a.row - b.row) // sort from less to more
            return reduceTileLine(clonedLine).map((tile, i) => {
                tile.row = i + 1;
                return tile;
            });
        }
        case 'down': {
            clonedLine.sort((a, b) => b.row - a.row) // sort from more to less
            let newRow = size;
            return reduceTileLine(clonedLine).map(tile => {
                tile.row = newRow;
                newRow -= 1;
                return tile;
            }).sort((a, b) => a.row - b.row);
        }
    }
};

const getTileRowsToCollapse = (tileList: TileConfig[], length: GameSize): TileConfig[][] =>  (
    Array.from( { length } ).map((_el, i) => tileList.filter(tile => tile.row === i + 1))
);

const getTileColsToCollapse = (tileList: TileConfig[], length: GameSize): TileConfig[][] => (
    Array.from( { length } ).map((_el, i) => tileList.filter(tile => tile.col === i + 1))
);

// main function
export const setCollapsedTileList = (
  tileList: TileConfig[],
  direction: CollapseDirection,
  size: GameSize,
) => {
    tileList.forEach(tile => { delete tile.appeared; delete tile.merged; tile.slid = true; });
    switch (direction) {
        case "right":
        case "left":
            const rows = getTileRowsToCollapse(tileList, size);
            const collapsedRows = rows.map((row) => getCollapsedTileLine(row, direction, size));
            return collapsedRows.flat();
        case "up":
        case "down":
            const cols = getTileColsToCollapse(tileList, size);
            const collapsedCols = cols.map((col) => getCollapsedTileLine(col, direction, size));
            return collapsedCols.flat();
    }
};

