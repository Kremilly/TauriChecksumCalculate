// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use sha2::{Sha256, Digest};
use tauri::command;

#[command]
fn calculate_checksum(file_data: Vec<u8>) -> Result<String, String> {
    // Cria o hasher SHA-256
    let mut hasher = Sha256::new();

    // Atualiza o hasher com os dados do arquivo
    hasher.update(&file_data);

    // Finaliza o cálculo do checksum
    let result = hasher.finalize();
    Ok(format!("{:x}", result))
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![calculate_checksum])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
