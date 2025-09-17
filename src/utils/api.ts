import { invoke } from "@tauri-apps/api/core";

export const clearAllHabits = async () => {
  await invoke("clear_all_habits");
};
