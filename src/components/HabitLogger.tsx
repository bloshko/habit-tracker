import styles from "../App.module.css";
import { Dialog } from "./Dialog";

export const HabitLogger = () => {
  return (
    <Dialog>
      <div className={styles.habitLoggerContainer}>
        <h1>Habit Logger</h1>
        <button className={styles.button}>Confirm</button>
      </div>
    </Dialog>
  );
};
