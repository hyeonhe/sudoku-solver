import React, { useState } from "react";
import "./SudokuSolver.css";

function SudokuSolver() {
  const initialSudokuBoard = Array.from({ length: 9 }, () =>
    Array(9).fill(null)
  );

  const [sudokuBoard, setSudokuBoard] = useState(initialSudokuBoard);

  const is_valid = (board, row, col, num) => {
    // 행에 중복된 숫자가 있는지 확인
    if (board[row].includes(num)) {
      return false;
    }

    // 열에 중복된 숫자가 있는지 확인
    if (board.map((row) => row[col]).includes(num)) {
      return false;
    }

    // 3x3 작은 사각형에 중복된 숫자가 있는지 확인
    const startRow = 3 * Math.floor(row / 3);
    const startCol = 3 * Math.floor(col / 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const find_empty_location = (board) => {
    // 빈 칸의 좌표를 찾음
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === null) {
          return [i, j];
        }
      }
    }
    return [null, null]; // 빈 칸이 없으면 [null, null] 반환
  };

  const solve_sudoku = (board) => {
    const [row, col] = find_empty_location(board);

    // 기저 사례: 모든 칸이 채워졌으면 종료
    if (row === null) {
      return [board];
    }

    let solutions = [];

    // 1부터 9까지의 숫자를 시도하며 가능한 경우를 찾음
    for (let num = 1; num <= 9; num++) {
      if (is_valid(board, row, col, num)) {
        const newBoard = board.map((row) => [...row]); // 깊은 복사
        newBoard[row][col] = num;

        // 재귀적으로 다음 빈 칸을 채움
        const nextSolutions = solve_sudoku(newBoard);
        solutions = solutions.concat(nextSolutions);
      }
    }

    return solutions;
  };

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newBoard = sudokuBoard.map((row) => [...row]);
    const parsedValue = parseInt(value, 10);
    newBoard[rowIndex][colIndex] =
      !isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9
        ? parsedValue
        : null;
    setSudokuBoard(newBoard);
  };

  const resetBoard = () => {
    setSudokuBoard(initialSudokuBoard);
  };

  const solvePuzzle = () => {
    const solutions = solve_sudoku(sudokuBoard);
    if (solutions.length > 0) {
      // 모든 가능한 해를 찾은 경우 첫 번째 해를 보여줌
      setSudokuBoard(solutions[0]);
    } else {
      // 해답이 없는 경우에 대한 알림
      alert("해답이 없습니다.");
    }
  };

  return (
    <div>
      <h1 className="title">Sudoku Solver</h1>
      <table className="sudoku-board">
        <tbody>
          {sudokuBoard.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={cell === null ? "" : cell}
                    onChange={(e) =>
                      handleInputChange(rowIndex, colIndex, e.target.value)
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>{" "}
      <div className="sudoku-buttons">
        <button className="sudoku-buttons button solve" onClick={solvePuzzle}>
          Solve
        </button>
        <button className="sudoku-buttons button reset" onClick={resetBoard}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default SudokuSolver;
