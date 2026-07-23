import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { createClient as createLibsqlClient } from '@libsql/client';
import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const defaultLocalDbPath = path.join(__dirname, '..', '..', 'server', 'danscents.db');

let supabase = null;
let libsqlClient = null;
let localDb = null;

const supabaseUrl = process.env.SUPABASE_URL || 'https://jtxelkzipsukuaorxbxt.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

const dbUrl = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const dbAuthToken = process.env.TURSO_AUTH_TOKEN;

if (supabaseUrl && supabaseKey && !supabaseKey.includes('your_supabase')) {
  console.log('⚡ Connecting to Supabase Cloud Database...');
  supabase = createSupabaseClient(supabaseUrl, supabaseKey);
} else if (dbUrl && (dbUrl.startsWith('libsql://') || dbUrl.startsWith('https://'))) {
  console.log('⚡ Connecting to Turso Cloud Database...');
  libsqlClient = createLibsqlClient({ url: dbUrl, authToken: dbAuthToken });
} else {
  // Local fallback
  localDb = new DatabaseSync(defaultLocalDbPath);
  try {
    localDb.exec('PRAGMA foreign_keys = ON;');
    localDb.exec('PRAGMA journal_mode = WAL;');
  } catch (e) {}
}

export function initSchemas() {
  const schemaSql = `
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
  `;

  if (libsqlClient) {
    libsqlClient.executeMultiple(schemaSql).catch(err => console.error('Cloud Schema init error:', err));
  } else if (localDb) {
    localDb.exec(schemaSql);
  }
}

// Unified Async Query Interface
export async function dbAll(sql, args = []) {
  if (supabase) {
    if (sql.includes('FROM products')) {
      const { data, error } = await supabase.from('products').select('*');
      if (error) throw error;
      return data || [];
    }
    if (sql.includes('FROM orders')) {
      const { data, error } = await supabase.from('orders').select('*');
      if (error) throw error;
      return data || [];
    }
    if (sql.includes('FROM bookings')) {
      const { data, error } = await supabase.from('bookings').select('*');
      if (error) throw error;
      return data || [];
    }
  }

  if (libsqlClient) {
    const res = await libsqlClient.execute({ sql, args });
    return res.rows;
  }

  const stmt = localDb.prepare(sql);
  return stmt.all(...args);
}

export async function dbGet(sql, args = []) {
  if (supabase) {
    if (sql.includes('FROM products WHERE id =')) {
      const { data, error } = await supabase.from('products').select('*').eq('id', args[0]).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    }
    if (sql.includes('FROM orders WHERE order_number =')) {
      const { data, error } = await supabase.from('orders').select('*').eq('order_number', args[0]).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    }
  }

  if (libsqlClient) {
    const res = await libsqlClient.execute({ sql, args });
    return res.rows[0] || null;
  }

  const stmt = localDb.prepare(sql);
  return stmt.get(...args) || null;
}

export async function dbRun(sql, args = []) {
  if (supabase) {
    if (sql.includes('INSERT INTO orders')) {
      const { data, error } = await supabase.from('orders').insert({
        order_number: args[0],
        customer_name: args[1],
        customer_phone: args[2],
        delivery_address: args[3],
        subtotal: args[4],
        shipping_fee: args[5],
        grand_total: args[6],
        status: args[7] || 'pending'
      }).select();
      if (error) throw error;
      return { lastInsertRowid: data[0]?.id || 1, rowsAffected: 1 };
    }

    if (sql.includes('INSERT INTO order_items')) {
      const { data, error } = await supabase.from('order_items').insert({
        order_id: args[0],
        product_id: args[1],
        product_name: args[2],
        size: args[3],
        quantity: args[4],
        unit_price: args[5]
      }).select();
      if (error) throw error;
      return { lastInsertRowid: data[0]?.id || 1, rowsAffected: 1 };
    }

    if (sql.includes('INSERT INTO bookings')) {
      const { data, error } = await supabase.from('bookings').insert({
        booking_reference: args[0],
        name: args[1],
        email: args[2],
        phone: args[3],
        visit_date: args[4],
        visit_time: args[5],
        fragrance_notes: args[6],
        status: args[7] || 'confirmed'
      }).select();
      if (error) throw error;
      return { lastInsertRowid: data[0]?.id || 1, rowsAffected: 1 };
    }
  }

  if (libsqlClient) {
    const res = await libsqlClient.execute({ sql, args });
    return { lastInsertRowid: res.lastInsertRowid, rowsAffected: res.rowsAffected };
  }

  const stmt = localDb.prepare(sql);
  const res = stmt.run(...args);
  return { lastInsertRowid: res.lastInsertRowid, rowsAffected: res.changes };
}

initSchemas();
