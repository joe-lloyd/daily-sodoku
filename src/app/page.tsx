import styles from "./page.module.css";
import SudokuGame from "@/app/components/SudokuGame";

export default function Home() {
  return (
    <div className={styles.page}>
      <SudokuGame />
    </div>
  );
}
