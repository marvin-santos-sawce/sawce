import { describe, expect, it } from "vitest";
import { CORREIOS_TRACKING_URL, isTrackingCode, normalizeTrackingCode } from "@/lib/tracking";

describe("Official tracking handoff", () => {
  it("always uses the verified official Correios page", () => {
    expect(CORREIOS_TRACKING_URL).toBe("https://rastreamento.correios.com.br/app/index.php");
  });
  it("accepts the two-letter, nine-digit, two-letter format, including international codes", () => {
    expect(isTrackingCode("AA123456789BR")).toBe(true);
    expect(isTrackingCode("LB123456789CN")).toBe(true);
    expect(isTrackingCode("AA12345678BR")).toBe(false);
    expect(isTrackingCode("AA1234567890BR")).toBe(false);
    expect(isTrackingCode("A1123456789BR")).toBe(false);
    expect(isTrackingCode("")).toBe(false);
    expect(isTrackingCode("AA123456789BR?redirect=evil")).toBe(false);
  });
  it("normalizes pasted whitespace and lowercase without changing the tracking digits", () => {
    expect(normalizeTrackingCode("  lb 123 456 789 cn  ")).toBe("LB123456789CN");
  });
});