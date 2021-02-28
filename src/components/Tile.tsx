import React from "react";
import "../App.scss";
import { TileProps } from "../App.model";

const Tile: React.FC<TileProps> = ({ tileConfig: { row, col, value } }) => {
  return (
    <div className={`Tile AppearAt-${row}-${col} Value-${value}`}>{value}</div>
  );
};

export default Tile;
