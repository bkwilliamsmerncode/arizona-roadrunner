# Arizona Roadrunner

A responsive React + Vite storefront with a Southwest editorial design. The existing components/data/hooks/styles hierarchy is preserved.

## Run locally

From the repository root:

```sh
cd arizona-roadrunner
npm ci
npm run dev
```

Use Node 22.12+ (or another version supported by Vite 8). `npm run build` produces `dist`; `npm run preview` serves it; `npm run lint` checks source.

## Storefront

- Hash navigation for the collection, story, and contact pages; works on static hosting and GitHub Pages without route rewrites.
- Token-based catalog search across names, descriptions, categories, materials, and tags. Ctrl/Cmd+K focuses search on the collection.
- Category, price, availability, saved-item filters, five sorting modes, and progressive loading.
- Native accessible product and bag dialogs, keyboard focus management, Escape dismissal, and reduced-motion support.
- Favorites and bag quantities persist in localStorage, with validated recovery from malformed data.
- Contact form prepares an explicit email draft. Bag inquiry opens an email with itemized products and subtotal.

## Before accepting real orders

There is no payment, inventory, shipping, tax, order-management, or email-delivery backend. The site does not claim to process orders. Connect a payment/order service and server-validated prices and inventory before enabling checkout. Contact messages require the visitor to send the email draft from their own email app.

The 100-product dataset is retained from the original repository. Its illustrative Unsplash photography is bundled where available; clearly incorrect ceramic imagery was replaced with a pottery reference (Unsplash photo-1578749556568-bc2c40e68b61). Unavailable sculpture photos use a labeled fallback. Available reference photos are bundled as optimized WebP assets to avoid third-party image requests. Photos are illustrative and may not depict the named item; replace them with accurate owned product photos and verify prices, descriptions, stock, and the existing hello@arizonaroadrunner.com address before commercial launch. Failed images show an accessible fallback. Do not treat catalog stock flags as live inventory.

## Hosting

Upload the contents of `dist` to your static host. Relative Vite asset paths and hash routes support repository subpaths. No deployment or Pages settings are changed by this redesign.
