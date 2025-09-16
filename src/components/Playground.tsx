import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Block } from "./Block";
import styles from "../App.module.css";
import { Habit } from "../utils/habit";

const INITIAL_HABITS: Habit[] = [];

export const Playground = () => {
  const [newHabitText, setNewHabitText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [habits, setHabits] = useState<Habit[]>(INITIAL_HABITS);

  const loadHabits = async () => {
    setIsLoading(true);
    const habits = await invoke<Habit[]>("get_habits");

    setHabits(habits);

    setIsLoading(false);
  };

  const handleAddHabit = async () => {
    await invoke("add_habit", { name: newHabitText });

    setNewHabitText("");
    loadHabits();
  };

  const handleHabitNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewHabitText(event.target.value);
  };

  useEffect(() => {
    (async () => {
      await loadHabits();
    })();
  }, []);

  if (isLoading) {
    return <main>Loading...</main>;
  }

  return (
    <main className={styles.mainContainer}>
      <div className={styles.blockContainer}>
        {habits.map((habit) => (
          <Block habit={habit} />
        ))}
      </div>

      <div>
        <label htmlFor="habit_name">Habit name:</label>
        <input
          type="text"
          placeholder="test"
          onChange={handleHabitNameChange}
          value={newHabitText}
        />
        <button onClick={handleAddHabit}>add</button>
      </div>
    </main>
  );
};
