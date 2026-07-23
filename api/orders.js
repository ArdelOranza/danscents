import { dbGet, dbRun } from './lib/db.js';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

function getSizeMultiplier(size) {
  if (size === '100ml') return 1.7;
  if (size === '2ml decant') return 0.06;
  return 1;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed.' });
  }

  try {
    const { customer_name, customer_phone, delivery_address, items } = req.body || {};

    const cleanName = sanitize(customer_name);
    const cleanPhone = sanitize(customer_phone);
    const cleanAddress = sanitize(delivery_address);

    if (!cleanName || !cleanPhone || !cleanAddress) {
      return res.status(400).json({ success: false, error: 'Please provide full name, phone number, and delivery address.' });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ success: false, error: 'Cart cannot be empty.' });
    }

    // Validate prices securely against DB to prevent price tampering
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const pId = parseInt(item.id, 10);
      const qty = Math.max(1, parseInt(item.qty, 10) || 1);
      const size = sanitize(item.size || '50ml');

      if (isNaN(pId)) continue;

      const product = await dbGet('SELECT id, house, name, price FROM products WHERE id = ?', [pId]);
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

    // Save order into Database
    await dbRun(
      `INSERT INTO orders (order_number, customer_name, customer_phone, delivery_address, subtotal, shipping_fee, grand_total, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [orderNumber, cleanName, cleanPhone, cleanAddress, subtotal, shippingFee, grandTotal]
    );

    const createdOrder = await dbGet('SELECT id FROM orders WHERE order_number = ?', [orderNumber]);
    const orderId = createdOrder ? createdOrder.id : 0;

    for (const item of validatedItems) {
      await dbRun(
        `INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [orderId, item.product_id, item.product_name, item.size, item.quantity, item.unit_price]
      );
    }

    return res.status(201).json({
      success: true,
      message: 'Order created successfully on Vercel Serverless DB!',
      order: {
        order_number: orderNumber,
        customer_name: cleanName,
        subtotal,
        shipping_fee: shippingFee,
        grand_total: grandTotal,
        items_count: validatedItems.length
      }
    });
  } catch (error) {
    console.error('Order API Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process order securely.' });
  }
}
