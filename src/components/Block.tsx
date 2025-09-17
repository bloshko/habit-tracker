import { useState } from "react";
import styles from "../App.module.css";
import { Habit } from "../utils/habit";
import { createPortal } from "react-dom";
import { HabitLogger } from "./HabitLogger";

interface BlockProps {
  habit: Habit;
}

export const Block = ({ habit }: BlockProps) => {
  const [showHabitLogger, setShowHabitLogger] = useState(false);

  const onLogHabitClick = () => {
    setShowHabitLogger(true);
  };

  return (
    <div className={styles.block}>
      {habit.name}
      <button className={styles.button} onClick={onLogHabitClick}>
        +
      </button>
      {showHabitLogger && createPortal(<HabitLogger />, document.body)}
    </div>
  );
};
