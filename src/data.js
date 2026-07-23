const heroImgModules = import.meta.glob('./assets/hero-photos/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const photosImgModules = import.meta.glob('./assets/photos/*.{jpeg,jpg,png,webp}', { eager: true, import: 'default' });
const perfumeImgModules = import.meta.glob('./assets/perfume images/**/*.{jpeg,jpg,png}', { eager: true, import: 'default' });

const imageList = [];

// Sort hero paths so transparent .png files come first
const sortedHeroPaths = Object.keys(heroImgModules).sort((a, b) => {
  if (a.endsWith('.png') && !b.endsWith('.png')) return -1;
  if (!a.endsWith('.png') && b.endsWith('.png')) return 1;
  return 0;
});

for (const path of sortedHeroPaths) {
  const url = heroImgModules[path];
  const filename = path.split('/').pop() || '';
  const cleanName = filename.toLowerCase()
    .replace(/\.(jpg|png|jpeg|webp)/gi, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (!imageList.some(i => i.cleanName === cleanName)) {
    imageList.push({ path, url, filename, cleanName, isHeroFolder: true });
  }
}

for (const path in photosImgModules) {
  const url = photosImgModules[path];
  const filename = path.split('/').pop() || '';
  const cleanName = filename.toLowerCase()
    .replace(/\.(jpg|png|jpeg|webp)/gi, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (!imageList.some(i => i.cleanName === cleanName)) {
    imageList.push({ path, url, filename, cleanName, isHeroFolder: false });
  }
}

for (const path in perfumeImgModules) {
  const url = perfumeImgModules[path];
  const filename = path.split('/').pop() || '';
  const cleanName = filename.toLowerCase()
    .replace(/\.(jpg|png|jpeg|webp)/gi, '')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  if (!imageList.some(i => i.cleanName === cleanName)) {
    imageList.push({ path, url, filename, cleanName, isHeroFolder: false });
  }
}

function cleanStr(str) {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function getPerfumeImage(house, name, cat) {
  const fullSlug = cleanStr(house + ' ' + name);
  const houseSlug = cleanStr(house);
  const nameSlug = cleanStr(name);

  // 1. Exact match
  let match = imageList.find(img => img.cleanName === fullSlug || img.cleanName === nameSlug);
  if (match) return match.url;

  // 2. Contains match
  match = imageList.find(img => fullSlug.includes(img.cleanName) || img.cleanName.includes(fullSlug) || nameSlug.includes(img.cleanName) || img.cleanName.includes(nameSlug));
  if (match) return match.url;

  // 3. Match without concentration words
  const strippedName = nameSlug.replace(/-(edp|edt|parfum|elixir|cologne|for-him|for-her|intense|extradose|intensely|exclusif)/g, '');
  if (strippedName.length > 2) {
    match = imageList.find(img => {
      const imgStripped = img.cleanName.replace(/-(edp|edt|parfum|elixir|cologne|for-him|for-her|intense|extradose|intensely|exclusif)/g, '');
      return imgStripped.includes(strippedName) || strippedName.includes(imgStripped);
    });
    if (match) return match.url;
  }

  // 4. House match
  const houseMatches = imageList.filter(img => img.cleanName.includes(houseSlug));
  if (houseMatches.length > 0) return houseMatches[0].url;

  // 5. Category fallbacks
  if (cat === 'For Him') {
    const sauv = imageList.find(img => img.cleanName.includes('dior-sauvage'));
    if (sauv) return sauv.url;
  }
  if (cat === 'For Her') {
    const del = imageList.find(img => img.cleanName.includes('delina'));
    if (del) return del.url;
  }
  const bac = imageList.find(img => img.cleanName.includes('baccarat'));
  return bac ? bac.url : (imageList[0] ? imageList[0].url : '');
}

export const A = {
  baccarat: imageList.find(i => i.cleanName.includes('baccarat'))?.url || '',
  aventus: imageList.find(i => i.cleanName.includes('creed-aventus') && !i.cleanName.includes('cologne') && !i.cleanName.includes('her'))?.url || '',
  libre: imageList.find(i => i.cleanName.includes('ysl-libre-edp') && !i.cleanName.includes('intense'))?.url || '',
  sauvage: imageList.find(i => i.cleanName === 'dior-sauvage' || i.cleanName.includes('dior-sauvage'))?.url || '',
  terre: imageList.find(i => i.cleanName.includes('terre-dhermes'))?.url || '',
  naxos: imageList.find(i => i.cleanName.includes('xerjoff-naxos'))?.url || '',
  delina: imageList.find(i => i.cleanName === 'pdm-delina' || i.cleanName.includes('pdm-delina'))?.url || '',
  goodgirl: imageList.find(i => i.cleanName.includes('good-girl') && !i.cleanName.includes('blush'))?.url || '',
  ellak: imageList.find(i => i.cleanName.includes('ella-k'))?.url || '',
  grandSoir: imageList.find(i => i.cleanName.includes('grand-soir'))?.url || '',
  bleu: imageList.find(i => i.cleanName.includes('bleu-de-chanel'))?.url || '',
  heroHome: imageList.find(i => i.cleanName.includes('hero-home'))?.url || '',
  strips: imageList.find(i => i.cleanName.includes('hero-home'))?.url || imageList.find(i => i.cleanName.includes('miniature'))?.url || '',
  frost: imageList.find(i => i.cleanName.includes('dior-homme-cologne'))?.url || '',
  amber: imageList.find(i => i.cleanName.includes('grand-soir'))?.url || '',
  green: imageList.find(i => i.cleanName.includes('creed-aventus'))?.url || '',
  pink: imageList.find(i => i.cleanName.includes('delina'))?.url || ''
};

export const SZ = [
  { ml: '50ml', m: 1 },
  { ml: '100ml', m: 1.7 },
  { ml: '2ml decant', m: 0.06 }
];

export const formatPeso = (n) => '₱' + n.toLocaleString('en-PH');

const rawCatalog = [
  // ==================== MEN'S COLLECTION ====================
  { house: 'Azzaro', name: 'The Most Wanted Forever Elixir', cat: 'For Him', price: 6800, img: A.amber, notes: 'Red Ginger · Woods · Bourbon Vanilla' },
  { house: 'Azzaro', name: 'The Most Wanted EDP Intense', cat: 'For Him', price: 6200, img: A.amber, notes: 'Cardamom · Toffee · Amberwood' },
  { house: 'Azzaro', name: 'The Most Wanted Parfum', cat: 'For Him', price: 6500, img: A.amber, notes: 'Ginger · Woodsy Notes · Bourbon Vanilla' },
  
  { house: 'Bvlgari', name: 'Man In Black EDP', cat: 'For Him', price: 7400, img: A.amber, notes: 'Spiced Rum · Tuberose · Leather' },
  
  { house: 'Carolina Herrera', name: '212 Men NYC EDT', cat: 'For Him', price: 5800, img: A.green, notes: 'Green Notes · Citrus · White Musk' },
  
  { house: 'Chanel', name: 'Allure Homme Eau Extrême EDP', cat: 'For Him', price: 9200, img: A.green, notes: 'Mandarin · Mint · Tonka Bean' },
  { house: 'Chanel', name: 'Bleu de Chanel EDP', cat: 'For Him', price: 8900, img: A.green, tag: 'Bestseller', notes: 'Grapefruit · Mint · Cedar' },
  { house: 'Chanel', name: 'Bleu de Chanel Parfum', cat: 'For Him', price: 10500, img: A.green, notes: 'Lemon Zest · Lavender · Sandalwood' },
  
  { house: 'Creed', name: 'Aventus For Him', cat: 'For Him', price: 18500, img: A.green, tag: 'Iconic', notes: 'Pineapple · Birch · Oakmoss' },
  { house: 'Creed', name: 'Aventus Cologne', cat: 'For Him', price: 17800, img: A.frost, notes: 'Mandarin · Ginger · Vetiver' },
  
  { house: 'Dior', name: 'Dior Homme Cologne', cat: 'For Him', price: 6900, img: A.frost, notes: 'Calabrian Bergamot · Grapefruit Blossom · Musk' },
  { house: 'Dior', name: 'Fahrenheit EDT', cat: 'For Him', price: 7200, img: A.amber, notes: 'Nutmeg · Violet Leaf · Leather' },
  { house: 'Dior', name: 'Fahrenheit Parfum', cat: 'For Him', price: 8500, img: A.amber, notes: 'Suede · Licorice · Bourbon Vanilla' },
  { house: 'Dior', name: 'Sauvage EDT', cat: 'For Him', price: 6800, img: A.green, notes: 'Calabrian Bergamot · Pepper · Ambroxan' },
  { house: 'Dior', name: 'Sauvage EDP', cat: 'For Him', price: 7900, img: A.green, tag: 'Popular', notes: 'Bergamot · Sichuan Pepper · Vanilla' },
  { house: 'Dior', name: 'Sauvage Elixir', cat: 'For Him', price: 11200, img: A.amber, tag: 'Intense', notes: 'Cinnamon · Nutmeg · Cardamom · Lavender' },
  
  { house: 'Emporio Armani', name: 'Power Of You', cat: 'For Him', price: 6400, img: A.green, notes: 'Pink Pepper · Sage · Chestnut' },
  { house: 'Emporio Armani', name: 'Stronger With You Amber', cat: 'For Him', price: 7200, img: A.amber, notes: 'Amber · Vanilla · Lavender' },
  { house: 'Emporio Armani', name: 'Stronger With You Intensely', cat: 'For Him', price: 6800, img: A.amber, tag: 'Warm', notes: 'Pink Pepper · Cinnamon · Vanilla' },
  { house: 'Emporio Armani', name: 'Stronger With You Parfum', cat: 'For Him', price: 7500, img: A.amber, notes: 'Chestnut · Vanilla · Lavender' },
  { house: 'Emporio Armani', name: 'Stronger With You Powerfully', cat: 'For Him', price: 7100, img: A.amber, notes: 'Spices · Woodsy Notes · Vanilla' },
  { house: 'Emporio Armani', name: 'Stronger With You Sandalwood', cat: 'For Him', price: 7400, img: A.amber, notes: 'Sandalwood · Vanilla · Lavender' },
  { house: 'Emporio Armani', name: 'Stronger With You Spices', cat: 'For Him', price: 7000, img: A.amber, notes: 'Cardamom · Spices · Vanilla' },
  
  { house: 'Giorgio Armani', name: 'ADG Profondo EDT', cat: 'For Him', price: 7100, img: A.frost, notes: 'Marine Notes · Green Mandarin · Rosemary' },
  { house: 'Giorgio Armani', name: 'ADG Elixir', cat: 'For Him', price: 8900, img: A.amber, notes: 'Rich Amber · Aquatic Notes · Patchouli' },
  
  { house: 'Givenchy', name: 'Gentleman Boisée EDP', cat: 'For Him', price: 6500, img: A.amber, notes: 'Black Pepper · Iris · Burning Wood' },
  { house: 'Givenchy', name: 'Réserve Privée', cat: 'For Him', price: 7200, img: A.amber, notes: 'Whisky Absolute · Iris · Amber Woods' },
  { house: 'Givenchy', name: 'Society Ambrée', cat: 'For Him', price: 7400, img: A.amber, notes: 'Cardamom · Narcissus · Vanilla' },
  
  { house: 'Guerlain', name: 'L\'Homme Idéal Habit Rouge Parfum', cat: 'For Him', price: 8200, img: A.amber, notes: 'Bitter Almond · Leather · Vanilla' },
  { house: 'Guerlain', name: 'L\'Homme Idéal EDT', cat: 'For Him', price: 6400, img: A.green, notes: 'Citrus · Orange Blossom · Amaretto' },
  
  { house: 'Hermès', name: 'H24 Herbes Vives EDP', cat: 'For Him', price: 7300, img: A.green, notes: 'Fresh Herbs · Pear Granita · Physacool' },
  { house: 'Hermès', name: 'Terre D\'Hermès Eau Givrée', cat: 'For Him', price: 6900, img: A.frost, notes: 'Citron · Juniper Berry · Timut Pepper' },
  { house: 'Hermès', name: 'Terre D\'Hermès EDT', cat: 'For Him', price: 6200, img: A.amber, notes: 'Grapefruit · Flint · Cedar' },
  
  { house: 'Lalique', name: 'Encre Noire EDT', cat: 'For Him', price: 3800, img: A.green, notes: 'Cypress · Vetiver · Cashmere Wood' },
  { house: 'Lalique', name: 'Ombre Noire EDP', cat: 'For Him', price: 4200, img: A.amber, notes: 'Cognac · Mint · Tobacco' },
  
  { house: 'Montblanc', name: 'Explorer EDP', cat: 'For Him', price: 4800, img: A.green, notes: 'Bergamot · Vetiver · Patchouli' },
  
  { house: 'Maison Francis Kurkdjian', name: 'Amyris Homme EDT', cat: 'For Him', price: 12800, img: A.frost, notes: 'Amyris · Iris · Tonka Bean' },
  { house: 'Maison Francis Kurkdjian', name: 'L\'Homme À La Rose EDP', cat: 'For Him', price: 14500, img: A.pink, notes: 'May Rose · Damask Rose · Amber Woods' },
  
  { house: 'Narciso Rodriguez', name: 'Blue Noir Parfum', cat: 'For Him', price: 6200, img: A.green, notes: 'Cardamom · Musc · Ebony Wood' },
  
  { house: 'Prada', name: 'Luna Rossa Carbon EDT', cat: 'For Him', price: 6500, img: A.green, notes: 'Bergamot · Lavender · Ambroxan' },
  
  { house: 'Paco Rabanne', name: '1 Million Elixir Intense', cat: 'For Him', price: 6800, img: A.amber, notes: 'Apple · Damask Rose · Vanilla' },
  { house: 'Paco Rabanne', name: '1 Lucky EDT Intense (Discontinued)', cat: 'For Him', price: 7500, img: A.amber, tag: 'Rare', notes: 'Hazelnut · Plum · Cedar' },
  
  { house: 'Parfums de Marly', name: 'Darley', cat: 'For Him', price: 14800, img: A.frost, notes: 'Mint · Lavender · Tonka Bean' },
  { house: 'Parfums de Marly', name: 'Galloway', cat: 'For Him', price: 14800, img: A.frost, notes: 'Citrus · Pepper · Orange Blossom' },
  { house: 'Parfums de Marly', name: 'Greenley', cat: 'For Him', price: 15200, img: A.green, notes: 'Green Apple · Bergamot · Cashmeran' },
  { house: 'Parfums de Marly', name: 'Godolphin', cat: 'For Him', price: 15500, img: A.amber, notes: 'Thyme · Saffron · Leather' },
  { house: 'Parfums de Marly', name: 'Herod', cat: 'For Him', price: 15800, img: A.amber, notes: 'Cinnamon · Tobacco Leaf · Vanilla' },
  { house: 'Parfums de Marly', name: 'Haltane', cat: 'For Him', price: 17200, img: A.green, notes: 'Clary Sage · Praline · Oud' },
  { house: 'Parfums de Marly', name: 'Layton', cat: 'For Him', price: 16500, img: A.amber, tag: 'Holy Grail', notes: 'Apple · Lavender · Vanilla' },
  { house: 'Parfums de Marly', name: 'Layton Exclusif', cat: 'For Him', price: 17800, img: A.amber, notes: 'Almond · Cardamom · Oud' },
  { house: 'Parfums de Marly', name: 'Pegasus EDP', cat: 'For Him', price: 15500, img: A.frost, notes: 'Cypress · Bitter Almond · Amber' },
  { house: 'Parfums de Marly', name: 'Sedley', cat: 'For Him', price: 15500, img: A.frost, notes: 'Spearmint · Lemon · Amberwood' },
  
  { house: 'Ralph Lauren', name: 'Polo 67 EDT', cat: 'For Him', price: 5400, img: A.green, notes: 'Bergamot · Pineapple · Vetiver' },
  
  { house: 'Tom Ford', name: 'Noir EDP', cat: 'For Him', price: 9800, img: A.amber, notes: 'Violet · Nutmeg · Black Pepper' },
  { house: 'Tom Ford', name: 'Ombré Leather EDP', cat: 'For Him', price: 10500, img: A.amber, notes: 'Cardamom · Leather · Patchouli' },
  { house: 'Tom Ford', name: 'Tobacco Vanille', cat: 'For Him', price: 16800, img: A.amber, tag: 'Opulent', notes: 'Tobacco Leaf · Spices · Vanilla' },
  
  { house: 'Valentino', name: 'Uomo Born In Roma Extradose', cat: 'For Him', price: 7600, img: A.amber, notes: 'Ginger · Vetiver · Bourbon Vanilla' },
  { house: 'Valentino', name: 'Uomo Coral Fantasy EDT', cat: 'For Him', price: 6900, img: A.pink, notes: 'Red Apple · Cardamom · Tobacco' },
  
  { house: 'Versace', name: 'Dylan Blue', cat: 'For Him', price: 4900, img: A.green, notes: 'Calabrian Bergamot · Fig Leaves · Patchouli' },
  { house: 'Versace', name: 'Eros Energy', cat: 'For Him', price: 5800, img: A.frost, notes: 'Italian Citrus · Pink Pepper · White Amber' },
  { house: 'Versace', name: 'Eros EDP', cat: 'For Him', price: 5400, img: A.green, notes: 'Mint · Green Apple · Tonka Bean' },
  { house: 'Versace', name: 'Eros Flame', cat: 'For Him', price: 5400, img: A.amber, notes: 'Chinotto · Black Pepper · Vanilla' },
  
  { house: 'Viktor & Rolf', name: 'Spicebomb Dark Leather', cat: 'For Him', price: 7200, img: A.amber, notes: 'Black Pepper · Nutmeg · Dark Leather' },
  
  { house: 'YSL', name: 'Babycat', cat: 'For Him', price: 18500, img: A.amber, tag: 'Unicorn', notes: 'Bourbon Vanilla · Suede · Frankincense' },
  { house: 'YSL', name: 'L\'Homme EDT', cat: 'For Him', price: 5900, img: A.frost, notes: 'Ginger · Bergamot · White Pepper' },
  { house: 'YSL', name: 'Myslf EDP', cat: 'For Him', price: 7400, img: A.frost, notes: 'Calabrian Bergamot · Orange Blossom · Ambrofix' },
  { house: 'YSL', name: 'Myslf EDP (W/O Cellophane)', cat: 'For Him', price: 6800, img: A.frost, tag: 'Steal Deal', notes: 'Calabrian Bergamot · Orange Blossom · Ambrofix' },
  { house: 'YSL', name: 'Y EDP', cat: 'For Him', price: 7600, img: A.green, tag: 'Compliment Magnet', notes: 'Apple · Sage · Tonka Bean' },
  { house: 'YSL', name: 'Y L\'Elixir', cat: 'For Him', price: 9200, img: A.amber, notes: 'Lavender · Geranium · Oud' },
  { house: 'YSL', name: 'Le Vestiaire Des Parfums Miniature', cat: 'For Him', price: 4500, img: A.frost, notes: 'Curated Set of YSL Miniatures' },


  // ==================== WOMEN'S COLLECTION ====================
  { house: 'Bvlgari', name: 'Omnia Amethyste EDT', cat: 'For Her', price: 5600, img: A.pink, notes: 'Green Sap · Pink Grapefruit · Iris' },
  
  { house: 'Burberry', name: 'Her Elixir', cat: 'For Her', price: 7200, img: A.pink, notes: 'Strawberry · Blackberry · Jasmine · Vanilla' },
  
  { house: 'Carolina Herrera', name: 'Good Girl EDP', cat: 'For Her', price: 7100, img: A.pink, tag: 'Bestseller', notes: 'Tuberose · Jasmine · Tonka Bean' },
  { house: 'Carolina Herrera', name: 'Good Girl Blush EDP Elixir', cat: 'For Her', price: 7800, img: A.pink, notes: 'Mandarin · Ylang-Ylang · Vanilla' },
  
  { house: 'Chloé', name: 'Cedrus EDP', cat: 'For Her', price: 8200, img: A.frost, notes: 'Cardamom · Woodsy Notes · Sandalwood' },
  { house: 'Chloé', name: 'Cedrus EDP Intense', cat: 'For Her', price: 8900, img: A.amber, notes: 'Rich Cedar · Spices · Musks' },
  { house: 'Chloé', name: 'Lavanda', cat: 'For Her', price: 8200, img: A.frost, notes: 'Provençal Lavender · Solar Notes' },
  
  { house: 'Chanel', name: 'Chance EDT', cat: 'For Her', price: 7900, img: A.pink, notes: 'Pink Pepper · Jasmine · Patchouli' },
  { house: 'Chanel', name: 'Chance Eau Tendre EDP', cat: 'For Her', price: 9400, img: A.pink, tag: 'Soft', notes: 'Grapefruit · Quince · Rose · White Musk' },
  { house: 'Chanel', name: 'Coco Mademoiselle EDP', cat: 'For Her', price: 9800, img: A.pink, notes: 'Orange · Jasmine · Rose · Patchouli' },
  
  { house: 'Creed', name: 'Aventus For Her', cat: 'For Her', price: 17500, img: A.pink, notes: 'Green Apple · Pink Pepper · Patchouli' },
  { house: 'Creed', name: 'Carmina', cat: 'For Her', price: 18200, img: A.pink, notes: 'Black Cherry · Violet · Rose · Amber' },
  { house: 'Creed', name: 'Eladaria (W/O Cap)', cat: 'For Her', price: 14500, img: A.frost, tag: 'Tester Special', notes: 'Fresh Florals · Citrus · Soft Amber' },
  { house: 'Creed', name: 'Love In White (W/O Cap)', cat: 'For Her', price: 13800, img: A.frost, tag: 'Tester Special', notes: 'Orange Peel · Iris · White Jasmine' },
  
  { house: 'Dolce & Gabbana', name: 'Devotion EDP', cat: 'For Her', price: 6800, img: A.amber, notes: 'Candied Citrus · Orange Blossom · Vanilla' },
  { house: 'Dolce & Gabbana', name: 'The One EDP', cat: 'For Her', price: 6400, img: A.amber, notes: 'Peach · Lychee · Jasmine · Vanilla' },
  
  { house: 'Dior', name: 'Blooming Bouquet EDT', cat: 'For Her', price: 7400, img: A.pink, notes: 'Damask Rose · Peony · White Musk' },
  { house: 'Dior', name: 'J\'adore EDT', cat: 'For Her', price: 7600, img: A.pink, notes: 'Yellow Mandarin · Neroli · Jasmine' },
  
  { house: 'Giorgio Armani', name: 'Acqua Di Gioia', cat: 'For Her', price: 5900, img: A.frost, notes: 'Mint Leaves · Limone Primo Fiore · Jasmine' },
  
  { house: 'Jean Paul Gaultier', name: 'Scandal Absolu', cat: 'For Her', price: 7600, img: A.amber, notes: 'Black Fig · Tuberose · Sandalwood' },
  
  { house: 'Lanvin', name: 'Éclat d\'Arpège For Women', cat: 'For Her', price: 4200, img: A.pink, notes: 'Lemon Leaves · Wisteria · Peach Blossom' },
  
  { house: 'Lancôme', name: 'Idôle L\'Eau De Parfum', cat: 'For Her', price: 6400, img: A.pink, notes: 'Rose · Jasmine · Clean Accord' },
  { house: 'Lancôme', name: 'La Vie Est Belle', cat: 'For Her', price: 6900, img: A.pink, tag: 'Sweet', notes: 'Blackcurrant · Pear · Iris · Praline' },
  
  { house: 'Mugler', name: 'Angel Nova', cat: 'For Her', price: 6500, img: A.pink, notes: 'Raspberry · Damask Rose · Akigalawood' },
  
  { house: 'Maison Francis Kurkdjian', name: 'Baccarat Rouge 540 EDP', cat: 'For Her', price: 18900, img: A.amber, tag: 'Iconic', notes: 'Saffron · Jasmine · Amberwood' },
  { house: 'Maison Francis Kurkdjian', name: 'Kurky', cat: 'For Her', price: 16500, img: A.pink, notes: 'Blushing Florals · Ambergris · White Musks' },
  
  { house: 'Narciso Rodriguez', name: 'Ambrée EDP', cat: 'For Her', price: 6200, img: A.amber, notes: 'Frangipani · Ylang-Ylang · Musc · Amber' },
  { house: 'Narciso Rodriguez', name: 'Musc Noir Rose', cat: 'For Her', price: 6800, img: A.pink, tag: 'Viral', notes: 'Plum · Pink Pepper · Tuberose · Musc' },
  { house: 'Narciso Rodriguez', name: 'Musc Nude', cat: 'For Her', price: 6500, img: A.pink, notes: 'White Flowers · Musc · Tonka Bean' },
  { house: 'Narciso Rodriguez', name: 'Pure Musc', cat: 'For Her', price: 6400, img: A.frost, notes: 'Jasmine · Orange Blossom · Musc · Cashmeran' },
  { house: 'Narciso Rodriguez', name: 'Poudrée', cat: 'For Her', price: 6200, img: A.pink, notes: 'Bulgarian Rose · Jasmine · Musc · Cedar' },
  
  { house: 'Prada', name: 'Infusion D\'Iris', cat: 'For Her', price: 7400, img: A.frost, notes: 'Iris · Neroli · Mandarin · Benzoin' },
  { house: 'Prada', name: 'Paradoxe EDP', cat: 'For Her', price: 7600, img: A.pink, notes: 'Neroli · Amber · White Musk' },
  { house: 'Prada', name: 'Paradoxe EDP Intense', cat: 'For Her', price: 8200, img: A.pink, notes: 'Bergamot · Neroli · Moss Accord' },
  { house: 'Prada', name: 'Paradoxe Virtual Flower', cat: 'For Her', price: 7900, img: A.pink, notes: 'Jasmine AI Accord · Bergamot · Musk' },
  { house: 'Prada', name: 'Paradoxe Radical Essence', cat: 'For Her', price: 8500, img: A.pink, notes: 'Rich Bourbon Vanilla · Neroli · Amber' },
  
  { house: 'Parfums de Marly', name: 'Athalia', cat: 'For Her', price: 16200, img: A.frost, notes: 'Incense · Rose · Iris · Amber' },
  { house: 'Parfums de Marly', name: 'Cassili', cat: 'For Her', price: 16500, img: A.pink, notes: 'Red Currant · Plum Accord · Frangipani' },
  { house: 'Parfums de Marly', name: 'Delina La Rosée', cat: 'For Her', price: 16800, img: A.pink, notes: 'Lychee · Pear · Turkish Rose · Water Accord' },
  { house: 'Parfums de Marly', name: 'Delina EDP', cat: 'For Her', price: 17500, img: A.pink, tag: 'Signature', notes: 'Lychee · Rhubarb · Turkish Rose · Vanilla' },
  { house: 'Parfums de Marly', name: 'Delina Exclusif', cat: 'For Her', price: 18500, img: A.pink, notes: 'Pear · Lychee · Turkish Rose · Amber' },
  { house: 'Parfums de Marly', name: 'Meliora', cat: 'For Her', price: 16200, img: A.pink, notes: 'Red Berries · Raspberry · Rose · Vanilla' },
  { house: 'Parfums de Marly', name: 'Safanad', cat: 'For Her', price: 16200, img: A.amber, notes: 'Orange · Pear · Orange Blossom · Amber' },
  { house: 'Parfums de Marly', name: 'Valaya EDP', cat: 'For Her', price: 17800, img: A.frost, notes: 'Bergamot · White Peach · Nympheal · Musk' },
  { house: 'Parfums de Marly', name: 'Valaya Exclusif', cat: 'For Her', price: 18900, img: A.frost, notes: 'White Peach · Solar Notes · Ambroxan' },
  
  { house: 'Versace', name: 'Dylan Purple Pour Femme', cat: 'For Her', price: 4900, img: A.pink, notes: 'Purple Freesia · Bergamot · Iso E Super' },
  
  { house: 'Valentino', name: 'Donna Born In Roma Coral Fantasy EDP', cat: 'For Her', price: 7400, img: A.pink, notes: 'Kiwi Accord · Jasmine · Musks' },
  
  { house: 'YSL', name: 'Black Opium EDP', cat: 'For Her', price: 7400, img: A.amber, notes: 'Black Coffee · White Flowers · Vanilla' },
  { house: 'YSL', name: 'Libre EDP', cat: 'For Her', price: 7600, img: A.pink, notes: 'Lavender · Orange Blossom · Musk' },
  { house: 'YSL', name: 'Libre EDP Intense', cat: 'For Her', price: 8400, img: A.amber, notes: 'Lavender · Orchid · Bourbon Vanilla' },
  { house: 'YSL', name: 'Libre Le Parfum', cat: 'For Her', price: 8900, img: A.amber, notes: 'Saffron · Ginger · Lavender · Honey' },
  { house: 'YSL', name: 'Mon Paris EDP', cat: 'For Her', price: 7200, img: A.pink, notes: 'Strawberry · Raspberry · Datura · White Musk' },


  // ==================== NICHE COLLECTION ====================
  { house: 'Acca Kappa', name: 'White Moss', cat: 'Niche', price: 4800, img: A.frost, notes: 'Lemon · Bergamot · Lavender · Sweet Woods' },
  
  { house: 'Atelier Des Ors', name: 'Villa Primerose', cat: 'Niche', price: 14500, img: A.amber, notes: 'Rose · Cardamom · Leatherwood' },
  
  { house: 'Byredo', name: 'Black Saffron', cat: 'Niche', price: 13800, img: A.amber, notes: 'Pomelo · Saffron · Black Violet · Leather' },
  { house: 'Byredo', name: 'Dessert Dawn', cat: 'Niche', price: 14200, img: A.amber, notes: 'Cardamom · Rose Petals · Cedarwood' },
  { house: 'Byredo', name: 'De Los Santos', cat: 'Niche', price: 13800, img: A.green, notes: 'Clary Sage · Mirabelle · Cistus' },
  { house: 'Byredo', name: 'Slow Dance', cat: 'Niche', price: 13800, img: A.amber, notes: 'Opoponax · Geranium · Labdanum · Vanilla' },
  
  { house: 'Clive Christian', name: 'Town & Country', cat: 'Niche', price: 24000, img: A.green, tag: 'Ultra Niche', notes: 'Clary Sage · Ambergris · Sandalwood' },
  
  { house: 'Dries Van Noten', name: 'Bois Defendu', cat: 'Niche', price: 16500, img: A.green, notes: 'Cardamom · Cedarwood · Vanilla' },
  { house: 'Dries Van Noten', name: 'Crazy Bazil', cat: 'Niche', price: 16500, img: A.green, notes: 'Fresh Basil · Vetiver · Fig Leaf' },
  
  { house: 'Ella K', name: 'Amber K', cat: 'Niche', price: 14800, img: A.amber, notes: 'Golden Amber · Resins · Spices' },
  
  { house: 'État Libre d\'Orange', name: 'Story Of My Life', cat: 'Niche', price: 9500, img: A.amber, notes: 'Benzoin · Leather · Cinnamon' },
  
  { house: 'Fragrance Du Bois', name: 'Minuit Et Demi', cat: 'Niche', price: 18500, img: A.amber, notes: 'Cardamom · Caramel · Bourbon Vanilla' },
  { house: 'Fragrance Du Bois', name: 'New York Intense', cat: 'Niche', price: 19500, img: A.amber, notes: 'Cinnamon · Rose · Oud · Guaiac Wood' },
  { house: 'Fragrance Du Bois', name: 'Oud Jaune Intense Parfum', cat: 'Niche', price: 22000, img: A.amber, notes: 'Ylang-Ylang · Jasmine · Pure Oud' },
  { house: 'Fragrance Du Bois', name: 'Oud Orange Intense', cat: 'Niche', price: 21000, img: A.amber, notes: 'Coconut · Bourbon Vanilla · Pure Oud' },
  { house: 'Fragrance Du Bois', name: 'Sirène', cat: 'Niche', price: 18500, img: A.pink, notes: 'Pink Pepper · Rose · Lactonic Notes' },
  { house: 'Fragrance Du Bois', name: 'Solstis', cat: 'Niche', price: 17500, img: A.frost, notes: 'Apple · Bergamot · Pink Pepper · Vetiver' },
  { house: 'Fragrance Du Bois', name: 'Tropiques', cat: 'Niche', price: 18500, img: A.amber, notes: 'Mango · Passionfruit · Warm Amber' },
  
  { house: 'Maison Crivelli', name: 'Hibiscus Mahajad', cat: 'Niche', price: 16800, img: A.pink, tag: 'Extrait', notes: 'Hibiscus · Rose · Spearmint · Leather · Vanilla' },
  
  { house: 'Maison Francis Kurkdjian', name: 'Grand Soir', cat: 'Niche', price: 14500, img: A.amber, tag: 'Evening', notes: 'Spanish Labdanum · Siam Benzoin · Tonka Bean · Amber' },
  
  { house: 'Narcotica', name: 'Dulce Diablo', cat: 'Niche', price: 17200, img: A.amber, notes: 'Cognac · Apricot · Chocolate · Rum · Sugar' },
  
  { house: 'Nasomatto', name: 'Fantomas', cat: 'Niche', price: 9200, img: A.frost, notes: 'Melon · Rubber · Smoke · Caramel' },
  { house: 'Nasomatto', name: 'Sadonaso', cat: 'Niche', price: 9200, img: A.amber, notes: 'Coffee · Musk · Tobacco · Animalic Accord' },
  { house: 'Nasomatto', name: 'Silver Musk', cat: 'Niche', price: 9200, img: A.frost, notes: 'Clean Musk · Metallic Notes · Solar Accords' },
  { house: 'Nasomatto', name: 'Nudiflorium', cat: 'Niche', price: 9200, img: A.pink, notes: 'Jasmine · Leather · Touch Accord' },
  
  { house: 'Nishane', name: 'Ege Atiaio', cat: 'Niche', price: 11500, img: A.frost, notes: 'Yuzu · Anise · Basil · Mint' },
  { house: 'Nishane', name: 'Fan Your Flames', cat: 'Niche', price: 12500, img: A.amber, notes: 'Coconut · Rum · Tobacco · Tonka Bean' },
  { house: 'Nishane', name: 'Fan Your Flames X', cat: 'Niche', price: 14500, img: A.amber, notes: 'Coconut · Rum · Cedar · Patchouli' },
  { house: 'Nishane', name: 'Hacivat Oud', cat: 'Niche', price: 21000, img: A.green, notes: 'Pineapple · Bergamot · Pure Oud' },
  { house: 'Nishane', name: 'Hundred Silent Ways', cat: 'Niche', price: 11800, img: A.pink, notes: 'Tuberose · Peach · Gardenia · Vanilla' },
  { house: 'Nishane', name: 'Hundred Silent Ways X', cat: 'Niche', price: 13800, img: A.pink, notes: 'Mandarin · Peach · Leather · Vanilla' },
  { house: 'Nishane', name: 'Nefs', cat: 'Niche', price: 26500, img: A.amber, tag: 'Crown Jewel', notes: 'Honey · Saffron · Rose · Oud · Vanilla' },
  { house: 'Nishane', name: 'Wulong Cha', cat: 'Niche', price: 11500, img: A.green, notes: 'Bergamot · Oolong Tea · Nutmeg · Fig' },
  
  { house: 'Obvious', name: 'Un Musc', cat: 'Niche', price: 6800, img: A.frost, notes: 'Bergamot · Vetiver · White Musks' },
  { house: 'Obvious', name: 'Une Figue', cat: 'Niche', price: 6800, img: A.green, notes: 'Fig Leaf · Coconut Water · Cedarwood' },
  
  { house: 'Oman Luxury', name: 'Royal Incense', cat: 'Niche', price: 13500, img: A.amber, notes: 'Omani Frankincense · Lily · Amber' },
  { house: 'Oman Luxury', name: 'Wanderlust', cat: 'Niche', price: 13500, img: A.green, notes: 'Bergamot · Fig · Cedarwood' },
  
  { house: 'Ormonde Jayne', name: 'Levant', cat: 'Niche', price: 12800, img: A.pink, notes: 'Mandarin · Rose · Orange Blossom · Musk' },
  { house: 'Ormonde Jayne', name: 'Sakura', cat: 'Niche', price: 13500, img: A.pink, notes: 'Cherry Blossom · Lime · Violet Leaf · Cedar' },
  
  { house: 'Orto Parisi', name: 'Bergamask', cat: 'Niche', price: 9800, img: A.green, notes: 'Bergamot · Musk' },
  { house: 'Orto Parisi', name: 'Megamare', cat: 'Niche', price: 9800, img: A.frost, tag: 'Eternal Beast', notes: 'Sea Notes · Salt · Ambergris · Seaweed' },
  { house: 'Orto Parisi', name: 'Terroni', cat: 'Niche', price: 9800, img: A.amber, notes: 'Volcanic Ash · Earth · Spices · Smoke' },
  { house: 'Orto Parisi', name: 'Risvelium', cat: 'Niche', price: 9800, img: A.amber, notes: 'Deep Resinous Woods · Musk' },
  { house: 'Orto Parisi', name: 'Seminalis', cat: 'Niche', price: 9800, img: A.frost, notes: 'Lactonic Notes · Bourbon Vanilla · Cedar' },
  { house: 'Orto Parisi', name: 'Viride', cat: 'Niche', price: 9800, img: A.green, notes: 'Herbal Accord · Green Woods · Vetiver' },
  
  { house: 'Penhaligon\'s', name: 'The Duke EDP', cat: 'Niche', price: 15500, img: A.amber, notes: 'Rose · Cumin · Pepper · Gin Accord' },
  { house: 'Penhaligon\'s', name: 'Mister Thompson EDP', cat: 'Niche', price: 15500, img: A.amber, notes: 'Pink Pepper · Orris · Sesame · Vanilla' },
  
  { house: 'Profumum Roma', name: 'Sorriso', cat: 'Niche', price: 16200, img: A.amber, notes: 'Dark Chocolate · Bitter Orange · Vanilla · Woods' },
  
  { house: 'Room 1015', name: 'Ten Fifteen', cat: 'Niche', price: 8200, img: A.amber, notes: 'Saffron · Mandarin · Iris · Papyrus · Violet' },
  { house: 'Room 1015', name: 'Wavechild', cat: 'Niche', price: 8200, img: A.frost, notes: 'Watermelon · Coconut Water · Ambergris' },
  
  { house: 'Roja Parfums', name: 'Enigma Pour Homme Parfum Cologne', cat: 'Niche', price: 17500, img: A.amber, notes: 'Bergamot · Cognac · Tobacco · Vanilla' },
  { house: 'Roja Parfums', name: 'Midsummer Dream', cat: 'Niche', price: 18500, img: A.frost, notes: 'Rose · Orange Blossom · Cardamom · Ambergris' },
  
  { house: 'Scentologia', name: 'Soli.flore.', cat: 'Niche', price: 10500, img: A.pink, notes: 'Bergamot · Freesia · White Amber' },
  { house: 'Scentologia', name: 'Syn.ergy', cat: 'Niche', price: 10500, img: A.amber, notes: 'Mango · Peach · Saffron · Cedarwood' },
  
  { house: 'Sora Dora', name: 'Mallow', cat: 'Niche', price: 14200, img: A.pink, notes: 'Vanilla · Marshmallow · Orange Blossom · Raspberry' },
  { house: 'Sora Dora', name: 'Jany', cat: 'Niche', price: 14200, img: A.amber, notes: 'Baked Apple · Cinnamon · Puff Pastry · Vanilla' },
  { house: 'Sora Dora', name: 'Ylop', cat: 'Niche', price: 14200, img: A.amber, notes: 'Apricot · Black Tea · Osmanthus · Sesame' },
  
  { house: 'Sospiro', name: 'Afgano Puro', cat: 'Niche', price: 14800, img: A.amber, notes: 'Herbal Notes · Cedar · Patchouli · Tobacco · Vanilla' },
  
  { house: 'Stéphane Humbert Lucas', name: 'Mango Kiss', cat: 'Niche', price: 16500, img: A.amber, notes: 'Mango · Neroli · Coconut · White Musk' },
  { house: 'Stéphane Humbert Lucas', name: 'Pink Boa', cat: 'Niche', price: 16500, img: A.pink, notes: 'Blackcurrant · Vodka Accord · Pink Pepper' },
  { house: 'Stéphane Humbert Lucas', name: 'Sand Dance', cat: 'Niche', price: 16800, img: A.amber, notes: 'Whisky · Warm Cocoa · Tonka Bean · Sandalwood' },
  { house: 'Stéphane Humbert Lucas', name: 'Taklaman', cat: 'Niche', price: 16500, img: A.amber, notes: 'Bergamot · Rose · Guaiac Wood · Vanilla' },
  
  { house: 'Thomas Kosmala', name: 'No.4 EDP', cat: 'Niche', price: 8900, img: A.frost, tag: 'Beast Mode', notes: 'Lemon Zest · Bitter Orange · Amber · Woods' },
  { house: 'Thomas Kosmala', name: 'No.4 Neon EDP', cat: 'Niche', price: 9500, img: A.frost, notes: 'Yuzu · Pomelo · Electric Musks' },
  
  { house: 'Tiziana Terenzi', name: 'Kirke Overdose', cat: 'Niche', price: 15500, img: A.amber, notes: 'Passion Fruit · Peach · Raspberry · Musk' },
  { house: 'Tiziana Terenzi', name: 'Telea', cat: 'Niche', price: 18500, img: A.frost, notes: 'Calabrian Bergamot · Bulgarian Rose · Ambergris' },
  
  { house: 'Tom Ford', name: 'Myrrhe Mystère', cat: 'Niche', price: 16800, img: A.amber, notes: 'Myrrh Essence · Ultra-Vanille Accord' },
  
  { house: 'Thameen London', name: 'Carved Oud', cat: 'Niche', price: 15800, img: A.green, notes: 'Guatemalan Cardamom · Cedarwood · South Indian Oud' },
  { house: 'Thameen London', name: 'Peregrina', cat: 'Niche', price: 15800, img: A.amber, notes: 'Damask Rose · Ylang-Ylang · Vanilla · Amber' },
  
  { house: 'Vilhelm Parfumerie', name: 'Mango Skin', cat: 'Niche', price: 14500, img: A.amber, notes: 'Mango · Blackcurrant · Wild Frangipani' },
  
  { house: 'Van Cleef & Arpels', name: 'Bois D\'Iris', cat: 'Niche', price: 9200, img: A.frost, notes: 'Iris · Driftwood · Ambergris · Vanilla' },
  { house: 'Van Cleef & Arpels', name: 'Bois D\'Amande', cat: 'Niche', price: 9200, img: A.frost, notes: 'Almond · Lemon · Cedarwood · Musk' },
  { house: 'Van Cleef & Arpels', name: 'Bois Doré', cat: 'Niche', price: 9500, img: A.amber, notes: 'Black Pepper · Mineral Notes · Tonka Bean' },
  { house: 'Van Cleef & Arpels', name: 'Moonlight Patchouli', cat: 'Niche', price: 9500, img: A.amber, notes: 'Patchouli · Cocoa · Bulgarian Rose · Leather' },
  { house: 'Van Cleef & Arpels', name: 'Neroli Amara EDP', cat: 'Niche', price: 9200, img: A.frost, notes: 'Italian Lemon · Mandarin · Neroli · Cypress' },
  { house: 'Van Cleef & Arpels', name: 'Neroli Amara Le Parfum', cat: 'Niche', price: 10500, img: A.frost, notes: 'Concentrated Neroli · Solar Accord · Amber' },
  { house: 'Van Cleef & Arpels', name: 'Rose Rouge', cat: 'Niche', price: 9200, img: A.pink, notes: 'Pink Pepper · Blackcurrant · Rose · Cocoa' },
  { house: 'Van Cleef & Arpels', name: 'Santal Blanc', cat: 'Niche', price: 9500, img: A.frost, notes: 'Mandarin · Fig Milk · Sandalwood · Musk' },
  { house: 'Van Cleef & Arpels', name: 'Santal Blanc EDP (Travel Set)', cat: 'Niche', price: 7800, img: A.frost, notes: 'Santal Blanc Atomizer + 3x Refills' },
  
  { house: 'Xerjoff', name: 'Allende', cat: 'Niche', price: 17500, img: A.amber, notes: 'Madagascar Vanilla · Magnolia · White Musk' },
  { house: 'Xerjoff', name: 'Dama Bianca', cat: 'Niche', price: 16500, img: A.pink, notes: 'Lime · Kumquat · Florentine Iris · Vanilla' },
  { house: 'Xerjoff', name: 'Erba Gold', cat: 'Niche', price: 17200, img: A.amber, notes: 'Amalfi Lemon · Calabrian Bergamot · Green Apple' },
  { house: 'Xerjoff', name: 'Louis XV 1722 De Venoge', cat: 'Niche', price: 28000, img: A.amber, notes: 'Vintage Oak · Amber · Fine Spirits Accord' },
  { house: 'Xerjoff', name: 'Italica', cat: 'Niche', price: 17800, img: A.amber, notes: 'Saffron · Almond · Milk · Bourbon Vanilla · Toffee' },
  { house: 'Xerjoff', name: 'Levar Del Sole', cat: 'Niche', price: 17500, img: A.amber, notes: 'Citrus · Rose · Cardamom · Sandalwood' },
  { house: 'Xerjoff', name: 'Mefisto Gentiluomo', cat: 'Niche', price: 16500, img: A.frost, notes: 'Bergamot · Grapefruit · Lavender · Violet' },
  { house: 'Xerjoff', name: 'Naxos', cat: 'Niche', price: 16800, img: A.amber, tag: 'Bestseller', notes: 'Bergamot · Lavender · Honey · Tobacco · Vanilla' },
  { house: 'Xerjoff', name: 'Starlight Parfum', cat: 'Niche', price: 18500, img: A.amber, notes: 'Cardamom · Bergamot · Cinnamon · Amber' },
  { house: 'Xerjoff', name: 'Quattro Pizzi', cat: 'Niche', price: 17500, img: A.pink, notes: 'Rum · Davana · Tuberose · Coconut' },
  { house: 'Xerjoff', name: 'Torino 21', cat: 'Niche', price: 16800, img: A.green, tag: 'Fresh King', notes: 'Mint · Lemon · Thyme · Basil · Jasmine' },
  { house: 'Xerjoff', name: 'Torino 22', cat: 'Niche', price: 16800, img: A.amber, notes: 'Saffron · Bergamot · Eucalyptus · Clary Sage' },
  { house: 'Xerjoff', name: 'Torino 23', cat: 'Niche', price: 16800, img: A.amber, notes: 'Bergamot · Rose · Nutmeg · Cardamom' },
  { house: 'Xerjoff', name: '40 Knots', cat: 'Niche', price: 17500, img: A.frost, notes: 'Salt · Green Notes · Woody Notes · Sea Water · Honey' }
];

export const P = rawCatalog.map((item, index) => {
  const slug = (item.house + '-' + item.name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const notesParts = item.notes.split('·').map(s => s.trim());
  const topNote = notesParts[0] || 'Citrus & Spices';
  const heartNote = notesParts[1] || 'Heart Accord';
  const baseNote = notesParts[2] || 'Wood & Amber';

  const realImg = getPerfumeImage(item.house, item.name, item.cat);

  return {
    id: slug,
    name: item.name,
    house: item.house,
    cat: item.cat,
    price: item.price,
    img: realImg,
    tag: item.tag || null,
    notes: item.notes,
    top: topNote,
    heart: heartNote,
    base: baseNote,
    desc: `${item.name} by ${item.house}. 100% authentic fragrance offered by Danscents in Baguio at under-mall pricing in the PH. Notes of ${item.notes.replace(/·/g, ',')}.`
  };
});
