import React from "react";
import { useSpring, animated } from 'react-spring';
import "../App.scss";

import { TileProps } from "../App.model";
import { calculateFontSize } from "../App.service";

const Tile: React.FC<TileProps> = ({ tile, enterLeaveStyles, gameConfig }) => {
 
  const fontSize = calculateFontSize(tile, gameConfig.tileWidth);

  const styles = useSpring({
      top: (tile.row - 1) * (gameConfig.tileWidth + gameConfig.tileGap) + gameConfig.tileGap,
      left: (tile.col - 1) * (gameConfig.tileWidth + gameConfig.tileGap) + gameConfig.tileGap,
      config: { duration: 150 },
      height: gameConfig.tileWidth,
      width: gameConfig.tileWidth,
      fontSize,
  });

    return (
    <animated.div
      className={`Tile Value-${tile.value} ${tile.merged ? 'Merged' : ''} ${gameConfig.isDarkTheme ? 'DarkTheme' : ''}`}
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
