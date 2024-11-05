import { FocusedCells, NoteGrid, SudokuCell, SudokuGrid } from '@/app/components/types';
import { Dispatch, SetStateAction } from 'react';

interface KeyPressProps {
  event: KeyboardEvent;
  focusedCells: FocusedCells;
  setNotes: Dispatch<SetStateAction<NoteGrid>>;
  setPuzzleProgress: Dispatch<SetStateAction<SudokuGrid>>;
}

export function handleKeyPress({
                                 event,
                                 focusedCells,
                                 setNotes,
                                 setPuzzleProgress,
                               }: KeyPressProps) {
  if (!focusedCells.length) return;

  const key = event.code;
  const isShift = event.getModifierState('Shift');
  const isDigit = key.startsWith('Digit') && key <= 'Digit9';
  const isBackspace = key === 'Backspace';

  if (isShift) {
    if(isDigit) {
      const inputValue = key.slice(5) as SudokuCell;
      return setNotes((prevNotes) => stateFunctionSetNotes(prevNotes, focusedCells, inputValue));
    }
    if(isBackspace) {
      return setNotes((prevNotes) => stateFunctionSetNotes(prevNotes, focusedCells, null));
    }
  }

  if (isDigit) {
    const inputValue = key.slice(5) as SudokuCell;
    return setPuzzleProgress((prevPuzzle) => stateFunctionSetPuzzleProgress(prevPuzzle, focusedCells, inputValue));
  }

  if (isBackspace) {
    return setPuzzleProgress((prevPuzzle) => stateFunctionSetPuzzleProgress(prevPuzzle, focusedCells, null));
  }
}

const stateFunctionSetPuzzleProgress = (
  prevState: SudokuGrid,
  focusedCells: FocusedCells,
  inputValue: SudokuCell | null,
) => {
  const newPuzzle = prevState.map((row) => [...row]) as SudokuGrid;

  focusedCells.forEach(({ subgridIndex, cellIndex }) => {
    newPuzzle[subgridIndex][cellIndex] = inputValue;
  });

  return newPuzzle;
};

const stateFunctionSetNotes = (prevState: NoteGrid, focusedCells: FocusedCells, inputValue: string | null) => {
  const notes = [...prevState].map((subgrid) => [...subgrid]);

  focusedCells.forEach(({ subgridIndex, cellIndex }) => {
    const currentNotes = notes[subgridIndex][cellIndex];

    if (inputValue === null) {
      if (!currentNotes) return prevState;
      notes[subgridIndex][cellIndex] = currentNotes.substring(0, currentNotes.length - 1);
      return notes;
    }

    if (currentNotes.includes(inputValue)) return prevState;

    notes[subgridIndex][cellIndex] = !!currentNotes ? `${currentNotes}${inputValue}` : `${inputValue}`;
  });
  return notes;
};
