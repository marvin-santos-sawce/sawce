/* ═══════════════════════════════════════════════
   SAWCE COMPANY — App Logic v2.0
   ═══════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────
   CONFIG
───────────────────────────────────────────── */
const CONFIG = {
  PER_PAGE:     12,
  WHATSAPP:     '5551997421676',
  FALLBACK_IMG: 'https://placehold.co/600x400/111111/13d203?text=Imagem+Indisponível',
  POPUP_PRODUCT: 'Camisa Seleção Brasileira — Pré Venda',
};

const CAT_LABELS = {
  tenis:   'Tênis',
  camisas: 'Camisa de time',
  anime:   'Anime',
  tech:    'Tech',
  esporte: 'Esporte',
};

/* ─────────────────────────────────────────────
   STATE
───────────────────────────────────────────── */
let state = { cat: 'all', page: 1 };

// Lightbox state
const lb = {
  imgs:    [],
  current: 0,
  touchStartX: 0,
};

/* ─────────────────────────────────────────────
   DOM REFS
───────────────────────────────────────────── */
const els = {
  grid:       document.getElementById('products-grid'),
  pagination: document.getElementById('pagination-wrap'),
  filters:    document.getElementById('filters'),
  mobileBtn:  document.getElementById('mobile-menu-button'),
  mobileMenu: document.getElementById('mobile-menu'),
  desktopNav: document.getElementById('desktop-nav'),
  headerCta:  document.getElementById('header-cta'),
  searchInput: document.getElementById('product-search'),
  searchClear: document.getElementById('search-clear'),
  // Popup
  popupOverlay: document.getElementById('popup-overlay'),
  popupClose:   document.getElementById('close-popup'),
  popupWA:      document.getElementById('popup-whatsapp'),
  // Lightbox
  lightbox:    document.getElementById('lightbox'),
  lbImg:       document.getElementById('lightbox-img'),
  lbClose:     document.getElementById('lightbox-close'),
  lbPrev:      document.getElementById('lightbox-prev'),
  lbNext:      document.getElementById('lightbox-next'),
  lbCounter:   document.getElementById('lightbox-counter'),
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function whatsappURL(product) {
  const msg = encodeURIComponent(`Olá! Vim pelo site e gostaria de mais informações sobre o produto: ${product}`);
  return `https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`;
}

function getFiltered() {
  const query = (els.searchInput?.value ?? '').trim().toLowerCase();

  let list = state.cat === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === state.cat);

  if (query.length >= 1) {
    list = list.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query)
    );
  }

  return list;
}

function getPageRange(cur, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = [1];
  if (cur > 3) pages.push('...');
  const start = Math.max(2, cur - 1);
  const end   = Math.min(total - 1, cur + 1);
  for (let i = start; i <= end; i++) pages.push(i);
  if (cur < total - 2) pages.push('...');
  if (total > 1) pages.push(total);
  return pages;
}

/* ─────────────────────────────────────────────
   POPUP
───────────────────────────────────────────── */
function initPopup() {
  // Set WhatsApp link for the promo
  els.popupWA.href = whatsappURL(CONFIG.POPUP_PRODUCT);

  // Show popup
  els.popupOverlay.classList.add('active');

  // Close on X button
  els.popupClose.addEventListener('click', () => {
    els.popupOverlay.classList.remove('active');
  });

  // Close on backdrop click (not on content itself)
  els.popupOverlay.addEventListener('click', e => {
    if (e.target === els.popupOverlay) {
      els.popupOverlay.classList.remove('active');
    }
  });
}

/* ─────────────────────────────────────────────
   LIGHTBOX
───────────────────────────────────────────── */
function openLightbox(imgs, startIndex) {
  lb.imgs    = imgs;
  lb.current = startIndex;
  updateLightboxImage();
  els.lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  els.lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function updateLightboxImage() {
  els.lbImg.src       = lb.imgs[lb.current];
  els.lbImg.alt       = `Foto ${lb.current + 1} de ${lb.imgs.length}`;
  els.lbCounter.textContent = `${lb.current + 1} / ${lb.imgs.length}`;
  els.lbPrev.disabled = lb.current === 0;
  els.lbNext.disabled = lb.current === lb.imgs.length - 1;
}

function lbNavigate(dir) {
  const next = lb.current + dir;
  if (next < 0 || next >= lb.imgs.length) return;
  lb.current = next;
  updateLightboxImage();
}

// Lightbox event listeners
els.lbClose.addEventListener('click', closeLightbox);
els.lbPrev.addEventListener('click', () => lbNavigate(-1));
els.lbNext.addEventListener('click', () => lbNavigate(+1));

els.lightbox.addEventListener('click', e => {
  if (e.target === els.lightbox || e.target === els.lbImg) {
    // Click on background → close; click on image itself also closes if single image
    if (e.target === els.lightbox) closeLightbox();
  }
});

// Keyboard navigation in lightbox
document.addEventListener('keydown', e => {
  if (!els.lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')      closeLightbox();
  if (e.key === 'ArrowLeft')   lbNavigate(-1);
  if (e.key === 'ArrowRight')  lbNavigate(+1);
});

// Touch swipe in lightbox
els.lightbox.addEventListener('touchstart', e => {
  lb.touchStartX = e.touches[0].clientX;
}, { passive: true });

els.lightbox.addEventListener('touchend', e => {
  const diff = lb.touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 40) lbNavigate(diff > 0 ? +1 : -1);
}, { passive: true });

/* ─────────────────────────────────────────────
   CARRROSSEL (per card)
   We store current index as data-current on the
   .product-img-wrap element.
───────────────────────────────────────────── */
function updateCardImage(wrap, newIdx) {
  const img  = wrap.querySelector('.product-image');
  const imgs = JSON.parse(img.dataset.imgs);

  if (newIdx < 0 || newIdx >= imgs.length) return;

  // Update image
  img.src = imgs[newIdx];
  wrap.dataset.current = newIdx;

  // Update dots
  wrap.querySelectorAll('.img-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === newIdx);
  });

  // Update thumbs in card body (if present)
  const card = wrap.closest('.product-card');
  card.querySelectorAll('.color-thumb').forEach((t, i) => {
    t.classList.toggle('selected', i === newIdx);
  });
}

/* ─────────────────────────────────────────────
   CARD BUILDER
───────────────────────────────────────────── */
function buildCard(product) {
  const { id, cat, name, desc, price, imgs } = product;
  const query   = (els.searchInput?.value ?? '').trim();
  const hasMany = imgs.length > 1;

  // Highlight do termo buscado no nome
  function highlight(text) {
    if (!query) return text;
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return text.replace(
      new RegExp(`(${escaped})`, 'gi'),
      '<mark class="search-highlight">$1</mark>'
    );
  }

  const thumbsHTML = hasMany
    ? `<div class="color-thumbs">
        ${imgs.map((url, i) => `
          <button class="color-thumb${i === 0 ? ' selected' : ''}" data-index="${i}"
            style="background-image:url('${url}')"
            aria-label="Variação ${i + 1} de ${name}"></button>`
        ).join('')}
       </div>`
    : '';

  const arrowsHTML = hasMany
    ? `<button class="img-arrow img-arrow--prev" data-dir="-1" aria-label="Foto anterior">&#8249;</button>
       <button class="img-arrow img-arrow--next" data-dir="1"  aria-label="Próxima foto">&#8250;</button>`
    : '';

  const dotsHTML = hasMany
    ? `<div class="img-dots">
        ${imgs.map((_, i) => `<span class="img-dot${i === 0 ? ' active' : ''}"></span>`).join('')}
       </div>`
    : '';

  return `
    <article class="product-card" data-id="${id}">
      <div class="product-img-wrap" data-current="0">
        <span class="cat-tag">${CAT_LABELS[cat] ?? cat}</span>
        <img
          class="product-image"
          src="${imgs[0]}"
          alt="${name}"
          loading="lazy"
          data-imgs='${JSON.stringify(imgs)}'
          onerror="this.onerror=null;this.src='${CONFIG.FALLBACK_IMG}'"
        />
        ${arrowsHTML}
        ${dotsHTML}
      </div>
      <div class="product-body">
        <h3 class="product-name">${highlight(name)}</h3>
        <p class="product-desc">${desc}</p>
        ${product.priceOld
  ? `<div class="product-price product-price--promo">
       <span class="price-old">R$${product.priceOld}</span>
       <span class="price-new">R$${price}</span>
     </div>`
  : `<div class="product-price">R$${price}</div>`
}
        ${thumbsHTML}
        <button class="btn-buy" data-product="${name}">Quero Este!</button>
      </div>
    </article>`;
}

/* ─────────────────────────────────────────────
   RENDER
───────────────────────────────────────────── */
function render() {
  const filtered   = getFiltered();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / CONFIG.PER_PAGE);

  if (state.page > totalPages) state.page = 1;

  const start = (state.page - 1) * CONFIG.PER_PAGE;
  const slice = filtered.slice(start, start + CONFIG.PER_PAGE);

  // Grid
  const query = (els.searchInput?.value ?? '').trim();

  els.grid.innerHTML = slice.length
    ? slice.map(buildCard).join('')
    : `<div class="search-empty">
         <div style="font-size:2.5rem;">🔍</div>
         ${query
           ? `<p class="search-empty-title">Procura por "${query}" e não encontrou o que deseja?</p>
              <p class="search-empty-sub">Nos chame no número (51) 99742-1676 para fazer um pedido personalizado!</p>`
           : `<p class="search-empty-title">Nenhum produto nesta categoria ainda</p>
              <p class="search-empty-sub">Novidades chegando em breve!</p>`
         }
       </div>`;

  // Bind touch/swipe for each new card
  els.grid.querySelectorAll('.product-img-wrap').forEach(bindCardSwipe);

  // Pagination
  if (totalPages <= 1) { els.pagination.innerHTML = ''; return; }

  const showing1  = start + 1;
  const showing2  = Math.min(start + CONFIG.PER_PAGE, totalItems);
  const pageRange = getPageRange(state.page, totalPages);

  const btns = pageRange.map(p => p === '...'
    ? `<span class="page-btn ellipsis" aria-hidden="true">…</span>`
    : `<button class="page-btn${p === state.page ? ' active' : ''}" data-p="${p}"
         aria-label="Página ${p}" ${p === state.page ? 'aria-current="page"' : ''}>${p}</button>`
  ).join('');

  els.pagination.innerHTML = `
    <nav class="pagination" aria-label="Paginação de produtos">
      <button class="page-btn" data-p="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="Página anterior">&#8592; Anterior</button>
      ${btns}
      <button class="page-btn" data-p="${state.page + 1}" ${state.page === totalPages ? 'disabled' : ''} aria-label="Próxima página">Próxima &#8594;</button>
    </nav>
    <p class="page-info" aria-live="polite">Mostrando ${showing1}–${showing2} de ${totalItems} produtos</p>`;
}

/* ─────────────────────────────────────────────
   TOUCH SWIPE ON CARD IMAGE
───────────────────────────────────────────── */
function bindCardSwipe(wrap) {
  let startX = 0;

  wrap.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  wrap.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 40) return; // too short = tap, not swipe
    const cur = parseInt(wrap.dataset.current, 10);
    updateCardImage(wrap, cur + (diff > 0 ? 1 : -1));
  }, { passive: true });
}

/* ─────────────────────────────────────────────
   EVENT DELEGATION — Grid
───────────────────────────────────────────── */
els.grid.addEventListener('click', e => {

  // 1. Carousel arrows
  const arrow = e.target.closest('.img-arrow');
  if (arrow) {
    e.stopPropagation();
    const wrap = arrow.closest('.product-img-wrap');
    const cur  = parseInt(wrap.dataset.current, 10);
    const dir  = parseInt(arrow.dataset.dir, 10);
    updateCardImage(wrap, cur + dir);
    return;
  }

  // 2. Image click → open lightbox
  const imgClick = e.target.closest('.product-img-wrap');
  if (imgClick && !e.target.closest('.img-arrow')) {
    const img  = imgClick.querySelector('.product-image');
    const imgs = JSON.parse(img.dataset.imgs);
    const cur  = parseInt(imgClick.dataset.current, 10);
    openLightbox(imgs, cur);
    return;
  }

  // 3. Thumbnail swap
  const thumb = e.target.closest('.color-thumb');
  if (thumb) {
    const card = thumb.closest('.product-card');
    const wrap = card.querySelector('.product-img-wrap');
    const idx  = parseInt(thumb.dataset.index, 10);
    updateCardImage(wrap, idx);
    return;
  }

  // 4. Buy button → WhatsApp
  const buyBtn = e.target.closest('.btn-buy');
  if (buyBtn) {
    const product = buyBtn.dataset.product;
    if (!product) return;
    window.open(whatsappURL(product), '_blank', 'noopener,noreferrer');
  }
});

/* ─────────────────────────────────────────────
   EVENT DELEGATION — Filters
───────────────────────────────────────────── */
els.filters.addEventListener('click', e => {
  const pill = e.target.closest('.filter-pill');
  if (!pill) return;
  document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
  pill.classList.add('active');
  state.cat  = pill.dataset.cat;
  state.page = 1;
  render();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

/* ─────────────────────────────────────────────
   EVENT DELEGATION — Pagination
───────────────────────────────────────────── */
els.pagination.addEventListener('click', e => {
  const btn = e.target.closest('.page-btn');
  if (!btn || btn.disabled || btn.classList.contains('ellipsis') || btn.classList.contains('active')) return;
  const p = parseInt(btn.dataset.p, 10);
  if (Number.isNaN(p)) return;
  state.page = p;
  render();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
// ─── Hero background carousel ─────────────────
(function () {
  const slides = document.querySelectorAll('.hero-slide');
  if (slides.length < 2) return; // só ativa com 2+ imagens

  let current = 0;

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 5000); // troca a cada 4 segundos — ajuste à vontade
})();
/* ─────────────────────────────────────────────
   MOBILE NAV
───────────────────────────────────────────── */
function handleResize() {
  const isMobile = window.innerWidth < 768;
  els.mobileBtn.style.display  = isMobile ? 'block' : 'none';
  els.desktopNav.style.display = isMobile ? 'none'  : 'flex';
  els.headerCta.style.display  = isMobile ? 'none'  : 'inline-block';
  if (!isMobile) els.mobileMenu.classList.add('hidden');
}

els.mobileBtn.addEventListener('click', () => els.mobileMenu.classList.toggle('hidden'));
window.addEventListener('resize', handleResize);

/* ─────────────────────────────────────────────
   INIT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initPopup();
  if (els.searchInput) {

  // Filtra enquanto digita (debounce de 200ms para não travar)
  let searchTimer;
  els.searchInput.addEventListener('input', () => {
    clearTimeout(searchTimer);

    const hasValue = els.searchInput.value.length > 0;
    els.searchClear.hidden = !hasValue;

    searchTimer = setTimeout(() => {
      state.page = 1;   // volta para a página 1 ao buscar
      render();
    }, 200);
  });

  // Botão × limpa o campo e re-renderiza
  els.searchClear.addEventListener('click', () => {
    els.searchInput.value = '';
    els.searchClear.hidden = true;
    els.searchInput.focus();
    state.page = 1;
    render();
  });

  // ESC também limpa
  els.searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      els.searchInput.value = '';
      els.searchClear.hidden = true;
      state.page = 1;
      render();
    }
  });
}
  handleResize();
  render();
});
