import styles from './sudoku-game.module.css';
import { CellProps } from '@/app/components/types';

const Cell: React.FC<CellProps> = ({ value, notes, isFocused, onMouseDown, onMouseEnter }) => {
  return (
    <div
      className={`${styles.cell} ${isFocused ? styles.focusedCell : ''}`}
      onMouseDown={onMouseDown}
      onMouseEnter={onMouseEnter}
    >
      {value ? (
        value
      ) : (
        <div className={styles.notes}>
            <span className={styles.note}>
              {notes}
            </span>
        </div>
      )}
    </div>
  );
};

export default Cell;
