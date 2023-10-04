import {WINNER_COMBOS} from '../constanst.js';

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo;
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      console.log(boardToCheck[a]);
      return boardToCheck[a];
    }
  }
  return null;
};


export const checkEndGame = (newBoard) => {
  return newBoard.every((square) => square !== null)
}