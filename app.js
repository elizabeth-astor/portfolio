/* Elizaveta portfolio — variant «Hybrid» (Finn × Zara Miller), 2026-11-25. Plain JS, no build.
   Facts (Tiko 2026-11-24/25): from 500 ₽ per slide, −10 % for a set from 5 slides, Telegram @KompaniyetsL. */
(() => {
  'use strict';

  const TG = 'https://t.me/KompaniyetsL';
  const PRICE = 500;
  const DISCOUNT = 0.10;
  const SET_FROM = 5;
  const WORKS = [
    { slug: 'splat', n: 7, niche: 'Гигиена', title: 'Зубная паста SPLAT Professional',
      roles: ['Главный — ловит клик', 'Технология отбеливания', 'Против налёта', 'Чувствительные зубы', 'Три задачи в одной пасте', 'Как применять', 'Итог: зачем покупать'] },
    { slug: 'sport-suit', n: 5, niche: 'Одежда', title: 'Спортивный костюм FORMA',
      roles: ['Главный — ловит клик', 'Материал крупно', 'Посадка и детали', 'Сценарии носки', 'Размерная сетка'] },
    { slug: 'diffuser', n: 4, niche: 'Дом', title: 'Аромадиффузор ESSENTIA',
      roles: ['Главный — ловит клик', 'Настроение и место в доме', 'Характеристики цифрами', 'Инструкция в 3 шага'] },
    { slug: 'serum', n: 5, niche: 'Косметика', title: 'Увлажняющая сыворотка',
      roles: ['Главный — ловит клик', 'Главный компонент', 'Текстура крупно', 'Как наносить', 'Выгоды иконками'] },
    { slug: 'earbuds', n: 5, niche: 'Электроника', title: 'Беспроводные наушники',
      roles: ['Главный — ловит клик', 'Звук', 'Автономность', 'Управление касанием', 'Шумоподавление'] },
    { slug: 'magnetic-kit', n: 5, niche: 'Детские товары', title: 'Магнитный конструктор',
      roles: ['Главный — ловит клик', 'Комплектация', 'Что можно собрать', 'Польза для ребёнка', 'Как соединяются детали'] },
  ];
  /* slides load as WebP (≈ 3× lighter, 2026-11-25); a work dropped in only as JPEG still shows: a missing .webp
     falls back to the .jpg next to it */
  const src = (w, i) => `works/${w.slug}/${String(i + 1).padStart(2, '0')}.webp`;
  document.addEventListener('error', (e) => {
    const im = e.target;
    if (im.tagName === 'IMG' && /\.webp$/.test(im.src)) im.src = im.src.replace(/\.webp$/, '.jpg');
  }, true);
  const pick = (n, [one, few, many]) => (n % 10 === 1 && n % 100 !== 11 ? one : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? few : many);
  const slides = (n) => `${n} ${pick(n, ['слайд', 'слайда', 'слайдов'])}`;
  const rub = (n) => n.toLocaleString('ru-RU').replace(/\s/g, ' ') + ' ₽';
  const cost = (n) => Math.round(n * PRICE * (n >= SET_FROM ? 1 - DISCOUNT : 1));
  const lower = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Russian typography: no hanging short words */
  const SHORT = 'в|во|и|к|ко|с|со|о|об|у|а|на|по|за|от|до|из|не|ни|для|что|как|я|мы|вы|но|же|это|при|её|все';
  const reShort = new RegExp(`(^|[\\s(«\\u00a0])(${SHORT}) `, 'gi');
  const ty = (s) => s.replace(reShort, '$1$2 ').replace(reShort, '$1$2 ').replace(/ —/g, ' —').replace(/(\d) (%|₽)/g, '$1 $2');

  /* ---------- works grid (Finn: one main slide per work) ---------- */
  const grid = document.getElementById('grid');
  grid.innerHTML = WORKS.map((w, k) => `
    <button class="work" type="button" data-open="${k}" data-rv style="--d:${k % 3}" aria-label="${w.title}: открыть ${slides(w.n)}">
      <span class="work__media">
        <span class="work__peek work__peek--l"><img src="${src(w, 1)}" alt="" loading="lazy"></span>
        <span class="work__peek work__peek--r"><img src="${src(w, 2)}" alt="" loading="lazy"></span>
        <span class="work__main"><img src="${src(w, 0)}" alt="" loading="lazy"></span>
        <span class="work__tag">Смотреть ${slides(w.n)}</span>
      </span>
      <span class="work__title">${w.title}</span>
      <span class="work__sub">${ty(`${w.niche} · ${slides(w.n)}: ${w.roles.slice(1).map(lower).join(', ')}`)}</span>
    </button>`).join('') + `
    <div class="work work--cta" data-rv style="--d:2">
      <div class="work__media">
        <p class="work__big">Сделаю такую же для <span class="it">вашего товара</span></p>
        <div style="display:grid;gap:20px">
          <p>${ty('Пять слайдов — от 2 250 ₽ со скидкой за комплект. Напишите, что за товар.')}</p>
          <a class="btn" href="${TG}" target="_blank" rel="noopener"><span class="btn__t"><span>Обсудить в Telegram</span><span aria-hidden="true">Обсудить в Telegram</span></span><span class="btn__f" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg></span></a>
        </div>
      </div>
    </div>`;

  /* ---------- logo (logo.js) ---------- */
  if (window.renderLogo) { renderLogo(document.getElementById('logo')); document.getElementById('favicon').href = logoFavicon(); }

  /* ---------- hand-drawn marks from the concept (Tiko 2026-11-25): underline, loop, circle; drawn when the line shows ---------- */
  const MARKS = {
    under: ['0 0 200 24', 'M4 16 C 46 7, 96 5, 138 11 S 186 19, 196 8'],
    circle: ['0 0 200 80', 'M150 9 C 92 -2, 14 8, 7 38 C 2 64, 66 76, 118 73 C 170 70, 199 52, 193 29 C 187 11, 140 5, 92 12'],
    loop: ['0 0 220 30', 'M4 20 C 40 22, 70 18, 96 12 C 112 8, 118 22, 104 24 C 92 25, 98 8, 120 9 C 150 10, 190 16, 216 10'],
  };
  document.querySelectorAll('.mk[data-mk]').forEach((el) => {
    const [vb, d] = MARKS[el.dataset.mk] || MARKS.under;
    el.classList.add(`mk--${el.dataset.mk}`);
    el.insertAdjacentHTML('beforeend', `<svg class="mk__svg" viewBox="${vb}" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${d}"/></svg>`);
  });

  /* ---------- typography pass over static text ---------- */
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let t; (t = walker.nextNode());) if (t.parentElement && !/SCRIPT|STYLE/.test(t.parentElement.tagName)) t.nodeValue = ty(t.nodeValue);

  /* ---------- reveal ---------- */
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-vis'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-rv]').forEach((el) => io.observe(el));

  /* ---------- header turns solid after the hero top ---------- */
  const top = document.querySelector('.top');
  const onScroll = () => top.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- hero trail (Finn): slides drop under the pointer ---------- */
  const hero = document.getElementById('hero');
  const trail = document.getElementById('trail');
  const POOL = WORKS.flatMap((w) => Array.from({ length: w.n }, (_, i) => src(w, i)));
  for (let i = POOL.length - 1; i > 0; i--) { const j = (i * 7 + 3) % (i + 1); [POOL[i], POOL[j]] = [POOL[j], POOL[i]]; }
  /* warm the trail's slides only after the page has loaded, so the first screen gets the whole connection
     (full QA 2026-11-25: preloading all 31 at once pushed «load» to 35 s on a slow phone network) */
  const warm = () => setTimeout(() => POOL.forEach((s) => { const im = new Image(); im.decoding = 'async'; im.src = s; }), 1200);
  if (document.readyState === 'complete') warm(); else addEventListener('load', warm, { once: true });
  /* the slides inside the heading change by themselves every 1.8 s (Tiko: «как в референсе»), the two out of step */
  const MAINS = WORKS.map((w) => src(w, 0)).concat(WORKS.map((w) => src(w, 1)));
  document.querySelectorAll('.inl--hero').forEach((box, n) => {
    if (reduce) return;
    let i = Math.max(0, MAINS.findIndex((u) => box.querySelector('img').src.endsWith(u.slice(2))));   /* start from its own slide; the two stay ~2 slides apart */
    setTimeout(() => setInterval(() => {
      if (document.hidden) return;
      i = (i + 1) % MAINS.length;
      const old = box.querySelector('img:last-child'), im = new Image();
      im.alt = ''; im.className = 'is-new'; im.src = MAINS[i];
      im.decode().catch(() => {}).then(() => {
        box.appendChild(im);
        requestAnimationFrame(() => requestAnimationFrame(() => im.classList.remove('is-new')));
        setTimeout(() => { box.querySelectorAll('img').forEach((x) => { if (x !== im) x.remove(); }); }, 500);
      });
    }, 1800), n * 900);
  });
  /* rhythm measured on finn.framer.media 2026-11-25: a new slide about every 180 px of pointer path, the last one stays;
     Finn has no idle change, Tiko asked for one every 1.5–2 s */
  const MAX_ALIVE = 3, LIFE = 1600, STEP = 180, AUTO_EVERY = 1700, AUTO_LIFE = 3600;
  let idx = 0, alive = [], last = null, lastUser = -1e9, heroOn = true, autoT = 0, autoTimer = 0;

  const kill = (el) => { if (el.dataset.dead) return; el.dataset.dead = 1; el.classList.add('is-out'); setTimeout(() => el.remove(), 750); };
  /* the buttons stay clear: a slide whose box would touch them (plus a 16 px margin) is not dropped */
  const ctaBox = document.querySelector('.hero__cta');
  const hitsButtons = (x, y, w) => {
    const hr = hero.getBoundingClientRect(), b = ctaBox.getBoundingClientRect(), m = 16;
    const L = b.left - hr.left - m, R = b.right - hr.left + m, T = b.top - hr.top - m, B = b.bottom - hr.top + m;
    const hw = w * 0.56, hh = w * 0.72;   /* half box of a 3:4 slide with ±6° tilt */
    /* …and none slides under the header: it is transparent at the top, so a slide showed through the logo (QA 2026-11-25) */
    const topBar = document.querySelector('.top').getBoundingClientRect().bottom - hr.top + 8;
    return (x + hw > L && x - hw < R && y + hh > T && y - hh < B) || y - hh < topBar;
  };
  const spawn = (x, y, life = LIFE) => {
    const small = innerWidth < 640;
    const w = Math.round((small ? 84 : 132) + Math.random() * (small ? 16 : 28));
    if (hitsButtons(x, y, w)) return false;
    const el = document.createElement('img');
    el.className = 'trail__card'; el.alt = ''; el.src = POOL[idx++ % POOL.length]; el.draggable = false;
    el.style.setProperty('--w', `${w}px`);
    el.style.setProperty('--r', `${(Math.random() * 12 - 6).toFixed(1)}deg`);
    el.style.left = `${x}px`; el.style.top = `${y}px`;
    trail.appendChild(el);
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('is-in')));
    alive.push(el);
    setTimeout(() => { kill(el); alive = alive.filter((a) => a !== el); }, life);
    while (alive.length > MAX_ALIVE) kill(alive.shift());
    return true;
  };
  const at = (e) => { const r = hero.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const onMove = (e) => {
    if (reduce) return;
    const p = at(e);
    lastUser = performance.now();
    if (!last) { last = p; spawn(p.x, p.y); return; }
    if (Math.hypot(p.x - last.x, p.y - last.y) >= (e.pointerType === 'touch' ? 120 : STEP)) { last = p; spawn(p.x, p.y); }   /* near the buttons spawn() skips */
  };
  hero.addEventListener('pointermove', onMove);
  hero.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') { last = null; onMove(e); } });
  hero.addEventListener('pointerleave', () => { last = null; });

  /* auto sequence: when nobody moves (touch screens, or a resting mouse), a slow figure-eight draws the trail */
  const autoTick = () => {
    if (heroOn && !document.hidden && performance.now() - lastUser > 2200) {
      const w = hero.clientWidth, h = hero.clientHeight;
      /* points along the edges of the hero, so the headline and buttons stay readable; a point near the buttons is skipped */
      for (let tries = 0; tries < 4; tries++) {
        autoT += 2.3;
        const x = w / 2 + Math.cos(autoT) * w * (w < 640 ? 0.4 : 0.38);
        const y = h * 0.5 + Math.sin(autoT) * h * (w < 640 ? 0.4 : 0.34);
        if (spawn(x, y, AUTO_LIFE)) break;
      }
    }
  };
  if (!reduce) {
    autoTimer = setInterval(autoTick, AUTO_EVERY);
    new IntersectionObserver(([e]) => { heroOn = e.isIntersecting; }).observe(hero);
  } else {
    /* reduced motion: three slides rest still around the headline */
    [[0.12, 0.2, -6], [0.88, 0.3, 5], [0.86, 0.9, -3]].forEach(([fx, fy, r], i) => {
      const el = document.createElement('img');
      el.className = 'trail__card is-in'; el.alt = ''; el.src = POOL[i * 5];
      el.style.cssText = `left:${fx * 100}%;top:${fy * 100}%;--r:${r}deg;--w:130px;opacity:.9`;
      trail.appendChild(el);
    });
  }

  /* ---------- modal: all slides of one work ---------- */
  const modal = document.getElementById('modal');
  const track = document.getElementById('m-track');
  const count = document.getElementById('m-count');
  const prev = modal.querySelector('[data-step="-1"]');
  const next = modal.querySelector('[data-step="1"]');
  let cur = null, opener = null, pos = 0;

  const items = () => [...track.children];
  const setPos = (i) => {
    pos = i;
    count.textContent = `${i + 1} / ${cur.n}`;
    prev.disabled = i === 0;
    next.disabled = i >= cur.n - 1;
  };
  /* while an arrow's smooth scroll runs, the scroll handler keeps the arrow's count; without this «next» jumped
     5/7 → 7/7 at the end of the track (full QA 2026-11-25) */
  let lockUntil = 0;
  const go = (i) => {
    const list = items(); i = Math.max(0, Math.min(list.length - 1, i));
    lockUntil = performance.now() + 700;
    track.scrollTo({ left: list[i].offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduce ? 'auto' : 'smooth' });
    setPos(i);
  };
  const open = (k, from) => {
    cur = WORKS[k]; opener = from;
    document.getElementById('m-niche').textContent = `${cur.niche} · ${slides(cur.n)}`;
    document.getElementById('m-title').textContent = cur.title;
    const full = cur.n * PRICE, price = cost(cur.n);
    document.getElementById('m-price').innerHTML = ty(price < full
      ? `Такая карточка из ${cur.n} слайдов — <b>${rub(price)}</b> со скидкой 10 % за комплект`
      : `Такая карточка из ${cur.n} слайдов — <b>${rub(price)}</b>`);
    track.innerHTML = cur.roles.map((r, i) => `
      <figure class="mslide" style="--i:${i}">
        <img src="${src(cur, i)}" alt="${cur.title}, слайд ${i + 1}: ${r}" draggable="false">
        <figcaption><b>${String(i + 1).padStart(2, '0')}</b>${ty(r)}</figcaption>
      </figure>`).join('');
    modal.hidden = false;
    track.scrollLeft = 0; setPos(0);
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add('is-open')));
    track.focus({ preventScroll: true });
  };
  const close = () => {
    if (modal.hidden) return;
    modal.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    setTimeout(() => { modal.hidden = true; track.innerHTML = ''; }, reduce ? 0 : 350);
    if (opener) opener.focus({ preventScroll: true });
  };

  grid.addEventListener('click', (e) => { const b = e.target.closest('[data-open]'); if (b) open(+b.dataset.open, b); });
  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) close();
    const s = e.target.closest('[data-step]'); if (s) go(pos + +s.dataset.step);
  });
  let st = 0;
  track.addEventListener('scroll', () => {
    cancelAnimationFrame(st);
    st = requestAnimationFrame(() => {
      const list = items(); if (modal.hidden || !list.length || performance.now() < lockUntil) return;
      const pad = parseFloat(getComputedStyle(track).paddingLeft);
      let best = 0, d = Infinity;
      list.forEach((el, i) => { const dd = Math.abs(el.offsetLeft - track.offsetLeft - pad - track.scrollLeft); if (dd < d) { d = dd; best = i; } });
      /* at the very end the last slides cannot reach the left edge: count the last one */
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth - 4) best = list.length - 1;
      if (best !== pos) setPos(best);
    });
  }, { passive: true });
  track.addEventListener('scrollend', () => { lockUntil = 0; });   /* a hand scroll right after an arrow counts again */
  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); go(pos + 1); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); go(pos - 1); }
    else if (e.key === 'Tab') {
      const f = [...modal.querySelectorAll('button:not([disabled]), a, [tabindex="0"]')].filter((x) => x.offsetParent);
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  /* mouse drag on the track (touch scrolls natively) */
  let drag = null;
  track.addEventListener('pointerdown', (e) => { if (e.pointerType === 'mouse') drag = { x: e.clientX, l: track.scrollLeft, moved: false }; });
  addEventListener('pointermove', (e) => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    if (Math.abs(dx) > 4) { drag.moved = true; lockUntil = 0; track.style.scrollSnapType = 'none'; track.scrollLeft = drag.l - dx; }
  });
  addEventListener('pointerup', () => {
    if (!drag) return;
    const moved = drag.moved; drag = null; track.style.scrollSnapType = '';
    if (moved) go(pos);
  });
})();
