import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'danscents.db');

// Initialize native SQLite database connection securely
const db = new DatabaseSync(dbPath);

// Enforce foreign key safety constraints & WAL mode for speed and integrity
try {
  db.exec('PRAGMA foreign_keys = ON;');
  db.exec('PRAGMA journal_mode = WAL;');
} catch (e) {
  // Pragma warning catch
}

// Initialize database schema with security constraints
export function initDB() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      house TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price REAL NOT NULL,
      img TEXT DEFAULT '',
      notes TEXT DEFAULT '',
      tag TEXT DEFAULT '',
      stock INTEGER DEFAULT 100,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_number TEXT UNIQUE NOT NULL,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      delivery_address TEXT NOT NULL,
      subtotal REAL NOT NULL,
      shipping_fee REAL NOT NULL,
      grand_total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      product_name TEXT NOT NULL,
      size TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      booking_reference TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      visit_date TEXT NOT NULL,
      visit_time TEXT NOT NULL,
      fragrance_notes TEXT DEFAULT '',
      status TEXT DEFAULT 'confirmed',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('🔒 Secure Native SQLite Database initialized successfully.');
}

export default db;
