import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowUpRight, Check, Copy, MessageCircle, Package, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CORREIOS_TRACKING_URL, isTrackingCode, normalizeTrackingCode } from "@/lib/tracking";
import { whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/rastreamento")({
  head: () => ({
    meta: [
      { title: "Rastrear pedido — Sawce Company" },
      { name: "description", content: "Acompanhe seu pedido Sawce Company com o código enviado pelo WhatsApp e consulte a entrega no site oficial dos Correios." },
      { property: "og:title", content: "Rastrear pedido — Sawce Company" },
      { property: "og:description", content: "Seu pedido, mais perto. Consulte seu código no rastreamento oficial dos Correios." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackingPage,
});

function TrackingPage() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [submittedCode, setSubmittedCode] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [popupBlocked, setPopupBlocked] = useState(false);

  async function copyCode(code: string) {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const code = normalizeTrackingCode(input);
    if (!isTrackingCode(code)) {
      setError("Confira o código: são 2 letras, 9 números e mais 2 letras, como AA123456789BR.");
      setSubmittedCode("");
      return;
    }
    setInput(code);
    setError("");
    setSubmittedCode(code);
    setCopyState("idle");
    // Start both in the original user action: no API call or fabricated status.
    void copyCode(code);
    const tab = window.open(CORREIOS_TRACKING_URL, "_blank");
    if (tab) tab.opener = null;
    setPopupBlocked(!tab);
  }

  const supportCode = normalizeTrackingCode(input);
  const supportMessage = isTrackingCode(supportCode)
    ? `Olá! Preciso de ajuda para acompanhar meu pedido Sawce. Código de rastreamento: ${supportCode}`
    : "Olá! Preciso de ajuda com o código de rastreamento do meu pedido Sawce.";

  return (
    <main className="mx-auto min-h-[75svh] max-w-7xl px-5 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
      <Button asChild variant="link" className="mb-10 h-auto px-0 text-muted-foreground hover:text-foreground">
        <Link to="/"><ArrowLeft /> Voltar à loja</Link>
      </Button>
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="min-w-0">
          <p className="eyebrow"><Package className="size-4" /> Acompanhamento</p>
          <h1 className="mt-5 text-6xl md:text-8xl">Rastreie seu<br />pedido.</h1>
          <p className="mt-6 max-w-md leading-relaxed text-muted-foreground">Seu próximo favorito está a caminho. Use o código que a Sawce enviou pelo WhatsApp.</p>
          <div className="mt-10 flex items-start gap-3 border-t border-border pt-6 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
            <p>A consulta da entrega acontece no site oficial dos Correios. Nenhum pagamento é solicitado nesta página.</p>
          </div>
        </div>
        <div className="min-w-0 lg:pt-6">
          <form onSubmit={submit} noValidate className="rounded-sm border border-border bg-deep p-6 sm:p-8">
            <label htmlFor="tracking-code" className="text-sm font-semibold">Código de rastreamento</label>
            <Input
              id="tracking-code"
              name="tracking-code"
              value={input}
              onChange={(event) => { setInput(event.target.value); setError(""); setSubmittedCode(""); setCopyState("idle"); }}
              placeholder="AA123456789BR"
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              maxLength={40}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "tracking-error" : "tracking-hint"}
              className="mt-3 h-14 bg-background font-mono text-lg uppercase placeholder:text-muted-foreground/50 md:text-lg"
            />
            <p id="tracking-hint" className="mt-3 text-xs leading-relaxed text-muted-foreground">2 letras + 9 números + 2 letras. O código é enviado pelo WhatsApp após o envio.</p>
            {error && <p id="tracking-error" role="alert" className="mt-4 border-l-2 border-foreground pl-3 text-sm text-foreground">{error}</p>}
            <Button type="submit" variant="brand" size="brand" className="mt-6 w-full">Copiar código e abrir Correios <ArrowUpRight /></Button>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Cole o código na página dos Correios e conclua a verificação de segurança, se solicitada.</p>
          </form>

          {submittedCode && (
            <div className="mt-6 border-l-2 border-primary pl-5" role="status" aria-live="polite">
              <p className="flex items-center gap-2 text-sm font-semibold">
                {copyState === "copied" && <Check className="size-4 text-primary" />}
                {copyState === "copied" ? "Código copiado" : copyState === "failed" ? "Copie o código para consultar nos Correios" : "Seu código de rastreamento"}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <code className="select-all break-all text-lg">{submittedCode}</code>
                <Button type="button" variant="outline" size="icon" title="Copiar código" aria-label="Copiar código" onClick={() => void copyCode(submittedCode)}><Copy /></Button>
              </div>
              {popupBlocked && <p className="mt-3 text-sm text-muted-foreground">A nova aba foi bloqueada. Abra os Correios pelo link abaixo.</p>}
              <Button asChild variant="link" className="mt-3 h-auto px-0 text-foreground"><a href={CORREIOS_TRACKING_URL} target="_blank" rel="noopener noreferrer">Abrir site dos Correios <ArrowUpRight /></a></Button>
            </div>
          )}

          <div className="mt-8 border-t border-border pt-6">
            <h2 className="text-3xl">Não recebeu o código?</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Se sua entrega é por outra transportadora ou precisa de ajuda com o pedido, fale com a Sawce.</p>
            <Button asChild variant="brandOutline" size="brand" className="mt-5"><a href={whatsappLink(supportMessage)} target="_blank" rel="noreferrer"><MessageCircle /> Pedir ajuda no WhatsApp</a></Button>
            <Button asChild variant="link" className="mt-4 flex h-auto px-0 text-muted-foreground"><Link to="/faq">Consultar dúvidas frequentes <ArrowUpRight /></Link></Button>
          </div>
        </div>
      </div>
    </main>
  );
}