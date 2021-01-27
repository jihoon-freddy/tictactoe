import React, { useContext } from "react";
import { GameContext } from "./Game";

const Square = (props) => {
  const { squares, dispatch } = useContext(GameContext);
  const setSquares = (e) => {
    dispatch({ type: "SET_SQUARES", payload: props.index });
  };
  return (
    <>
      {/* <button className="square" onClick={props.onClick}> */}
      <button className="square" onClick={setSquares}>
        {props.value}
      </button>
    </>
  );
};

export default Square;
