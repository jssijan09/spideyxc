# SPIDY X CHEATS

A static storefront with a standalone animated loading page. Open `index.html`; when loading completes it transitions to `store.html`.

## Run it
- Double-click `index.html`, or
- Run `python3 -m http.server 8000` in this folder and open http://localhost:8000

## Edit
- Payment numbers: `PAYMENT_NUMBERS` at the top of `script.js`.
- Products / plans / prices: `products` array in `script.js`.
- Discord webhook: `DISCORD_WEBHOOK_URL` at the top of `script.js`.
- Loading animation and particles: `loading.js` and `loading-screen.css`.

## Orders -> Discord
On submit, the order details and payment screenshot are uploaded to your Discord channel as a real file attachment. Large screenshots are auto-compressed.

Security note: the webhook URL is included in public JavaScript, so anyone who views the source can post to it. If it gets spammed, replace the webhook URL in `script.js`.

## Publish on GitHub Pages
Upload the files and `assets` folder to the repository root. The root `index.html` shows the loading page and transitions into the store.
