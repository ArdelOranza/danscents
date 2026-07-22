import './style.css';
import { createIcons } from 'lucide';
import { P, A, SZ, formatPeso } from './data.js';

import logoChanel from './assets/logo/chanel-svgrepo-com.svg';
import logoDior from './assets/logo/dior-svgrepo-com.svg';
import logoCreed from './assets/logo/creedlogo.svg';
import logoMFK from './assets/logo/MFK.svg';
import logoTomFord from './assets/logo/tomford.svg';
import logoHermes from './assets/logo/hermes-1-logo-svgrepo-com(1).svg';
import logoYSL from './assets/logo/Saint_Laurent_idnR5GYFJx_0.svg';
import logoByredo from './assets/logo/BYREDO.svg';
import logoInitio from './assets/logo/696773cdd7d5f-INITIO-Parfums-Prives.svg';

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
    id: 'rouge-540',
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
    id: 'aventus',
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
    id: 'libre',
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
    id: 'delina',
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
    id: 'good-girl',
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
    id: 'amber-k',
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
  { id: 'sillage-1', size: '50ml', qty: 1, price: 5400 },
  { id: 'rouge-540', size: '50ml', qty: 1, price: 18900 }
];
let shopFilter = 'All';
let pdpState = { id: null, size: '50ml' };
let calY = 2026, calM = 6, selDate = null, selTime = null, visit = 'Fragrance evening';
const MO = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TODAY = new Date(2026, 6, 21);

// --- View Templates ---
const views = {
  home: `
    <main class="view active" id="view-home">
      <!-- HERO CAROUSEL -->
      <section class="hero-section" id="hero" style="background-color: ${heroSlides[0].bg};">
        <div class="hero-ambient-glow" id="heroGlow" style="background: ${heroSlides[0].glow};"></div>
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
            <img class="w-full h-full object-contain p-6 transition-all duration-500 hover:scale-105" src="${A.grandSoir}" alt="Maison Francis Kurkdjian Grand Soir">
          </div>
          <div class="absolute bottom-0 right-0 w-[52%] h-[60%] z-30 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] overflow-hidden bg-paper-2 ri" data-par="-0.1">
            <img class="w-full h-full object-contain p-6 transition-all duration-500 hover:scale-105" src="${A.goodgirl}" alt="Carolina Herrera Good Girl">
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
          <img class="cat-img transition-all duration-700 hover:scale-105" data-par="-0.06" src="${A.aventus}" alt="For Him Collection">
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
          <img class="cat-img transition-all duration-700 hover:scale-105" data-par="-0.06" src="${A.delina}" alt="For Her Collection">
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
          <img class="cat-img transition-all duration-700 hover:scale-105" data-par="-0.06" src="${A.baccarat}" alt="Niche & Artisan Collection">
        </div>
        <div class="cat-text-panel">
          <span class="cat-eyebrow ru">Collection 03</span>
          <h3 class="cat-title ru d1">Niche &amp; <span class="italic">Artisan.</span></h3>
          <p class="cat-desc ru d2">${P.filter(p => p.cat === 'Niche & Artisan').length} independent houses & master creations. Hand-compounded, small-batch, unforgettable.</p>
          <div class="cat-stat ru d3"><span class="cat-stat-num">${P.filter(p => p.cat === 'Niche & Artisan').length}</span><span class="cat-stat-label">fragrances</span></div>
          <div class="ru d3 mt-6"><a class="ghost-link cursor-pointer" data-nav="shop">Explore <i data-lucide="arrow-right"></i></a></div>
        </div>
      </section>

      <!-- EVENTS -->
      <section class="bg-ink text-paper relative overflow-hidden">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif italic text-[clamp(6rem,18vw,18rem)] text-paper opacity-[0.04] whitespace-nowrap will-change-transform" data-hero="evbg">Events</div>
        <div class="relative z-20 px-edge py-[clamp(80px,11vw,170px)]">
          <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-[oklch(72%_0_0)] ru">Upcoming · Baguio</span>
          <div class="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-[clamp(40px,6vw,90px)] items-center mt-9">
            <div>
              <h2 class="text-[clamp(2.4rem,6vw,5.4rem)] text-paper ru d1 font-serif">Fragrance<br><span class="italic">evenings.</span></h2>
              <p class="text-[oklch(78%_0_0)] max-w-[44ch] mt-6 font-light ru d2">Join us for guided scent experiences, new-arrival launches, and seasonal discovery nights at our Baguio atelier. Try before you buy, meet fellow enthusiasts, and explore rare bottles you won't find anywhere else.</p>
              <div class="flex flex-wrap gap-y-4 gap-x-11 mt-9 ru d3">
                <div class="border-t border-[oklch(38%_0_0)] pt-3 min-w-[120px]"><div class="font-serif text-[1.8rem] italic">Weekly</div><div class="text-[0.65rem] tracking-[0.14em] uppercase text-[oklch(66%_0_0)] mt-1">Thursday evenings</div></div>
                <div class="border-t border-[oklch(38%_0_0)] pt-3 min-w-[120px]"><div class="font-serif text-[1.8rem] italic">10 seats</div><div class="text-[0.65rem] tracking-[0.14em] uppercase text-[oklch(66%_0_0)] mt-1">By reservation</div></div>
                <div class="border-t border-[oklch(38%_0_0)] pt-3 min-w-[120px]"><div class="font-serif text-[1.8rem] italic">Free</div><div class="text-[0.65rem] tracking-[0.14em] uppercase text-[oklch(66%_0_0)] mt-1">No commitment</div></div>
              </div>
              <div class="mt-8 ru d3"><button class="btn btn-inv" data-nav="book">Reserve a seat</button></div>
            </div>
            <div class="overflow-hidden h-[clamp(280px,38vw,480px)] ri">
              <img data-par="-0.12" src="${A.heroHome}" alt="Fragrance event" class="w-full h-[120%] object-cover will-change-transform opacity-90 hover:opacity-100 transition-opacity">
            </div>
          </div>
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
      { c: 12, t: 'Discovery sets', d: 'Curated flights to find your signature.' },
      { c: 100, p: true, t: 'By the nose', d: 'Every bottle chosen by a human.' }
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
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span class="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute ru block">The Full Library (${P.length} Fragrances)</span>
            <h1 class="font-serif text-[clamp(2.8rem,8vw,6.5rem)] mt-3 ru d1">Collections</h1>
          </div>
          <div class="w-full md:w-80 ru d2">
            <div class="relative">
              <input type="text" id="shopSearchInput" placeholder="Search by name, brand, or note…" class="w-full bg-paper border border-hair px-4 py-3 pl-10 text-sm font-sans text-ink outline-none transition-colors focus:border-ink placeholder:text-mute">
              <svg class="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-mute pointer-events-none" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
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
        <p class="text-ink-2 max-w-[56ch] text-[1.08rem] ru d2">Guided fragrance evenings, new-arrival launches, and discovery nights at our Baguio atelier.</p>
      </section>
      <section class="grid grid-cols-1 md:grid-cols-2 items-center min-h-[80vh] relative overflow-hidden">
        <div class="relative h-full min-h-[50vh] md:min-h-[60vh] grid place-items-center bg-paper-2 overflow-hidden">
          <img class="relative z-20 h-full w-full object-cover will-change-transform" data-par="-0.08" src="${A.strips}" alt="Fragrance event">
        </div>
        <div class="p-[clamp(48px,6vw,110px)]">
          <span class="block text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-mute mb-5 ru">What happens</span>
          <div class="border-t border-hair mt-5 ru d1">
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">06:30</span><span class="font-serif text-[1.1rem]">Arrival &amp; welcome drinks</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">06:45</span><span class="font-serif text-[1.1rem]">Guided blind-test flight</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">07:15</span><span class="font-serif text-[1.1rem]">Understanding the pyramid</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">07:40</span><span class="font-serif text-[1.1rem]">Try your favourites on skin</span></div>
            <div class="grid grid-cols-[80px_1fr] gap-4 py-3 border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">08:00</span><span class="font-serif text-[1.1rem]">Free samples to take home</span></div>
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
        <h1 class="font-serif text-[clamp(2.4rem,6vw,4.6rem)] my-3 ru d1">Book a visit</h1>
        <p class="text-ink-2 max-w-[52ch] mb-10 ru d2">Pick a date for a fragrance evening or a private consultation. We confirm by text within the hour.</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-[clamp(30px,4vw,64px)] items-start">
          <div>
            <div class="flex gap-2.5 mb-6 ru" id="vtype">
              <button class="btn btn-fill flex-1 justify-center" data-visit="Fragrance evening">Fragrance evening</button>
              <button class="btn flex-1 justify-center" data-visit="Private consultation">Private consultation</button>
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
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Full name</label><input type="text" required placeholder="Daniel Lagonas" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Mobile number</label><input type="tel" required placeholder="0916 932 1748" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Email</label><input type="email" required placeholder="you@email.com" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Guests</label><select class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"><option>Just me</option><option>Me + 1</option><option>Me + 2</option></select></div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Anything we should know?</label><textarea rows="3" placeholder="Scents you love, allergies…" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink transition-colors focus:outline-none focus:border-ink"></textarea></div>
            <div class="border border-ink p-5 text-[0.9rem]">
              <div class="flex justify-between py-[7px]"><span>Visit</span><b class="font-semibold" id="sumType">Fragrance evening</b></div>
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
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Email</label><input type="email" required placeholder="you@email.com" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">First name</label><input required class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Last name</label><input required class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
            </div>
            <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Delivery address</label><input required placeholder="Street, city, province" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Mobile</label><input type="tel" required placeholder="0916…" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
              <div class="flex flex-col gap-[7px]"><label class="text-[0.66rem] tracking-[0.14em] uppercase text-mute font-semibold">Postal</label><input placeholder="1000" class="font-sans text-[0.94rem] px-3.5 py-3 border border-hair bg-paper text-ink"></div>
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
            <p class="text-[0.8rem] text-mute pl-3.5 border-l-2 border-ink mt-1.5">Prefer to order by message? Call 0916 932 1748.</p>
          </form>
        </aside>
      </div>
    </main>
  `
};

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
    const n = e.target.closest('[data-nav]');
    if (n) { e.preventDefault(); go(n.dataset.nav); }
    const f = e.target.closest('[data-filter]');
    if (f) { shopFilter = f.dataset.filter; renderShop(); }
    const o = e.target.closest('[data-open]');
    if (o) openProduct(o.dataset.open);
    // Calendar
    if (e.target.closest('#calPrev')) { if (calY === 2026 && calM <= 6) return; calM--; if (calM < 0) { calM = 11; calY--; } buildCal(); }
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

  document.getElementById('burger').onclick = () => go('shop');

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
  document.addEventListener('submit', e => {
    if (e.target.id === 'bookForm') { e.preventDefault(); if (!selDate || !selTime) { toast('Pick a date and time'); return; } toast('Seat reserved — check your phone'); }
    if (e.target.id === 'coForm') { e.preventDefault(); if (!cart.length) { toast('Cart is empty'); return; } toast("Order placed — we'll text you"); cart = []; count(); renderCart(); }
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

  // Toggle pre-stacked bottle image layer for zero-flicker 60fps GPU crossfade
  document.querySelectorAll('.hero-bottle-img').forEach((img, i) => {
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
    animEls.forEach(el => el.classList.remove('out'));
  }, 220);

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
  heroTimer = setInterval(() => {
    heroSlideIndex = (heroSlideIndex + 1) % heroSlides.length;
    setHeroSlide(heroSlideIndex);
  }, 4800);
}

function go(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  (document.getElementById('view-' + name) || document.getElementById('view-home')).classList.add('active');
  window.scrollTo(0, 0);
  if (name === 'shop') renderShop();
  if (name === 'order') renderCart();
  if (name === 'book') { buildCal(); updateSum(); }
  requestAnimationFrame(() => { bindReveals(); createIcons(); });
}

// --- Cards ---
function card(p) {
  return `
    <article class="group relative cursor-pointer" data-open="${p.id}" style="--i:${P.indexOf(p) % 6}">
      <div class="relative bg-paper-2 aspect-[4/5] overflow-hidden mb-4">
        ${p.tag ? `<span class="absolute top-3.5 left-3.5 z-20 text-[0.58rem] tracking-[0.16em] uppercase font-semibold px-2.5 py-1.5 ${p.tag === 'New' || p.tag === 'Cult' || p.tag === 'Signature' ? 'bg-ink text-paper' : 'bg-paper text-ink'}">${p.tag}</span>` : ''}
        <img class="w-full h-full object-contain p-4 md:p-5 product-card-img group-hover:scale-105 filter drop-shadow(0 10px 20px rgba(0,0,0,0.08))" src="${p.img}" alt="${p.name}">
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
  const cats = ['All', ...new Set(P.map(p => p.cat))];
  const fc = document.getElementById('shopFilters');
  if (fc) fc.innerHTML = cats.map(c => `<button class="btn ${c === shopFilter ? 'btn-fill' : ''}" data-filter="${c}">${c}</button>`).join('');

  const searchInput = document.getElementById('shopSearchInput');
  if (searchInput) {
    searchInput.value = shopQuery;
    if (!searchInput.dataset.bound) {
      searchInput.dataset.bound = 'true';
      searchInput.addEventListener('input', (e) => {
        shopQuery = e.target.value.toLowerCase().trim();
        const nsi = document.getElementById('navSearchInput');
        if (nsi) nsi.value = e.target.value;
        renderShopGrid();
      });
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
    requestAnimationFrame(() => { g.classList.add('in'); createIcons(); });
  }
}

function openProduct(id) {
  const p = P.find(x => x.id === id); if (!p) return;
  pdpState = { id, size: '50ml' };
  const gal = [p.img, A.frost, A.amber, A.strips];
  const pf = s => Math.round(p.price * SZ.find(z => z.ml === s).m / 10) * 10;

  document.getElementById('view-product').innerHTML = `
    <div class="px-edge pt-[115px] md:pt-[125px] pb-1">
      <button data-nav="shop" class="inline-flex items-center gap-2.5 text-[0.74rem] font-semibold tracking-[0.18em] uppercase text-ink-2 hover:text-ink transition-colors cursor-pointer group bg-transparent border-none p-0">
        <i data-lucide="arrow-left" class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"></i>
        <span>Back to collections</span>
      </button>
    </div>
    <div class="px-edge pt-4 grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-[clamp(30px,5vw,80px)] items-start">
      <div class="md:sticky md:top-[80px]">
        <div class="bg-paper-2 aspect-square grid place-items-center overflow-hidden"><img class="h-[96%] max-w-[96%] object-contain filter drop-shadow(0 15px 30px rgba(0,0,0,0.12)) product-card-img hover:scale-105" id="pdpMain" src="${p.img}" alt="${p.name}"></div>
        <div class="w-full grid grid-cols-4 gap-3 sm:gap-3.5 mt-3.5" id="pdpThumbs">${gal.map((g, i) => `<button class="w-full aspect-square bg-paper-2 border ${i === 0 ? 'border-ink' : 'border-transparent'} overflow-hidden p-0 transition-all duration-400 ease-custom hover:border-ink cursor-pointer group" data-thumb="${g}"><img class="w-full h-full object-contain p-[14%] filter drop-shadow(0 4px 8px rgba(0,0,0,0.06)) transition-transform duration-500 ease-custom group-hover:scale-105 will-change-transform" src="${g}"></button>`).join('')}</div>
      </div>
      <div>
        <div class="text-[0.72rem] text-mute tracking-[0.06em] mb-5"><a class="cursor-pointer hover:text-ink" data-nav="shop">Collections</a> / <a class="cursor-pointer hover:text-ink" data-nav="shop">${p.cat}</a> / ${p.name}</div>
        <div class="text-[0.7rem] tracking-[0.2em] uppercase text-mute font-semibold">${p.house}</div>
        <h1 class="text-[clamp(2.6rem,5vw,4.2rem)] my-3 font-serif">${p.name}</h1>
        <div class="font-serif text-[1.7rem]" id="pdpPrice">${formatPeso(pf('50ml'))}</div>
        <p class="text-ink-2 mt-4 mb-9 max-w-[48ch] leading-[1.7]">${p.desc}</p>
        <div class="grid grid-cols-3 gap-3 mb-6 w-full" id="pdpSizes">${SZ.map(s => `<button class="w-full h-full min-h-[76px] flex flex-col justify-center items-center border ${s.ml === '50ml' ? 'border-ink bg-ink text-paper' : 'border-hair'} px-2 py-3.5 transition-colors text-center cursor-pointer box-border" data-size="${s.ml}"><span class="block font-serif text-[1.05rem] sm:text-[1.2rem] leading-tight whitespace-nowrap">${s.ml}</span><span class="size-price block text-[0.76rem] mt-[4px] whitespace-nowrap ${s.ml === '50ml' ? 'text-[oklch(72%_0_0)]' : 'text-mute'}">${formatPeso(pf(s.ml))}</span></button>`).join('')}</div>
        <div class="flex gap-5 sm:gap-6 w-full"><button class="btn btn-fill flex-1 justify-center" id="pdpAdd">Add to cart</button><button class="btn flex-1 justify-center" data-nav="book">Try it first</button></div>
        <div class="border-t border-hair my-6 w-full">
          <div class="grid grid-cols-[25%_75%] gap-3 py-[15px] border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">Top</span><span class="font-serif text-[1.15rem]">${p.top}</span></div>
          <div class="grid grid-cols-[25%_75%] gap-3 py-[15px] border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">Heart</span><span class="font-serif text-[1.15rem]">${p.heart}</span></div>
          <div class="grid grid-cols-[25%_75%] gap-3 py-[15px] border-b border-hair items-baseline"><span class="text-[0.66rem] tracking-[0.16em] uppercase text-mute font-semibold">Base</span><span class="font-serif text-[1.15rem]">${p.base}</span></div>
        </div>
        <div class="grid grid-cols-3 items-center w-full mt-7 pt-6 border-t border-hair text-[0.78rem] sm:text-[0.82rem] text-ink-2">
          <div class="flex gap-2 items-center justify-start"><i data-lucide="package" class="w-4 h-4 flex-none"></i><span>Ships in 24h</span></div>
          <div class="flex gap-2 items-center justify-center"><i data-lucide="droplets" class="w-4 h-4 flex-none"></i><span>Decant available</span></div>
          <div class="flex gap-2 items-center justify-end"><i data-lucide="gift" class="w-4 h-4 flex-none"></i><span>Free gift wrap</span></div>
        </div>
      </div>
    </div>
    <div class="h-px bg-hair mx-edge mt-24"></div>
    <section class="px-edge py-[clamp(60px,8vw,120px)]">
      <h2 class="text-[clamp(2rem,5vw,4rem)] font-serif mb-10 ru">You may also <span class="italic">wear.</span></h2>
      <div id="relatedGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(20px,2.4vw,44px)]"></div>
    </section>`;

  document.getElementById('relatedGrid').innerHTML = P.filter(x => x.cat === p.cat && x.id !== p.id).concat(P.filter(x => x.cat !== p.cat)).slice(0, 3).map(card).join('');
  document.querySelectorAll('#pdpThumbs button').forEach(b => { b.onclick = () => { document.getElementById('pdpMain').src = b.dataset.thumb; document.querySelectorAll('#pdpThumbs button').forEach(x => { x.classList.remove('border-ink'); x.classList.add('border-transparent'); }); b.classList.remove('border-transparent'); b.classList.add('border-ink'); }; });
  document.querySelectorAll('#pdpSizes button').forEach(b => {
    b.onclick = () => {
      pdpState.size = b.dataset.size;
      document.querySelectorAll('#pdpSizes button').forEach(x => {
        x.classList.remove('border-ink', 'bg-ink', 'text-paper');
        x.classList.add('border-hair');
        const sp = x.querySelector('.size-price');
        if (sp) { sp.classList.remove('text-[oklch(72%_0_0)]'); sp.classList.add('text-mute'); }
      });
      b.classList.remove('border-hair');
      b.classList.add('border-ink', 'bg-ink', 'text-paper');
      const sp = b.querySelector('.size-price');
      if (sp) { sp.classList.remove('text-mute'); sp.classList.add('text-[oklch(72%_0_0)]'); }
      document.getElementById('pdpPrice').textContent = formatPeso(pf(b.dataset.size));
    };
  });
  document.getElementById('pdpAdd').onclick = () => addToCart(p.id, pdpState.size, pf(pdpState.size));
  go('product');
}

// --- Cart ---
function addToCart(id, size, price) { const ex = cart.find(c => c.id === id && c.size === size); if (ex) ex.qty++; else cart.push({ id, size, qty: 1, price }); count(); toast('Added to cart'); }
function count() { document.getElementById('cartCount').textContent = cart.reduce((s, c) => s + c.qty, 0); }
function renderCart() {
  const w = document.getElementById('cartLines'), e = document.getElementById('cartEmpty');
  if (!w || !e) return;
  if (!cart.length) { w.innerHTML = ''; e.style.display = 'block'; cartTotals(); return; } e.style.display = 'none';
  w.innerHTML = cart.map((c, i) => {
    const p = P.find(x => x.id === c.id);
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
function cartTotals() { const s = cart.reduce((a, c) => a + c.price * c.qty, 0), sh = cart.length ? 180 : 0; document.getElementById('sub').textContent = formatPeso(s); document.getElementById('ship').textContent = formatPeso(sh); document.getElementById('grand').textContent = formatPeso(s + sh); }

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

    // --- Services scale-in on scroll ---
    const servicesGrid = document.querySelector('.services-grid-rs');
    if (servicesGrid) {
      const r = servicesGrid.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, 1 - (r.top - vh * 0.85) / (vh * 0.3)));
      servicesGrid.querySelectorAll(':scope > *').forEach((child, i) => {
        const stagger = Math.max(0, Math.min(1, (progress - i * 0.08)));
        child.style.transform = `scale(${0.9 + 0.1 * stagger}) translateY(${(1 - stagger) * 20}px)`;
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

    const loopWidth = kineHalf.offsetWidth + 56; // +56px for gap-14
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
    const loopWidth = singleChild ? singleChild.offsetWidth : 500;
    footKine.style.transform = `translate3d(${- (window.footKineOffset % loopWidth)}px, 0, 0)`;
  }

  requestAnimationFrame(frame);
}

document.addEventListener('DOMContentLoaded', init);
