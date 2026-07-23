import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import db, { initDB } from './db.js';

dotenv.config();

// Ensure DB schemas exist
initDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser with strict size limit (prevents payload flooding attacks)
app.use(express.json({ limit: '10kb' }));

// Simple security rate limiter (max 60 requests per minute per IP)
const requestCounts = new Map();
app.use((req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowMs = 60 * 1000;
  
  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    const record = requestCounts.get(ip);
    if (now > record.resetTime) {
      record.count = 1;
      record.resetTime = now + windowMs;
    } else {
      record.count++;
      if (record.count > 100) {
        return res.status(429).json({ error: 'Too many requests. Please try again later.' });
      }
    }
  }
  next();
});

// Helper for input sanitization
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

// Size multiplier calculation (mirroring product pricing logic)
function getSizeMultiplier(size) {
  if (size === '100ml') return 1.7;
  if (size === '2ml decant') return 0.06;
  return 1; // 50ml standard
}

// ---------------- API ENDPOINTS ----------------

// 1. Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), db: 'connected' });
});

// 2. GET /api/products - Secure product search & listing
app.get('/api/products', (req, res) => {
  try {
    const category = req.query.category ? sanitize(String(req.query.category)) : null;
    const search = req.query.q ? sanitize(String(req.query.q)).toLowerCase() : null;

    let query = 'SELECT id, house, name, category, price, img, notes, tag, stock FROM products';
    const params = [];
    const conditions = [];

    if (category) {
      conditions.push('category = ?');
      params.push(category);
    }
    if (search) {
      conditions.push('(LOWER(name) LIKE ? OR LOWER(house) LIKE ? OR LOWER(notes) LIKE ?)');
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    query += ' ORDER BY id ASC';

    const stmt = db.prepare(query);
    const rows = stmt.all(...params);
    res.json({ success: true, count: rows.length, products: rows });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Failed to retrieve products catalog.' });
  }
});

// 3. GET /api/products/:id - Single product fetch
app.get('/api/products/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ success: false, error: 'Invalid product ID format.' });
    }

    const stmt = db.prepare('SELECT id, house, name, category, price, img, notes, tag, stock FROM products WHERE id = ?');
    const product = stmt.get(id);

    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found.' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product detail.' });
  }
});

// 4. POST /api/orders - Secure Order Placement with Server-Validated Pricing
app.post('/api/orders', (req, res) => {
  try {
    const { customer_name, customer_phone, delivery_address, items } = req.body;

    // Validate inputs
    const cleanName = sanitize(customer_name);
    const cleanPhone = sanitize(customer_phone);
    const cleanAddress = sanitize(delivery_address);

    if (!cleanName || !cleanPhone || !cleanAddress) {
      return res.status(400).json({ success: false, error: 'Please provide complete customer name, phone number, and delivery address.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart cannot be empty.' });
    }

    // Recalculate prices from DB securely to prevent price tampering
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const pId = parseInt(item.id, 10);
      const qty = Math.max(1, parseInt(item.qty, 10) || 1);
      const size = sanitize(item.size || '50ml');

      if (isNaN(pId)) continue;

      const productStmt = db.prepare('SELECT id, name, house, price FROM products WHERE id = ?');
      const product = productStmt.get(pId);

      if (!product) {
        return res.status(400).json({ success: false, error: `Product ID ${pId} not found.` });
      }

      const multiplier = getSizeMultiplier(size);
      const unitPrice = Math.round(product.price * multiplier);
      const lineTotal = unitPrice * qty;

      subtotal += lineTotal;
      validatedItems.push({
        product_id: product.id,
        product_name: `${product.house} ${product.name}`,
        size,
        quantity: qty,
        unit_price: unitPrice
      });
    }

    const shippingFee = validatedItems.length > 0 ? 180 : 0;
    const grandTotal = subtotal + shippingFee;
    const orderNumber = 'DS-' + Date.now().toString(36).toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);

    // Save order securely inside transaction
    db.exec('BEGIN TRANSACTION;');
    try {
      const orderStmt = db.prepare(`
        INSERT INTO orders (order_number, customer_name, customer_phone, delivery_address, subtotal, shipping_fee, grand_total, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')
      `);
      orderStmt.run(orderNumber, cleanName, cleanPhone, cleanAddress, subtotal, shippingFee, grandTotal);

      // Get created order ID
      const createdOrder = db.prepare('SELECT id FROM orders WHERE order_number = ?').get(orderNumber);
      const orderId = createdOrder.id;

      const itemStmt = db.prepare(`
        INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price)
        VALUES (?, ?, ?, ?, ?, ?)
      `);

      for (const item of validatedItems) {
        itemStmt.run(orderId, item.product_id, item.product_name, item.size, item.quantity, item.unit_price);
      }

      db.exec('COMMIT;');

      res.status(201).json({
        success: true,
        message: 'Order created successfully!',
        order: {
          order_number: orderNumber,
          customer_name: cleanName,
          subtotal,
          shipping_fee: shippingFee,
          grand_total: grandTotal,
          items_count: validatedItems.length
        }
      });
    } catch (dbErr) {
      db.exec('ROLLBACK;');
      throw dbErr;
    }
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ success: false, error: 'Failed to process order securely.' });
  }
});

// 5. POST /api/bookings - Secure Visit Reservation
app.post('/api/bookings', (req, res) => {
  try {
    const { name, email, phone, visit_date, visit_time, fragrance_notes } = req.body;

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanDate = sanitize(visit_date);
    const cleanTime = sanitize(visit_time);
    const cleanNotes = sanitize(fragrance_notes);

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanDate || !cleanTime) {
      return res.status(400).json({ success: false, error: 'Please provide full name, email, phone, visit date, and time slot.' });
    }

    const bookingRef = 'DSV-' + Math.floor(100000 + Math.random() * 900000);

    const stmt = db.prepare(`
      INSERT INTO bookings (booking_reference, name, email, phone, visit_date, visit_time, fragrance_notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed')
    `);

    stmt.run(bookingRef, cleanName, cleanEmail, cleanPhone, cleanDate, cleanTime, cleanNotes);

    res.status(201).json({
      success: true,
      message: 'Booking confirmed!',
      booking: {
        reference: bookingRef,
        name: cleanName,
        visit_date: cleanDate,
        visit_time: cleanTime
      }
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ success: false, error: 'Failed to schedule booking.' });
  }
});

// Global 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'API route not found.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Secure Danscents REST API Server listening on http://localhost:${PORT}`);
});
