import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, MessageCircle } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { FAQ_ITEMS } from "@/data/faq";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Dúvidas frequentes — Sawce Company" },
      { name: "description", content: "Tire suas dúvidas sobre produtos, tamanhos, entrega, rastreamento e formas de pagamento da Sawce Company." },
      { property: "og:title", content: "Dúvidas frequentes — Sawce Company" },
      { property: "og:description", content: "Respostas sobre pedidos, produtos e entregas. Fale com a Sawce pelo WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
      <Button asChild variant="link" className="mb-10 h-auto px-0 text-muted-foreground hover:text-foreground"><Link to="/"><ArrowLeft /> Voltar à loja</Link></Button>
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="min-w-0">
          <p className="eyebrow">Perguntas frequentes</p>
          <h1 className="mt-5 text-6xl md:text-8xl">Tire suas<br />dúvidas.</h1>
          <p className="mt-6 max-w-sm leading-relaxed text-muted-foreground">Tudo sobre sua compra na Sawce Company, do primeiro contato até a entrega.</p>
          <div className="mt-8 border-t border-border pt-6">
            <p className="text-sm text-muted-foreground">Já fez seu pedido?</p>
            <Button asChild variant="link" className="mt-2 h-auto px-0 text-foreground"><Link to="/rastreamento">Rastrear meu pedido <ArrowUpRight /></Link></Button>
          </div>
        </div>
        <div className="min-w-0">
          <Accordion type="single" collapsible className="border-t border-border">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="font-sans gap-4 py-6 text-base font-semibold leading-relaxed hover:no-underline hover:text-muted-foreground">
                  <span className="flex items-baseline gap-4"><span aria-hidden="true" className="shrink-0 font-mono text-xs text-muted-foreground">{String(index + 1).padStart(2, "0")}</span>{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="space-y-4 pb-6 text-sm leading-relaxed text-muted-foreground sm:pl-8">
                  {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {item.id === "garantia" && <Button asChild variant="link" className="h-auto px-0 text-foreground"><Link to="/rastreamento">Acompanhar meu pedido <ArrowUpRight /></Link></Button>}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <section className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-border pt-10 sm:flex-row sm:items-center">
        <div><h2 className="text-4xl">Ainda tem dúvidas?</h2><p className="mt-3 text-sm text-muted-foreground">Fale direto com nossa equipe.</p></div>
        <Button asChild variant="brand" size="brand"><a href={whatsappLink("Olá! Tenho uma dúvida sobre a Sawce Company.")} target="_blank" rel="noreferrer"><MessageCircle /> Fale conosco no WhatsApp</a></Button>
      </section>
    </main>
  );
}