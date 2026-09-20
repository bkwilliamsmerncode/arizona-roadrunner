import test from "node:test";
import assert from "node:assert/strict";
import {
  checkoutPayload,
  validateSquareUrl,
  validCheckout,
  EMPTY_CHECKOUT,
} from "../src/hooks/checkout.js";
test("checkout sends product IDs and quantities, not browser-controlled prices or paid status", () => {
  const payload = checkoutPayload(
    [{ product: { id: 7, price: 0.01 }, quantity: 2 }],
    { ...EMPTY_CHECKOUT, name: " Brian ", email: " test@example.com " },
    "request-1",
  );
  assert.deepEqual(payload.items, [{ productId: 7, quantity: 2 }]);
  assert.equal(payload.customer.name, "Brian");
  assert.equal("paid" in payload, false);
  assert.equal("total" in payload, false);
});
test("pickup does not disclose stale saved shipping details", () => {
  const payload = checkoutPayload(
    [],
    { ...EMPTY_CHECKOUT, fulfillment: "pickup", address: "Private address" },
    "1",
  );
  assert.deepEqual(payload.fulfillment, { type: "pickup" });
});
test("Square redirects reject lookalike domains, credentials, and insecure URLs", () => {
  for (const url of [
    "http://square.link/u/abc",
    "https://square.link.evil.example/",
    "javascript:alert(1)",
    "https://secret@square.link/u/abc",
    "https://evil.example/",
  ])
    assert.throws(() => validateSquareUrl(url));
  assert.equal(
    validateSquareUrl("https://square.link/u/abc"),
    "https://square.link/u/abc",
  );
});
test("corrupt or oversized stored checkout data is rejected", () => {
  assert.ok(validCheckout(EMPTY_CHECKOUT));
  assert.ok(!validCheckout(null));
  assert.ok(!validCheckout({ ...EMPTY_CHECKOUT, fulfillment: "paid" }));
  assert.ok(!validCheckout({ ...EMPTY_CHECKOUT, notes: "x".repeat(1001) }));
});
