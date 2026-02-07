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
