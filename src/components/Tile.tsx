import React from "react";
import { useSpring, animated } from 'react-spring';
import "../App.scss";

import { TileProps } from "../App.model";
import { calculateFontSize } from "../App.service";

const Tile: React.FC<TileProps> = ({ tile, enterLeaveStyles, gridConfig }) => {
 
  const fontSize = calculateFontSize(tile, gridConfig.tileWidth);

  const styles = useSpring({
      top: (tile.row - 1) * (gridConfig.tileWidth + gridConfig.tileGap) + gridConfig.tileGap,
      left: (tile.col - 1) * (gridConfig.tileWidth + gridConfig.tileGap) + gridConfig.tileGap,
      config: { duration: 150 },
      height: gridConfig.tileWidth,
      width: gridConfig.tileWidth,
      fontSize,
  });

    return (
    <animated.div
      className={`Tile Value-${tile.value} ${tile.merged ? 'Merged' : ''}`}
      style={{ 
        ...styles, 
        ...enterLeaveStyles, 
      }}
    >
      {tile.value}
    </animated.div>
  );
};

export default Tile;
