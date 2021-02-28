import React from "react";

import "../App.scss";
import { TileListProps } from "../App.model";
import Tile from "./Tile";

const TileList: React.FC<TileListProps> = ({ tileList }) => {
  const tileListToRender = tileList.map((tile) => (
    <Tile key={tile.key} tileConfig={tile} />
  ));

  return <div className="TileList">{tileListToRender}</div>;
};

export default TileList;
