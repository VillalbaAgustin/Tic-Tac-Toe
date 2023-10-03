import { useState } from "react";
import "./App.css";

const TURNS = {
  x: "X",
  o: "O",
};

const WINNER_COMBOS = [
  [0 , 1 , 2],
  [3 , 4 , 5],
  [6 , 7 , 8],
  [0 , 3 , 6],
  [1 , 4 , 7],
  [2 , 5 , 8],
  [0 , 4 , 8],
  [2 , 4 , 6],
]

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
  const [winner, setWinner] = useState(null); //* null no hay ganador, false empate.


  const checkWinner = (boardToCheck) =>{
    for ( const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
      if (
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        console.log(boardToCheck[a])
        return boardToCheck[a]
      }
    }
    return null;
  }


  const updateBoard = (index ) => {
    //No actualizamos si la posición ya esta marcada o hay un ganador
    if (board[index] || winner) return;

    //Actualizar tablero
    const newBoard =  [...board] ;
    newBoard[index] = turn;
    setBoard(newBoard);

    //Cambiar de turno
    (turn === TURNS.x) ? setTurn(TURNS.o) : setTurn(TURNS.x);

    //Revisamos si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner)
    }
  };

// console.log(board)

  return (
    <main className="board">
      <h1>Tic Tac Toe</h1>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
              {/* {index} */}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
        <Square isSelected={turn === TURNS.o}>{TURNS.o}</Square>
      </section>
      <section>
        {
          winner !== null
        }
      </section>
    </main>
  );
}

export default App;
