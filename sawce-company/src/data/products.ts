import camisa from "@/assets/p-camisa.jpg";
import hightop from "@/assets/p-hightop.jpg";
import dadshoe from "@/assets/p-dadshoe.jpg";
import runner from "@/assets/p-tenis.jpg";
import chuteira from "@/assets/p-chuteira.jpg";
import polo from "@/assets/p-polo.jpg";
import bone from "@/assets/p-bone.jpg";

export type Category = "Calçados" | "Camisas de time" | "Outros";

export type Product = {
  name: string;
  category: Category;
  description: string;
  image: string;
  /** Price paid via PIX, in BRL. Undefined means "sob consulta". */
  pix?: number;
  /** Card price, in BRL (5x interest-free). */
  card?: number;
};

export const CATEGORIES: Array<"Todos" | Category> = [
  "Todos",
  "Calçados",
  "Camisas de time",
  "Outros",
];

export const PRODUCTS: Product[] = [
  {
    name: "Camisa Seleção Brasileira — Pré-venda",
    category: "Camisas de time",
    description: "Edição de torcedor, com opção de personalizar nome e número.",
    image: camisa,
  },
  {
    name: "Nike Air Jordan 1",
    category: "Calçados",
    description: "Disponível em diversas cores. O clássico que nunca sai de moda.",
    image: hightop,
    pix: 699.99,
    card: 761.59,
  },
  {
    name: "New Balance 990v6",
    category: "Calçados",
    description: "O pai de todos os dad shoes. Conforto incomparável.",
    image: dadshoe,
    pix: 599.99,
    card: 652.79,
  },
  {
    name: "Nike Air Max 90",
    category: "Calçados",
    description: "Amortecimento Air visível, silhueta clássica dos anos 90.",
    image: runner,
    pix: 599.99,
    card: 652.79,
  },
  {
    name: "Chuteira Society Mercurial Superfly 10",
    category: "Calçados",
    description: "Unidade Air Zoom no calcanhar para mais velocidade em campo.",
    image: chuteira,
    pix: 299.99,
    card: 326.39,
  },
  {
    name: "Camisa Polo Premium",
    category: "Outros",
    description: "Algodão piquet, caimento leve e acabamento de alto padrão.",
    image: polo,
  },
  {
    name: "Boné Premium",
    category: "Outros",
    description: "Lã macia, aba curva e ajuste traseiro discreto.",
    image: bone,
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
