# Please! Official Website

Official website for **Please!**, a family productivity app that turns everyday requests into visible care.

## Deployment

The published site is the `site/` directory. It is configured for Cloudflare Workers static assets.

- Production domain: `https://please.yellodevs.space`
- Cloudflare Worker name: `please-official-website`
- Build command: none
- Deploy command: `npx wrangler deploy`

### Cloudflare setup

1. Create a Workers project named `please-official-website` and connect this GitHub repository.
2. Set the asset directory to `site/` (the included `wrangler.jsonc` already defines this for CLI deployment).
3. In **Workers & Pages → please-official-website → Settings → Domains & Routes**, add `please.yellodevs.space` as a Custom Domain.
4. Keep the DNS zone for `yellodevs.space` in the same Cloudflare account so Cloudflare can provision the required DNS record and certificate.

## Local preview

```bash
python3 -m http.server 8000 --directory site
```

Open `http://localhost:8000`.

## Project structure

```text
site/             # Published static files
  index.html       # Landing page
  styles.css       # Shared styles
  404.html         # Not-found page
  robots.txt
  sitemap.xml
wrangler.jsonc     # Cloudflare Workers static-assets config
```

