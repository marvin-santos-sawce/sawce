'use strict';

window.PRODUCT_CATEGORIES = [
  { slug: 'tenis', name: 'Tênis' },
  { slug: 'camisas', name: 'Camisa de time' },
  { slug: 'esporte', name: 'Esporte' },
  { slug: 'outros', name: 'Outros' },
];

window.PRODUCTS_API = {
  async load() {
    const { url, publishableKey } = window.SUPABASE_CONFIG;

    if (!url && !publishableKey) return false;
    if (!url || !publishableKey) {
      throw new Error('Configure a URL e a chave publicável do Supabase.');
    }

    const baseUrl = url.replace(/\/+$/, '');
    const productsQuery = new URLSearchParams({
      select: 'id,category,name,description,price_pix_cents,price_card_cents,illustrative,product_images(url,position)',
      is_active: 'eq.true',
      order: 'id.asc',
    });
    const headers = { apikey: publishableKey };
    const [productsResponse, categoriesResponse] = await Promise.all([
      fetch(`${baseUrl}/rest/v1/products?${productsQuery}`, { headers }),
      fetch(`${baseUrl}/rest/v1/categories?select=slug,name&order=name.asc`, { headers }),
    ]);

    if (!productsResponse.ok) {
      const details = await productsResponse.text();
      throw new Error(`Supabase respondeu ${productsResponse.status}: ${details}`);
    }
    if (!categoriesResponse.ok) {
      const details = await categoriesResponse.text();
      throw new Error(`Não foi possível carregar categorias (${categoriesResponse.status}): ${details}`);
    }

    const rows = await productsResponse.json();
    const categories = await categoriesResponse.json();
    if (!Array.isArray(rows) || !Array.isArray(categories)) {
      throw new Error('A resposta do Supabase não contém uma lista de produtos.');
    }
    if (categories.some(category => typeof category.slug !== 'string' || typeof category.name !== 'string')) {
      throw new Error('O banco retornou uma categoria inválida.');
    }

    window.PRODUCT_CATEGORIES = categories;
    PRODUCTS = rows.map(product => {
      const images = (product.product_images ?? [])
        .sort((a, b) => a.position - b.position)
        .map(image => {
          const url = new URL(image.url);
          if (url.protocol !== 'https:') {
            throw new Error(`O produto ${product.id} possui uma imagem que não usa HTTPS.`);
          }
          return url.href;
        });

      return {
        id: product.id,
        cat: product.category,
        name: product.name,
        desc: product.description,
        pricePix: formatPrice(product.price_pix_cents),
        priceCard: formatPrice(product.price_card_cents),
        price: product.price_pix_cents == null && product.price_card_cents == null
          ? 'Consultar disponibilidade'
          : undefined,
        imgs: images.length ? images : ['https://placehold.co/600x400/111111/13d203?text=Imagem+Indisponível'],
        illustrative: product.illustrative,
      };
    });

    return true;
  },
};

function formatPrice(cents) {
  if (cents == null) return undefined;
  if (!Number.isInteger(cents) || cents < 0) {
    throw new Error('O banco retornou um preço inválido.');
  }

  return (cents / 100).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
