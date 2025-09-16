use crate::model::Db;
use anyhow::{Context, Result};
use std::{fs, path::PathBuf};
use tauri::{AppHandle, Manager};

fn db_path(app: &AppHandle) -> Result<PathBuf> {
    let dir = app.path().app_data_dir()?;
    fs::create_dir_all(&dir)?;
    Ok(dir.join("db.json"))
}

pub fn load(app: &AppHandle) -> Result<Db> {
    let p = db_path(app)?;
    if !p.exists() {
        return Ok(Db::new());
    }
    let data = fs::read_to_string(p)?;
    Ok(serde_json::from_str(&data)?)
}

pub fn save(app: &AppHandle, db: &Db) -> Result<()> {
    let p = db_path(app)?;
    fs::write(p, serde_json::to_vec_pretty(db)?)?;
    Ok(())
}
