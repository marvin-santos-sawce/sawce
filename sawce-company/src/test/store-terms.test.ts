import { describe, expect, it } from "vitest";
import { STORE_TERMS } from "@/data/faq";

describe("Commercial terms from the store's existing FAQ", () => {
  it("keeps delivery at 20–25 business days after payment", () => {
    expect(STORE_TERMS.deliveryBusinessDays).toEqual({ min: 20, max: 25 });
  });
  it("keeps shipping free", () => {
    expect(STORE_TERMS.shippingCost).toBe(0);
  });
  it("allows up to five interest-free credit installments", () => {
    expect(STORE_TERMS.creditInstallments).toBe(5);
    expect(STORE_TERMS.installmentInterest).toBe(0);
  });
  it("keeps credit, debit, PIX and boleto available", () => {
    expect(STORE_TERMS.paymentMethods).toEqual(["Crédito", "Débito", "PIX", "Boleto"]);
  });
  it("offers reshipment or refund for orders that do not arrive", () => {
    expect(STORE_TERMS.undeliveredOrderOptions).toEqual(["Reenvio", "Devolução do dinheiro"]);
  });
});