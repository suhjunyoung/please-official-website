# Please! Official Website

Official website for **Please!**, a family productivity app that turns everyday requests into visible care.

The site includes:

- A responsive product landing page with direct App Store and Google Play download links
- A six-step app guide based on the onboarding flow in the mobile app
- The migrated Please! customer-support FAQ
- Korean and English versions of the Terms of Service and Privacy Policy

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

## Policy revision review

The original four `site/content/*.md` files remain the immutable v2 copies. `/terms/?version=v2` and `/privacy/?version=v2` pin those documents. The v3 source and announcement are in `site/content/v3/`; the separate notification retention correction is in `site/content/corrections/`.

`site/policy-release.js` holds the prepared announcement date (2026-11-12) and effective date (2026-11-19), plus the announcement, effective and separate correction publication timestamps. Exact timestamps are still unset: default pages show v2 and normal requests for v3 remain unavailable. The six v3 Korean/English source copies carry the same prepared dates. On localhost only, `?preview=v3`, `?preview=announcement` and `?preview=correction` show explicit unpublished review copies and the prepared dates. `lang=en` preserves the selected version. These review overrides do not work on the public host.

Date preparation does not publish the policies. Before publication, confirm the exact timestamps and at least seven days of notice. If the effective date changes, sync the app, legacy OTA branches, canonical documents, site copies and release issue. Preserve existing publication evidence and announce a changed date when notice has already been given. A delayed app release does not automatically change the policy effective date.

Run `node --test tests/policy-release.test.cjs` to check publication/effective boundaries, the seven-day interval, pinned versions, language links and the separate correction schedule. Dates in tests are fixtures, not a release schedule. The Wrangler build check deliberately refuses deployment while dates/placeholders remain unresolved. Update the canonical sources in `hsskim/project-please/docs/legal/` before syncing site copies, then check exact source equality and dates. Do not deploy this draft branch before review and schedule agreement. Implementation is tracked in [#541](https://github.com/hsskim/project-please/issues/541); actual publication and app notice delivery remain in [#542](https://github.com/hsskim/project-please/issues/542).

## Project structure

```text
site/             # Published static files
  index.html       # Landing page
  support/         # Customer support and FAQ
  terms/           # Terms of Service
  privacy/         # Privacy Policy
  content/         # Korean and English legal source documents
  assets/          # Brand assets and app screenshots
  script.js        # Navigation, reveal, and app-guide interactions
  legal.js         # Legal-document language switcher and renderer
  styles.css       # Shared styles
  404.html         # Not-found page
  robots.txt
  sitemap.xml
wrangler.jsonc     # Cloudflare Workers static-assets config
```
