import React, { useState, useEffect, useReducer } from "react";
import Board from "./Board";
import { calculateWinner } from "./Util";

export const GameContext = React.createContext();

// Reducer 생성
// 아래 양식은 예시

// const gameReducer = (squares, {type, payload}) => {
// 	switch(type){
// 		case 'CHANGE_SQUARE':
// 			return '변경된 squares';
// 	}
// }

const gameReducer = (state, { type, payload }) => { // 변경되는 state 값을 return 한다.
  switch (type) {
    case "SET_SQUARES":
      // 승자 있을 시, 적용 안함
      if (calculateWinner(state.squares) != null) return state;
      state.squares = state.squares.map((square, index) => {
        const nextText = state.xIsNext ? "X" : "O";
        if (!square && payload === index) {
          // console.log(`nexttext : ${nexttext}`)
          state.xIsNext = !state.xIsNext;
          return nextText;
        } else {
          return square;
        }
      });
      // console.log(`after state: ${JSON.stringify(state)}`)
      // 승자 정하기
      if (calculateWinner(state.squares) != null)
        state.status = "Winner : " + (state.xIsNext ? "O" : "X");
      return Object.assign({}, state);
    case "SET_STATUS":
      // 승리 여부
      state.status = "Winner : " + (state.xIsNext ? "O" : "X");
      return Object.assign({}, state);
    default:
      break;
  }
};

// 초기화
const Game = () => {
  const initSquares = Array(9).fill(null);
  // const [state, dispatch] = useReducer(reducer, initialArg, init);
  // state : 상태값
  // dispatch : 여러가지 action 을 받아서 reducer에 dispatch 하는 function
  // reducer : action에 따라 처리된 state 리턴하는 function
  // initialArg : state 초기값
  // init : state 초기값을 지연시켜 세팅하는 function
  const [state, dispatch] = useReducer(gameReducer, {   // userReducer 내부에서 reducer 와 초기화 동시 진행
    squares: initSquares,
    xIsNext: true,
    status: "",
  });

  /*
const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("");

  const handleClick = (idx) => {
    setSquares(
      squares.map((square, i) => {
        const nextText = xIsNext ? "X" : "O";
        if (idx == i && square == null) {
          setXIsNext(!xIsNext);
          return nextText;
        } else {
          return square;
        }
      })
    );
  };

  useEffect(() => {
    if (calculateWinner(squares) != null) {
      setStatus("Winner : " + (xIsNext ? "O" : "X"));
    }
  }, [squares]);
*/
  return (
    <div>
      <div className="game">
        <div className="game-board">
          {/* <Board squares={squares} onClick={(i) => handleClick(i)} /> */}
          <GameContext.Provider value={{ squares: state.squares, dispatch }}>
            <Board />
          </GameContext.Provider>
        </div>
        <div className="game-info">
          <div>{state.status}</div>
          {/* <ol>{moves}</ol> */}
        </div>
      </div>
    </div>
  );
};

export default Game;
