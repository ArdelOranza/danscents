import { dbAll, dbGet } from './lib/db.js';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
}

export default async function handler(req, res) {
  // Support CORS for Vercel Serverless
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    const { id, category, q } = req.query || {};

    // Single product detail query
    if (id) {
      const pId = parseInt(id, 10);
      if (isNaN(pId)) {
        return res.status(400).json({ success: false, error: 'Invalid product ID.' });
      }
      const product = await dbGet(
        'SELECT id, house, name, category, price, img, notes, tag, stock FROM products WHERE id = ?',
        [pId]
      );
      if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found.' });
      }
      return res.status(200).json({ success: true, product });
    }

    // Catalog query with search & category filters
    const cleanCat = category ? sanitize(String(category)) : null;
    const cleanSearch = q ? sanitize(String(q)).toLowerCase() : null;

    let sql = 'SELECT id, house, name, category, price, img, notes, tag, stock FROM products';
    const params = [];
    const conditions = [];

    if (cleanCat) {
      conditions.push('category = ?');
      params.push(cleanCat);
    }
    if (cleanSearch) {
      conditions.push('(LOWER(name) LIKE ? OR LOWER(house) LIKE ? OR LOWER(notes) LIKE ?)');
      const pattern = `%${cleanSearch}%`;
      params.push(pattern, pattern, pattern);
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY id ASC';

    const products = await dbAll(sql, params);
    return res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Products API Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch fragrance catalog.' });
  }
}
