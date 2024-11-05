// src/app/components/types.ts

export type SudokuCell = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | null;
export type SudokuSubgrid = [
  SudokuCell,
  SudokuCell,
  SudokuCell,
  SudokuCell,
  SudokuCell,
  SudokuCell,
  SudokuCell,
  SudokuCell,
  SudokuCell
];
export type SudokuGrid = [
  SudokuSubgrid,
  SudokuSubgrid,
  SudokuSubgrid,
  SudokuSubgrid,
  SudokuSubgrid,
  SudokuSubgrid,
  SudokuSubgrid,
  SudokuSubgrid,
  SudokuSubgrid
];

export type SudokuPuzzle = {
  solution: SudokuGrid;
  start: SudokuGrid;
};

export type NoteSubGrid = Array<string>;
export type NoteGrid = Array<NoteSubGrid>;

export type FocusedCells = { subgridIndex: number; cellIndex: number }[];

export interface SubgridProps {
  subgrid: SudokuCell[];
  notes: NoteSubGrid;
  focusedCells: FocusedCells;
  subgridIndex: number;
  onCellMouseDown: (subgridIndex: number, cellIndex: number) => void;
  onCellMouseEnter: (subgridIndex: number, cellIndex: number) => void;
}

export interface CellProps {
  value: SudokuCell;
  notes: string;
  isFocused: boolean;
  onMouseDown: () => void;
  onMouseEnter: () => void;
}
