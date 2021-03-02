import React from "react";
import { Transition } from 'react-spring/renderprops';
import "../App.scss";

import { TileListProps } from "../App.model";
import Tile from "./Tile";


const TileList: React.FC<TileListProps> = ({ tileList: items }) => (
  <div>
    <Transition
      items={items}
      keys={items.map(item => item.key)}
      from={(item) => { return item.merged ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}}
      enter={{ transform: 'scale(1)' }}
      leave={{ transform: 'scale(0)' }}
      config={{duration: 0}}
    >
      {tile => styles => (
        <Tile key={tile.key} tile={tile} enterLeaveStyles={styles} />
      )}
    </Transition>
  </div>
)

export default TileList;
