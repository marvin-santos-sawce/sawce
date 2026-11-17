'use strict';

const config = window.SUPABASE_CONFIG;
const state = {
  accessToken: null,
  products: [],
  categories: [],
  search: '',
  category: 'all',
  messageTimer: null,
  editingCategorySlug: null,
  pendingDelete: null,
};

const elements = {
  message: document.getElementById('admin-message'),
  messageText: document.getElementById('admin-message-text'),
  messageClose: document.getElementById('admin-message-close'),
  loginSection: document.getElementById('login-section'),
  app: document.getElementById('admin-app'),
  catalogSection: document.getElementById('catalog-section'),
  productsView: document.getElementById('products-view'),
  editorView: document.getElementById('product-editor-view'),
  categoriesView: document.getElementById('categories-view'),
  loginForm: document.getElementById('login-form'),
  logoutButton: document.getElementById('logout-button'),
  productForm: document.getElementById('product-form'),
  formTitle: document.getElementById('form-title'),
  productList: document.getElementById('product-list'),
  productsEmpty: document.getElementById('products-empty'),
  categoryList: document.getElementById('category-list'),
  categoriesEmpty: document.getElementById('categories-empty'),
  categoryForm: document.getElementById('category-form'),
  categoryFormTitle: document.getElementById('category-form-title'),
  categoryNameInput: document.getElementById('category-name'),
  categorySlugInput: document.getElementById('category-slug'),
  newCategoryButton: document.getElementById('new-category-button'),
  cancelCategoryButton: document.getElementById('cancel-category-button'),
  saveCategoryButton: document.getElementById('save-category-button'),
  newProductButton: document.getElementById('new-product-button'),
  cancelEditButton: document.getElementById('cancel-edit-button'),
  saveProductButton: document.getElementById('save-product-button'),
  searchForm: document.getElementById('search-form'),
  searchInput: document.getElementById('product-search'),
  categoryFilter: document.getElementById('category-filter'),
  pricePixInput: document.getElementById('price-pix'),
  priceCardInput: document.getElementById('price-card'),
  deleteDialog: document.getElementById('delete-dialog'),
  deleteDialogTitle: document.getElementById('delete-dialog-title'),
  deleteDialogMessage: document.getElementById('delete-dialog-message'),
  cancelDeleteButton: document.getElementById('cancel-delete-button'),
  confirmDeleteButton: document.getElementById('confirm-delete-button'),
};

function showMessage(message, kind = 'info') {
  clearTimeout(state.messageTimer);
  elements.messageText.textContent = message;
  elements.message.dataset.kind = kind;
  elements.message.hidden = false;
  if (kind === 'success') {
    state.messageTimer = setTimeout(clearMessage, 6000);
  }
}

function clearMessage() {
  clearTimeout(state.messageTimer);
  elements.messageText.textContent = '';
  elements.message.hidden = true;
  delete elements.message.dataset.kind;
}

function setView(view) {
  const isEditor = view === 'editor';
  const isCategories = view === 'categories';
  elements.productsView.hidden = isEditor || isCategories;
  elements.editorView.hidden = !isEditor;
  elements.categoriesView.hidden = !isCategories;
  document.querySelectorAll('.admin-nav-item[data-view]').forEach(item => {
    item.classList.toggle('is-active', item.dataset.view === (isCategories ? 'categories' : 'products'));
  });
  if (isCategories) {
    elements.newCategoryButton.focus({ preventScroll: true });
  } else if (!isEditor) {
    elements.searchInput.focus({ preventScroll: true });
  } else {
    document.getElementById('product-name').focus({ preventScroll: true });
  }
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

function categoryLabel(category) {
  return state.categories.find(item => item.slug === category)?.name ?? category;
}

function renderCategoryOptions() {
  const currentProductCategory = elements.productForm.elements.category.value;
  const currentFilterCategory = elements.categoryFilter.value;

  elements.productForm.elements.category.replaceChildren(
    new Option('Selecione uma categoria', ''),
    ...state.categories.map(category => new Option(category.name, category.slug))
  );
  elements.categoryFilter.replaceChildren(
    new Option('Todas as categorias', 'all'),
    ...state.categories.map(category => new Option(category.name, category.slug))
  );

  if (state.categories.some(category => category.slug === currentProductCategory)) {
    elements.productForm.elements.category.value = currentProductCategory;
  }
  if (state.categories.some(category => category.slug === currentFilterCategory)) {
    elements.categoryFilter.value = currentFilterCategory;
  } else {
    state.category = 'all';
    elements.categoryFilter.value = 'all';
  }
}

function renderCategories() {
  elements.categoryList.innerHTML = state.categories.map(category => {
    const productCount = state.products.filter(product => product.category === category.slug).length;
    return `
      <tr>
        <td class="admin-product-name">${escapeHTML(category.name)}</td>
        <td><code class="admin-category-slug">${escapeHTML(category.slug)}</code></td>
        <td>${productCount}</td>
        <td>
          <div class="admin-product-actions">
            <button class="admin-icon-button" type="button" data-action="edit-category" data-slug="${escapeHTML(category.slug)}" aria-label="Editar categoria ${escapeHTML(category.name)}" title="Editar">✎</button>
            <button class="admin-button admin-button--danger" type="button" data-action="delete-category" data-slug="${escapeHTML(category.slug)}" aria-label="Remover categoria ${escapeHTML(category.name)}" title="${productCount ? 'Mova os produtos antes de remover esta categoria' : 'Remover categoria'}" ${productCount ? 'disabled' : ''}>
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');
  elements.categoriesEmpty.hidden = state.categories.length !== 0;
  elements.categoryList.closest('.admin-table-card').classList.toggle('is-empty', state.categories.length === 0);
}

function slugify(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function resetCategoryForm() {
  elements.categoryForm.reset();
  elements.categoryForm.hidden = true;
  elements.categorySlugInput.value = '';
  elements.categoryFormTitle.textContent = 'Nova categoria';
  elements.saveCategoryButton.textContent = 'Criar categoria';
  state.editingCategorySlug = null;
}

function editCategory(category) {
  state.editingCategorySlug = category.slug;
  elements.categoryNameInput.value = category.name;
  elements.categorySlugInput.value = category.slug;
  elements.categoryFormTitle.textContent = 'Editar categoria';
  elements.saveCategoryButton.textContent = 'Salvar alterações';
  elements.categoryForm.hidden = false;
  elements.categoryNameInput.focus();
}

function requestDelete(type, item) {
  state.pendingDelete = { type, item };
  const isCategory = type === 'category';
  elements.deleteDialogTitle.textContent = isCategory ? 'Remover categoria?' : 'Remover produto?';
  elements.deleteDialogMessage.textContent = isCategory
    ? `Confirma a remoção da categoria "${item.name}"? Esta ação não pode ser desfeita.`
    : `Confirma a remoção do produto "${item.name}"? Esta ação não pode ser desfeita.`;
  elements.confirmDeleteButton.disabled = false;
  elements.deleteDialog.showModal();
}

async function loadCategories() {
  const rows = await request('categories?select=slug,name&order=name.asc');
  if (!Array.isArray(rows)) throw new Error('A resposta de categorias do Supabase é inválida.');
  state.categories = rows;
  renderCategoryOptions();
  renderCategories();
}

async function loadProducts() {
  const query = new URLSearchParams({
    select: 'id,category,name,description,price_pix_cents,price_card_cents,illustrative,is_active,product_images(url,position)',
    order: 'name.asc',
  });
  state.products = await request(`products?${query}`);
  renderProducts();
  renderCategories();
}

function renderProducts() {
  const query = state.search.toLocaleLowerCase('pt-BR');
  const filtered = state.products.filter(product => {
    const matchesSearch = !query ||
      product.name.toLocaleLowerCase('pt-BR').includes(query) ||
      product.description.toLocaleLowerCase('pt-BR').includes(query);
    return matchesSearch && (state.category === 'all' || product.category === state.category);
  });

  elements.productList.innerHTML = filtered.map(product => {
    const images = [...product.product_images].sort((a, b) => a.position - b.position);
    const imageUrl = images[0]?.url ?? 'https://placehold.co/100x100/111111/13d203?text=Sem+foto';
    return `
      <tr>
        <td><img class="admin-product-image" src="${escapeHTML(imageUrl)}" alt="" loading="lazy" /></td>
        <td class="admin-product-name">${escapeHTML(product.name)}</td>
        <td><span class="admin-category-badge">${escapeHTML(categoryLabel(product.category))}</span></td>
        <td>${formatPrice(product.price_pix_cents)}</td>
        <td>${formatPrice(product.price_card_cents)}</td>
        <td><span class="admin-status-badge ${product.is_active ? 'is-active' : 'is-inactive'}">${product.is_active ? 'Ativo' : 'Inativo'}</span></td>
        <td>
          <div class="admin-product-actions">
            <button class="admin-icon-button" type="button" data-action="edit" data-id="${product.id}" aria-label="Editar ${escapeHTML(product.name)}" title="Editar">✎</button>
            <button class="admin-button admin-button--danger" type="button" data-action="delete" data-id="${product.id}" aria-label="Remover ${escapeHTML(product.name)}" title="Remover">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');
  elements.productsEmpty.hidden = filtered.length !== 0;
  elements.productList.closest('.admin-table-card').classList.toggle('is-empty', filtered.length === 0);

  elements.productList.querySelectorAll('.admin-product-image').forEach(image => {
    image.addEventListener('error', () => {
      image.src = 'https://placehold.co/100x100/111111/13d203?text=Sem+foto';
    }, { once: true });
  });
}

function resetForm() {
  elements.productForm.reset();
  elements.productForm.elements.id.value = '';
  elements.productForm.elements.active.checked = true;
  elements.formTitle.textContent = 'Novo produto';
  elements.saveProductButton.textContent = 'Salvar produto';
  updateCardPrice();
}

function editProduct(product) {
  const form = elements.productForm.elements;
  form.id.value = product.id;
  form.name.value = product.name;
  form.category.value = product.category;
  form.description.value = product.description;
  form.pricePix.value = formatPriceInput(product.price_pix_cents);
  updateCardPrice();
  form.images.value = [...product.product_images]
    .sort((a, b) => a.position - b.position)
    .map(image => image.url)
    .join('\n');
  form.illustrative.checked = product.illustrative;
  form.active.checked = product.is_active;
  elements.formTitle.textContent = 'Editar produto';
  elements.saveProductButton.textContent = 'Salvar alterações';
  setView('editor');
}

function updateCardPrice() {
  try {
    const pixCents = parsePrice(elements.pricePixInput.value, 'Preço PIX');
    elements.priceCardInput.value = pixCents == null
      ? ''
      : formatPriceInput(Math.round(pixCents * 1.055));
  } catch {
    elements.priceCardInput.value = '';
  }
}

elements.messageClose.addEventListener('click', clearMessage);

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
    await loadCategories();
    await loadProducts();
    elements.loginSection.hidden = true;
    elements.app.hidden = false;
    elements.catalogSection.hidden = false;
    elements.loginForm.reset();
    setView('products');
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
  state.categories = [];
  elements.app.hidden = true;
  elements.catalogSection.hidden = true;
  elements.loginSection.hidden = false;
  elements.productList.replaceChildren();
  elements.categoryList.replaceChildren();
  resetForm();
  resetCategoryForm();
  clearMessage();
});

elements.newProductButton.addEventListener('click', () => {
  resetForm();
  setView('editor');
});

elements.cancelEditButton.addEventListener('click', () => {
  resetForm();
  setView('products');
});

elements.pricePixInput.addEventListener('input', updateCardPrice);

elements.searchForm.addEventListener('submit', event => {
  event.preventDefault();
  state.search = elements.searchInput.value.trim();
  renderProducts();
});

elements.searchInput.addEventListener('input', () => {
  state.search = elements.searchInput.value.trim();
  renderProducts();
});

elements.categoryFilter.addEventListener('change', () => {
  state.category = elements.categoryFilter.value;
  renderProducts();
});

elements.newCategoryButton.addEventListener('click', () => {
  resetCategoryForm();
  elements.categoryForm.hidden = false;
  elements.categoryNameInput.focus();
});

elements.cancelCategoryButton.addEventListener('click', resetCategoryForm);

elements.categoryNameInput.addEventListener('input', () => {
  if (!state.editingCategorySlug) {
    elements.categorySlugInput.value = slugify(elements.categoryNameInput.value);
  }
});

elements.categoryForm.addEventListener('submit', async event => {
  event.preventDefault();
  clearMessage();
  elements.saveCategoryButton.disabled = true;

  try {
    const isEditing = Boolean(state.editingCategorySlug);
    const name = elements.categoryNameInput.value.trim();
    const slug = state.editingCategorySlug || slugify(name);
    if (!name || !slug) throw new Error('Informe um nome válido para a categoria.');

    if (state.editingCategorySlug) {
      await request(`categories?slug=eq.${encodeURIComponent(state.editingCategorySlug)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ name }),
      });
    } else {
      await request('categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({ slug, name }),
      });
    }

    resetCategoryForm();
    await loadCategories();
    showMessage(`Categoria "${name}" ${isEditing ? 'atualizada' : 'criada'}.`, 'success');
  } catch (error) {
    showMessage(error.message, 'error');
  } finally {
    elements.saveCategoryButton.disabled = false;
  }
});

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
    setView('products');
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
    requestDelete('product', product);
  }
});

elements.categoryList.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const category = state.categories.find(item => item.slug === button.dataset.slug);
  if (!category) return;

  if (button.dataset.action === 'edit-category') {
    editCategory(category);
  } else if (button.dataset.action === 'delete-category') {
    requestDelete('category', category);
  }
});

elements.confirmDeleteButton.addEventListener('click', async () => {
  const pending = state.pendingDelete;
  if (!pending) return;
  elements.confirmDeleteButton.disabled = true;
  clearMessage();

  try {
    if (pending.type === 'category') {
      await request(`categories?slug=eq.${encodeURIComponent(pending.item.slug)}`, {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' },
      });
      await loadCategories();
      await loadProducts();
      showMessage(`Categoria "${pending.item.name}" removida.`, 'success');
    } else {
      await request(`products?id=eq.${pending.item.id}`, {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' },
      });
      await loadProducts();
      showMessage(`Produto "${pending.item.name}" removido.`, 'success');
    }
    elements.deleteDialog.close();
    state.pendingDelete = null;
  } catch (error) {
    const message = pending.type === 'category' && error.message.includes('products_category_fkey')
      ? 'Não é possível remover uma categoria que ainda tem produtos. Mova ou remova esses produtos primeiro.'
      : error.message;
    showMessage(message, 'error');
    elements.confirmDeleteButton.disabled = false;
  }
});

elements.cancelDeleteButton.addEventListener('click', () => {
  elements.deleteDialog.close();
  state.pendingDelete = null;
});

elements.deleteDialog.addEventListener('cancel', () => {
  state.pendingDelete = null;
});

document.querySelectorAll('.admin-nav-item[data-view]').forEach(item => {
  item.addEventListener('click', () => {
    if (item.dataset.view === 'products') {
      resetForm();
      setView('products');
    } else {
      resetCategoryForm();
      setView('categories');
    }
  });
});

if (!config.url || !config.publishableKey) {
  showMessage('Configure a URL e a Publishable key em js/supabase-config.js.', 'error');
  elements.loginForm.querySelector('button[type="submit"]').disabled = true;
}
