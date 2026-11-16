'use strict';

const config = window.SUPABASE_CONFIG;
const state = {
  accessToken: null,
  products: [],
};

const elements = {
  message: document.getElementById('admin-message'),
  loginSection: document.getElementById('login-section'),
  catalogSection: document.getElementById('catalog-section'),
  loginForm: document.getElementById('login-form'),
  logoutButton: document.getElementById('logout-button'),
  productForm: document.getElementById('product-form'),
  formTitle: document.getElementById('form-title'),
  productList: document.getElementById('product-list'),
  newProductButton: document.getElementById('new-product-button'),
  cancelEditButton: document.getElementById('cancel-edit-button'),
  saveProductButton: document.getElementById('save-product-button'),
};

function showMessage(message, kind = 'info') {
  elements.message.textContent = message;
  elements.message.dataset.kind = kind;
  elements.message.hidden = false;
}

function clearMessage() {
  elements.message.textContent = '';
  elements.message.hidden = true;
  delete elements.message.dataset.kind;
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character]);
}

function apiUrl(path) {
  return `${config.url.replace(/\/+$/, '')}/rest/v1/${path}`;
}

async function request(path, options = {}) {
  const headers = {
    apikey: config.publishableKey,
    ...(state.accessToken ? { Authorization: `Bearer ${state.accessToken}` } : {}),
    ...options.headers,
  };
  const response = await fetch(apiUrl(path), { ...options, headers });
  const body = await response.text();

  if (!response.ok) {
    let details = body;
    try {
      const error = JSON.parse(body);
      details = error.message || error.msg || body;
    } catch {
      // Keep the response body when it is not JSON.
    }
    throw new Error(`Supabase (${response.status}): ${details}`);
  }

  return body ? JSON.parse(body) : null;
}

async function signIn(email, password) {
  const response = await fetch(
    `${config.url.replace(/\/+$/, '')}/auth/v1/token?grant_type=password`,
    {
      method: 'POST',
      headers: {
        apikey: config.publishableKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }
  );
  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.msg || body.message || 'Não foi possível entrar. Verifique e-mail e senha.');
  }
  if (!body.access_token || !body.user?.id) {
    throw new Error('A resposta de autenticação não trouxe uma sessão válida.');
  }

  state.accessToken = body.access_token;
  const memberships = await request(
    `admin_users?select=user_id&user_id=eq.${encodeURIComponent(body.user.id)}&limit=1`
  );

  if (!memberships.length) {
    state.accessToken = null;
    throw new Error('Esta conta ainda não foi autorizada como administradora.');
  }
}

function parsePrice(value, label) {
  const text = value.trim();
  if (!text) return null;
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(text)) {
    throw new Error(`${label}: informe um valor como 199,90.`);
  }

  const cents = Math.round(Number(text.replace(',', '.')) * 100);
  if (!Number.isSafeInteger(cents)) {
    throw new Error(`${label}: valor inválido.`);
  }
  return cents;
}

function parseImageUrls(value) {
  const urls = value.split(/\r?\n/).map(url => url.trim()).filter(Boolean);
  if (!urls.length) throw new Error('Adicione ao menos uma imagem HTTPS.');

  for (const value of urls) {
    let url;
    try {
      url = new URL(value);
    } catch {
      throw new Error(`URL de imagem inválida: ${value}`);
    }
    if (url.protocol !== 'https:') {
      throw new Error('Todas as imagens devem usar HTTPS.');
    }
  }
  return urls;
}

function formatPrice(cents) {
  if (cents == null) return 'Sob consulta';
  return (cents / 100).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function formatPriceInput(cents) {
  return cents == null ? '' : (cents / 100).toFixed(2).replace('.', ',');
}

async function loadProducts() {
  const query = new URLSearchParams({
    select: 'id,category,name,description,price_pix_cents,price_card_cents,illustrative,is_active,product_images(url,position)',
    order: 'name.asc',
  });
  state.products = await request(`products?${query}`);
  renderProducts();
}

function renderProducts() {
  if (!state.products.length) {
    elements.productList.textContent = 'Nenhum produto cadastrado.';
    return;
  }

  elements.productList.innerHTML = state.products.map(product => `
    <article class="admin-product">
      <h3>${escapeHTML(product.name)}</h3>
      <p>${escapeHTML(product.category)} · PIX ${formatPrice(product.price_pix_cents)} · Cartão ${formatPrice(product.price_card_cents)}</p>
      <p class="admin-product-status">${product.is_active ? 'Ativo na loja' : 'Inativo'} · ${product.product_images.length} imagem(ns)</p>
      <div class="admin-product-actions">
        <button class="admin-button admin-button--secondary" type="button" data-action="edit" data-id="${product.id}">Editar</button>
        <button class="admin-button admin-button--danger" type="button" data-action="delete" data-id="${product.id}">Remover</button>
      </div>
    </article>
  `).join('');
}

function resetForm() {
  elements.productForm.reset();
  elements.productForm.elements.id.value = '';
  elements.productForm.elements.active.checked = true;
  elements.formTitle.textContent = 'Novo produto';
  elements.saveProductButton.textContent = 'Criar produto';
  elements.cancelEditButton.hidden = true;
}

function editProduct(product) {
  const form = elements.productForm.elements;
  form.id.value = product.id;
  form.name.value = product.name;
  form.category.value = product.category;
  form.description.value = product.description;
  form.pricePix.value = formatPriceInput(product.price_pix_cents);
  form.priceCard.value = formatPriceInput(product.price_card_cents);
  form.images.value = product.product_images
    .sort((a, b) => a.position - b.position)
    .map(image => image.url)
    .join('\n');
  form.illustrative.checked = product.illustrative;
  form.active.checked = product.is_active;
  elements.formTitle.textContent = 'Editar produto';
  elements.saveProductButton.textContent = 'Salvar alterações';
  elements.cancelEditButton.hidden = false;
  elements.productForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

elements.loginForm.addEventListener('submit', async event => {
  event.preventDefault();
  clearMessage();
  const submitButton = elements.loginForm.querySelector('button[type="submit"]');
  submitButton.disabled = true;

  try {
    await signIn(
      elements.loginForm.elements.email.value.trim(),
      elements.loginForm.elements.password.value
    );
    await loadProducts();
    elements.loginSection.hidden = true;
    elements.catalogSection.hidden = false;
    elements.logoutButton.hidden = false;
    elements.loginForm.reset();
  } catch (error) {
    state.accessToken = null;
    showMessage(error.message, 'error');
  } finally {
    submitButton.disabled = false;
  }
});

elements.logoutButton.addEventListener('click', () => {
  state.accessToken = null;
  state.products = [];
  elements.catalogSection.hidden = true;
  elements.logoutButton.hidden = true;
  elements.loginSection.hidden = false;
  elements.productList.replaceChildren();
  resetForm();
  clearMessage();
});

elements.newProductButton.addEventListener('click', () => {
  resetForm();
  elements.productForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

elements.cancelEditButton.addEventListener('click', resetForm);

elements.productForm.addEventListener('submit', async event => {
  event.preventDefault();
  clearMessage();
  elements.saveProductButton.disabled = true;

  try {
    const form = elements.productForm.elements;
    const id = form.id.value ? Number(form.id.value) : null;
    const payload = {
      p_id: id,
      p_category: form.category.value,
      p_name: form.name.value.trim(),
      p_description: form.description.value.trim(),
      p_price_pix_cents: parsePrice(form.pricePix.value, 'Preço PIX'),
      p_price_card_cents: parsePrice(form.priceCard.value, 'Preço cartão'),
      p_illustrative: form.illustrative.checked,
      p_is_active: form.active.checked,
      p_image_urls: parseImageUrls(form.images.value),
    };

    if (!payload.p_name || !payload.p_description) {
      throw new Error('Preencha nome e descrição.');
    }

    const savedId = await request('rpc/admin_save_product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    resetForm();
    await loadProducts();
    showMessage(`Produto ${id == null ? 'criado' : 'atualizado'} (ID ${savedId}).`, 'success');
  } catch (error) {
    showMessage(error.message, 'error');
  } finally {
    elements.saveProductButton.disabled = false;
  }
});

elements.productList.addEventListener('click', async event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const product = state.products.find(item => item.id === Number(button.dataset.id));
  if (!product) return;

  if (button.dataset.action === 'edit') {
    editProduct(product);
    return;
  }

  if (button.dataset.action === 'delete') {
    if (!window.confirm(`Remover "${product.name}" do catálogo? Esta ação não pode ser desfeita.`)) return;
    button.disabled = true;
    clearMessage();
    try {
      await request(`products?id=eq.${product.id}`, {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' },
      });
      await loadProducts();
      showMessage(`Produto "${product.name}" removido.`, 'success');
    } catch (error) {
      showMessage(error.message, 'error');
      button.disabled = false;
    }
  }
});

if (!config.url || !config.publishableKey) {
  showMessage('Configure a URL e a Publishable key em js/supabase-config.js.', 'error');
  elements.loginForm.querySelector('button[type="submit"]').disabled = true;
}
