import Cell from './Cell';
import styles from './sudoku-game.module.css';
import { SubgridProps } from '@/app/components/types';


const Subgrid: React.FC<SubgridProps> = ({
                                           subgrid,
                                           notes,
                                           focusedCells,
                                           subgridIndex,
                                           onCellMouseDown,
                                           onCellMouseEnter,
                                         }) => {
  return (
    <div className={styles.subgrid}>
      {subgrid.map((value, cellIndex) => (
        <Cell
          key={`${subgridIndex}-${cellIndex}`}
          value={value}
          notes={notes[cellIndex]}
          isFocused={
            focusedCells?.some(
              (cell) => cell.subgridIndex === subgridIndex && cell.cellIndex === cellIndex
            ) ?? false
          }
          onMouseDown={() => onCellMouseDown(subgridIndex, cellIndex)}
          onMouseEnter={() => onCellMouseEnter(subgridIndex, cellIndex)}
        />
      ))}
    </div>
  );
};

export default Subgrid;
