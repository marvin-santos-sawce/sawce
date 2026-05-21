/* ═══════════════════════════════════════════════
   SAWCE COMPANY — Shopping Cart v1.0
   ═══════════════════════════════════════════════ */

'use strict';

const CART = {
  items: [],

  add(productName, pricePix) {
    const existing = this.items.find(item => item.name === productName);
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({ name: productName, pricePix, qty: 1 });
    }
    this.save();
    this.render();
    this.showNotification(productName);
  },

  remove(productName) {
    this.items = this.items.filter(item => item.name !== productName);
    this.save();
    this.render();
  },

  changeQty(productName, qty) {
    const item = this.items.find(item => item.name === productName);
    if (item) {
      item.qty = Math.max(1, qty);
      this.save();
      this.render();
    }
  },

  clear() {
    this.items = [];
    this.save();
    this.render();
  },

  save() {
    localStorage.setItem('sawce-cart', JSON.stringify(this.items));
  },

  load() {
    const saved = localStorage.getItem('sawce-cart');
    this.items = saved ? JSON.parse(saved) : [];
  },

  getTotal() {
    return this.items.reduce((sum, item) => {
      const price = parseFloat(item.pricePix.replace(',', '.'));
      return sum + (price * item.qty);
    }, 0);
  },

  render() {
    const total = this.items.reduce((sum, item) => sum + item.qty, 0);

    const cartList = document.getElementById('cart-items');
    if (!cartList) return;

    if (this.items.length === 0) {
      cartList.innerHTML = '<p class="cart-empty">Seu carrinho está vazio</p>';
      this.updateTotalDisplay();
      return;
    }

    cartList.innerHTML = this.items.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">R$ ${item.pricePix}</div>
        </div>
        <div class="cart-item-controls">
          <button class="cart-qty-btn" data-idx="${idx}" data-op="minus">−</button>
          <input type="number" class="cart-qty-input" value="${item.qty}" min="1" data-idx="${idx}" />
          <button class="cart-qty-btn" data-idx="${idx}" data-op="plus">+</button>
        </div>
        <button class="cart-remove" data-idx="${idx}" aria-label="Remover">✕</button>
      </div>
    `).join('');

    this.updateTotalDisplay();

    // Event delegation for quantity controls
    cartList.querySelectorAll('.cart-qty-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const op = e.target.dataset.op;
        const item = this.items[idx];
        const newQty = op === 'plus' ? item.qty + 1 : item.qty - 1;
        this.changeQty(item.name, newQty);
      });
    });

    cartList.querySelectorAll('.cart-qty-input').forEach(input => {
      input.addEventListener('change', e => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const item = this.items[idx];
        this.changeQty(item.name, parseInt(e.target.value, 10) || 1);
      });
    });

    cartList.querySelectorAll('.cart-remove').forEach(btn => {
      btn.addEventListener('click', e => {
        const idx = parseInt(e.target.dataset.idx, 10);
        this.remove(this.items[idx].name);
      });
    });
  },

  showNotification(productName) {
    const notif = document.createElement('div');
    notif.className = 'cart-notification';
    notif.textContent = `✓ "${productName}" adicionado ao carrinho`;
    document.body.appendChild(notif);

    setTimeout(() => {
      notif.classList.add('show');
    }, 10);

    setTimeout(() => {
      notif.classList.remove('show');
      setTimeout(() => notif.remove(), 300);
    }, 2000);
  },

  updateTotalDisplay() {
    const totalValue = document.getElementById('cart-total-value');
    if (!totalValue) return;

    const total = this.getTotal();
    const formattedTotal = total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    totalValue.textContent = `R$ ${formattedTotal}`;
  },

  checkout() {
    if (this.items.length === 0) {
      alert('Seu carrinho está vazio');
      return;
    }

    const productList = this.items
      .map(item => `${item.name} (${item.qty}x - R$ ${item.pricePix})`)
      .join(' | ');

    const total = this.getTotal();
    const formattedTotal = total.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    const msg = encodeURIComponent(
      `Olá! Montei meu carrinho com os seguintes produtos: ${productList} Total: R$ ${formattedTotal} gostaria de seguir com minha compra.`
    );

    window.open(`https://wa.me/5551997421676?text=${msg}`, '_blank', 'noopener,noreferrer');
  }
};

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
  CART.load();
  CART.render();

  // Cart toggle
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');
  const cartCheckoutBtn = document.getElementById('cart-checkout');

  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      cartDrawer?.classList.toggle('open');
    });
  }

  if (cartClose) {
    cartClose.addEventListener('click', () => {
      cartDrawer?.classList.remove('open');
    });
  }

  if (cartCheckoutBtn) {
    cartCheckoutBtn.addEventListener('click', () => {
      CART.checkout();
      CART.clear();
      cartDrawer?.classList.remove('open');
    });
  }

  // Close drawer on backdrop click
  if (cartDrawer) {
    cartDrawer.addEventListener('click', e => {
      if (e.target === cartDrawer) {
        cartDrawer.classList.remove('open');
      }
    });
  }
});
