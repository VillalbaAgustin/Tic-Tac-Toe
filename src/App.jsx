import { useState } from "react";
import "./App.css";

const TURNS = {
  x: "X",
  o: "O",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? "is-selected" : ""}`;
  const hadleClick = () => {
    updateBoard(index);
  };

  return (
    <div className={className} onClick={hadleClick}>
      {children}
    </div>
  );
};

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);

  const updateBoard = (index ) => {
    const newBoard =  [...board] ;
    newBoard[index] = turn;
    setBoard(newBoard);
    (turn === TURNS.x) ? setTurn(TURNS.o) : setTurn(TURNS.x);
  };

console.log(board)

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
    </main>
  );
}

export default App;
