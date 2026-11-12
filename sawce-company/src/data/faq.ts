// Commercial terms and answers from https://sawcecompany.shop/faq.html.
export const STORE_TERMS = {
  deliveryBusinessDays: { min: 20, max: 25 },
  shippingCost: 0,
  creditInstallments: 5,
  installmentInterest: 0,
  paymentMethods: ["Crédito", "Débito", "PIX", "Boleto"],
  undeliveredOrderOptions: ["Reenvio", "Devolução do dinheiro"],
} as const;

export const FAQ_ITEMS = [
  {
    id: "precos",
    question: "Como nossos produtos são tão baratos?",
    paragraphs: [
      "Nossos preços são competitivos porque importamos diretamente da fábrica, eliminando intermediários. Além disso, negociamos grandes volumes com nossos fornecedores, o que nos permite oferecer os melhores preços sem comprometer a qualidade.",
      "Você paga menos, nós lucramos justo. Isso é a Sawce!",
    ],
  },
  {
    id: "originais",
    question: "Os produtos são originais?",
    paragraphs: [
      "Nossos produtos são classificados como Mirror 1:1, e não como produtos originais de distribuição oficial da marca.",
      "Trabalhamos com materiais premium, acabamento e padrão de qualidade, sem passar pela distribuição oficial da marca. Essa classificação permite oferecer um produto por um valor mais acessível. Consulte nossa equipe sobre a classificação de cada peça antes de comprar.",
    ],
  },
  {
    id: "garantia",
    question: "Qual a garantia de que vou receber o produto?",
    paragraphs: [
      "Todos os nossos produtos são acompanhados por rastreamento. O código de rastreamento é enviado pelo WhatsApp para você acompanhar sua encomenda.",
      `Se por algum motivo o produto não chegar, oferecemos ${STORE_TERMS.undeliveredOrderOptions[0].toLowerCase()} ou ${STORE_TERMS.undeliveredOrderOptions[1].toLowerCase()}. Sua confiança é nossa prioridade!`,
    ],
  },
  {
    id: "stockx",
    question: "O que é StockX?",
    paragraphs: [
      "A StockX é um mercado online global de revenda, frequentemente descrito como a bolsa de valores para tênis (sneakers), streetwear, eletrônicos e itens colecionáveis.",
      "Fundada em 2015, a plataforma funciona através de lances e pedidos em tempo real. A própria empresa verifica os itens antes de enviá-los ao comprador.",
    ],
  },
  {
    id: "prazo",
    question: "Qual o prazo médio?",
    paragraphs: [
      `O prazo médio de entrega é de ${STORE_TERMS.deliveryBusinessDays.min} a ${STORE_TERMS.deliveryBusinessDays.max} dias úteis após a confirmação do pagamento, dependendo da sua localização no Brasil. Produtos nacionais chegam mais rápido.`,
      "Enviamos com rastreamento pelos Correios ou transportadora parceira.",
    ],
  },
  {
    id: "tamanhos",
    question: "Como saber o tamanho certo para a compra?",
    paragraphs: [
      "Para tênis, recomendamos conferir a tabela de conversão de numeração (US, BR, EU). Produtos importados podem ter tamanhos diferentes dos padrões brasileiros.",
      "Se você tem dúvida entre dois números, envie uma mensagem no WhatsApp com sua altura e peso. Nossa equipe te recomenda o tamanho ideal!",
      "Para camisas, anime e outros produtos, a descrição especifica o tamanho (P, M, G, GG) ou o padrão asiático.",
    ],
  },
  {
    id: "taxas",
    question: "Como funcionam as taxas?",
    paragraphs: [
      "O valor que você vê no site já inclui o frete grátis. Sem taxas escondidas!",
      `Aceitamos ${STORE_TERMS.paymentMethods.join(", ")}. No crédito, você pode parcelar em até ${STORE_TERMS.creditInstallments} vezes sem juros.`,
      "Se o produto sofrer alteração de preço, você será comunicado antes de confirmar a compra. Transparência total com você!",
    ],
  },
];