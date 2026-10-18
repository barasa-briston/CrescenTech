/* ==========================================================================
   CRESCENTECH — site scripts
   To add portfolio work: put the image in assets/work/ and a smaller copy
   (same name) in assets/thumb/, then add a line to WORK below.
   ========================================================================== */

const WORK = [
  // [file name, title, category]
  ['logo-pattern', 'Crescentech brand identity', 'Branding'],
  ['p-need-designer', 'Designer campaign poster', 'Social Media'],
  ['car-suv', 'SUV vehicle branding', 'Outdoor'],
  ['barber-light', 'Barbershop logo — light', 'Branding'],
  ['cards', 'Business cards', 'Branding'],
  ['p-eid', 'Eid-ul-Fitr greeting', 'Social Media'],
  ['tshirt', 'Branded T-shirt', 'Merchandise'],
  ['billboard', 'Billboard design', 'Outdoor'],
  ['seal', 'Company seal', 'Branding'],
  ['p-monday', 'Welcome Monday flyer', 'Social Media'],
  ['mug', 'Branded mugs', 'Merchandise'],
  ['signage', 'Wall signage', 'Outdoor'],
  ['letterhead', 'Letterhead design', 'Branding'],
  ['p-2023', 'New Year client greeting', 'Social Media'],
  ['polo', 'Branded polo shirt', 'Merchandise'],
  ['car-sedan', 'Sedan vehicle branding', 'Outdoor'],
  ['barber-dark', 'Barbershop logo — dark', 'Branding'],
  ['p-tuesday', 'Hello Tuesday post', 'Social Media'],
  ['cap', 'Branded cap', 'Merchandise'],
  ['notebook', 'Branded notebook', 'Branding'],
  ['p-weekend', 'Blessed Weekend post', 'Social Media'],
  ['bottle', 'Branded water bottle', 'Merchandise'],
  ['web-devices', 'Responsive brand presentation', 'Branding'],
  ['p-august', 'Hello August flyer', 'Social Media'],
  ['usb', 'Branded flash drive', 'Merchandise'],
  ['notebook-2', 'Spiral notebook', 'Branding'],
  ['p-outlook', 'Designer outlook poster', 'Social Media'],
  ['stationery-black', 'Stationery set — black edition', 'Branding'],
  ['p-free-design', 'Say no to free design', 'Social Media'],
  ['wall-sticker', 'A4 wall sticker', 'Social Media'],
  ['p-umepata', 'Umepata? quote post', 'Social Media'],
  ['p-fathers', 'Father’s Day post', 'Social Media'],
  ['p-promo', 'Flyer design promo', 'Social Media'],
];

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

$$('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));

/* ---------- header ---------- */
const header = $('#header');
const onScroll = () => header.classList.toggle('is-scrolled', scrollY > 10);
addEventListener('scroll', onScroll, { passive: true });
onScroll();

const menuBtn = $('.menu-btn'), nav = $('#nav');
menuBtn.addEventListener('click', () => {
  const open = !nav.classList.contains('is-open');
  nav.classList.toggle('is-open', open);
  menuBtn.setAttribute('aria-expanded', open);
});

/* ---------- portfolio page ---------- */
const portfolio = $('#portfolio');
if (portfolio) {
  portfolio.innerHTML = WORK.map(([f, title, cat]) =>
    `<button class="item reveal" data-src="assets/work/${f}.webp" data-title="${title}" data-cat="${cat}">` +
    `<img src="assets/thumb/${f}.webp" alt="${title}" loading="lazy" width="760" height="760">` +
    `<span class="item__info"><b>${title}</b><small>${cat}</small></span></button>`).join('');

  $$('.filter').forEach(btn => {
    const f = btn.dataset.filter;
    const n = f === 'all' ? WORK.length : WORK.filter(w => w[2] === f).length;
    btn.insertAdjacentHTML('beforeend', `<em>${n}</em>`);
    btn.addEventListener('click', () => {
      $$('.filter').forEach(b => b.classList.toggle('is-active', b === btn));
      $$('.item', portfolio).forEach(it => {
        it.classList.toggle('is-hidden', f !== 'all' && it.dataset.cat !== f);
        it.classList.add('is-in');
      });
    });
  });
}

/* ---------- lightbox ---------- */
const lb = $('#lightbox');
if (lb) {
  const img = $('img', lb), cap = $('figcaption', lb);
  let list = [], idx = 0, lastFocus;
  const show = i => {
    idx = (i + list.length) % list.length;
    const it = list[idx];
    img.src = it.dataset.src; img.alt = it.dataset.title;
    cap.innerHTML = `${it.dataset.title}<small>${it.dataset.cat}</small>`;
  };
  const open = it => {
    list = $$('.item:not(.is-hidden), .site', it.closest('[data-gallery]'));
    lastFocus = document.activeElement;
    lb.hidden = false; document.body.style.overflow = 'hidden';
    show(list.indexOf(it)); $('.lb-close', lb).focus();
  };
  const close = () => { lb.hidden = true; document.body.style.overflow = ''; lastFocus?.focus(); };
  document.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    const it = e.target.closest('[data-gallery] .item, [data-gallery] .site__frame');
    if (it) open(it.closest('.item, .site'));
  });
  $('.lb-close', lb).addEventListener('click', close);
  $('.lb-prev', lb).addEventListener('click', () => show(idx - 1));
  $('.lb-next', lb).addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb || e.target.tagName === 'FIGURE') close(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });
  let x0 = null;
  lb.addEventListener('touchstart', e => (x0 = e.touches[0].clientX), { passive: true });
  lb.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    x0 = null;
  });
}

/* ---------- quote form ---------- */
const form = $('#quote-form');
if (form) {
  const note = $('.form__note', form);
  let via = 'wa';
  $$('[data-via]', form).forEach(b => b.addEventListener('click', () => (via = b.dataset.via)));
  form.addEventListener('submit', e => {
    e.preventDefault();
    const d = new FormData(form);
    const name = d.get('name').trim(), msg = d.get('message').trim(), phone = d.get('phone').trim();
    if (!name || !msg) { note.textContent = 'Please enter your name and project details.'; return; }
    const text = `Hello Crescentech, my name is ${name}.${phone ? ` (Phone: ${phone})` : ''}\n` +
      `Service: ${d.get('service')}\n\n${msg}`;
    if (via === 'email') {
      location.href = `mailto:crescentsolutionstechn@gmail.com?subject=${encodeURIComponent('Quote request — ' + name)}&body=${encodeURIComponent(text)}`;
    } else {
      window.open(`https://wa.me/254799737398?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
    }
    note.textContent = 'Thank you! Your message is ready — just press send.';
  });
}

/* ---------- gentle reveal on scroll ---------- */
(() => {
  const els = $$('.reveal');
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return els.forEach(el => el.classList.add('is-in'));
  let pending = els, queued = false;
  const check = () => {
    queued = false;
    const limit = innerHeight * .94;
    pending = pending.filter(el => {
      if (el.getBoundingClientRect().top > limit) return true;
      el.classList.add('is-in');
      return false;
    });
  };
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(check); } }, { passive: true });
  addEventListener('resize', check);
  addEventListener('load', check);
  check();
})();
