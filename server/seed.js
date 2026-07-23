import db, { initDB } from './db.js';
import { dbRun, dbGet, dbAll } from '../api/lib/db.js';

initDB();

const fullCatalog = [
  // ==================== MEN'S COLLECTION ====================
  { house: 'Azzaro', name: 'The Most Wanted Forever Elixir', cat: 'For Him', price: 6800, img: '', notes: 'Red Ginger · Woods · Bourbon Vanilla', tag: '' },
  { house: 'Azzaro', name: 'The Most Wanted EDP Intense', cat: 'For Him', price: 6200, img: '', notes: 'Cardamom · Toffee · Amberwood', tag: '' },
  { house: 'Azzaro', name: 'The Most Wanted Parfum', cat: 'For Him', price: 6500, img: '', notes: 'Ginger · Woodsy Notes · Bourbon Vanilla', tag: '' },
  { house: 'Bvlgari', name: 'Man In Black EDP', cat: 'For Him', price: 7400, img: '', notes: 'Spiced Rum · Tuberose · Leather', tag: '' },
  { house: 'Carolina Herrera', name: '212 Men NYC EDT', cat: 'For Him', price: 5800, img: '', notes: 'Green Notes · Citrus · White Musk', tag: '' },
  { house: 'Chanel', name: 'Allure Homme Eau Extrême EDP', cat: 'For Him', price: 9200, img: '', notes: 'Mandarin · Mint · Tonka Bean', tag: '' },
  { house: 'Chanel', name: 'Bleu de Chanel EDP', cat: 'For Him', price: 8900, img: '', notes: 'Grapefruit · Mint · Cedar', tag: 'Bestseller' },
  { house: 'Chanel', name: 'Bleu de Chanel Parfum', cat: 'For Him', price: 10500, img: '', notes: 'Lemon Zest · Lavender · Sandalwood', tag: '' },
  { house: 'Creed', name: 'Aventus For Him', cat: 'For Him', price: 18500, img: '', notes: 'Pineapple · Birch · Oakmoss', tag: 'Iconic' },
  { house: 'Creed', name: 'Aventus Cologne', cat: 'For Him', price: 17800, img: '', notes: 'Mandarin · Ginger · Vetiver', tag: '' },
  { house: 'Dior', name: 'Dior Homme Cologne', cat: 'For Him', price: 6900, img: '', notes: 'Calabrian Bergamot · Grapefruit Blossom · Musk', tag: '' },
  { house: 'Dior', name: 'Fahrenheit EDT', cat: 'For Him', price: 7200, img: '', notes: 'Nutmeg · Violet Leaf · Leather', tag: '' },
  { house: 'Dior', name: 'Fahrenheit Parfum', cat: 'For Him', price: 8500, img: '', notes: 'Suede · Licorice · Bourbon Vanilla', tag: '' },
  { house: 'Dior', name: 'Sauvage EDT', cat: 'For Him', price: 6800, img: '', notes: 'Calabrian Bergamot · Pepper · Ambroxan', tag: '' },
  { house: 'Dior', name: 'Sauvage EDP', cat: 'For Him', price: 7900, img: '', notes: 'Bergamot · Sichuan Pepper · Vanilla', tag: 'Popular' },
  { house: 'Dior', name: 'Sauvage Elixir', cat: 'For Him', price: 11200, img: '', notes: 'Cinnamon · Nutmeg · Cardamom · Lavender', tag: 'Intense' },
  { house: 'Emporio Armani', name: 'Stronger With You Intensely', cat: 'For Him', price: 6800, img: '', notes: 'Pink Pepper · Cinnamon · Vanilla', tag: 'Warm' },
  { house: 'Giorgio Armani', name: 'ADG Profondo EDT', cat: 'For Him', price: 7100, img: '', notes: 'Marine Notes · Green Mandarin · Rosemary', tag: '' },
  { house: 'Givenchy', name: 'Gentleman Boisée EDP', cat: 'For Him', price: 6500, img: '', notes: 'Black Pepper · Iris · Burning Wood', tag: '' },
  { house: 'Hermès', name: 'Terre D\'Hermès EDT', cat: 'For Him', price: 6200, img: '', notes: 'Grapefruit · Flint · Cedar', tag: '' },
  { house: 'Maison Francis Kurkdjian', name: 'Amyris Homme EDT', cat: 'For Him', price: 12800, img: '', notes: 'Amyris · Iris · Tonka Bean', tag: '' },
  { house: 'Parfums de Marly', name: 'Layton', cat: 'For Him', price: 16500, img: '', notes: 'Apple · Lavender · Vanilla', tag: 'Holy Grail' },
  { house: 'Parfums de Marly', name: 'Greenley', cat: 'For Him', price: 15200, img: '', notes: 'Green Apple · Bergamot · Cashmeran', tag: '' },
  { house: 'Parfums de Marly', name: 'Herod', cat: 'For Him', price: 15800, img: '', notes: 'Cinnamon · Tobacco Leaf · Vanilla', tag: '' },
  { house: 'Parfums de Marly', name: 'Haltane', cat: 'For Him', price: 17200, img: '', notes: 'Clary Sage · Praline · Oud', tag: '' },
  { house: 'Tom Ford', name: 'Tobacco Vanille', cat: 'For Him', price: 16800, img: '', notes: 'Tobacco Leaf · Spices · Vanilla', tag: 'Opulent' },
  { house: 'Tom Ford', name: 'Ombré Leather EDP', cat: 'For Him', price: 10500, img: '', notes: 'Cardamom · Leather · Patchouli', tag: '' },
  { house: 'Versace', name: 'Eros EDP', cat: 'For Him', price: 5400, img: '', notes: 'Mint · Green Apple · Tonka Bean', tag: '' },
  { house: 'YSL', name: 'Y EDP', cat: 'For Him', price: 7600, img: '', notes: 'Apple · Sage · Tonka Bean', tag: 'Compliment Magnet' },
  { house: 'YSL', name: 'Myslf EDP', cat: 'For Him', price: 7400, img: '', notes: 'Calabrian Bergamot · Orange Blossom · Ambrofix', tag: '' },

  // ==================== WOMEN'S COLLECTION ====================
  { house: 'Burberry', name: 'Her Elixir', cat: 'For Her', price: 7200, img: '', notes: 'Strawberry · Blackberry · Jasmine · Vanilla', tag: '' },
  { house: 'Carolina Herrera', name: 'Good Girl EDP', cat: 'For Her', price: 7100, img: '', notes: 'Tuberose · Jasmine · Tonka Bean', tag: 'Bestseller' },
  { house: 'Carolina Herrera', name: 'Good Girl Blush EDP Elixir', cat: 'For Her', price: 7800, img: '', notes: 'Mandarin · Ylang-Ylang · Vanilla', tag: '' },
  { house: 'Chanel', name: 'Chance Eau Tendre EDP', cat: 'For Her', price: 9400, img: '', notes: 'Grapefruit · Quince · Rose · White Musk', tag: 'Soft' },
  { house: 'Chanel', name: 'Coco Mademoiselle EDP', cat: 'For Her', price: 9800, img: '', notes: 'Orange · Jasmine · Rose · Patchouli', tag: '' },
  { house: 'Creed', name: 'Aventus For Her', cat: 'For Her', price: 17500, img: '', notes: 'Green Apple · Pink Pepper · Patchouli', tag: '' },
  { house: 'Dior', name: 'Blooming Bouquet EDT', cat: 'For Her', price: 7400, img: '', notes: 'Damask Rose · Peony · White Musk', tag: '' },
  { house: 'Lancôme', name: 'La Vie Est Belle', cat: 'For Her', price: 6900, img: '', notes: 'Blackcurrant · Pear · Iris · Praline', tag: 'Sweet' },
  { house: 'Maison Francis Kurkdjian', name: 'Baccarat Rouge 540 EDP', cat: 'For Her', price: 18900, img: '', notes: 'Saffron · Jasmine · Amberwood', tag: 'Iconic' },
  { house: 'Narciso Rodriguez', name: 'Musc Noir Rose', cat: 'For Her', price: 6800, img: '', notes: 'Plum · Pink Pepper · Tuberose · Musc', tag: 'Viral' },
  { house: 'Parfums de Marly', name: 'Delina EDP', cat: 'For Her', price: 17500, img: '', notes: 'Lychee · Rhubarb · Turkish Rose · Vanilla', tag: 'Signature' },
  { house: 'Parfums de Marly', name: 'Delina Exclusif', cat: 'For Her', price: 18500, img: '', notes: 'Pear · Lychee · Turkish Rose · Amber', tag: '' },
  { house: 'Parfums de Marly', name: 'Valaya EDP', cat: 'For Her', price: 17800, img: '', notes: 'Bergamot · White Peach · Nympheal · Musk', tag: '' },
  { house: 'Prada', name: 'Paradoxe EDP', cat: 'For Her', price: 7600, img: '', notes: 'Neroli · Amber · White Musk', tag: '' },
  { house: 'YSL', name: 'Libre EDP', cat: 'For Her', price: 7600, img: '', notes: 'Lavender · Orange Blossom · Musk', tag: '' },
  { house: 'YSL', name: 'Black Opium EDP', cat: 'For Her', price: 7400, img: '', notes: 'Black Coffee · White Flowers · Vanilla', tag: '' },

  // ==================== NICHE & UNISEX COLLECTION ====================
  { house: 'Byredo', name: 'Gypsy Water EDP', cat: 'Niche', price: 14500, img: '', notes: 'Bergamot · Juniper Berries · Incense · Amber', tag: '' },
  { house: 'Byredo', name: 'Black Saffron', cat: 'Niche', price: 13800, img: '', notes: 'Pomelo · Saffron · Black Violet · Leather', tag: '' },
  { house: 'Clive Christian', name: 'Town & Country', cat: 'Niche', price: 24000, img: '', notes: 'Clary Sage · Ambergris · Sandalwood', tag: 'Ultra Niche' },
  { house: 'Diptyque', name: 'Philosykos EDP', cat: 'Niche', price: 13800, img: '', notes: 'Fig Leaves · Wood · Cedar', tag: '' },
  { house: 'Fragrance Du Bois', name: 'Minuit Et Demi', cat: 'Niche', price: 18500, img: '', notes: 'Cardamom · Caramel · Bourbon Vanilla', tag: '' },
  { house: 'Fragrance Du Bois', name: 'Oud Jaune Intense Parfum', cat: 'Niche', price: 22000, img: '', notes: 'Ylang-Ylang · Jasmine · Pure Oud', tag: '' },
  { house: 'Le Labo', name: 'Santal 33 EDP', cat: 'Niche', price: 17800, img: '', notes: 'Cardamom · Iris · Violet · Cedarwood', tag: 'Cult Classic' },
  { house: 'Maison Crivelli', name: 'Hibiscus Mahajad', cat: 'Niche', price: 16800, img: '', notes: 'Hibiscus · Rose · Spearmint · Leather · Vanilla', tag: 'Extrait' },
  { house: 'Maison Francis Kurkdjian', name: 'Grand Soir EDP', cat: 'Niche', price: 16500, img: '', notes: 'Amber · Benzoin · Tonka Bean · Vanilla', tag: 'Warm & Cozy' },
  { house: 'Narcotica', name: 'Dulce Diablo', cat: 'Niche', price: 17200, img: '', notes: 'Cognac · Apricot · Chocolate · Rum · Sugar', tag: '' },
  { house: 'Nishane', name: 'Hacivat Oud', cat: 'Niche', price: 21000, img: '', notes: 'Pineapple · Bergamot · Pure Oud', tag: '' },
  { house: 'Nishane', name: 'Nefs', cat: 'Niche', price: 26500, img: '', notes: 'Honey · Saffron · Rose · Oud · Vanilla', tag: 'Crown Jewel' },
  { house: 'Nishane', name: 'Wulong Cha', cat: 'Niche', price: 11500, img: '', notes: 'Bergamot · Oolong Tea · Nutmeg · Fig', tag: '' },
  { house: 'Orto Parisi', name: 'Megamare', cat: 'Niche', price: 9800, img: '', notes: 'Sea Notes · Salt · Ambergris · Seaweed', tag: 'Eternal Beast' },
  { house: 'Sora Dora', name: 'Jany', cat: 'Niche', price: 14200, img: '', notes: 'Baked Apple · Cinnamon · Puff Pastry · Vanilla', tag: '' },
  { house: 'Stéphane Humbert Lucas', name: 'Mango Kiss', cat: 'Niche', price: 16500, img: '', notes: 'Mango · Neroli · Coconut · White Musk', tag: '' },
  { house: 'Thomas Kosmala', name: 'No.4 EDP', cat: 'Niche', price: 8900, img: '', notes: 'Lemon Zest · Bitter Orange · Amber · Woods', tag: 'Beast Mode' },
  { house: 'Van Cleef & Arpels', name: 'Santal Blanc', cat: 'Niche', price: 9500, img: '', notes: 'Mandarin · Fig Milk · Sandalwood · Musk', tag: '' },
  { house: 'Xerjoff', name: 'Naxos EDP', cat: 'Niche', price: 16800, img: '', notes: 'Honey · Tobacco · Lavender · Vanilla', tag: 'Masterpiece' },
  { house: 'Xerjoff', name: 'Torino 21', cat: 'Niche', price: 16800, img: '', notes: 'Mint · Lemon · Thyme · Basil · Jasmine', tag: 'Fresh King' },
  { house: 'Xerjoff', name: '40 Knots', cat: 'Niche', price: 17500, img: '', notes: 'Salt · Green Notes · Woody Notes · Sea Water · Honey', tag: '' }
];

export async function seedDatabase() {
  try {
    const existing = await dbAll('SELECT COUNT(*) as count FROM products');
    const count = existing && existing[0] ? (existing[0].count || existing[0]['count(*)'] || 0) : 0;
    
    console.log(`ℹ️ Database currently contains ${count} products.`);

    const insertStmt = db.prepare(`
      INSERT INTO products (house, name, category, price, img, notes, tag, stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, 100)
    `);

    db.exec('BEGIN TRANSACTION;');
    try {
      for (const p of fullCatalog) {
        insertStmt.run(p.house, p.name, p.cat, p.price, p.img, p.notes, p.tag || '');
      }
      db.exec('COMMIT;');
      console.log(`✅ Successfully seeded ${fullCatalog.length} products into DB.`);
    } catch (err) {
      db.exec('ROLLBACK;');
      console.error('Seeding error:', err);
    }
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

seedDatabase();
