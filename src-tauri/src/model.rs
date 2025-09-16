use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::collections::{BTreeSet, HashMap};

#[derive(Serialize, Deserialize, Clone, Default)]
pub struct Habit {
    pub id: String,
    pub name: String,
    pub created_at: i64,
    pub archived: bool,
}

#[derive(Serialize, Deserialize, Default, Clone)]
pub struct Db {
    pub habits: HashMap<String, Habit>,
    // YYYY-MM-DD -> set of habit ids completed that day
    pub checks: HashMap<String, BTreeSet<String>>,
}

impl Db {
    pub fn new() -> Self {
        Self::default()
    }
    pub fn today_key() -> String {
        Utc::now().date_naive().to_string()
    }
}
