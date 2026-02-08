# shravanreddy.com

Static personal site served with GitHub Pages.

## Structure

- `index.html`: main page content and metadata
- `_layouts/essay.html`: shared essay page template (head, metadata, nav, analytics)
- `_essays/*.md`: essay content files
- `_config.yml`: Jekyll configuration for essay routing
- `static/style.css`: styles and responsive behavior
- `static/`: image and static assets
- `CNAME`: custom domain

## Local Preview

For full preview (including markdown essays), run Jekyll:

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve
```

Then open `http://localhost:4000`.

## Deploy

1. Commit changes to `master`.
2. Push to GitHub.
3. GitHub Pages will publish automatically for this repository.

## Writing Essays

To add a new essay, create a new file in `_essays/`:

```md
---
title: "Essay Title"
subtitle: "Optional subtitle"
byline: "Shravan Reddy"
description: "SEO description for the page"
twitter_description: "Optional shorter Twitter description"
date_published: "2026-02-08" # optional
---

Essay body in Markdown (or inline HTML where needed).
```

The filename becomes the route:

- `_essays/why-launch.md` -> `/why-launch/`
- `_essays/great-product.md` -> `/great-product/`

## Analytics (Cloudflare Web Analytics)

Analytics is centralized in `_includes/analytics.html`.
It is included by both `_layouts/essay.html` and `index.html`.

Setup:

1. In Cloudflare Web Analytics, add `shravanreddy.com`.
2. If Cloudflare provides an updated snippet, replace it once in `_includes/analytics.html`.
3. Deploy to GitHub Pages.
4. Open the site and verify events appear in Cloudflare Web Analytics realtime.

What you'll see:

- Views and visitors over time
- Top pages and entry pages
- Referrers, countries, devices, and browsers
