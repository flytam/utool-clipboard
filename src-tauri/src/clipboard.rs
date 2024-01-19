pub struct Clipboard {}

use tauri::api::process::{Command, CommandEvent};
use tauri::{App, Manager, Window};

impl Clipboard {
    pub fn new() -> Self {
        let (mut rx, mut child) = Command::new_sidecar("clipboard-event-handler")
            .expect("failed to create `clipboard-event-handler` binary command")
            .spawn()
            .expect("Failed to spawn sidecar");

        tauri::async_runtime::spawn(async move {
            while let Some(event) = rx.recv().await {
                if let CommandEvent::Stdout(line) = event {
                    println!("clipboard event {:?}", line);
                    // app.emit_all("message", Some(format!("'{}'", "")))
                    // .expect("failed to emit event");
                }
            }
        });
        Clipboard {}
    }

    pub fn get_clipboard_data() {}

    pub fn set_clipboard_data() {}
}
