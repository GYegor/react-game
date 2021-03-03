import { v4 as uuidv4 } from 'uuid';
import { TileConfig, GameSize, CollapseDirection } from './App.model';


export const getCellMatrix = (length: GameSize) => {
  return Array.from({ length }).reduce<TileConfig[]>((acc, _val, i) => {
  acc.push(...Array.from({ length }, (_el, j) => ({
    row: i + 1,
    col: j + 1,
  } as TileConfig)));
  return acc
  }, [])
}

export const getEmptyCells = (tileList: TileConfig[], cellMatrix: TileConfig[]) =>
    cellMatrix.filter((cell) => !tileList.find((tile) => tile.row === cell.row && tile.col === cell.col)
);

export const addRandomTiles = ( cellMatrix: TileConfig[], tileList: TileConfig[], tilesQuantity = 2 ) => {
  let curEmptyCells = getEmptyCells(tileList, cellMatrix);
  let randomCells = [] as TileConfig[];

  Array(tilesQuantity).fill(0).forEach(_el => {
    randomCells.push({ ...curEmptyCells[Math.floor(Math.random() * curEmptyCells.length)], value: 2, key: uuidv4(), appeared: true})
    curEmptyCells = getEmptyCells([...tileList, ...randomCells], cellMatrix);
  })

  return [...tileList, ...randomCells ]
}

const reduceTileLine = (line: TileConfig[]) => (
  line.reduce<TileConfig[]>((acc, curTile, curIdx, line) => {
    if (curIdx + 1 < line.length && curTile.value === line[curIdx + 1].value && !curTile.shouldDelete) {
      const mergedTile = {
        ...curTile,
        key: uuidv4(),
        value: curTile.value && (curTile.value *= 2),
        merged: true,
      } as TileConfig
      curTile.shouldDelete = true;
      line[curIdx + 1].shouldDelete = true;
      acc.push(mergedTile, curTile)
    } else {
      acc.push(curTile)
    }
  return acc;  
  }, [] as TileConfig[])
);

const getCollapsedTileLine = (line: TileConfig[], collapseDirection: CollapseDirection, size: GameSize) => {
  switch (collapseDirection) {
    case 'right': {
      line.sort((a, b) => b.col - a.col) // sort from more to less
      let newCol = size;
      return reduceTileLine(line).map((tile, i, arr) => {
        tile.col = newCol;
        if (arr[i + 1] && !arr[i + 1].shouldDelete) {   //tiles for deletion should have same col with new merged tile ( order [merged, shouldDelete, shouldDelete])
          newCol -= 1;
        } 
        return tile;
      }).sort((a, b) => a.col - b.col);
    }
    case 'left': {
      line.sort((a, b) => a.col - b.col) // sort from less to more
      let newCol = 1;
      return reduceTileLine(line).map((tile, i, arr) => {
        tile.col = newCol;
        if (arr[i + 1] && !arr[i + 1].shouldDelete) {   //tiles for deletion should have same col with new merged tile
          newCol += 1;
        } 
        return tile;
      });
    }
    case 'up': {
      line.sort((a, b) => a.row - b.row) // sort from less to more
      let newRow = 1;
      return reduceTileLine(line).map((tile, i, arr) => {
        tile.row = newRow;
        if (arr[i + 1] && !arr[i + 1].shouldDelete) {   //tiles for deletion should have same col with new merged tile
          newRow += 1;
        } 
        return tile;
      });
    }
    case 'down': {
      line.sort((a, b) => b.row - a.row) // sort from more to less
      let newRow = size;
      return reduceTileLine(line).map((tile, i, arr) => {
        tile.row = newRow;
        if (arr[i + 1] && !arr[i + 1].shouldDelete) {   //tiles for deletion should have same col with new merged tile ( order [merged, shouldDelete, shouldDelete])
          newRow -= 1;
        } 
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
export const getCollapsedTileList = (
  tileList: TileConfig[],
  direction: CollapseDirection,
  size: GameSize,
) => {
  const clearedTileList = tileList.filter(tile => !tile.shouldDelete )
  clearedTileList.forEach(tile => { delete tile.appeared; delete tile.merged; });
  switch (direction) {
    case "right":
    case "left":
      const rows = getTileRowsToCollapse(clearedTileList, size);
      const collapsedRows = rows.map((row) => getCollapsedTileLine(row, direction, size));
      return collapsedRows.flat();
    case "up":
    case "down":
      const cols = getTileColsToCollapse(clearedTileList, size);
      const collapsedCols = cols.map((col) => getCollapsedTileLine(col, direction, size));
      return collapsedCols.flat();
  }
};


export const calculateFontSize = (tile: TileConfig, tileWidth: number) => {
  switch (tile.value) {
    case 2:
    case 4:
    case 8:
    case 16:
    case 32:
    case 64:
      return tileWidth * 0.55;
    case 128:
    case 256:
    case 512:
      return tileWidth * 0.45;
    case 1024:
    case 2048:
      return tileWidth * 0.35;
  }
}
