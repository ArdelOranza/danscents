import db, { initDB } from './db.js';

initDB();

const sampleProducts = [
  // Men's Collection
  { house: 'Azzaro', name: 'The Most Wanted Forever Elixir', cat: 'For Him', price: 6800, img: '', notes: 'Red Ginger · Woods · Bourbon Vanilla', tag: '' },
  { house: 'Azzaro', name: 'The Most Wanted EDP Intense', cat: 'For Him', price: 6200, img: '', notes: 'Cardamom · Toffee · Amberwood', tag: '' },
  { house: 'Azzaro', name: 'The Most Wanted Parfum', cat: 'For Him', price: 6500, img: '', notes: 'Ginger · Woodsy Notes · Bourbon Vanilla', tag: '' },
  { house: 'Bvlgari', name: 'Man In Black EDP', cat: 'For Him', price: 7400, img: '', notes: 'Spiced Rum · Tuberose · Leather', tag: '' },
  { house: 'Chanel', name: 'Allure Homme Eau Extrême EDP', cat: 'For Him', price: 9200, img: '', notes: 'Mandarin · Mint · Tonka Bean', tag: '' },
  { house: 'Chanel', name: 'Bleu de Chanel EDP', cat: 'For Him', price: 8900, img: '', notes: 'Grapefruit · Mint · Cedar', tag: 'Bestseller' },
  { house: 'Chanel', name: 'Bleu de Chanel Parfum', cat: 'For Him', price: 10500, img: '', notes: 'Lemon Zest · Lavender · Sandalwood', tag: '' },
  { house: 'Creed', name: 'Aventus For Him', cat: 'For Him', price: 18500, img: '', notes: 'Pineapple · Birch · Oakmoss', tag: 'Iconic' },
  { house: 'Creed', name: 'Aventus Cologne', cat: 'For Him', price: 17800, img: '', notes: 'Mandarin · Ginger · Vetiver', tag: '' },
  { house: 'Dior', name: 'Dior Homme Cologne', cat: 'For Him', price: 6900, img: '', notes: 'Calabrian Bergamot · Grapefruit Blossom · Musk', tag: '' },
  { house: 'Dior', name: 'Sauvage EDP', cat: 'For Him', price: 7900, img: '', notes: 'Bergamot · Sichuan Pepper · Vanilla', tag: 'Popular' },
  { house: 'Dior', name: 'Sauvage Elixir', cat: 'For Him', price: 11200, img: '', notes: 'Cinnamon · Nutmeg · Cardamom · Lavender', tag: 'Intense' },
  { house: 'Maison Francis Kurkdjian', name: 'Amyris Homme EDT', cat: 'For Him', price: 12800, img: '', notes: 'Amyris · Iris · Tonka Bean', tag: '' },
  { house: 'Parfums de Marly', name: 'Layton', cat: 'For Him', price: 16500, img: '', notes: 'Apple · Lavender · Vanilla', tag: 'Holy Grail' },
  { house: 'Tom Ford', name: 'Tobacco Vanille', cat: 'For Him', price: 16800, img: '', notes: 'Tobacco Leaf · Spices · Vanilla', tag: 'Opulent' },
  { house: 'YSL', name: 'Y EDP', cat: 'For Him', price: 7600, img: '', notes: 'Apple · Sage · Tonka Bean', tag: 'Compliment Magnet' },

  // Women's Collection
  { house: 'Burberry', name: 'Her Elixir', cat: 'For Her', price: 7200, img: '', notes: 'Strawberry · Blackberry · Jasmine · Vanilla', tag: '' },
  { house: 'Carolina Herrera', name: 'Good Girl EDP', cat: 'For Her', price: 7100, img: '', notes: 'Tuberose · Jasmine · Tonka Bean', tag: 'Bestseller' },
  { house: 'Chanel', name: 'Coco Mademoiselle EDP', cat: 'For Her', price: 9800, img: '', notes: 'Orange · Jasmine · Rose · Patchouli', tag: '' },
  { house: 'Creed', name: 'Aventus For Her', cat: 'For Her', price: 17500, img: '', notes: 'Green Apple · Pink Pepper · Patchouli', tag: '' },
  { house: 'Lancôme', name: 'La Vie Est Belle', cat: 'For Her', price: 6900, img: '', notes: 'Blackcurrant · Pear · Iris · Praline', tag: 'Sweet' },
  { house: 'Maison Francis Kurkdjian', name: 'Baccarat Rouge 540 EDP', cat: 'For Her', price: 18900, img: '', notes: 'Saffron · Jasmine · Amberwood', tag: 'Iconic' },
  { house: 'Narciso Rodriguez', name: 'Musc Noir Rose', cat: 'For Her', price: 6800, img: '', notes: 'Plum · Pink Pepper · Tuberose · Musc', tag: 'Viral' },
  { house: 'Parfums de Marly', name: 'Delina EDP', cat: 'For Her', price: 17500, img: '', notes: 'Lychee · Rhubarb · Turkish Rose · Vanilla', tag: 'Signature' },
  { house: 'Prada', name: 'Paradoxe EDP', cat: 'For Her', price: 7600, img: '', notes: 'Neroli · Amber · White Musk', tag: '' },
  { house: 'YSL', name: 'Libre EDP', cat: 'For Her', price: 7600, img: '', notes: 'Lavender · Orange Blossom · Musk', tag: '' },

  // Niche & Unisex Collection
  { house: 'Xerjoff', name: 'Naxos EDP', cat: 'Niche', price: 15800, img: '', notes: 'Honey · Tobacco · Lavender · Vanilla', tag: 'Masterpiece' },
  { house: 'Maison Francis Kurkdjian', name: 'Grand Soir EDP', cat: 'Niche', price: 16500, img: '', notes: 'Amber · Benzoin · Tonka Bean · Vanilla', tag: 'Warm & Cozy' },
  { house: 'Byredo', name: 'Gypsy Water EDP', cat: 'Niche', price: 14500, img: '', notes: 'Bergamot · Juniper Berries · Incense · Amber', tag: '' },
  { house: 'Diptyque', name: 'Philosykos EDP', cat: 'Niche', price: 13800, img: '', notes: 'Fig Leaves · Wood · Cedar', tag: '' },
  { house: 'Le Labo', name: 'Santal 33 EDP', cat: 'Niche', price: 17800, img: '', notes: 'Cardamom · Iris · Violet · Cedarwood', tag: 'Cult Classic' }
];

export function seedDatabase() {
  const countRow = db.prepare('SELECT COUNT(*) as count FROM products').get();
  if (countRow && countRow.count > 0) {
    console.log(`ℹ️ Database already contains ${countRow.count} products. Skipping initial seed.`);
    return;
  }

  console.log('🌱 Seeding initial fragrance products into SQLite DB...');

  const insertStmt = db.prepare(`
    INSERT INTO products (house, name, category, price, img, notes, tag, stock)
    VALUES (?, ?, ?, ?, ?, ?, ?, 100)
  `);

  db.exec('BEGIN TRANSACTION;');
  try {
    for (const p of sampleProducts) {
      insertStmt.run(p.house, p.name, p.cat, p.price, p.img, p.notes, p.tag || '');
    }
    db.exec('COMMIT;');
    console.log(`✅ Successfully seeded ${sampleProducts.length} products into secure SQLite DB.`);
  } catch (err) {
    db.exec('ROLLBACK;');
    console.error('❌ Seeding error:', err);
  }
}

seedDatabase();
