'use strict';

window.PRODUCTS_API = {
  async load() {
    const { url, publishableKey } = window.SUPABASE_CONFIG;

    if (!url && !publishableKey) return false;
    if (!url || !publishableKey) {
      throw new Error('Configure a URL e a chave publicável do Supabase.');
    }

    const baseUrl = url.replace(/\/+$/, '');
    const query = new URLSearchParams({
      select: 'id,category,name,description,price_pix_cents,price_card_cents,illustrative,product_images(url,position)',
      is_active: 'eq.true',
      order: 'id.asc',
    });
    const response = await fetch(`${baseUrl}/rest/v1/products?${query}`, {
      headers: { apikey: publishableKey },
    });

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Supabase respondeu ${response.status}: ${details}`);
    }

    const rows = await response.json();
    if (!Array.isArray(rows)) {
      throw new Error('A resposta do Supabase não contém uma lista de produtos.');
    }

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
