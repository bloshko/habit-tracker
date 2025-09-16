import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.module.css";
import { Playground } from "./components/Playground";

function App() {
  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   await invoke("greet", { name: "123" });
  // }

  return <Playground />;
}

export default App;
