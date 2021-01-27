import React, { useContext } from "react";
import Square from "./Square";
import { GameContext } from "./Game";

const Board = (props) => {
  // GameContext.Consumer 대신 간편하게 useContext 사용함
  // 상위 component 에서 <GameContext.Provider value= 값에 squares 와 dispatch 를 인자로 넘겼으므로 두개를 받아와야 함
  const { squares, dispatch } = useContext(GameContext);

  const renderSquare = (i) => {
    return (
      <Square
        // value={props.squares[i]}
        value={squares[i]} // useContext 를 통해 데이터를 받아오므로 위의 props 는 사용하지 않는다.
        //onClick={() => props.onClick(i)}
        index={i} // 위의 onClick 은 왜 제거 되었을까? 상위 component 의 onclick 을 호출하지 않고 Square.js onClick={setSquares}로 처리하기 때문
      />
    );
  };

  return (
    <>
      <div>
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    </>
  );
};

export default Board;
