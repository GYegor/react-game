import React from "react";
import { useSpring, animated } from 'react-spring';
import "../App.scss";

import { tileGap, TileProps, tileWidth } from "../App.model";
import { calculateFontSize } from "../App.service";

const Tile: React.FC<TileProps> = ({ tile, enterLeaveStyles }) => {
 
  const fontSize = calculateFontSize(tile, tileWidth);

  const styles = useSpring({
      top: (tile.row - 1) * (tileWidth + tileGap) + tileGap,
      left: (tile.col - 1) * (tileWidth + tileGap) + tileGap,
      config: { duration: 150 },
      height: tileWidth,
      width: tileWidth,
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
