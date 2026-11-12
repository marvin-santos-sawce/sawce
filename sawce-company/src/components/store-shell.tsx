import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Instagram, Menu, MessageCircle, X } from "lucide-react";
import brandMark from "@/assets/sawce-mark.png";
import { Button } from "@/components/ui/button";
import { INSTAGRAM_URL, whatsappLink } from "@/lib/whatsapp";

const NAV_ITEMS = [
  { to: "/", label: "Início" },
  { to: "/", hash: "produtos", label: "Produtos" },
  { to: "/", hash: "como-funciona", label: "Como funciona" },
  { to: "/rastreamento", label: "Rastrear pedido" },
  { to: "/faq", label: "Dúvidas frequentes" },
] as const;

export function StoreLogo() {
  return (
    <Link to="/" aria-label="Sawce Company — início" className="flex shrink-0 items-center gap-3 text-foreground">
      <img src={brandMark} alt="" width={628} height={817} className="h-10 w-8 object-contain" />
      <span className="flex flex-col">
        <span className="font-sans text-xl font-bold leading-none">SAWCE</span>
        <span className="mt-1 text-[0.6rem] font-medium uppercase text-muted-foreground">Company</span>
      </span>
    </Link>
  );
}

export function StoreHeader() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.href]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-deep/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-5 md:px-10">
        <StoreLogo />
        <nav aria-label="Menu principal" className="hidden items-center gap-5 xl:flex">
          {NAV_ITEMS.map((item) => (
            <Button key={item.label} asChild variant="link" className="px-0 text-xs text-muted-foreground hover:text-foreground">
              <Link to={item.to} hash={"hash" in item ? item.hash : ""} activeOptions={{ exact: true, includeHash: true }} activeProps={{ className: "text-foreground" }}>
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <Button asChild variant="brandOutline" size="lg" className="px-3 sm:px-5">
            <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Fale conosco pelo WhatsApp" title="Fale conosco pelo WhatsApp">
              <MessageCircle /> <span className="hidden sm:inline">Fale conosco</span>
            </a>
          </Button>
          <Button variant="ghost" size="icon" className="xl:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="menu-mobile" aria-label={open ? "Fechar menu" : "Abrir menu"} title={open ? "Fechar menu" : "Abrir menu"}>
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>
      {open && (
        <nav id="menu-mobile" aria-label="Menu do celular" className="border-t border-border bg-background px-5 py-4 xl:hidden">
          {NAV_ITEMS.map((item) => (
            <Button key={item.label} asChild variant="ghost" className="flex h-12 w-full justify-start text-foreground">
              <Link to={item.to} hash={"hash" in item ? item.hash : ""} onClick={() => setOpen(false)}>{item.label}</Link>
            </Button>
          ))}
        </nav>
      )}
    </header>
  );
}

export function StoreFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 text-sm text-muted-foreground md:grid-cols-[1fr_1fr_auto] md:px-10">
        <div className="flex flex-col items-start gap-5">
          <StoreLogo />
          <p>© {new Date().getFullYear()} Sawce Company</p>
        </div>
        <nav aria-label="Links úteis" className="flex flex-col items-start gap-3">
          <Button asChild variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground"><Link to="/rastreamento">Rastrear pedido</Link></Button>
          <Button asChild variant="link" className="h-auto p-0 text-muted-foreground hover:text-foreground"><Link to="/faq">Dúvidas frequentes</Link></Button>
        </nav>
        <div className="flex flex-col items-start gap-3">
          <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground"><Instagram className="size-4" /> @sawce.imports</a>
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-foreground"><MessageCircle className="size-4" /> (51) 99742-1676</a>
        </div>
      </div>
    </footer>
  );
}

export function FloatingWhatsapp() {
  return (
    <Button asChild variant="brand" size="icon" className="fixed bottom-5 right-5 z-30 hidden size-14 rounded-full shadow-lg sm:inline-flex [&_svg]:size-6">
      <a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="Falar no WhatsApp" title="Falar no WhatsApp"><MessageCircle /></a>
    </Button>
  );
}
