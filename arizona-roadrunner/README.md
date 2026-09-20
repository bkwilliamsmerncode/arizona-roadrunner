# Arizona Roadrunner

Frontend-only React + Vite storefront. The existing components/data/hooks/styles hierarchy is preserved. The home page follows the supplied reference: cream navigation, dark purple gradient hero, oversized serif heading, full-width search, category tabs, and rounded product cards.

## Run

From the repository root:

```sh
cd arizona-roadrunner
npm ci
npm run dev
```

Use Node 22.12+ or another Vite 8 supported version. `npm run build` creates `dist`; `npm run lint` checks source; `npm test` checks checkout trust boundaries. Relative asset paths and hash navigation support GitHub Pages repository subpaths.

## Browser experience

- Search, categories, price/availability/favorites filters, sorting, progressive loading, and recently viewed products.
- Cart, favorites, recently viewed items, contact drafts, and explicitly saved checkout details use validated localStorage. Cart and favorites update across tabs. Unavailable storage falls back to memory.
- Checkout collects contact information and shipping or pickup preferences, then reviews item subtotals. Shipping/tax are not fabricated. Saving details does not place an order or claim payment.
- Hooks are used for concrete behavior: useState, useReducer, useEffect, useRef, useMemo, useCallback, useContext, useId, useDeferredValue, useTransition, and useSyncExternalStore.
- Native dialogs provide focus containment and Escape dismissal. Reduced-motion preferences are supported.

## EmailJS contact form

1. Copy `.env.example` to `.env.local` inside this nested app folder.
2. Fill `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, and `VITE_EMAILJS_PUBLIC_KEY` with this store's EmailJS configuration.
3. In the EmailJS template, set **To Email** to the owner's real email address, not a browser-provided variable. Set **Reply To** to `{{reply_to}}`.
4. Template variables: `{{from_name}}`, `{{reply_to}}`, `{{subject}}`, `{{message}}`, and `{{site_name}}`.
5. Allowlist the production origin in EmailJS. Rebuild/redeploy after changing Vite environment values; restarting is needed in development.

Suggested subject: `Arizona Roadrunner — {{subject}}`.

The SDK sends directly from the browser. Success appears only after EmailJS accepts the request. Failed sends retain the draft. Missing configuration shows an honest unavailable message. No mailto substitution happens on submit. The existing direct email link remains available separately. Confirm that hello@arizonaroadrunner.com is the intended support address.

Official reference: https://www.emailjs.com/docs/sdk/send-form/

## Future Square connection

Leave `VITE_CHECKOUT_ENDPOINT` empty until the hosted checkout integration exists. The current site remains entirely frontend-only and displays that Square checkout is coming soon. No Square access token belongs in this app or any VITE variable.

The future HTTPS endpoint receives:

```json
{
  "requestId": "stable-id-for-retries-of-the-same-payload",
  "currency": "USD",
  "items": [{ "productId": 1, "quantity": 2 }],
  "customer": { "name": "Buyer", "email": "buyer@example.com", "phone": "" },
  "fulfillment": {
    "type": "shipping",
    "shippingAddress": {
      "addressLine1": "123 Example Street",
      "addressLine2": "",
      "city": "Tucson",
      "region": "AZ",
      "postalCode": "85701",
      "country": "US"
    }
  },
  "notes": ""
}
```

For pickup, fulfillment contains only `type: "pickup"`. This is a requested preference; the shop must support and confirm it.

The endpoint must look up trusted product prices/stock, validate quantities and delivery eligibility, determine tax/shipping, and use Square CreatePaymentLink with an itemized order. It returns `{ "checkoutUrl": "https://square.link/..." }`. The frontend validates the Square host before redirecting. Configure endpoint CORS for the storefront. A fixed payment link with an invented amount query parameter will not implement this cart flow.

The owner's paid-order email must originate from a trusted Square-confirmed flow: validate Square webhook signatures, require the matching payment's COMPLETED status, retrieve the matching order and delivery details, and deduplicate payment/event IDs before sending the receipt notification. Include line items, quantities, paid amount/currency, order/payment references, and applicable shipping information. This can be a hosted third-party automation/service; it is not implemented by localStorage, EmailJS contact submissions, or a successful return URL.

References:

- https://developer.squareup.com/docs/checkout-api/square-order-checkout
- https://developer.squareup.com/docs/checkout-api/optional-checkout-configurations
- https://developer.squareup.com/docs/payments-api/webhooks

## Catalog

The existing 100 products are illustrative. Available reference photos are bundled as WebP; missing sculpture photos have a labeled fallback. Verify product images, prices, descriptions, availability, support address, and shipping/pickup policies before real sales. Browser state is convenience storage, not an authoritative inventory, account, or payment system.
