import { readFile } from 'node:fs/promises';
import { runInNewContext } from 'node:vm';

const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/+$/, '');
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl || !secretKey) {
  throw new Error('Defina SUPABASE_URL e SUPABASE_SECRET_KEY no ambiente.');
}

const productsSource = await readFile(new URL('../js/products.js', import.meta.url), 'utf8');
const sandbox = {};
runInNewContext(`${productsSource}\nglobalThis.seedProducts = PRODUCTS;`, sandbox);

const products = sandbox.seedProducts.map(product => ({
  id: product.id,
  category: product.cat,
  name: product.name,
  description: product.desc,
  price_pix_cents: parsePrice(product.pricePix),
  price_card_cents: parsePrice(product.priceCard),
  illustrative: Boolean(product.illustrative),
  is_active: true,
}));

const images = sandbox.seedProducts.flatMap(product =>
  (product.imgs ?? []).map((url, position) => ({
    product_id: product.id,
    position,
    url,
  }))
);

await upsert('products', products, 'id');

const productIds = products.map(product => product.id).join(',');
await request(
  `product_images?product_id=in.(${productIds})`,
  { method: 'DELETE', headers: { Prefer: 'return=minimal' } }
);

if (images.length) {
  await upsert('product_images', images, 'product_id,position');
}

console.log(`Catálogo importado: ${products.length} produtos e ${images.length} imagens.`);

function parsePrice(value) {
  if (typeof value !== 'string') return null;
  const normalized = value.trim().replace(/\./g, '').replace(',', '.');
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number(normalized) * 100);
}

async function upsert(table, rows, conflictColumns) {
  if (!rows.length) return;
  const query = new URLSearchParams({ on_conflict: conflictColumns });
  await request(`${table}?${query}`, {
    method: 'POST',
    headers: {
      Prefer: 'resolution=merge-duplicates,return=minimal',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rows),
  });
}

async function request(path, options) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: secretKey,
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Falha ao importar catálogo (${response.status}): ${await response.text()}`);
  }
}
