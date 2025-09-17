use std::sync::Mutex;
use tauri::Manager;
use tauri::State;

mod model;
mod store;

struct AppState(Mutex<model::Db>);

#[tauri::command]
fn get_habits(state: State<AppState>) -> Vec<model::Habit> {
    state.0.lock().unwrap().habits.values().cloned().collect()
}

#[tauri::command]
fn clear_all_habits(state: State<AppState>) {
    state.0.lock().unwrap().habits.clear();
}

#[tauri::command]
fn add_habit(state: State<AppState>, name: String) -> model::Habit {
    let mut db = state.0.lock().unwrap();
    let id = nanoid::nanoid!();
    let habit = model::Habit {
        id: id.clone(),
        name,
        created_at: chrono::Utc::now().timestamp(),
        archived: false,
    };
    db.habits.insert(id.clone(), habit.clone());

    habit
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState(Mutex::new(model::Db::new())))
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let db = store::load(app.handle())?;
            app.state::<AppState>().0.lock().unwrap().clone_from(&db);
            Ok(())
        })
        .on_window_event(|window, event| {
            if matches!(
                event,
                tauri::WindowEvent::CloseRequested { .. } | tauri::WindowEvent::Focused(false)
            ) {
                let app = window.app_handle();
                if let Some(state) = app.try_state::<AppState>() {
                    let _ = store::save(app, &state.0.lock().unwrap());
                }
            }
        })
        .invoke_handler(tauri::generate_handler![
            add_habit,
            get_habits,
            clear_all_habits
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
