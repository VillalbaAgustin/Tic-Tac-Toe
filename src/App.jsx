import { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";

import { Square } from "./components/Square";
import { TURNS } from "./constanst.js";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(()=>{
    const turnFromLocalStorage = window.localStorage.getItem('turn');
    return turnFromLocalStorage ?? TURNS.x
  });

  const [winner, setWinner] = useState(null); //* null no hay ganador, false empate.

  const updateBoard = (index) => {
    //No actualizamos si la posición ya esta marcada o hay un ganador
    if (board[index] || winner) return;

    //Actualizar tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar de turno
    turn === TURNS.x ? setTurn(TURNS.o) : setTurn(TURNS.x);

    //Guardamos partida local storage 
    window.localStorage.setItem('board' ,JSON.stringify(newBoard));
    window.localStorage.setItem('turn', turn);
    
    //Revisamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false); //Empate
    }
  };

  const restGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWinner(null);
  };

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <button onClick={restGame}>Empezar de nuevo</button>
      <WinnerModal restGame={restGame} winner={winner} />
    </main>
  );
}

export default App;
