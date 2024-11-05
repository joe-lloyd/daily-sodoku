'use client';

import { useEffect, useState } from 'react';
import Subgrid from './Subgrid';
import Header from './Header';
import styles from './sudoku-game.module.css';
import { FocusedCells, NoteGrid, SudokuGrid, SudokuPuzzle } from '@/app/components/types';
import { handleKeyPress } from '@/app/components/handleKeyPress';

const examplePuzzle: SudokuPuzzle = {
  solution: [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    ['4', '5', '6', '7', '8', '9', '1', '2', '3'],
    ['7', '8', '9', '1', '2', '3', '4', '5', '6'],
    ['2', '3', '4', '5', '6', '7', '8', '9', '1'],
    ['5', '6', '7', '8', '9', '1', '2', '3', '4'],
    ['8', '9', '1', '2', '3', '4', '5', '6', '7'],
    ['3', '4', '5', '6', '7', '8', '9', '1', '2'],
    ['6', '7', '8', '9', '1', '2', '3', '4', '5'],
    ['9', '1', '2', '3', '4', '5', '6', '7', '8'],
  ],
  start: [
    ['1', null, '3', null, '5', null, '7', null, '9'],
    [null, '5', null, '7', null, '9', null, '2', null],
    ['7', null, '9', null, '2', null, '4', null, '6'],
    [null, '3', null, '5', null, '7', null, '9', null],
    ['5', null, '7', null, '9', null, '2', null, '4'],
    [null, '9', null, '2', null, '4', null, '6', null],
    ['3', null, '5', null, '7', null, '9', null, '2'],
    [null, '7', null, '9', null, '2', null, '4', null],
    ['9', null, '2', null, '4', null, '6', null, '8'],
  ],
};

export default function SudokuGame() {
  const [puzzleSolution, setPuzzleSolution] = useState<SudokuGrid>(examplePuzzle.solution);
  const [puzzleStart, setPuzzleStart] = useState<SudokuGrid>(examplePuzzle.start);
  const [isDragging, setIsDragging] = useState(false);
  const [puzzleProgress, setPuzzleProgress] = useState<SudokuGrid>(examplePuzzle.start);
  const [notes, setNotes] = useState<NoteGrid>(
    [...new Array(9).fill([...(new Array(9).fill(''))])],
  );

  const [focusedCells, setFocusedCells] = useState<FocusedCells>([]);


  const handleCellMouseDown = (subgridIndex: number, cellIndex: number) => {
    setIsDragging(true);
    setFocusedCells([{ subgridIndex, cellIndex }]);
  };

  const handleCellMouseEnter = (subgridIndex: number, cellIndex: number) => {
    if (isDragging) {
      setFocusedCells((prev) => {
        if (prev) {
          return [...prev, { subgridIndex, cellIndex }];
        }
        return [{ subgridIndex, cellIndex }];
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    const keyDownHandler = (event: KeyboardEvent) => {
      if (!focusedCells) return;
      handleKeyPress({ event, focusedCells, setNotes, setPuzzleProgress });
    };

    window.addEventListener('keydown', keyDownHandler);
    return () => window.removeEventListener('keydown', keyDownHandler);
  }, [focusedCells, setNotes, setPuzzleProgress]);

  return (
    <div className={styles.page}>
      <Header />
      <div className={styles.grid}>
        {puzzleProgress.map((subgrid, subgridIndex) => (
          <Subgrid
            key={subgridIndex}
            subgrid={subgrid}
            notes={notes[subgridIndex]}
            focusedCells={focusedCells}
            subgridIndex={subgridIndex}
            onCellMouseDown={handleCellMouseDown}
            onCellMouseEnter={handleCellMouseEnter}
          />
        ))}
      </div>
    </div>
  );
}
