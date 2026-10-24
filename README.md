# shravanreddy.com

Static personal site served with GitHub Pages.

## Structure

- `index.html`: main page content and metadata
- `_layouts/essay.html`: shared essay page template (head, metadata, nav, analytics)
- `_essays/*.md`: essay content files
- `_config.yml`: Jekyll configuration for essay routing
- `static/style.css`: styles and responsive behavior
- `_data/press.yml`, `_includes/press-shelf.html`, `static/press.css`, `static/press.js`: the homepage press shelf
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

## Press Shelf

The homepage shows press coverage as a stack of books. Each book opens into a
short reader: cover, title page, a plate of the article as first published,
a summary, Shravan's part, and a link to the original.

To add a book:

1. Add an entry to `_data/press.yml` (the comments at the top list each field).
2. Add a plate image at `static/press/<slug>.webp`, about 640px wide: a crop of
   the article's masthead, headline, and lead image, taken from the Internet
   Archive copy (or a screenshot, for paywalled articles). Keep body text to a
   paragraph or two.
3. Add cover art at `_includes/press-art/<slug>.svg` (line art in `currentColor`;
   `class="art-fill"` fills a shape with the cover color).
4. Only if you hold reprint rights: add page images of the full article as
   `reprint`, and the notice the license requires as `credit`. The pages take
   the place of the summary.

Without JavaScript, the spines are plain links to the articles.
`/#press-<slug>` opens a book directly.

## Analytics (Cloudflare + Google Analytics)

Analytics is centralized in `_includes/analytics.html`.
It is included by both `_layouts/essay.html` and `index.html`.
Provider IDs are configured in `_config.yml`.

Setup:

1. In Cloudflare Web Analytics, add `shravanreddy.com`.
2. In Google Analytics 4, create/select your property and copy the Measurement ID (format `G-XXXXXXXXXX`).
3. Set `_config.yml` values:
   - `cloudflare_web_analytics_token`: Cloudflare site token
   - `google_analytics_measurement_id`: GA4 Measurement ID
4. Deploy to GitHub Pages.
5. Verify events in Cloudflare realtime and GA4 Realtime reports.

What you'll see:

- Views and visitors over time
- Top pages and entry pages
- Referrers, countries, devices, and browsers
