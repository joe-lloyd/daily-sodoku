import styles from './sudoku-game.module.css';
import { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => setTime((prev) => prev + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [isRunning]);

  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Daily Sudoku</h1>
      <div className={styles.timer}>Time: {time} seconds</div>
    </div>
  );
};

export default Header;
