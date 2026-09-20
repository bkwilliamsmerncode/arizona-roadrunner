import { useEffect, useId, useReducer, useRef } from "react";
import useStoredState from "../hooks/useStoredState";
import {
  EMPTY_CHECKOUT,
  validCheckout,
  checkoutReducer,
  checkoutPayload,
  validateSquareUrl,
} from "../hooks/checkout";
import Icon from "./Icon";
export default function Checkout({ items, subtotalCents, onBack }) {
  const [saved, setSaved] = useStoredState(
    "ar-checkout-draft-v1",
    validCheckout,
    EMPTY_CHECKOUT,
  );
  const [state, dispatch] = useReducer(checkoutReducer, saved, (details) => ({
    details,
    step: "details",
    pending: false,
    error: "",
    saved: false,
  }));
  const inputId = useId();
  const controller = useRef(null);
  const request = useRef(null);
  const details = state.details;
  const endpoint = import.meta.env.VITE_CHECKOUT_ENDPOINT?.trim();
  const cartSignature = JSON.stringify(items.map((i) => [i.id, i.quantity]));
  useEffect(() => () => controller.current?.abort(), [cartSignature]);
  const update = (e) =>
    dispatch({ type: "field", name: e.target.name, value: e.target.value });
  const save = () => {
    setSaved(details);
    dispatch({ type: "saved" });
  };
  async function pay() {
    if (!endpoint || state.pending) return;
    dispatch({ type: "sending" });
    controller.current = new AbortController();
    const timer = setTimeout(() => controller.current?.abort(), 15000);
    try {
      const target = new URL(endpoint, window.location.origin);
      if (target.protocol !== "https:")
        throw new Error("Checkout is temporarily unavailable.");
      const unsigned = checkoutPayload(items, details, "");
      const signature = JSON.stringify(unsigned);
      if (request.current?.signature !== signature)
        request.current = { signature, id: crypto.randomUUID() };
      const response = await fetch(target.href, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...unsigned, requestId: request.current.id }),
        signal: controller.current.signal,
      });
      if (!response.ok)
        throw new Error(
          "Checkout couldn’t start. Your cart is safe; please try again.",
        );
      const result = await response.json();
      const url = validateSquareUrl(result.checkoutUrl);
      setSaved(details);
      window.location.assign(url);
    } catch (error) {
      dispatch({
        type: "error",
        message:
          error.name === "AbortError"
            ? "Checkout was interrupted. Your cart is still saved. Please try again."
            : error.message || "Checkout is unavailable. Please try again.",
      });
    } finally {
      clearTimeout(timer);
    }
  }
  return (
    <div className="checkout">
      <div className="checkout-steps" aria-label="Checkout progress">
        <span>1 · Bag</span>
        <b aria-current={state.step === "details" ? "step" : undefined}>
          2 · Details
        </b>
        <b aria-current={state.step === "review" ? "step" : undefined}>
          3 · Review
        </b>
      </div>
      {state.step === "details" ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "review" });
          }}
        >
          <div className="checkout-heading">
            <h3>Make it yours.</h3>
            <p>Tell us where your next favorite find is going.</p>
          </div>
          <fieldset>
            <legend>How would you like to receive it?</legend>
            <div className="fulfillment-options">
              {[
                ["shipping", "Ship to me"],
                ["pickup", "Request pickup"],
              ].map(([value, label]) => (
                <label key={value} htmlFor={inputId + value}>
                  <input
                    id={inputId + value}
                    type="radio"
                    name="fulfillment"
                    value={value}
                    checked={details.fulfillment === value}
                    onChange={update}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <div className="checkout-fields">
            <label>
              Full name
              <input
                name="name"
                value={details.name}
                onChange={update}
                autoComplete="name"
                required
                maxLength={100}
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                value={details.email}
                onChange={update}
                autoComplete="email"
                required
                maxLength={150}
              />
            </label>
            <label>
              Phone <small>(optional)</small>
              <input
                name="phone"
                type="tel"
                value={details.phone}
                onChange={update}
                autoComplete="tel"
                maxLength={30}
              />
            </label>
          </div>
          {details.fulfillment === "shipping" ? (
            <div className="checkout-fields">
              <label>
                Street address
                <input
                  name="address"
                  value={details.address}
                  onChange={update}
                  autoComplete="shipping address-line1"
                  required
                  maxLength={150}
                />
              </label>
              <label>
                Apartment, suite, etc. <small>(optional)</small>
                <input
                  name="address2"
                  value={details.address2}
                  onChange={update}
                  autoComplete="shipping address-line2"
                  maxLength={100}
                />
              </label>
              <div className="checkout-pair">
                <label>
                  City
                  <input
                    name="city"
                    value={details.city}
                    onChange={update}
                    autoComplete="shipping address-level2"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  State / province
                  <input
                    name="region"
                    value={details.region}
                    onChange={update}
                    autoComplete="shipping address-level1"
                    required
                    maxLength={100}
                  />
                </label>
              </div>
              <div className="checkout-pair">
                <label>
                  ZIP / postal code
                  <input
                    name="postalCode"
                    value={details.postalCode}
                    onChange={update}
                    autoComplete="shipping postal-code"
                    required
                    maxLength={20}
                  />
                </label>
                <label>
                  Country
                  <select
                    name="country"
                    value={details.country}
                    onChange={update}
                    autoComplete="shipping country"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                </label>
              </div>
            </div>
          ) : (
            <p className="checkout-note">
              Pickup availability and location will need to be confirmed with
              the shop. This is a preference, not a reservation.
            </p>
          )}
          <label className="checkout-notes">
            A note for the shop <small>(optional)</small>
            <textarea
              name="notes"
              value={details.notes}
              onChange={update}
              rows={3}
              maxLength={1000}
              placeholder="A gifting detail or something we should know…"
            />
          </label>
          <button className="button" type="submit">
            Review your bag <Icon name="arrow" />
          </button>
          <button className="text-link" type="button" onClick={onBack}>
            ← Back to bag
          </button>
        </form>
      ) : (
        <>
          <div className="checkout-heading">
            <h3>A lovely little collection.</h3>
            <p>Review your details before continuing.</p>
          </div>
          <div className="review-details">
            <div>
              <strong>{details.name}</strong>
              <p>
                {details.email}
                {details.phone && (
                  <>
                    <br />
                    {details.phone}
                  </>
                )}
              </p>
            </div>
            <div>
              <span className="eyebrow">
                {details.fulfillment === "shipping"
                  ? "Shipping details"
                  : "Pickup requested"}
              </span>
              {details.fulfillment === "shipping" ? (
                <p>
                  {details.address}
                  <br />
                  {details.address2 && (
                    <>
                      {details.address2}
                      <br />
                    </>
                  )}
                  {details.city}, {details.region} {details.postalCode}
                  <br />
                  {details.country}
                </p>
              ) : (
                <p>To be confirmed with the shop.</p>
              )}
            </div>
            {details.notes && <p className="review-note">{details.notes}</p>}
            <button
              className="text-link"
              disabled={state.pending}
              onClick={() => dispatch({ type: "edit" })}
            >
              Edit details
            </button>
          </div>
          <div className="review-items">
            {items.map(({ product, quantity }) => (
              <div key={product.id}>
                <span>
                  {quantity} × {product.name}
                </span>
                <strong>${(product.price * quantity).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Items subtotal</span>
            <strong>${(subtotalCents / 100).toFixed(2)}</strong>
          </div>
          <p className="checkout-note">
            Shipping, tax, and final availability will be confirmed at checkout.
            No payment has been taken.
          </p>
          {endpoint ? (
            <button
              className="button square-button"
              onClick={pay}
              disabled={state.pending}
            >
              {state.pending
                ? "Opening secure checkout…"
                : "Continue to Square"}{" "}
              <Icon name="arrow" />
            </button>
          ) : (
            <div className="square-coming">
              <span className="square-mark" aria-hidden="true">
                □
              </span>
              <div>
                <strong>Square checkout is coming soon.</strong>
                <p>
                  You can save your details and return to this bag when checkout
                  is available.
                </p>
              </div>
            </div>
          )}
          <button
            className="button save-draft-button"
            disabled={state.pending}
            onClick={save}
          >
            Save checkout details <Icon name="check" />
          </button>
          <p className="checkout-note">
            Saving keeps your contact and delivery details on this device. It
            does not place an order.
          </p>
          {state.saved && (
            <p role="status" className="checkout-saved">
              Checkout details saved on this device.
            </p>
          )}
          {state.error && (
            <p role="alert" className="form-error">
              {state.error}
            </p>
          )}
          <div className="checkout-review-actions">
            <button
              className="text-link"
              disabled={state.pending}
              onClick={onBack}
            >
              ← Back to bag
            </button>
            <button
              className="text-link"
              disabled={state.pending}
              onClick={() => {
                setSaved(EMPTY_CHECKOUT);
                dispatch({ type: "clear" });
              }}
            >
              Clear saved details
            </button>
          </div>
        </>
      )}
    </div>
  );
}
