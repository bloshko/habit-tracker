import styles from "../App.module.css";
import { Habit } from "../utils/habit";

interface BlockProps {
  habit: Habit;
}

export const Block = ({ habit }: BlockProps) => {
  return <div className={styles.block}>{habit.name}</div>;
};
