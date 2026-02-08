# shravanreddy.com

Static personal site served with GitHub Pages.

## Structure

- `index.html`: main page content and metadata
- `static/style.css`: styles and responsive behavior
- `static/`: image and static assets
- `CNAME`: custom domain

## Local Preview

Use any static file server from the repository root, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy

1. Commit changes to `master`.
2. Push to GitHub.
3. GitHub Pages will publish automatically for this repository.

## Analytics (Cloudflare Web Analytics)

This site includes Cloudflare Web Analytics on all pages:

- `index.html`
- `great-product/index.html`
- `why-launch/index.html`

Setup:

1. In Cloudflare Web Analytics, add `shravanreddy.com`.
2. Confirm the script snippet in the dashboard. If Cloudflare provides an updated snippet, replace the existing script tag in the three files above with the exact dashboard snippet.
3. Deploy to GitHub Pages.
4. Open the site and verify events appear in Cloudflare Web Analytics realtime.

What you'll see:

- Views and visitors over time
- Top pages and entry pages
- Referrers, countries, devices, and browsers
