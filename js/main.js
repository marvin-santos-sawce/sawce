/* ═══════════════════════════════════════════════
   SAWCE COMPANY — App Logic
   Versão: 1.0
   ═══════════════════════════════════════════════ */

'use strict';

// ─── Config ──────────────────────────────────────
const CONFIG = {
  PER_PAGE:    12,
  WHATSAPP:    '5551997421676',
  FALLBACK_IMG: 'https://placehold.co/600x400/111111/13d203?text=Imagem+Indisponível',
};
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup-overlay");
    const closeBtn = document.getElementById("close-popup");

    // Exibe o pop-up
    popup.style.display = "flex";

    // Fecha ao clicar no botão X
    closeBtn.addEventListener("click", function() {
        popup.style.display = "none";
    });

    // Fecha se o usuário clicar fora da imagem (no fundo escuro)
    window.addEventListener("click", function(event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
const CAT_LABELS = {
  tenis:   'Tênis',
  camisas: 'Camisa',
  anime:   'Anime',
  tech:    'Tech',
  esporte: 'Esporte',
};

// ─── State ───────────────────────────────────────
let state = {
  cat:  'all',
  page: 1,
};

// ─── DOM refs ────────────────────────────────────
const els = {
  grid:       document.getElementById('products-grid'),
  pagination: document.getElementById('pagination-wrap'),
  filters:    document.getElementById('filters'),
  mobileBtn:  document.getElementById('mobile-menu-button'),
  mobileMenu: document.getElementById('mobile-menu'),
  desktopNav: document.getElementById('desktop-nav'),
  headerCta:  document.getElementById('header-cta'),
};

// ─── Helpers ─────────────────────────────────────
function getFiltered() {
  return state.cat === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.cat === state.cat);
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

// ─── Card Builder ─────────────────────────────────
function buildCard(product) {
  const { id, cat, name, desc, price, imgs } = product;

  const thumbsHTML = imgs.length > 1
    ? `<div class="color-thumbs">
        ${imgs.map((url, i) => `
          <button
            class="color-thumb${i === 0 ? ' selected' : ''}"
            data-index="${i}"
            style="background-image:url('${url}')"
            aria-label="Variação ${i + 1} de ${name}"
          ></button>`).join('')}
       </div>`
    : '';

  return `
    <article class="product-card" data-id="${id}">
      <div class="product-img-wrap">
        <span class="cat-tag">${CAT_LABELS[cat] ?? cat}</span>
        <img
          class="product-image"
          src="${imgs[0]}"
          alt="${name}"
          loading="lazy"
          data-imgs='${JSON.stringify(imgs)}'
          onerror="this.onerror=null;this.src='${CONFIG.FALLBACK_IMG}'"
        />
      </div>
      <div class="product-body">
        <h3 class="product-name">${name}</h3>
        <p class="product-desc">${desc}</p>
        <div class="product-price">R$${price}</div>
        ${thumbsHTML}
        <button class="btn-buy" data-product="${name}">Quero Este!</button>
      </div>
    </article>`;
}

// ─── Render ──────────────────────────────────────
function render() {
  const filtered  = getFiltered();
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / CONFIG.PER_PAGE);

  // Guard page bounds
  if (state.page > totalPages) state.page = 1;

  const start = (state.page - 1) * CONFIG.PER_PAGE;
  const slice = filtered.slice(start, start + CONFIG.PER_PAGE);

  // ── Grid ──
  els.grid.innerHTML = slice.length
    ? slice.map(buildCard).join('')
    : `<div class="empty-state">
         <div style="font-size:3rem;margin-bottom:1rem;">🐉</div>
         <p style="font-family:'Bebas Neue',sans-serif;font-size:2rem;color:var(--muted);">
           Nenhum produto nesta categoria ainda
         </p>
         <p style="color:var(--muted);font-size:.9rem;">Novidades chegando em breve!</p>
       </div>`;

  // ── Pagination ──
  if (totalPages <= 1) {
    els.pagination.innerHTML = '';
    return;
  }

  const showing1   = start + 1;
  const showing2   = Math.min(start + CONFIG.PER_PAGE, totalItems);
  const pageRange  = getPageRange(state.page, totalPages);

  const pageButtons = pageRange.map(p => {
    if (p === '...') {
      return `<span class="page-btn ellipsis" aria-hidden="true">…</span>`;
    }
    return `<button
      class="page-btn${p === state.page ? ' active' : ''}"
      data-p="${p}"
      aria-label="Página ${p}"
      ${p === state.page ? 'aria-current="page"' : ''}
    >${p}</button>`;
  }).join('');

  els.pagination.innerHTML = `
    <nav class="pagination" aria-label="Paginação de produtos">
      <button class="page-btn" data-p="${state.page - 1}" ${state.page === 1 ? 'disabled' : ''} aria-label="Página anterior">
        &#8592; Anterior
      </button>
      ${pageButtons}
      <button class="page-btn" data-p="${state.page + 1}" ${state.page === totalPages ? 'disabled' : ''} aria-label="Próxima página">
        Próxima &#8594;
      </button>
    </nav>
    <p class="page-info" aria-live="polite">
      Mostrando ${showing1}–${showing2} de ${totalItems} produtos
    </p>`;
}

// ─── Event Handlers ──────────────────────────────

// Filter pills
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

// Pagination clicks
els.pagination.addEventListener('click', e => {
  const btn = e.target.closest('.page-btn');
  if (!btn || btn.disabled || btn.classList.contains('ellipsis') || btn.classList.contains('active')) return;

  const p = parseInt(btn.dataset.p, 10);
  if (Number.isNaN(p)) return;

  state.page = p;
  render();
  document.getElementById('products').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Product grid (thumb swap + buy button)
els.grid.addEventListener('click', e => {
  // Color thumb swap
  const thumb = e.target.closest('.color-thumb');
  if (thumb) {
    const card = thumb.closest('.product-card');
    const img  = card.querySelector('.product-image');
    const imgs = JSON.parse(img.dataset.imgs);
    const idx  = parseInt(thumb.dataset.index, 10);

    if (imgs[idx]) img.src = imgs[idx];
    card.querySelectorAll('.color-thumb').forEach(t => t.classList.remove('selected'));
    thumb.classList.add('selected');
    return;
  }

  // Buy button → WhatsApp
  const buyBtn = e.target.closest('.btn-buy');
  if (buyBtn) {
    const product = buyBtn.dataset.product;
    if (!product) return;
    const msg = encodeURIComponent(`Olá! Tenho interesse no produto: ${product}`);
    window.open(`https://wa.me/${CONFIG.WHATSAPP}?text=${msg}`, '_blank', 'noopener,noreferrer');
  }
});

// Mobile nav toggle
function handleResize() {
  const isMobile = window.innerWidth < 768;
  els.mobileBtn.style.display  = isMobile ? 'block' : 'none';
  els.desktopNav.style.display = isMobile ? 'none'  : 'flex';
  els.headerCta.style.display  = isMobile ? 'none'  : 'inline-block';
  if (!isMobile) els.mobileMenu.classList.add('hidden');
}

els.mobileBtn.addEventListener('click', () => els.mobileMenu.classList.toggle('hidden'));
window.addEventListener('resize', handleResize);

// ─── Init ────────────────────────────────────────
handleResize();
render();
