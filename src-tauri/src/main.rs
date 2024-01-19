// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

pub mod clipboard;

use clipboard::Clipboard;
use tauri::api::process::{Command, CommandEvent};
use tauri::{App, Manager, Window};

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // init_clipboard_listener(app);
            Clipboard::new();
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
