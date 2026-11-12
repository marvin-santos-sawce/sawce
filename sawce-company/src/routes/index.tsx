import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import brandCover from "@/assets/sawce-cover.png";
import brandDragon from "@/assets/sawce-dragon.png";
import { Button } from "@/components/ui/button";
import { CATEGORIES, PRODUCTS, formatBRL, type Product } from "@/data/products";
import { productWhatsappLink, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sawce Company — Importados com estilo, direto pelo WhatsApp" },
      {
        name: "description",
        content:
          "Tênis, camisas de time e acessórios importados com qualidade e preço justo. Escolha o produto e fale com a Sawce pelo WhatsApp.",
      },
      { property: "og:title", content: "Sawce Company — Importados com estilo" },
      {
        property: "og:description",
        content: "Escolha seu importado e finalize o pedido direto pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MARQUEE = [
  "Importados direto da China",
  "Frete grátis",
  "Novidades todo mês",
  "Qualidade garantida",
  "Atendimento via WhatsApp",
  "Seu estilo, nossa missão",
];

const STEPS = [
  { title: "Escolha", text: "Navegue pelo catálogo ou envie a foto, o link ou a referência do que procura." },
  { title: "Chame no WhatsApp", text: "Um clique abre a conversa com o produto já na mensagem." },
  { title: "Confirmação", text: "Alinhamos tamanho, cor, prazo e forma de pagamento — PIX ou cartão em até 5x." },
  { title: "Entrega", text: "Seu pedido é importado e você acompanha tudo até chegar na sua porta." },
];

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <Marquee />
      <Catalog />
      <HowItWorks />
      <FinalCta />
    </main>
  );
}

function Hero() {
  return (
    <section id="inicio" className="overflow-hidden bg-background pt-16">
      <img
        src={brandCover}
        alt="Sawce Company — dragão oficial e letras metálicas em verde e prata"
        width={1468}
        height={596}
        fetchPriority="high"
        className="mx-auto block aspect-[1468/596] w-full max-w-[1468px] object-contain"
      />
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-6 md:px-10 md:pb-12 md:pt-8">
        <p className="eyebrow animate-rise">Importando com qualidade desde 2024</p>
        <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="min-w-0">
            <h1 className="animate-rise text-5xl [animation-delay:120ms] md:text-7xl">A sua importadora.</h1>
            <p className="animate-rise mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground [animation-delay:240ms] md:text-base">
              Seu estilo. Tudo o que você precisa, com a melhor qualidade e o menor preço.
            </p>
          </div>
          <div className="animate-rise flex flex-wrap gap-3 [animation-delay:360ms] md:shrink-0">
            <Button asChild variant="brand" size="brand">
              <a href="#produtos">Ver catálogo <ArrowUpRight className="size-4" /></a>
            </Button>
            <Button asChild variant="brandOutline" size="brand">
              <a href={whatsappLink("Olá! Quero fazer uma encomenda pela Sawce.")} target="_blank" rel="noreferrer">
                <MessageCircle className="size-4" /> Sob encomenda
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [...MARQUEE, ...MARQUEE];
  return (
    <div className="overflow-hidden bg-primary py-3.5">
      <div className="animate-marquee flex w-max gap-12 whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="font-display flex items-center gap-12 text-xl text-primary-foreground">
            {item}
            <span>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Catalog() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("Todos");
  const list = active === "Todos" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);

  return (
    <section id="produtos" className="mx-auto max-w-7xl scroll-mt-16 px-5 py-24 md:px-10 md:py-32">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Catálogo</p>
          <h2 className="mt-4 text-6xl md:text-8xl">Mais procurados</h2>
          <p className="mt-4 max-w-md text-muted-foreground">
            Gostou de alguma peça? Clique e fale com a gente — o produto já vai na mensagem.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <Button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              variant={active === c ? "brand" : "outline"}
              className="min-h-10 px-4 text-xs font-semibold uppercase"
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <ProductCard key={p.name} product={p} />
        ))}
        <CustomOrderCard />
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const link = productWhatsappLink(product.name);
  return (
    <article className="group flex flex-col">
      <a href={link} target="_blank" rel="noreferrer" className="relative block overflow-hidden rounded-sm bg-card">
        <img
          src={product.image}
          alt={product.name}
          width={800}
          height={1008}
          loading="lazy"
          className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-sm bg-deep/80 px-3 py-1 text-[0.65rem] font-semibold uppercase text-muted-foreground backdrop-blur">
          {product.category}
        </span>
      </a>
      <h3 className="mt-5 text-3xl">{product.name}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{product.description}</p>
      <div className="mt-4 flex-1">
        {product.pix ? (
          <div>
            <p className="text-lg font-bold">
              {formatBRL(product.pix)} <span className="text-xs font-semibold text-accent">no PIX</span>
            </p>
            {product.card && (
              <p className="text-xs text-muted-foreground">
                ou {formatBRL(product.card)} em até 5x de {formatBRL(product.card / 5)}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm font-semibold uppercase text-muted-foreground">Preço sob consulta</p>
        )}
      </div>
      <Button asChild variant="brand" size="brand" className="mt-5 w-full">
        <a href={link} target="_blank" rel="noreferrer">
          <MessageCircle className="size-4" /> Quero este
        </a>
      </Button>
    </article>
  );
}

function CustomOrderCard() {
  return (
    <a
      href={whatsappLink("Olá! Não encontrei o que procuro no site. Quero fazer uma encomenda.")}
      target="_blank"
      rel="noreferrer"
      className="group flex min-h-80 flex-col justify-between rounded-sm border border-dashed border-border p-7 transition-colors hover:border-accent"
    >
      <p className="eyebrow">Sob encomenda</p>
      <div>
        <h3 className="text-5xl">Não achou o que procura?</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          Envie a foto ou o link da peça. A gente encontra e importa para você.
        </p>
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          Enviar referência <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </a>
  );
}

function HowItWorks() {
  return (
    <section id="como-funciona" className="scroll-mt-16 border-y border-border bg-deep">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
        <p className="eyebrow">Como funciona</p>
        <h2 className="mt-4 max-w-3xl text-6xl md:text-8xl">
          Você escolhe. <span className="text-muted-foreground">Nós importamos.</span>
        </h2>
        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="bg-deep p-8">
              <span className="font-display text-5xl text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-3xl">{s.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="border-t border-border bg-deep">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-20 md:flex-row md:items-center md:px-10 md:py-24">
        <img src={brandDragon} alt="Dragão Sawce" width={668} height={869} loading="lazy" className="h-32 w-28 shrink-0 object-contain md:h-56 md:w-44" />
        <div className="min-w-0 flex-1">
          <p className="eyebrow">Atendimento via WhatsApp</p>
          <h2 className="mt-4 max-w-3xl text-5xl md:text-7xl">Sua próxima peça começa aqui.</h2>
        </div>
        <Button asChild variant="brand" size="brand" className="shrink-0">
          <a href={whatsappLink()} target="_blank" rel="noreferrer">
            <MessageCircle className="size-4" /> Chamar no WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}

