import { dbRun } from './lib/db.js';

function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
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
    const { name, email, phone, visit_date, visit_time, fragrance_notes } = req.body || {};

    const cleanName = sanitize(name);
    const cleanEmail = sanitize(email);
    const cleanPhone = sanitize(phone);
    const cleanDate = sanitize(visit_date);
    const cleanTime = sanitize(visit_time);
    const cleanNotes = sanitize(fragrance_notes);

    if (!cleanName || !cleanEmail || !cleanPhone || !cleanDate || !cleanTime) {
      return res.status(400).json({ success: false, error: 'Please fill in name, email, phone, visit date, and time slot.' });
    }

    const bookingRef = 'DSV-' + Math.floor(100000 + Math.random() * 900000);

    await dbRun(
      `INSERT INTO bookings (booking_reference, name, email, phone, visit_date, visit_time, fragrance_notes, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'confirmed')`,
      [bookingRef, cleanName, cleanEmail, cleanPhone, cleanDate, cleanTime, cleanNotes]
    );

    return res.status(201).json({
      success: true,
      message: 'Booking saved to Vercel Cloud DB!',
      booking: {
        reference: bookingRef,
        name: cleanName,
        visit_date: cleanDate,
        visit_time: cleanTime
      }
    });
  } catch (error) {
    console.error('Booking API Error:', error);
    return res.status(500).json({ success: false, error: 'Failed to schedule booking.' });
  }
}
