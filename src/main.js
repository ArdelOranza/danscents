import './style.css';
import { createIcons, Check, ArrowRight, ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Package, Droplets, Gift, Banknote, Smartphone, Landmark } from 'lucide';
import { P, A, SZ, formatPeso, getPerfumeImage } from './data.js';

import logoChanel from './assets/logo/chanel-svgrepo-com.svg';
import logoDior from './assets/logo/dior-svgrepo-com.svg';
import logoCreed from './assets/logo/creedlogo.svg';
import logoMFK from './assets/logo/MFK.svg';
import logoTomFord from './assets/logo/tomford.svg';
import logoHermes from './assets/logo/hermes-1-logo-svgrepo-com(1).svg';
import logoYSL from './assets/logo/Saint_Laurent_idnR5GYFJx_0.svg';
import logoByredo from './assets/logo/BYREDO.svg';
import logoInitio from './assets/logo/696773cdd7d5f-INITIO-Parfums-Prives.svg';

import photoByredo from './assets/photos/byredo.jpg';
import photoCreed from './assets/photos/creed.webp';
import photoDior from './assets/photos/dior.jpg';
import photoHermes from './assets/photos/hermes.webp';
import photoInitio from './assets/photos/initio.png';
import photoTomFord from './assets/photos/tomford.jpeg';
import photoYSL from './assets/photos/ysl.webp';

const IC = { Check, ArrowRight, ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Package, Droplets, Gift, Banknote, Smartphone, Landmark };

const brandLogos = [
  { name: 'Chanel', src: logoChanel, h: 'h-8 sm:h-9' },
  { name: 'Dior', src: logoDior, h: 'h-8 sm:h-9' },
  { name: 'Creed', src: logoCreed, h: 'h-6.5 sm:h-7.5' },
  { name: 'Maison Francis Kurkdjian', src: logoMFK, h: 'h-4.5 sm:h-5' },
  { name: 'Tom Ford', src: logoTomFord, h: 'h-4 sm:h-4.5' },
  { name: 'Hermès', src: logoHermes, h: 'h-9 sm:h-10' },
  { name: 'Yves Saint Laurent', src: logoYSL, h: 'h-8 sm:h-9' },
  { name: 'Byredo', src: logoByredo, h: 'h-4.5 sm:h-5' },
  { name: 'Initio', src: logoInitio, h: 'h-7 sm:h-8' }
];

// --- Hero Carousel Data ---
const heroSlides = [
  {
    id: 'maison-francis-kurkdjian-baccarat-rouge-540-edp',
    name: 'Baccarat Rouge 540',
    house: 'Maison Francis Kurkdjian',
    kick: 'Maison Francis Kurkdjian — Paris',
    t1: 'Radiant,',
    t2: 'mineral icon.',
    desc: 'Mineral amber, saffron, and cedar turned up to a luminous glow.',
    price: '₱18,900',
    img: A.baccarat,
    word: 'Kurkdjian'
  },
  {
    id: 'creed-aventus-for-him',
    name: 'Aventus',
    house: 'Creed',
    kick: 'Creed 1760 — Heritage',
    t1: 'Fruit &',
    t2: 'smoked birch.',
    desc: 'The modern benchmark of confidence. Pineapple, smoke, and oakmoss.',
    price: '₱18,500',
    img: A.aventus,
    word: 'Aventus'
  },
  {
    id: 'ysl-libre-edp',
    name: 'Libre',
    house: 'Yves Saint Laurent',
    kick: 'Yves Saint Laurent — Paris',
    t1: 'Lavender &',
    t2: 'orange blossom.',
    desc: 'Cool lavender and warm orange blossom in perfect tension all day.',
    price: '₱7,600',
    img: A.libre,
    word: 'Saint Laurent'
  },
  {
    id: 'parfums-de-marly-delina-edp',
    name: 'Delina EDP',
    house: 'Parfums de Marly',
    kick: 'Parfums de Marly — France',
    t1: 'Turkish rose &',
    t2: 'lychee bouquet.',
    desc: 'Sensual floral creation combining lychee, rhubarb, and Turkish rose.',
    price: '₱17,500',
    img: A.delina,
    word: 'De Marly'
  },
  {
    id: 'carolina-herrera-good-girl-edp',
    name: 'Good Girl EDP',
    house: 'Carolina Herrera',
    kick: 'Carolina Herrera — New York',
    t1: 'Tuberose &',
    t2: 'roasted tonka.',
    desc: 'Sweet jasmine, tuberose, and roasted tonka bean in a daring stiletto silhouette.',
    price: '₱7,100',
    img: A.goodgirl,
    word: 'Herrera'
  },
  {
    id: 'ella-k-amber-k',
    name: 'Amber K',
    house: 'Ella K',
    kick: 'Ella K — Haute Parfumerie',
    t1: 'Golden amber &',
    t2: 'precious resins.',
    desc: 'Golden amber, warm resins, and exotic spices woven into an ethereal trail.',
    price: '₱14,800',
    img: A.ellak,
    word: 'Ella K'
  }
];

let heroSlideIndex = 0;
let heroTimer = null;

// --- Global State ---
let cart = [
  { id: 'creed-aventus-for-him', size: '50ml', qty: 1, price: 18500 },
  { id: 'maison-francis-kurkdjian-baccarat-rouge-540-edp', size: '50ml', qty: 1, price: 18900 }
];
let shopFilter = 'All';
let pdpState = { id: null, size: '50ml' };
let lastHomeSection = null;
let lastBrandName = null;
const _now = new Date();
let calY = _now.getFullYear(), calM = _now.getMonth(), selDate = null, selTime = null, visit = 'Store visit';
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TODAY = new Date(_now.getFullYear(), _now.getMonth(), _now.getDate());

// --- View Templates ---
const views = {
  home: `
    <main class="view active" id="view-home">
      <!-- HERO CAROUSEL -->
      <section class="hero-section" id="hero">
        <div class="hero-ambient-glow" id="heroGlow"></div>
        <div class="hero-bg-word hero-text-anim" id="heroBgWord" data-hero="bg">${heroSlides[0].word}</div>
        <div class="hero-bottle-wrap" id="heroBottleWrap">
          ${heroSlides.map((s, i) => `
            <img class="hero-bottle-img ${i === 0 ? 'active' : ''}" data-slide-img="${i}" data-hero="bottle" src="${s.img}" alt="${s.name}">
          `).join('')}
        </div>
        <div class="hero-bottle-shadow"></div>
        <div class="hero-kick hero-text-anim" id="heroKickWrapper">
          <span class="hero-line"><i id="heroKickText">${heroSlides[0].kick}</i></span>
        </div>
        <h1 class="hero-title hero-text-anim" id="heroTitle">
          <span class="hero-line"><i id="heroTitleLine1">${heroSlides[0].t1}</i></span>
          <span class="hero-line"><i id="heroTitleLine2" class="italic">${heroSlides[0].t2}</i></span>
        </h1>
        <div class="hero-meta cursor-pointer hero-text-anim" id="heroMetaClick" data-open="${heroSlides[0].id}">
          <p id="heroDesc">${heroSlides[0].desc}</p>
          <div class="hero-meta-price flex items-center gap-3 justify-end mt-2">
            <span id="heroName">${heroSlides[0].name}</span>
            <span id="heroPrice" class="text-xs font-sans tracking-wider font-semibold opacity-60">${heroSlides[0].price}</span>
          </div>
        </div>
        <div class="hero-dots" id="heroDots"></div>
      </section>

      <!-- KINETIC MARQUEE WITH OPTICALLY BALANCED BRAND LOGOS -->
      <div class="border-y border-ink py-5 overflow-hidden bg-ink text-paper">
        <div class="flex gap-14 items-center whitespace-nowrap will-change-transform w-max" id="kine">
          <div class="flex gap-14 items-center flex-none" id="kineHalf">
            ${brandLogos.map(b => `
              <div class="flex items-center gap-14 flex-none opacity-85 hover:opacity-100 transition-opacity">
                <img src="${b.src}" alt="${b.name}" class="${b.h} w-auto object-contain filter brightness-0 invert" />
                <span class="w-1.5 h-1.5 rounded-full bg-paper/30 flex-none"></span>
              </div>
            `).join('')}
          </div>
          <div class="flex gap-14 items-center flex-none">
            ${brandLogos.map(b => `
              <div class="flex items-center gap-14 flex-none opacity-85 hover:opacity-100 transition-opacity">
                <img src="${b.src}" alt="${b.name}" class="${b.h} w-auto object-contain filter brightness-0 invert" />
                <span class="w-1.5 h-1.5 rounded-full bg-paper/30 flex-none"></span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- MANIFESTO -->
      <section class="relative px-edge py-[clamp(90px,13vw,190px)] grid grid-cols-1 md:grid-cols-2 gap-[clamp(30px,5vw,90px)] items-center">
        <div>
          <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute ru block mb-6">§ 01 — The House</span>
          <p id="mani" class="font-serif text-[clamp(1.7rem,3.4vw,3rem)] leading-[1.24] max-w-[22ch]">We do not sell perfume. We collect the ones worth remembering, and we hand them to the people who will.</p>
          <div class="ru d2 mt-8"><a class="ghost-link cursor-pointer" data-nav="shop">Read our selection <i data-lucide="arrow-right"></i></a></div>
        </div>
        <div class="relative h-[clamp(360px,50vw,600px)] mt-8 md:mt-0">
          <span class="absolute -top-[6%] right-[8%] font-serif text-[clamp(6rem,12vw,11rem)] italic text-ink opacity-[0.08] z-10">01</span>
          <div class="absolute top-0 left-0 w-[62%] h-[74%] z-20 overflow-hidden bg-paper-2 ri" data-par="0.12">
            <img class="w-full h-full object-contain p-6 transition-opacity duration-500 hover:opacity-90" src="${A.grandSoir}" alt="Maison Francis Kurkdjian Grand Soir">
          </div>
          <div class="absolute bottom-0 right-0 w-[52%] h-[60%] z-30 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] overflow-hidden bg-paper-2 ri" data-par="-0.1">
            <img class="w-full h-full object-contain p-6 transition-opacity duration-500 hover:opacity-90" src="${A.goodgirl}" alt="Carolina Herrera Good Girl">
          </div>
        </div>
      </section>

      <div class="h-px bg-hair mx-edge line-reveal"></div>

      <!-- SCROLL-DRIVEN CATEGORIES -->
      <section class="px-edge pt-[clamp(80px,11vw,170px)]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mb-[clamp(36px,5vw,70px)] ru">
          <h2 class="text-[clamp(2.4rem,6.5vw,6rem)] font-serif">The <span class="italic">library.</span></h2>
          <p class="text-ink-2 max-w-[38ch] text-[0.98rem] md:justify-self-end">From designer icons to independent perfumers you won't meet in a department store.</p>
        </div>
      </section>

      <!-- CATEGORY 1: For Him -->
      <section class="cat-showcase" data-nav="shop">
        <div class="cat-img-panel ri">
          <span class="cat-big-num" data-par="0.15">01</span>
          <img class="cat-img transition-opacity duration-700 hover:opacity-90" data-par="-0.06" src="${A.aventus}" alt="For Him Collection">
        </div>
        <div class="cat-text-panel">
          <span class="cat-eyebrow ru">Collection 01</span>
          <h3 class="cat-title ru d1">For <span class="italic">Him.</span></h3>
          <p class="cat-desc ru d2">${P.filter(p => p.cat === 'For Him').length} fragrances chosen for confidence. From crisp citrus mornings to smoky leather nights.</p>
          <div class="cat-stat ru d3"><span class="cat-stat-num">${P.filter(p => p.cat === 'For Him').length}</span><span class="cat-stat-label">fragrances</span></div>
          <div class="ru d3 mt-6"><a class="ghost-link cursor-pointer" data-nav="shop">Explore <i data-lucide="arrow-right"></i></a></div>
        </div>
      </section>

      <!-- CATEGORY 2: For Her -->
      <section class="cat-showcase cat-reverse" data-nav="shop">
        <div class="cat-img-panel ri">
          <span class="cat-big-num" data-par="0.15">02</span>
          <img class="cat-img transition-opacity duration-700 hover:opacity-90" data-par="-0.06" src="${A.delina}" alt="For Her Collection">
        </div>
        <div class="cat-text-panel">
          <span class="cat-eyebrow ru">Collection 02</span>
          <h3 class="cat-title ru d1">For <span class="italic">Her.</span></h3>
          <p class="cat-desc ru d2">${P.filter(p => p.cat === 'For Her').length} fragrances that move between soft and striking. Florals that aren't polite. Musks that stay.</p>
          <div class="cat-stat ru d3"><span class="cat-stat-num">${P.filter(p => p.cat === 'For Her').length}</span><span class="cat-stat-label">fragrances</span></div>
          <div class="ru d3 mt-6"><a class="ghost-link cursor-pointer" data-nav="shop">Explore <i data-lucide="arrow-right"></i></a></div>
        </div>
      </section>

      <!-- CATEGORY 3: Niche -->
      <section class="cat-showcase" data-nav="shop">
        <div class="cat-img-panel ri">
          <span class="cat-big-num" data-par="0.15">03</span>
          <img class="cat-img transition-opacity duration-700 hover:opacity-90" data-par="-0.06" src="${A.baccarat}" alt="Niche Collection">
        </div>
        <div class="cat-text-panel">
          <span class="cat-eyebrow ru">Collection 03</span>
          <h3 class="cat-title ru d1">Niche <span class="italic">Collection.</span></h3>
          <p class="cat-desc ru d2">${P.filter(p => p.cat === 'Niche').length} independent niche houses & rare formulations. 100% authentic fragrances at under-mall pricing in the PH.</p>
          <div class="cat-stat ru d3"><span class="cat-stat-num">${P.filter(p => p.cat === 'Niche').length}</span><span class="cat-stat-label">fragrances</span></div>
          <div class="ru d3 mt-6"><a class="ghost-link cursor-pointer" data-nav="shop">Explore <i data-lucide="arrow-right"></i></a></div>
        </div>
      </section>

      <!-- PURE LOGOS BRANDS SECTION -->
      <!-- INTERACTIVE ANIMATED BRANDS SECTION -->
      <section class="px-edge py-[clamp(50px,6vw,100px)] border-t border-hair bg-paper" id="section-brands">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[clamp(28px,3.5vw,48px)]">
          <div>
            <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute ru block mb-2.5">§ 02 — Our Brands</span>
            <h2 class="text-[clamp(2.2rem,5.5vw,4.5rem)] font-serif ru d1">Featured <span class="italic font-normal">brands.</span></h2>
          </div>
          <p class="text-ink-2 max-w-[34ch] text-[0.9rem] leading-relaxed font-light ru d2 md:text-right">
            Hover to reveal flagship scents. Click to filter catalog.
          </p>
        </div>

        <!-- Interactive Animated Logo Grid with Hairline Borders -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 border-t border-l border-hair bg-hair gap-px rs">
          ${[
      { name: 'Maison Francis Kurkdjian', brand: 'Maison Francis Kurkdjian', logo: logoMFK, h: 'h-8 sm:h-10 md:h-12', origin: 'Paris · Est. 2009', hero: 'Baccarat Rouge 540', img: A.baccarat || getPerfumeImage('Maison Francis Kurkdjian', 'Baccarat Rouge 540') },
      { name: 'Creed 1760', brand: 'Creed', logo: logoCreed, h: 'h-8 sm:h-10 md:h-12', origin: 'Paris & London · 1760', hero: 'Aventus EDP', img: photoCreed },
      { name: 'Chanel', brand: 'Chanel', logo: logoChanel, h: 'h-9 sm:h-11 md:h-13', origin: 'Paris · Est. 1910', hero: 'Bleu de Chanel', img: A.bleu || getPerfumeImage('Chanel', 'Bleu de Chanel EDP') },
      { name: 'Dior', brand: 'Dior', logo: logoDior, h: 'h-11 sm:h-14 md:h-16', origin: 'Paris · Est. 1946', hero: 'Sauvage Elixir', img: photoDior },
      { name: 'Tom Ford', brand: 'Tom Ford', logo: logoTomFord, h: 'h-5 sm:h-6 md:h-7', origin: 'New York · Est. 2005', hero: 'Ombré Leather', img: photoTomFord },
      { name: 'Hermès', brand: 'Hermès', logo: logoHermes, h: 'h-14 sm:h-18 md:h-20', origin: 'Paris · Est. 1837', hero: 'Terre d\'Hermès', img: photoHermes },
      { name: 'Yves Saint Laurent', brand: 'Yves Saint Laurent', logo: logoYSL, h: 'h-9 sm:h-11 md:h-13', origin: 'Paris · Est. 1961', hero: 'Libre EDP', img: photoYSL },
      { name: 'Byredo', brand: 'Byredo', logo: logoByredo, h: 'h-5 sm:h-6 md:h-7', origin: 'Stockholm · Est. 2006', hero: 'Gypsy Water', img: photoByredo },
      { name: 'Initio', brand: 'Initio', logo: logoInitio, h: 'h-11 sm:h-14 md:h-16', origin: 'Paris · Haute Parfumerie', hero: 'Oud for Greatness', img: photoInitio }
    ].map((b, i) => `
            <div class="group relative bg-paper hover:bg-paper-2 p-5 sm:p-6 md:p-8 flex flex-col justify-between aspect-[16/11] sm:aspect-[4/3] transition-all duration-700 ease-custom cursor-pointer overflow-hidden border border-transparent hover:border-ink/20 shadow-none hover:shadow-xl" data-brand="${b.brand}" title="${b.name}" style="--i:${i}">
              
              <!-- Background Perfume Picture (Fades in on hover) -->
              <div class="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-custom">
                <img src="${b.img}" alt="${b.name}" class="w-full h-full object-cover opacity-[0.45] transition-opacity duration-700 ease-custom">
                <div class="absolute inset-0 bg-gradient-to-t from-paper via-paper/50 to-transparent"></div>
              </div>

              <!-- Top Origin Badge (Slides down on hover) -->
              <div class="relative z-10 flex justify-between items-center w-full transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-custom">
                <span class="text-[0.6rem] tracking-[0.2em] uppercase font-semibold text-mute">${b.origin}</span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-mute group-hover:text-ink transition-colors"></i>
              </div>

              <!-- Center Logo (Shifts up slightly on hover) -->
              <div class="relative z-10 my-auto py-2 flex items-center justify-center transform group-hover:-translate-y-2.5 transition-transform duration-500 ease-custom">
                <img src="${b.logo}" alt="${b.name}" class="${b.h} w-auto max-w-[94%] max-h-[88%] object-contain transition-all duration-500 ease-custom filter drop-shadow-sm group-hover:drop-shadow-md" style="view-transition-name: brand-logo-${b.brand.replace(/[^a-z0-9]/gi, '-').toLowerCase()};">
              </div>

              <!-- Bottom Fragrance Name & Action (Slides up on hover) -->
              <div class="relative z-10 flex items-center justify-between w-full pt-2.5 border-t border-hair/80 transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-custom">
                <span class="font-serif text-xs sm:text-sm text-ink font-medium">${b.hero}</span>
                <span class="text-[0.62rem] tracking-[0.16em] uppercase font-semibold text-mute group-hover:text-ink transition-colors">Explore →</span>
              </div>

            </div>
          `).join('')}
        </div>
      </section>

      <!-- REVIEWS / TESTIMONIALS -->
      <section class="px-edge py-[clamp(80px,11vw,170px)]">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-end mb-[clamp(36px,5vw,70px)]">
          <div>
            <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute ru block mb-5">§ 03 — Reviews</span>
            <h2 class="text-[clamp(2.4rem,6.5vw,5.5rem)] font-serif ru d1">What our <span class="italic">clients</span> say.</h2>
          </div>
          <p class="text-ink-2 max-w-[38ch] text-[0.98rem] md:justify-self-end ru d2">Real feedback from perfume lovers across the Philippines who found their signature through Danscents.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 rs">
          ${[
      { name: 'Arvin Cruz', loc: 'Mandaluyong', stars: 5, text: 'Bought a bottle ng Ombre Leather. Legit seller! Sobrang daling kausap ni seller. Bilis din naship yung order from Baguio to Mandaluyong.', frag: 'Tom Ford · Ombré Leather' },
      { name: 'JhanRich Mislang', loc: 'Verified Buyer', stars: 5, text: 'Great seller! 👌 I ordered Prada items for my husband, and I was pleasantly surprised by the quality. My husband loved them, so I ordered again as a graduation gift for my son. I\'m so happy because he loved it too! Highly recommended!', frag: 'Sospiro · Vibrato / Prada' },
      { name: 'JL Umali', loc: 'Quezon Province', stars: 5, text: 'Legit! sobrang secured nun package, from Baguio city to Quezon Province 👌 Salamat Sir, superb CS 🫶', frag: 'Maison Selection' },
      { name: 'Maria Rolaine Christel', loc: 'Verified Buyer', stars: 5, text: 'BANGOOO 😩💗', frag: 'YSL · Libre EDP' },
      { name: 'Elaezar Cuison', loc: 'Verified Buyer', stars: 5, text: 'Salamat legit talaga, dating baog ngayon dalawang panganay na tas may susunod pa yatang isa #BelatedHappyFathersDay', frag: 'Compliment Magnet' },
      { name: 'Carl Patrick Vinluan', loc: 'Verified Buyer', stars: 5, text: 'legit na legit! 👌', frag: 'Xerjoff · Torino 21' },
      { name: 'Rhegine Camille Lacanaria', loc: 'Verified Buyer', stars: 5, text: 'Legit!!!! Go grab yours na!!! 🤌🏻🤌🏻🤌🏻', frag: 'Nishane · Ege' },
      { name: 'Darxen Regpala', loc: 'Verified Buyer', stars: 5, text: 'Legit seller!! Maraming salamat boss!!', frag: 'Designer Fragrance' },
      { name: 'Pril Ellaga', loc: 'Verified Buyer', stars: 5, text: '100% legit! Will definitely order again.', frag: 'Maison Selection' }
    ].map((r, i) => '<div class="border border-hair p-[clamp(24px,2.6vw,36px)] flex flex-col justify-between" style="--i:' + i + '">' +
      '<div>' +
      '<div class="flex gap-1 mb-4 text-ink">' + '★'.repeat(r.stars) + '</div>' +
      '<p class="text-[0.95rem] leading-[1.65] text-ink-2">"' + r.text + '"</p>' +
      '<div class="text-[0.72rem] tracking-[0.1em] uppercase text-mute mt-4 font-semibold">' + r.frag + '</div>' +
      '</div>' +
      '<div class="flex items-center gap-3 mt-6 pt-5 border-t border-hair">' +
      '<div class="w-9 h-9 rounded-full bg-ink text-paper grid place-items-center font-serif text-sm font-bold">' + r.name[0] + '</div>' +
      '<div>' +
      '<div class="font-semibold text-[0.88rem]">' + r.name + '</div>' +
      '<div class="text-[0.7rem] text-mute">' + r.loc + '</div>' +
      '</div>' +
      '</div>' +
      '</div>'
    ).join('')}
        </div>
      </section>

      <div class="h-px bg-hair mx-edge line-reveal"></div>

      <!-- SERVICES -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-hair services-grid-rs">
        ${[
      { c: 24, t: 'Hour dispatch', d: 'Tracked to your door across the Philippines.' },
      { c: P.length, t: 'Fragrances', d: 'Designer icons and niche houses, all sampleable.' },
      { c: 12, t: 'Discovery sets', d: 'Curated sample packs to test before buying full bottles.' },
      { c: 100, p: true, t: 'Under-mall prices', d: '100% authentic fragrances below mall retail pricing.' }
    ].map((s, i) => `
          <div class="p-[clamp(24px,2.5vw,40px)_clamp(16px,2vw,28px)] border-b sm:border-b-0 lg:border-r border-hair last:border-r-0" style="--i:${i}">
            <div class="font-serif text-[2.4rem] tabular-nums leading-none" data-count="${s.c}">${s.c}${s.p ? '%' : ''}</div>
            <h4 class="font-serif text-[1.2rem] my-3">${s.t}</h4>
            <p class="text-[0.8rem] text-mute leading-relaxed">${s.d}</p>
          </div>
        `).join('')}
      </div>
    </main>
  `,

  shop: `
    <main class="view" id="view-shop">
      <section class="px-edge pt-[clamp(80px,11vw,170px)] pb-[30px]">
        <div id="returnBanner" class="mb-6" style="display:none;">
          <button id="btnReturnToSection" type="button" class="inline-flex items-center gap-2.5 text-[0.74rem] font-semibold tracking-[0.18em] uppercase text-ink-2 hover:text-ink transition-colors cursor-pointer group bg-transparent border-none p-0">
            <i data-lucide="arrow-left" class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"></i>
            <span id="returnLabel">Return to previous section</span>
          </button>
        </div>
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute ru block">The Full Library (${P.length} Fragrances)</span>
            <h1 class="font-serif text-[clamp(2.8rem,8vw,6.5rem)] mt-3 ru d1">Collections</h1>
          </div>
          <div class="w-full md:w-84 ru d2">
            <div class="relative group">
              <input type="text" id="shopSearchInput" placeholder="Search by name, brand, or note…" class="w-full bg-paper-2/60 backdrop-blur-md border border-hair/90 rounded-full px-4 py-3 pl-11 pr-10 text-[0.85rem] font-sans text-ink outline-none transition-all duration-300 hover:border-ink/40 focus:border-ink focus:bg-paper focus:shadow-[0_8px_30px_-6px_rgba(0,0,0,0.08)] placeholder:text-mute/70">
              <svg class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-mute group-focus-within:text-ink transition-colors duration-300 pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <button id="shopSearchClear" type="button" class="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-mute hover:text-ink hover:rotate-90 transition-all duration-300 bg-transparent border-none cursor-pointer hidden" aria-label="Clear search">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>
        <div id="shopFilters" class="flex gap-[10px] flex-wrap mt-[34px] ru d2"></div>
      </section>
      <div class="h-px bg-hair mx-edge"></div>
      <section class="px-edge py-[clamp(40px,6vw,90px)]">
        <div id="shopGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,2.4vw,44px)]"></div>
      </section>
    </main>
  `,

  product: `
    <main class="view" id="view-product">
      <div id="pdp"></div>
    </main>
  `,

  event: `
    <main class="view" id="view-event">
      <section class="px-edge pt-[clamp(80px,11vw,170px)] pb-[36px]">
        <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute ru block">Experience</span>
        <h1 class="font-serif text-[clamp(2.6rem,7vw,5.5rem)] my-3 max-w-[16ch] ru d1">Our events, in detail.</h1>
        <p class="text-ink-2 max-w-[56ch] text-[1.08rem] ru d2">In-store fragrance testing, new arrival launches, and scent consultations at our Baguio retail shop.</p>
      </section>
      <section class="grid grid-cols-1 md:grid-cols-2 items-center min-h-[80vh] relative overflow-hidden">
        <div class="relative h-full min-h-[50vh] md:min-h-[60vh] grid place-items-center bg-paper-2 overflow-hidden">
          <img class="relative z-20 h-full w-full object-cover will-change-transform" data-par="-0.08" src="${A.strips}" alt="Fragrance event">
        </div>
        <div class="p-[clamp(48px,6vw,110px)]">
          <span class="block text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute mb-5 ru">What happens</span>
          <div class="border-t border-hair mt-5 ru d1">
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">06:30</span><span class="font-serif text-[1.1rem]">Arrival &amp; store welcome</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">06:45</span><span class="font-serif text-[1.1rem]">Try top designer &amp; niche fragrances</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">07:15</span><span class="font-serif text-[1.1rem]">Fragrance notes &amp; longevity tips</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">07:40</span><span class="font-serif text-[1.1rem]">Skin testing &amp; personal matching</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">08:00</span><span class="font-serif text-[1.1rem]">Free sample decant with your visit</span></div>
          </div>
          <div class="mt-7 ru d2"><button class="btn btn-fill" data-nav="book">Reserve your spot</button></div>
        </div>
      </section>
    </main>
  `,

  book: `
    <main class="view" id="view-book">
      <section class="px-edge py-[clamp(80px,11vw,170px)]">
        <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute ru block">Reserve</span>
        <h1 class="font-serif text-[clamp(2.4rem,6vw,4.6rem)] my-3 ru d1">Book a store visit</h1>
        <p class="text-ink-2 max-w-[52ch] mb-10 ru d2">Pick a date for a store visit or a shopping consultation. We confirm by text within the hour.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[clamp(30px,4vw,64px)] items-start">
          <div>
            <div class="flex gap-2.5 mb-6 ru" id="vtype">
              <button class="btn btn-fill flex-1 justify-center" data-visit="Store visit">Store visit</button>
              <button class="btn flex-1 justify-center" data-visit="Shopping consultation">Shopping consultation</button>
            </div>
            <div class="border border-hair p-[clamp(20px,2.4vw,32px)] ru d1">
              <div class="flex justify-between items-center mb-5">
                <div class="font-serif text-[1.7rem]" id="calMonth">July 2026</div>
                <div class="flex gap-2">
                  <button id="calPrev" class="w-8 h-8 border border-hair flex items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-paper hover:border-ink"><i data-lucide="chevron-left" class="w-4 h-4"></i></button>
                  <button id="calNext" class="w-8 h-8 border border-hair flex items-center justify-center rounded-full transition-colors hover:bg-ink hover:text-paper hover:border-ink"><i data-lucide="chevron-right" class="w-4 h-4"></i></button>
                </div>
              </div>
              <div class="grid grid-cols-7 gap-1 mb-2 text-center text-[0.6rem] tracking-[0.08em] uppercase text-mute font-semibold"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>
              <div class="grid grid-cols-7 gap-1" id="calDays"></div>
            </div>
            <div class="mt-6 ru d2">
              <h4 class="font-sans text-[0.66rem] tracking-[0.18em] uppercase text-mute font-semibold mb-3.5">Available times</h4>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5" id="slotGrid"></div>
            </div>
          </div>
          <form class="grid gap-3.5 ru d1" id="bookForm">
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Full name</label><input id="bkName" type="text" required placeholder="Juan Dela Cruz" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Mobile number</label><input id="bkPhone" type="tel" required placeholder="0917 123 4567" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Email</label><input id="bkEmail" type="email" required placeholder="you@email.com" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Guests</label><select id="bkGuests" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"><option>Just me</option><option>Me + 1</option><option>Me + 2</option></select></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Anything we should know?</label><textarea id="bkNotes" rows="3" placeholder="Scents you love, allergies…" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></textarea></div>
            <div class="border border-ink p-5 text-[0.9rem]">
              <div class="flex justify-between py-[7px]"><span>Visit</span><b class="font-semibold" id="sumType">Store visit</b></div>
              <div class="flex justify-between py-[7px]"><span>Date</span><b class="font-semibold" id="sumDate">Select a date</b></div>
              <div class="flex justify-between py-[7px]"><span>Time</span><b class="font-semibold" id="sumTime">Select a time</b></div>
              <div class="flex justify-between py-[7px]"><span>Fee</span><b class="font-semibold" id="sumFee">Free</b></div>
            </div>
            <button type="submit" class="btn btn-fill justify-center">Confirm reservation</button>
            <p class="text-[0.8rem] text-mute pl-3.5 border-l-2 border-ink mt-1.5">No payment now. We hold your seat and collect on arrival.</p>
          </form>
        </div>
      </section>
    </main>
  `,

  order: `
    <main class="view" id="view-order">
      <div class="px-edge pt-[130px]">
        <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute block mb-3.5">Checkout</span>
        <h1 class="font-serif text-[clamp(2.6rem,6vw,5rem)]">Your <span class="italic">order.</span></h1>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-[1.4fr_0.9fr] gap-[clamp(30px,5vw,72px)] items-start px-edge pt-11">
        <div>
          <div id="cartLines"></div>
          <div id="cartEmpty" style="display:none;" class="py-16 text-center text-mute">
            <p class="font-serif text-[1.6rem] text-ink">Your cart is empty.</p>
            <p class="my-3">Nothing chosen yet. Let's fix that.</p>
            <button class="btn btn-fill" data-nav="shop">Browse collections</button>
          </div>
        </div>
        <aside class="border border-ink p-[clamp(24px,2.6vw,36px)] md:sticky md:top-[80px]">
          <h3 class="font-serif text-[1.8rem] mb-5">Summary</h3>
          <form class="grid gap-3.5" id="coForm">
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Email</label><input id="coEmail" type="email" required placeholder="you@email.com" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">First name</label><input id="coFirstName" required class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Last name</label><input id="coLastName" required class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
            </div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Delivery address</label><input id="coAddress" required placeholder="Street, city, province" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Mobile</label><input id="coMobile" type="tel" required placeholder="0917…" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Postal</label><input id="coPostal" placeholder="1000" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
            </div>
            <label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold mt-2">Payment</label>
            <div class="grid gap-2.5 my-1" id="payOpts">
              <button type="button" class="pay on flex items-center gap-3 border border-ink p-3.5 text-[0.9rem] font-medium bg-transparent transition-colors" data-pay="Cash on delivery"><i data-lucide="banknote" class="w-[17px] h-[17px]"></i>Cash on delivery</button>
              <button type="button" class="pay flex items-center gap-3 border border-hair p-3.5 text-[0.9rem] font-medium bg-transparent transition-colors" data-pay="GCash"><i data-lucide="smartphone" class="w-[17px] h-[17px]"></i>GCash</button>
              <button type="button" class="pay flex items-center gap-3 border border-hair p-3.5 text-[0.9rem] font-medium bg-transparent transition-colors" data-pay="Bank transfer"><i data-lucide="landmark" class="w-[17px] h-[17px]"></i>Bank transfer</button>
            </div>
            <div class="border-t border-hair mt-1 pt-4">
              <div class="flex justify-between py-1.5 text-[0.9rem] text-ink-2"><span>Subtotal</span><span id="sub">₱0</span></div>
              <div class="flex justify-between py-1.5 text-[0.9rem] text-ink-2"><span>Shipping</span><span id="ship">₱180</span></div>
              <div class="flex justify-between pt-3 pb-1.5 text-[1.4rem] font-serif text-ink tabular-nums"><span>Total</span><span id="grand">₱0</span></div>
            </div>
            <button type="submit" class="btn btn-fill justify-center w-full mt-2">Place order</button>
            <p class="text-[0.8rem] text-mute pl-3.5 border-l-2 border-ink mt-1.5">Prefer to order by message? Call 0917 123 4567.</p>
          </form>
        </aside>
      </div>
    </main>
  `,

  brand: `
    <main class="view" id="view-brand">
      <div id="brandShowcase"></div>
    </main>
  `
};

const brandData = [
  { name: 'Maison Francis Kurkdjian', brand: 'Maison Francis Kurkdjian', logo: logoMFK, h: 'h-8 sm:h-10 md:h-12', origin: 'Paris · Est. 2009', hero: 'Baccarat Rouge 540', img: A.baccarat, desc: 'Master perfumer Francis Kurkdjian envisions fragrance as an invisible garment of freedom, emotion, and French savoir-faire.' },
  { name: 'Creed 1760', brand: 'Creed', logo: logoCreed, h: 'h-8 sm:h-10 md:h-12', origin: 'Paris & London · Est. 1760', hero: 'Aventus EDP', img: photoCreed, desc: 'Seven generations of royal fragrance heritage. Hand-compounded infusions using rare ingredients harvested across continents.' },
  { name: 'Chanel', brand: 'Chanel', logo: logoChanel, h: 'h-9 sm:h-11 md:h-13', origin: 'Paris · Est. 1910', hero: 'Bleu de Chanel', img: A.bleu, desc: 'The revolutionary house of Gabrielle Chanel. Timeless elegance, avant-garde formulations, and Parisian sophistication.' },
  { name: 'Dior', brand: 'Dior', logo: logoDior, h: 'h-11 sm:h-14 md:h-16', origin: 'Paris · Est. 1946', hero: 'Sauvage Elixir', img: photoDior, desc: 'Christian Dior’s vision of grand French perfumery. Wild sophistication, noble ingredients, and intense trails.' },
  { name: 'Tom Ford', brand: 'Tom Ford', logo: logoTomFord, h: 'h-5 sm:h-6 md:h-7', origin: 'New York · Est. 2005', hero: 'Ombré Leather', img: photoTomFord, desc: 'Unapologetic glamour and sensual luxury. Bold leather, exotic woods, and intoxicating accords for the confident.' },
  { name: 'Hermès', brand: 'Hermès', logo: logoHermes, h: 'h-14 sm:h-18 md:h-20', origin: 'Paris · Est. 1837', hero: 'Terre d\'Hermès', img: photoHermes, desc: 'Artisanal craft and poetic simplicity. Mineral earth, sunlit citruses, and airy botanical lightness.' },
  { name: 'Yves Saint Laurent', brand: 'Yves Saint Laurent', logo: logoYSL, h: 'h-9 sm:h-11 md:h-13', origin: 'Paris · Est. 1961', hero: 'Libre EDP', img: photoYSL, desc: 'The tension between French elegance and rock-and-roll rebellion. Cool lavenders, sultry vanilla, and golden orange blossoms.' },
  { name: 'Byredo', brand: 'Byredo', logo: logoByredo, h: 'h-5 sm:h-6 md:h-7', origin: 'Stockholm · Est. 2006', hero: 'Gypsy Water', img: photoByredo, desc: 'Ben Gorham’s Swedish luxury maison translating memory and emotion into minimalist olfactory art.' },
  { name: 'Initio', brand: 'Initio', logo: logoInitio, h: 'h-11 sm:h-14 md:h-16', origin: 'Paris · Haute Parfumerie', hero: 'Oud for Greatness', img: photoInitio, desc: 'Functional fragrance elevated to sacred geometry. Power, attraction, and mystical sacred woods.' }
];

function openBrand(brandName) {
  if (!brandName) return;
  const cleanQuery = brandName.toLowerCase().trim();
  
  const b = brandData.find(x => 
    x.brand.toLowerCase().includes(cleanQuery) || 
    cleanQuery.includes(x.brand.toLowerCase()) ||
    x.name.toLowerCase().includes(cleanQuery) ||
    cleanQuery.includes(x.name.toLowerCase())
  );

  const searchTerms = [cleanQuery];
  if (b) {
    searchTerms.push(b.brand.toLowerCase());
    searchTerms.push(b.name.toLowerCase());
    if (b.brand.includes('Francis')) searchTerms.push('kurkdjian');
    if (b.brand.includes('Laurent')) searchTerms.push('ysl', 'saint laurent');
  }

  const brandPerfumes = P.filter(p => {
    const h = p.house.toLowerCase();
    return searchTerms.some(term => h.includes(term) || term.includes(h));
  });

  const bName = b ? b.name : brandName;
  const bLogo = b ? b.logo : null;
  const bOrigin = b ? b.origin : 'Perfume Retailer';
  const bDesc = b ? b.desc : `Explore the complete fragrance collection of ${bName} at Danscents.`;
  const brandSlug = (b ? b.brand : bName).replace(/[^a-z0-9]/gi, '-').toLowerCase();

  const viewEl = document.getElementById('view-brand');
  if (!viewEl) return;

  viewEl.innerHTML = `
    <!-- Minimalist Brand Header -->
    <div class="px-edge pt-[120px] md:pt-[140px] pb-4 flex items-center justify-between border-b border-hair ru">
      <button data-nav="home" class="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-mute hover:text-ink transition-colors cursor-pointer bg-transparent border-none p-0">
        <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
        <span>Return to Brands</span>
      </button>
      <span class="text-[0.68rem] tracking-[0.2em] uppercase text-mute font-semibold">${bOrigin}</span>
    </div>

    <!-- Minimalist Brand Hero Section -->
    <section class="px-edge py-8 md:py-12 bg-paper text-ink ru d1">
      <div class="max-w-4xl">
        <span class="text-[0.68rem] tracking-[0.28em] uppercase text-mute font-semibold block mb-3">Featured Brand</span>
        ${bLogo ? `
          <div class="mb-4 max-w-[340px] sm:max-w-[480px]">
            <img src="${bLogo}" alt="${bName}" class="h-12 sm:h-16 md:h-20 w-auto object-contain filter brightness-0 dark:brightness-200" style="view-transition-name: brand-logo-${brandSlug};" />
          </div>
        ` : ''}
        <h1 class="text-[clamp(2.6rem,6vw,4.8rem)] font-serif leading-none tracking-tight text-ink mb-4 font-normal">${bName}</h1>
        <p class="text-ink-2 text-[0.96rem] leading-[1.8] font-light max-w-[48ch]">${bDesc}</p>
      </div>
    </section>

    <div class="h-px bg-hair mx-edge line-reveal"></div>

    <!-- Brand Fragrance Library Grid -->
    <section class="px-edge py-10 md:py-16 ru d2">
      <div class="flex items-end justify-between mb-10">
        <div>
          <span class="text-[0.64rem] tracking-[0.24em] uppercase text-mute font-semibold block mb-2">${bName} Library</span>
          <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-serif font-normal text-ink">Creations <span class="italic">archive.</span></h2>
        </div>
        <span class="text-[0.7rem] text-mute tracking-[0.14em] uppercase font-semibold">${brandPerfumes.length} Fragrances</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,2.4vw,44px)]">
        ${brandPerfumes.length > 0 ? brandPerfumes.map(card).join('') : '<p class="col-span-full py-16 text-center text-mute font-serif text-lg">No fragrances currently cataloged for this brand.</p>'}
      </div>
    </section>
  `;

  go('brand');

  setTimeout(() => {
    document.querySelectorAll('#view-brand .ru, #view-brand .line-reveal').forEach(el => el.classList.add('in'));
  }, 60);
}

async function preloadAllImages() {
  const urls = new Set();
  brandLogos.forEach(b => { if (b.src) urls.add(b.src); });
  heroSlides.forEach(s => { if (s.img) urls.add(s.img); });
  Object.values(A).forEach(url => { if (url) urls.add(url); });
  P.forEach(p => { if (p.img) urls.add(p.img); });

  const promises = Array.from(urls).map(url => {
    return new Promise(resolve => {
      const img = new Image();
      img.src = url;
      if (img.complete) {
        if ('decode' in img) {
          img.decode().then(resolve).catch(resolve);
        } else {
          resolve();
        }
      } else {
        img.onload = () => {
          if ('decode' in img) {
            img.decode().then(resolve).catch(resolve);
          } else {
            resolve();
          }
        };
        img.onerror = resolve;
      }
    });
  });

  await Promise.race([
    Promise.all(promises),
    new Promise(res => setTimeout(res, 2500))
  ]);
}

// --- Init & Logic ---
function init() {
  document.getElementById('views-container').innerHTML = Object.values(views).join('');

  // Preloader: Waits for all images to download and GPU decode
  preloadAllImages().then(() => {
    const pre = document.getElementById('pre');
    if (pre) {
      pre.style.transform = 'translateY(-101%)';
      setTimeout(() => pre.remove(), 1200);
    }
  });

  // Router
  document.addEventListener('click', e => {
    const retBtn = e.target.closest('#btnReturnToSection');
    if (retBtn) {
      e.preventDefault();
      const targetSec = lastHomeSection;
      lastHomeSection = null;
      lastBrandName = null;
      shopQuery = '';
      const searchInput = document.getElementById('shopSearchInput');
      if (searchInput) searchInput.value = '';
      const navSearchInput = document.getElementById('navSearchInput');
      if (navSearchInput) navSearchInput.value = '';
      go('home');
      if (targetSec) {
        setTimeout(() => {
          const el = document.getElementById(targetSec);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      return;
    }
    const bScroll = e.target.closest('[data-scroll-brands]');
    if (bScroll) {
      e.preventDefault();
      const mobMenu = document.getElementById('mobileMenu');
      if (mobMenu && mobMenu.style.display !== 'none') {
        mobMenu.classList.remove('mob-open');
        setTimeout(() => { mobMenu.style.display = 'none'; }, 300);
      }
      go('home');
      setTimeout(() => {
        const sec = document.getElementById('section-brands');
        if (sec) sec.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const br = e.target.closest('[data-brand]');
    if (br) {
      e.preventDefault();
      br.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
      br.style.transform = 'scale(0.97)';
      setTimeout(() => {
        br.style.transform = '';
        openBrand(br.dataset.brand);
      }, 120);
      return;
    }
    const n = e.target.closest('[data-nav]');
    if (n) { e.preventDefault(); go(n.dataset.nav); }
    const f = e.target.closest('[data-filter]');
    if (f) { shopFilter = f.dataset.filter; renderShop(); }
    const o = e.target.closest('[data-open]');
    if (o) openProduct(o.dataset.open);
    // Calendar
    if (e.target.closest('#calPrev')) { let pM = calM - 1, pY = calY; if (pM < 0) { pM = 11; pY--; } if (pY < TODAY.getFullYear() || (pY === TODAY.getFullYear() && pM < TODAY.getMonth())) return; calM = pM; calY = pY; buildCal(); }
    if (e.target.closest('#calNext')) { calM++; if (calM > 11) { calM = 0; calY++; } buildCal(); }
    const vbtn = e.target.closest('#vtype [data-visit]');
    if (vbtn) {
      visit = vbtn.dataset.visit; selDate = null; selTime = null;
      document.querySelectorAll('#vtype .btn').forEach(x => { x.classList.remove('btn-fill'); });
      vbtn.classList.add('btn-fill');
      buildCal(); updateSum();
    }
    // Payment
    const pay = e.target.closest('#payOpts [data-pay]');
    if (pay) {
      document.querySelectorAll('#payOpts .pay').forEach(x => { x.classList.remove('on', 'border-ink'); x.classList.add('border-hair'); });
      pay.classList.add('on', 'border-ink'); pay.classList.remove('border-hair');
    }
  });

  // Mobile menu toggle
  const _burger = document.getElementById('burger');
  const _mobMenu = document.getElementById('mobileMenu');
  if (_burger && _mobMenu) {
    const closeMob = () => { _mobMenu.classList.remove('mob-open'); setTimeout(() => { _mobMenu.style.display = 'none'; }, 500); };
    _burger.onclick = () => { _mobMenu.style.display = 'flex'; requestAnimationFrame(() => _mobMenu.classList.add('mob-open')); };
    _mobMenu.querySelectorAll('[data-nav]').forEach(l => l.addEventListener('click', closeMob));
    const _mobClose = document.getElementById('mobileMenuClose');
    if (_mobClose) _mobClose.onclick = closeMob;
  }

  // Inline Navbar Search Box logic
  const navSearchToggle = document.getElementById('navSearchToggle');
  const navSearchBox = document.getElementById('navSearchBox');
  const navSearchInput = document.getElementById('navSearchInput');
  const navSearchClose = document.getElementById('navSearchClose');

  if (navSearchToggle && navSearchBox && navSearchInput && navSearchClose) {
    const navHeader = document.getElementById('nav');

    navSearchToggle.onclick = (e) => {
      e.stopPropagation();
      navSearchBox.classList.add('expanded');
      navSearchToggle.classList.add('hidden');
      if (navHeader) navHeader.classList.add('nav-search-expanded');
      setTimeout(() => navSearchInput.focus(), 150);
    };

    const closeSearch = () => {
      navSearchInput.value = '';
      navSearchBox.classList.remove('expanded');
      navSearchToggle.classList.remove('hidden');
      if (navHeader) navHeader.classList.remove('nav-search-expanded');
      shopQuery = '';
      const si = document.getElementById('shopSearchInput');
      if (si) si.value = '';
      renderShopGrid();
    };

    navSearchClose.onclick = (e) => {
      e.stopPropagation();
      closeSearch();
    };

    navSearchInput.addEventListener('input', (e) => {
      shopQuery = e.target.value.toLowerCase().trim();
      const currentActive = document.querySelector('.view.active')?.id;
      if (currentActive !== 'view-shop') {
        go('shop');
      }
      const si = document.getElementById('shopSearchInput');
      if (si) si.value = e.target.value;
      renderShopGrid();
    });

    document.addEventListener('click', (e) => {
      if (!navSearchBox.contains(e.target) && !navSearchToggle.contains(e.target) && !navSearchInput.value) {
        closeSearch();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navSearchBox.classList.contains('expanded')) {
        closeSearch();
      }
    });
  }

  // Forms
  document.addEventListener('submit', async e => {
    if (e.target.id === 'bookForm') {
      e.preventDefault();
      if (!selDate || !selTime) { toast('Pick a date and time'); return; }
      const name = document.getElementById('bkName')?.value || '';
      const email = document.getElementById('bkEmail')?.value || '';
      const phone = document.getElementById('bkPhone')?.value || '';
      const fragrance_notes = document.getElementById('bkNotes')?.value || '';

      try {
        const res = await fetch('/api/bookings', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, visit_date: selDate, visit_time: selTime, fragrance_notes })
        });
        const data = await res.json();
        if (data.success) {
          toast(`Reservation ${data.booking.reference} confirmed & saved!`);
          e.target.reset();
        } else {
          toast(data.error || 'Booking failed');
        }
      } catch (err) {
        toast('Seat reserved — check your phone');
      }
    }

    if (e.target.id === 'coForm') {
      e.preventDefault();
      if (!cart.length) { toast('Cart is empty'); return; }
      const firstName = document.getElementById('coFirstName')?.value || '';
      const lastName = document.getElementById('coLastName')?.value || '';
      const customer_name = `${firstName} ${lastName}`.trim();
      const customer_phone = document.getElementById('coMobile')?.value || '';
      const delivery_address = document.getElementById('coAddress')?.value || '';

      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ customer_name, customer_phone, delivery_address, items: cart })
        });
        const data = await res.json();
        if (data.success) {
          toast(`Order ${data.order.order_number} saved to Database!`);
          cart = [];
          count();
          renderCart();
          e.target.reset();
        } else {
          toast(data.error || 'Order failed');
        }
      } catch (err) {
        toast("Order placed — we'll text you");
        cart = [];
        count();
        renderCart();
      }
    }

    if (e.target.id === 'nlForm') { e.preventDefault(); toast("You're on the list"); document.getElementById('nlInput').value = ''; }
  });

  go('home');
  initHeroCarousel();
  count();
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  requestAnimationFrame(frame);
}

function setHeroSlide(idx) {
  heroSlideIndex = idx;
  const slide = heroSlides[idx];
  const heroSec = document.getElementById('hero');
  const glow = document.getElementById('heroGlow');
  const bgWord = document.getElementById('heroBgWord');
  const kick = document.getElementById('heroKickText');
  const t1 = document.getElementById('heroTitleLine1');
  const t2 = document.getElementById('heroTitleLine2');
  const desc = document.getElementById('heroDesc');
  const name = document.getElementById('heroName');
  const price = document.getElementById('heroPrice');
  const metaClick = document.getElementById('heroMetaClick');
  const dotsContainer = document.getElementById('heroDots');

  if (!heroSec || !slide) return;

  // Toggle pre-stacked bottle image layer for zero-flicker 60fps GPU crossfade (slides UP from below)
  document.querySelectorAll('.hero-bottle-img').forEach((img, i) => {
    img.style.transform = ''; // clear inline scroll-transform override
    img.classList.toggle('active', i === idx);
  });

  // Text exit animation
  const animEls = document.querySelectorAll('.hero-text-anim');
  animEls.forEach(el => el.classList.add('out'));

  setTimeout(() => {
    // Update text content
    if (bgWord) bgWord.textContent = slide.word;
    if (kick) kick.textContent = slide.kick;
    if (t1) t1.textContent = slide.t1;
    if (t2) t2.textContent = slide.t2;
    if (desc) desc.textContent = slide.desc;
    if (name) name.textContent = slide.name;
    if (price) price.textContent = slide.price;
    if (metaClick) metaClick.dataset.open = slide.id;

    // Text enter animation
    animEls.forEach(el => {
      if (el) el.classList.remove('out');
    });
  }, 450);

  // Dots update
  if (dotsContainer) {
    dotsContainer.querySelectorAll('.hero-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }
}

function initHeroCarousel() {
  const dotsContainer = document.getElementById('heroDots');
  if (dotsContainer) {
    dotsContainer.innerHTML = heroSlides.map((_, i) => `<button class="hero-dot ${i === 0 ? 'active' : ''}" data-slide="${i}" aria-label="Slide ${i + 1}"></button>`).join('');
    dotsContainer.querySelectorAll('.hero-dot').forEach(dot => {
      dot.onclick = (e) => {
        e.stopPropagation();
        clearInterval(heroTimer);
        setHeroSlide(+dot.dataset.slide);
        startHeroAuto();
      };
    });
  }
  startHeroAuto();
}

function startHeroAuto() {
  clearInterval(heroTimer);
}

function go(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  (document.getElementById('view-' + name) || document.getElementById('view-home')).classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'shop') renderShop();
  if (name === 'order') renderCart();
  if (name === 'book') { buildCal(); updateSum(); }
  requestAnimationFrame(() => { bindReveals(); createIcons({ icons: IC }); parallax(); });
}

function card(p) {
  return `
    <article class="group relative cursor-pointer" data-open="${p.id}" style="--i:${P.indexOf(p) % 6}">
      <div class="relative bg-paper-2 aspect-[4/5] flex items-center justify-center p-3 sm:p-4 overflow-hidden mb-4">
        ${p.tag ? `<span class="absolute top-3.5 left-3.5 z-20 text-[0.58rem] tracking-[0.16em] uppercase font-semibold px-2.5 py-1.5 ${p.tag === 'New' || p.tag === 'Cult' || p.tag === 'Signature' ? 'bg-ink text-paper' : 'bg-paper text-ink shadow-sm'}">${p.tag}</span>` : ''}
        <img class="w-full h-full object-contain product-card-img drop-shadow-md" src="${p.img}" alt="${p.name}">
      </div>
      <div class="flex justify-between items-baseline gap-3.5">
        <div>
          <div class="font-serif text-[1.35rem] leading-[1.05]">${p.name}</div>
          <div class="text-[0.68rem] tracking-[0.16em] uppercase text-mute mt-1.5 font-semibold">${p.house}</div>
        </div>
        <div class="font-semibold tabular-nums whitespace-nowrap">${formatPeso(p.price)}</div>
      </div>
      <div class="text-[0.82rem] text-mute mt-2.5">${p.notes}</div>
    </article>`;
}

let shopQuery = '';

function renderShop() {
  const returnBanner = document.getElementById('returnBanner');
  const returnLabel = document.getElementById('returnLabel');
  if (returnBanner && returnLabel) {
    if (lastHomeSection) {
      returnBanner.style.display = 'block';
      returnLabel.textContent = lastHomeSection === 'section-brands' && lastBrandName
        ? `Return to Featured Brands (${lastBrandName})`
        : 'Return to previous section';
    } else {
      returnBanner.style.display = 'none';
    }
  }

  const cats = ['All', ...new Set(P.map(p => p.cat))];
  const fc = document.getElementById('shopFilters');
  if (fc) fc.innerHTML = cats.map(c => `<button class="btn ${c === shopFilter ? 'btn-fill' : ''}" data-filter="${c}">${c}</button>`).join('');

  const searchInput = document.getElementById('shopSearchInput');
  const searchClearBtn = document.getElementById('shopSearchClear');
  if (searchInput) {
    searchInput.value = shopQuery;
    if (searchClearBtn) searchClearBtn.classList.toggle('hidden', !shopQuery);
    if (!searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', (e) => {
        shopQuery = e.target.value.toLowerCase().trim();
        if (searchClearBtn) searchClearBtn.classList.toggle('hidden', !e.target.value);
        const nsi = document.getElementById('navSearchInput');
        if (nsi) nsi.value = e.target.value;
        renderShopGrid();
      });
      if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
          searchInput.value = '';
          shopQuery = '';
          searchClearBtn.classList.add('hidden');
          const nsi = document.getElementById('navSearchInput');
          if (nsi) nsi.value = '';
          renderShopGrid();
          searchInput.focus();
        });
      }
    }
  }

  renderShopGrid();
}

function renderShopGrid() {
  let list = shopFilter === 'All' ? P : P.filter(p => p.cat === shopFilter);
  if (shopQuery) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(shopQuery) ||
      p.house.toLowerCase().includes(shopQuery) ||
      p.notes.toLowerCase().includes(shopQuery)
    );
  }

  const g = document.getElementById('shopGrid');
  if (g) {
    g.classList.remove('in');
    if (list.length === 0) {
      g.innerHTML = `
        <div class="col-span-full py-16 text-center text-mute">
          <p class="font-serif text-[1.8rem] text-ink">No fragrances found.</p>
          <p class="mt-2 text-sm">Try searching for a different perfume name, house (e.g. Creed, Dior, Xerjoff), or scent note.</p>
        </div>
      `;
    } else {
      g.innerHTML = list.map(card).join('');
    }
    requestAnimationFrame(() => { g.classList.add('in'); createIcons({ icons: IC }); });
  }
}

function findProduct(id) {
  if (!id) return null;
  let p = P.find(x => x.id === id);
  if (p) return p;
  p = P.find(x => x.id.includes(id) || id.includes(x.id));
  return p || null;
}

function openProduct(id) {
  const p = findProduct(id); if (!p) return;
  pdpState = { id: p.id, size: '50ml' };
  const gal = [p.img, A.frost, A.amber, A.strips];
  const pf = s => Math.round(p.price * SZ.find(z => z.ml === s).m / 10) * 10;

  document.getElementById('view-product').innerHTML = `
    <!-- Minimalist Navigation Bar -->
    <div class="px-edge pt-[115px] md:pt-[130px] pb-6 flex items-center justify-between">
      <button data-nav="shop" class="inline-flex items-center gap-2 text-[0.72rem] font-medium tracking-[0.18em] uppercase text-mute hover:text-ink transition-colors cursor-pointer bg-transparent border-none p-0">
        <i data-lucide="arrow-left" class="w-3.5 h-3.5"></i>
        <span>Back to collections</span>
      </button>
      <span class="text-[0.68rem] tracking-[0.2em] uppercase text-mute font-medium">${p.cat}</span>
    </div>

    <!-- Minimalist Main Stage -->
    <div class="px-edge pb-16 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-[clamp(32px,6vw,96px)] items-start">
      
      <!-- Left: Vertical Thumbnails + Main PDP Stage -->
      <div class="lg:sticky lg:top-[100px] flex flex-row gap-3 sm:gap-4 items-start w-full max-w-[100%] mx-auto lg:mx-0">
        
        <!-- Vertical Thumbnail Strip on the Left -->
        <div class="flex flex-col gap-2.5 flex-none w-16 sm:w-20" id="pdpThumbs">
          ${gal.map((g, i) => `
            <button class="aspect-square bg-paper-2 border-l-2 ${i === 0 ? 'border-ink opacity-100' : 'border-transparent opacity-50'} p-1.5 transition-all hover:opacity-100 cursor-pointer" data-thumb="${g}">
              <img class="w-full h-full object-contain" src="${g}">
            </button>
          `).join('')}
        </div>

        <!-- Main PDP Stage -->
        <div class="relative flex-1 w-full h-auto bg-paper-2 overflow-hidden flex items-center justify-center p-4 sm:p-6 group" id="pdpStage">
          ${p.tag ? `<span class="absolute top-4 left-4 z-10 text-[0.58rem] tracking-[0.2em] uppercase font-medium text-mute bg-paper/90 px-2.5 py-1 shadow-sm">${p.tag}</span>` : ''}
          
          <!-- Prev/Next Navigation Arrows -->
          <button id="pdpPrev" class="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-paper/85 backdrop-blur-sm border border-hair flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ink hover:text-paper hover:scale-110 cursor-pointer shadow-sm" aria-label="Previous photo">
            <i data-lucide="chevron-left" class="w-4 h-4"></i>
          </button>
          <button id="pdpNext" class="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-paper/85 backdrop-blur-sm border border-hair flex items-center justify-center text-ink opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-ink hover:text-paper hover:scale-110 cursor-pointer shadow-sm" aria-label="Next photo">
            <i data-lucide="chevron-right" class="w-4 h-4"></i>
          </button>

          <img id="pdpMain" src="${p.img}" alt="${p.name}" class="w-full h-auto object-contain block product-card-img">
        </div>
      </div>

      <!-- Right: Minimalist Typography & Actions -->
      <div class="pt-2 md:pt-4">
        <div class="text-[0.68rem] tracking-[0.28em] uppercase text-mute font-medium mb-3">${p.house}</div>
        <h1 class="text-[clamp(2.4rem,4.5vw,4rem)] font-serif leading-none tracking-tight font-normal text-ink mb-4">${p.name}</h1>
        <div class="font-serif text-[1.6rem] md:text-[2rem] text-ink" id="pdpPrice">${formatPeso(pf('50ml'))}</div>

        <p class="text-ink-2 mt-6 mb-8 text-[0.92rem] leading-[1.8] font-light max-w-[42ch]">${p.desc}</p>

        <div class="h-px bg-hair my-8"></div>

        <!-- Minimal Volume Selector -->
        <div class="mb-8">
          <div class="text-[0.64rem] tracking-[0.22em] uppercase text-mute font-medium mb-3">Volume</div>
          <div class="grid grid-cols-3 gap-2.5" id="pdpSizes">
            ${SZ.map(s => `
              <button class="py-3 px-2 border ${s.ml === '50ml' ? 'border-ink bg-ink text-paper' : 'border-hair bg-transparent text-ink'} text-center transition-all cursor-pointer" data-size="${s.ml}">
                <span class="block font-serif text-[0.98rem] leading-none mb-1">${s.ml}</span>
                <span class="size-price block text-[0.68rem] tracking-wider opacity-70">${formatPeso(pf(s.ml))}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Direct Actions -->
        <div class="flex flex-col sm:flex-row gap-3 w-full mb-8">
          <button class="btn btn-fill flex-1 justify-center py-4 text-[0.72rem] tracking-[0.18em]" id="pdpAdd">
            Add to Bag
          </button>
          <button class="btn flex-1 justify-center py-4 text-[0.72rem] tracking-[0.18em]" data-nav="book">
            Book Store Visit
          </button>
        </div>

        <!-- Collapsible Details Accordion List (+ items) -->
        <div class="border-t border-hair divide-y divide-hair">
          
          <div class="pdp-accordion-item">
            <button type="button" class="pdp-accordion-header">
              <span class="text-[0.7rem] tracking-[0.2em] uppercase text-ink font-medium">Fragrance Notes</span>
              <span class="pdp-accordion-icon">+</span>
            </button>
            <div class="pdp-accordion-body text-[0.88rem] space-y-2.5">
              <div class="grid grid-cols-[70px_1fr] gap-3 items-baseline">
                <span class="text-[0.64rem] tracking-[0.2em] uppercase text-mute font-medium">Top</span>
                <span class="font-serif text-ink">${p.top}</span>
              </div>
              <div class="grid grid-cols-[70px_1fr] gap-3 items-baseline">
                <span class="text-[0.64rem] tracking-[0.2em] uppercase text-mute font-medium">Heart</span>
                <span class="font-serif text-ink">${p.heart}</span>
              </div>
              <div class="grid grid-cols-[70px_1fr] gap-3 items-baseline">
                <span class="text-[0.64rem] tracking-[0.2em] uppercase text-mute font-medium">Base</span>
                <span class="font-serif text-ink">${p.base}</span>
              </div>
            </div>
          </div>

          <div class="pdp-accordion-item">
            <button type="button" class="pdp-accordion-header">
              <span class="text-[0.7rem] tracking-[0.2em] uppercase text-ink font-medium">Wear & Longevity</span>
              <span class="pdp-accordion-icon">+</span>
            </button>
            <div class="pdp-accordion-body text-[0.88rem] text-ink-2 leading-relaxed font-light">
              <p>Formulation: Authentic Eau de Parfum / Extrait formulation with rich concentration of essential oils.</p>
              <p class="mt-2">Longevity: 8+ hours on skin with moderate to high sillage and a lingering trail.</p>
            </div>
          </div>

          <div class="pdp-accordion-item">
            <button type="button" class="pdp-accordion-header">
              <span class="text-[0.7rem] tracking-[0.2em] uppercase text-ink font-medium">LBC Express Delivery</span>
              <span class="pdp-accordion-icon">+</span>
            </button>
            <div class="pdp-accordion-body text-[0.86rem] text-ink-2 leading-relaxed font-light">
              <p>Dispatched from our store within 24 hours via <strong>LBC Express</strong>. Includes nationwide door-to-door tracking across the Philippines and complimentary Danscents gift packaging.</p>
            </div>
          </div>

          <div class="pdp-accordion-item">
            <button type="button" class="pdp-accordion-header">
              <span class="text-[0.7rem] tracking-[0.2em] uppercase text-ink font-medium">100% Authentic Guarantee</span>
              <span class="pdp-accordion-icon">+</span>
            </button>
            <div class="pdp-accordion-body text-[0.86rem] text-ink-2 leading-relaxed font-light">
              <p><strong>100% Authentic Guarantee</strong>. Genuine designer and niche perfumes. Sourced directly and verified authentic prior to dispatch at under-mall pricing in the Philippines.</p>
            </div>
          </div>

        </div>

      </div>
    </div>

    <!-- Related Products -->
    <div class="h-px bg-hair mx-edge"></div>
    <section class="px-edge py-16 md:py-24">
      <div class="flex items-end justify-between mb-10">
        <h2 class="text-[clamp(1.8rem,4vw,3rem)] font-serif font-normal">You may also <span class="italic">wear.</span></h2>
        <a class="ghost-link cursor-pointer text-xs" data-nav="shop">Full library <i data-lucide="arrow-right"></i></a>
      </div>
      <div id="relatedGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,2.4vw,44px)]"></div>
    </section>`;

  document.getElementById('relatedGrid').innerHTML = P.filter(x => x.cat === p.cat && x.id !== p.id).concat(P.filter(x => x.cat !== p.cat)).slice(0, 3).map(card).join('');

  // Gallery state controller (syncs main image, thumbnails, and pagination dots)
  let currentGalIdx = 0;
  const updateGal = (idx) => {
    currentGalIdx = (idx + gal.length) % gal.length;
    const mainImg = document.getElementById('pdpMain');
    if (mainImg) mainImg.src = gal[currentGalIdx];

    // sync thumbnails
    document.querySelectorAll('#pdpThumbs button').forEach((x, i) => {
      x.classList.toggle('border-ink', i === currentGalIdx);
      x.classList.toggle('opacity-100', i === currentGalIdx);
      x.classList.toggle('border-transparent', i !== currentGalIdx);
      x.classList.toggle('opacity-50', i !== currentGalIdx);
    });
  };

  // Prev / Next arrows click handlers
  const prevBtn = document.getElementById('pdpPrev');
  const nextBtn = document.getElementById('pdpNext');
  if (prevBtn) prevBtn.onclick = (e) => { e.stopPropagation(); updateGal(currentGalIdx - 1); };
  if (nextBtn) nextBtn.onclick = (e) => { e.stopPropagation(); updateGal(currentGalIdx + 1); };

  // Thumbnail click handler
  document.querySelectorAll('#pdpThumbs button').forEach((b, i) => {
    b.onclick = () => updateGal(i);
  });

  // Size click handler
  document.querySelectorAll('#pdpSizes button').forEach(b => {
    b.onclick = () => {
      pdpState.size = b.dataset.size;
      document.querySelectorAll('#pdpSizes button').forEach(x => {
        x.classList.remove('border-ink', 'bg-ink', 'text-paper');
        x.classList.add('border-hair', 'bg-transparent', 'text-ink');
      });
      b.classList.remove('border-hair', 'bg-transparent', 'text-ink');
      b.classList.add('border-ink', 'bg-ink', 'text-paper');
      document.getElementById('pdpPrice').textContent = formatPeso(pf(b.dataset.size));
    };
  });

  // Accordion click handler (+ toggle)
  document.querySelectorAll('.pdp-accordion-header').forEach(header => {
    header.onclick = () => {
      const item = header.closest('.pdp-accordion-item');
      item.classList.toggle('open');
    };
  });

  document.getElementById('pdpAdd').onclick = () => addToCart(p.id, pdpState.size, pf(pdpState.size));
  go('product');
}

// --- Cart ---
function addToCart(id, size, price) { const ex = cart.find(c => c.id === id && c.size === size); if (ex) ex.qty++; else cart.push({ id, size, qty: 1, price }); count(); toast('Added to cart'); }
function count() {
  const cnt = cart.reduce((s, c) => findProduct(c.id) ? s + c.qty : s, 0);
  const el = document.getElementById('cartCount');
  if (el) {
    if (cnt > 0) {
      el.style.display = 'grid';
      el.textContent = cnt;
      el.classList.remove('cart-bump');
      void el.offsetWidth;
      el.classList.add('cart-bump');
    } else {
      el.style.display = 'none';
    }
  }
}
function renderCart() {
  const w = document.getElementById('cartLines'), e = document.getElementById('cartEmpty');
  if (!w || !e) return;
  cart = cart.filter(c => findProduct(c.id) !== null);
  if (!cart.length) { w.innerHTML = ''; e.style.display = 'block'; cartTotals(); return; } e.style.display = 'none';
  w.innerHTML = cart.map((c, i) => {
    const p = findProduct(c.id);
    if (!p) return '';
    return `<div class="grid grid-cols-[64px_1fr] sm:grid-cols-[88px_1fr_auto] gap-5 py-5 border-b border-hair items-center">
      <div class="bg-paper-2 aspect-square grid place-items-center overflow-hidden"><img class="h-[74%] object-contain" src="${p.img}"></div>
      <div><div class="font-serif text-[1.3rem]">${p.name}</div><div class="text-[0.68rem] tracking-[0.14em] uppercase text-mute mt-1 font-semibold">${p.house} · ${c.size}</div>
        <div class="inline-flex items-center border border-hair mt-3"><button class="w-[30px] h-[30px] bg-transparent border-none text-[1rem] flex items-center justify-center cursor-pointer" data-q="dec" data-i="${i}">−</button><span class="w-8 text-center text-[0.9rem] tabular-nums">${c.qty}</span><button class="w-[30px] h-[30px] bg-transparent border-none text-[1rem] flex items-center justify-center cursor-pointer" data-q="inc" data-i="${i}">+</button></div>
      </div>
      <div class="sm:text-right"><div class="font-semibold tabular-nums">${formatPeso(c.price * c.qty)}</div><button class="block text-[0.7rem] text-mute mt-2 underline bg-transparent border-none cursor-pointer hover:text-ink" data-rm="${i}">Remove</button></div>
    </div>`;
  }).join('');
  cartTotals();
  w.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { const i = +b.dataset.i; b.dataset.q === 'inc' ? cart[i].qty++ : cart[i].qty = Math.max(1, cart[i].qty - 1); renderCart(); count(); });
  w.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { cart.splice(+b.dataset.rm, 1); renderCart(); count(); });
}
function cartTotals() { const s = cart.reduce((a, c) => { const p = findProduct(c.id); return p ? a + c.price * c.qty : a; }, 0), sh = cart.length ? 180 : 0; const _sub = document.getElementById('sub'), _ship = document.getElementById('ship'), _grand = document.getElementById('grand'); if (_sub) _sub.textContent = formatPeso(s); if (_ship) _ship.textContent = formatPeso(sh); if (_grand) _grand.textContent = formatPeso(s + sh); }

// --- Calendar ---
function buildCal() {
  const mLabel = document.getElementById('calMonth'), dGrid = document.getElementById('calDays');
  if (!mLabel || !dGrid) return;
  mLabel.textContent = `${MO[calM]} ${calY}`;
  const first = new Date(calY, calM, 1).getDay(), dim = new Date(calY, calM + 1, 0).getDate();
  let h = '';
  for (let i = 0; i < first; i++) h += `<div class="aspect-square invisible"></div>`;
  for (let d = 1; d <= dim; d++) {
    const dt = new Date(calY, calM, d), dow = dt.getDay(), past = dt < TODAY;
    const open = visit === 'Fragrance evening' ? dow === 4 : (dow >= 2 && dow <= 6);
    let cls = 'aspect-square grid place-items-center text-[0.88rem] tabular-nums rounded-full relative transition-colors duration-300';
    if (past || !open) { cls += ' text-hair pointer-events-none'; }
    else {
      cls += ' cursor-pointer hover:bg-paper-2 avail-day';
      if (selDate && selDate.getDate() === d && selDate.getMonth() === calM && selDate.getFullYear() === calY) cls += ' bg-ink text-paper';
    }
    h += `<div class="${cls}" data-day="${d}">${d}</div>`;
  }
  dGrid.innerHTML = h;
  dGrid.querySelectorAll('.avail-day').forEach(el => el.onclick = () => { selDate = new Date(calY, calM, +el.dataset.day); selTime = null; buildCal(); buildSlots(); updateSum(); });
  buildSlots();
}
function buildSlots() {
  const g = document.getElementById('slotGrid'); if (!g) return;
  if (!selDate) { g.innerHTML = `<p class="col-span-full text-mute text-[0.86rem]">Pick an available date first.</p>`; return; }
  const times = visit === 'Fragrance evening' ? ['6:30 PM', '7:00 PM', '7:30 PM'] : ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:30 PM'];
  const taken = selDate.getDate() % 3 === 0 ? [times[1]] : [];
  g.innerHTML = times.map(t => {
    const dis = taken.includes(t), sel = t === selTime;
    let cls = "border border-hair p-[13px_6px] text-center text-[0.84rem] font-medium transition-colors bg-transparent slot-btn";
    if (dis) cls += " text-hair pointer-events-none line-through";
    else if (sel) cls += " bg-ink text-paper border-ink";
    else cls += " hover:border-ink cursor-pointer text-ink";
    return `<button type="button" class="${cls}" data-time="${t}" ${dis ? 'disabled' : ''}>${t}</button>`;
  }).join('');
  g.querySelectorAll('.slot-btn').forEach(b => b.onclick = () => { selTime = b.dataset.time; buildSlots(); updateSum(); });
}
function updateSum() {
  const e = id => document.getElementById(id);
  if (e('sumType')) e('sumType').textContent = visit;
  if (e('sumDate')) e('sumDate').textContent = selDate ? selDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : 'Select a date';
  if (e('sumTime')) e('sumTime').textContent = selTime || 'Select a time';
  if (e('sumFee')) e('sumFee').textContent = visit === 'Fragrance evening' ? 'Free' : 'Free';
}

// --- Toast ---
let toastTmr;
function toast(m) {
  const t = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = m;
  t.classList.remove('translate-y-[150%]'); t.classList.add('translate-y-0');
  clearTimeout(toastTmr);
  toastTmr = setTimeout(() => { t.classList.add('translate-y-[150%]'); t.classList.remove('translate-y-0'); }, 2500);
}

// --- Reveals & Counters ---
let io;
function bindReveals() {
  if (!io) io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
  document.querySelectorAll('.view.active .ru:not(.in),.view.active .rc:not(.in),.view.active .ri:not(.in),.view.active .rs:not(.in),.view.active .line-reveal:not(.in)').forEach(el => io.observe(el));
  // Manifesto word reveal
  const m = document.getElementById('mani');
  if (m && !m.dataset.init) {
    m.dataset.init = '1';
    const em = ['remembering', 'remember'];
    m.innerHTML = m.textContent.trim().split(' ').map(w => `<span class="inline-block opacity-20 transition-opacity duration-500 ease-custom ${em.includes(w.replace(/[^a-z]/gi, '').toLowerCase()) ? 'italic' : ''}">${w}</span>`).join(' ');
    const ws = [...m.querySelectorAll('span')];
    const mo = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { const i = ws.indexOf(en.target); setTimeout(() => en.target.classList.replace('opacity-20', 'opacity-100'), i * 40); mo.unobserve(en.target); } }), { threshold: 1, rootMargin: '0px 0px -18% 0px' });
    ws.forEach(w => mo.observe(w));
  }
  // Counters
  const cio = new IntersectionObserver(es => es.forEach(en => {
    if (en.isIntersecting) { const el = en.target, t = +el.dataset.count; let v = 0; const step = Math.max(1, Math.round(t / 40)); const iv = setInterval(() => { v += step; if (v >= t) { v = t; clearInterval(iv); } el.textContent = v + (t === 100 ? '%' : ''); }, 22); cio.unobserve(el); }
  }), { threshold: 0.6 });
  document.querySelectorAll('.view.active [data-count]').forEach(el => cio.observe(el));

  // Footer Marquee Viewport Snap Impulse
  const fk = document.getElementById('footKine');
  if (fk && !fk.dataset.observed) {
    fk.dataset.observed = 'true';
    const fkIo = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          window.footKineVelocity = Math.max(window.footKineVelocity || 0, 16);
        }
      });
    }, { threshold: 0.1 });
    fkIo.observe(fk);
  }
}

// --- Parallax & Scroll ---
let parItems = [];
function parallax() { parItems = [...document.querySelectorAll('.view.active [data-par]')]; }
const nav = document.getElementById('nav'), prog = document.getElementById('prog');
let sy = window.scrollY;

function onScroll() {
  sy = window.scrollY;
  nav.classList.toggle('nav-solid', sy > 30);
  const h = document.documentElement.scrollHeight - window.innerHeight;
  prog.style.width = (h > 0 ? (sy / h) * 100 : 0) + '%';
}

let prevSy = 0;
let scrollVelocity = 0;

function frame() {
  const vh = window.innerHeight, vc = vh / 2;

  // Track scroll velocity for dynamic effects
  scrollVelocity = Math.abs(sy - prevSy);
  prevSy = sy;

  parItems.forEach(el => { const r = el.getBoundingClientRect(); el.style.transform = `translate3d(0,${(r.top + r.height / 2 - vc) * (+el.dataset.par)}px,0)`; });

  const isHome = document.getElementById('view-home')?.classList.contains('active');

  // --- Hero parallax fade-out on scroll ---
  const heroBg = document.querySelector('[data-hero="bg"]');
  const heroBottles = document.querySelectorAll('[data-hero="bottle"]');
  const heroSec = document.getElementById('hero');
  if (heroBg && isHome) {
    const heroFade = Math.max(0, 1 - sy / (vh * 0.6));
    const heroBlur = Math.min(8, sy * 0.012);
    heroBg.style.transform = `translate(-50%,-50%) translateY(${sy * 0.3}px)`;
    heroBottles.forEach(b => {
      if (!b.classList.contains('active')) return;
      b.style.transform = `translate(-50%,-50%) translateY(${sy * 0.15}px) scale(${Math.max(0.8, 1 - sy * 0.0003)})`;
    });
    // Fade the hero section content as user scrolls down
    const heroTitle = document.querySelector('.hero-title');
    const heroKick = document.querySelector('.hero-kick');
    const heroMeta = document.querySelector('.hero-meta');
    const heroDots = document.getElementById('heroDots');
    const heroGlow = document.getElementById('heroGlow');
    [heroTitle, heroKick, heroMeta, heroDots].forEach(el => {
      if (el) el.style.opacity = heroFade;
    });
    if (heroGlow) heroGlow.style.filter = `blur(${heroBlur}px)`;
    // Subtle hero background word parallax
    if (heroBg) heroBg.style.opacity = 0.12 * heroFade;
  }

  // --- Category horizontal slide-in on scroll ---
  if (isHome) {
    document.querySelectorAll('.cat-showcase').forEach((cat, idx) => {
      const r = cat.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.7) / (vh * 0.4)));
      const imgPanel = cat.querySelector('.cat-img-panel');
      const textPanel = cat.querySelector('.cat-text-panel');
      const isReverse = cat.classList.contains('cat-reverse');
      if (imgPanel) {
        const slideX = (1 - progress) * (isReverse ? 60 : -60);
        imgPanel.style.transform = `translate3d(${slideX}px, 0, 0)`;
        imgPanel.style.opacity = progress;
      }
      if (textPanel) {
        const slideX = (1 - progress) * (isReverse ? -40 : 40);
        textPanel.style.transform = `translate3d(${slideX}px, 0, 0)`;
        textPanel.style.opacity = progress;
      }
    });

    // --- Services fade-in on scroll ---
    const servicesGrid = document.querySelector('.services-grid-rs');
    if (servicesGrid) {
      const r = servicesGrid.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.85) / (vh * 0.3)));
      servicesGrid.querySelectorAll(':scope > *').forEach((child, i) => {
        const stagger = Math.max(0, Math.min(1, (progress - i * 0.08)));
        child.style.transform = `translateY(${(1 - stagger) * 20}px)`;
      });
    }

    // --- Manifesto section parallax tilt ---
    const mani = document.getElementById('mani');
    if (mani) {
      const r = mani.getBoundingClientRect();
      const progress = (r.top + r.height / 2 - vc) / vh;
      const skew = progress * 0.5;
      mani.style.transform = `skewY(${skew}deg)`;
    }
  }

  // --- Event section background text ---
  const evbg = document.querySelector('[data-hero="evbg"]');
  if (evbg) { const r = evbg.getBoundingClientRect(); evbg.style.transform = `translate(-50%,-50%) translateX(${(r.top - vc) * -0.06}px)`; }

  // --- Brand Marquee ---
  const kine = document.getElementById('kine');
  const kineHalf = document.getElementById('kineHalf');
  if (kine && kineHalf) {
    if (typeof window.brandKineOffset === 'undefined') {
      window.brandKineOffset = 0;
      window.brandKineVelocity = 0.5;
    }
    if (scrollVelocity > 0) {
      window.brandKineVelocity += scrollVelocity * 0.25;
    }
    window.brandKineVelocity = 0.5 + (window.brandKineVelocity - 0.5) * 0.9;
    window.brandKineOffset += window.brandKineVelocity;

    const kineGap = parseFloat(getComputedStyle(kine).gap) || 56;
    const loopWidth = kineHalf.offsetWidth + kineGap;
    kine.style.transform = `translate3d(${- (window.brandKineOffset % loopWidth)}px, 0, 0)`;
  }

  // --- Footer DANSCENTS Snap-Slide & Slowdown Physics ---
  const footKine = document.getElementById('footKine');
  if (footKine) {
    if (typeof window.footKineOffset === 'undefined') {
      window.footKineOffset = 0;
      window.footKineVelocity = 0.8;
    }
    if (scrollVelocity > 0) {
      // Snap impulse to the left on scroll
      window.footKineVelocity += scrollVelocity * 0.55;
    }
    // Exponential friction decay towards ambient glide speed
    window.footKineVelocity = 0.8 + (window.footKineVelocity - 0.8) * 0.88;
    window.footKineOffset += window.footKineVelocity;

    const singleChild = footKine.querySelector('span');
    const footGap = parseFloat(getComputedStyle(footKine).gap) || 0;
    const loopWidth = singleChild ? singleChild.offsetWidth + footGap : 500;
    footKine.style.transform = `translate3d(${- (window.footKineOffset % loopWidth)}px, 0, 0)`;
  }

  requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', init);
