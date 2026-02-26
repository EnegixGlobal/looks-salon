/* script.js - Shared across all pages */

// ================================================================
//  SCROLL PROGRESS + NAVBAR
// ================================================================
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
  const total = document.body.scrollHeight - window.innerHeight;
  const pct = total > 0 ? (window.scrollY / total * 100).toFixed(1) : 0;
  const bar = document.getElementById('scroll-progress');
  if (bar) bar.style.width = pct + '%';
});

// ================================================================
//  CUSTOM CURSOR
// ================================================================
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
if (dot && ring) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });
  (function animRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a,button,.srv-card,.why-card,.testi-card,.gal-item,.service-card').forEach(el => {
    el.addEventListener('mouseenter', () => { dot.style.width='20px'; dot.style.height='20px'; ring.style.width='54px'; ring.style.height='54px'; ring.style.borderColor='var(--gold-light)'; });
    el.addEventListener('mouseleave', () => { dot.style.width='10px'; dot.style.height='10px'; ring.style.width='36px'; ring.style.height='36px'; ring.style.borderColor='var(--gold)'; });
  });
}

// ================================================================
//  MOBILE NAV
// ================================================================
function toggleMobileNav() {
  document.getElementById('mobile-nav')?.classList.toggle('open');
  document.getElementById('mobile-overlay')?.classList.toggle('open');
}
function closeMobileNav() {
  document.getElementById('mobile-nav')?.classList.remove('open');
  document.getElementById('mobile-overlay')?.classList.remove('open');
}

// ================================================================
//  PRICING ACCORDION
// ================================================================
function togglePrice(header) {
  const item = header.closest('.price-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.price-item').forEach(i => { i.classList.remove('open'); i.querySelector('.price-body')?.classList.remove('open'); });
  if (!isOpen) { item.classList.add('open'); item.querySelector('.price-body')?.classList.add('open'); }
}

// ================================================================
//  GALLERY FILTER
// ================================================================
function filterGallery(btn, cat) {
  document.querySelectorAll('.gal-filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gal-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.style.display = 'block';
      item.style.opacity = '0';
      setTimeout(() => { item.style.opacity='1'; item.style.transition='opacity 0.4s'; }, 20);
    } else {
      item.style.display = 'none';
    }
  });
}

// ================================================================
//  LIGHTBOX
// ================================================================
function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lb-img');
  if (lb && img) { img.src = src; lb.classList.add('open'); }
}
function closeLightbox() { document.getElementById('lightbox')?.classList.remove('open'); }
document.addEventListener('click', e => { if (e.target?.id === 'lightbox') closeLightbox(); });

// ================================================================
//  COUNTERS
// ================================================================
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 60));
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current + '+';
    if (current >= target) clearInterval(timer);
  }, 28);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.counter-num').forEach(animateCounter); counterObs.unobserve(e.target); } });
}, { threshold: 0.3 });
document.querySelectorAll('.stats-section').forEach(el => counterObs.observe(el));

// ================================================================
//  ROI BARS + BAR CHART
// ================================================================
function animateROIBars() { document.querySelectorAll('.roi-bar-inner').forEach(b => { b.style.width = (b.dataset.width || 0) + '%'; }); }
function animateBarChart() { document.querySelectorAll('.bar-col-inner').forEach(b => { b.style.height = (b.dataset.h || 0) + '%'; }); }
const roiObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateROIBars(); animateBarChart(); } });
}, { threshold: 0.2 });
document.querySelectorAll('.roi-bar-wrap, .bar-chart-section').forEach(el => roiObs.observe(el));

// ================================================================
//  BEFORE/AFTER SLIDER
// ================================================================
function initBASlider() {
  const wrapper = document.getElementById('ba-wrapper');
  const after   = document.getElementById('ba-after');
  const divider = document.getElementById('ba-divider');
  const handle  = document.getElementById('ba-handle');
  if (!wrapper || !after) return;
  let dragging = false;
  function setPos(pct) {
    pct = Math.max(4, Math.min(96, pct));
    after.style.clipPath = `inset(0 ${100-pct}% 0 0)`;
    if (divider) divider.style.left = pct + '%';
    if (handle)  handle.style.left  = pct + '%';
  }
  setPos(50);
  wrapper.addEventListener('mousedown', () => dragging = true);
  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    const r = wrapper.getBoundingClientRect();
    setPos((e.clientX - r.left) / r.width * 100);
  });
  wrapper.addEventListener('touchmove', e => {
    const r = wrapper.getBoundingClientRect();
    setPos((e.touches[0].clientX - r.left) / r.width * 100);
    e.preventDefault();
  }, { passive:false });
}
document.addEventListener('DOMContentLoaded', initBASlider);

// ================================================================
//  AOS INIT
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof AOS !== 'undefined') AOS.init({ duration:800, once:true, easing:'ease-out-cubic' });
});

// ================================================================
//  OWL CAROUSELS (jQuery)
// ================================================================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof $ === 'undefined') return;
  $('#brand-carousel').length && $('#brand-carousel').owlCarousel({ loop:true,autoplay:true,autoplayTimeout:2200,autoplayHoverPause:true,dots:false,nav:false, responsive:{0:{items:2},576:{items:3},768:{items:4},992:{items:6}} });
  $('#testi-carousel').length && $('#testi-carousel').owlCarousel({ loop:true,autoplay:true,autoplayTimeout:4500,autoplayHoverPause:true,dots:true,nav:false,margin:0, responsive:{0:{items:1},768:{items:2},992:{items:3}} });
  $('#gallery-carousel').length && $('#gallery-carousel').owlCarousel({ loop:true,autoplay:true,autoplayTimeout:3000,dots:true,nav:false,margin:12, responsive:{0:{items:1},576:{items:2},992:{items:3}} });
});