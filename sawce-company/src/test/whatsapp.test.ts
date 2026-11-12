import { describe, expect, it } from "vitest";

import { productWhatsappLink, whatsappLink } from "@/lib/whatsapp";

describe("WhatsApp links", () => {
  it("sends every contact to the store's WhatsApp number", () => {
    expect(whatsappLink()).toMatch(/^https:\/\/wa\.me\/5551997421676\?text=/);
  });

  it("includes the product name in the pre-filled message", () => {
    const url = new URL(productWhatsappLink("Nike Air Jordan 1"));
    expect(url.searchParams.get("text")).toContain("Nike Air Jordan 1");
  });
});
