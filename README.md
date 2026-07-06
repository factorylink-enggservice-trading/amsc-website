# AMSC FactoryLink — Website Template

A static front-end template for **AMSC FactoryLink Industrial Engineering Services**, built as a 5-page marketing site. No build step, no framework, no backend yet — plain HTML/CSS/JS so it runs as-is on GitHub Pages, and can be wired into a real backend later without restructuring anything.

## Structure

```
/
├── index.html          Home — hero, services preview, featured case study, stats
├── about.html           Company background, mission/vision, values, capabilities, locations
├── services.html         Core service lines, full offerings list, industries, edge
├── projects.html         All 8 success stories + full client roster
├── contact.html          Contact info + front-end contact form
├── 404.html              Custom not-found page (GitHub Pages serves this automatically)
├── assets/
│   ├── css/style.css     Design system (tokens, components, layout) — one shared file
│   ├── js/main.js        Nav state, mobile menu, scroll reveals, animated stats, form stub
│   └── img/               Real photos pulled from the company profile PDF, optimized for web
└── README.md
```

## Design system

- **Colors:** blueprint navy (`--navy-900`) + circuit blue (`--blue`) + safety-signal orange (`--signal`), pulled from AMSC's own logo and document accent colors.
- **Type:** Space Grotesk (headings), Inter (body), IBM Plex Mono (labels/stats) — loaded from Google Fonts.
- **Signature element:** the thin "ladder-rung" divider under the homepage hero — a nod to PLC ladder logic, AMSC's own bread and butter.
- All tokens live at the top of `assets/css/style.css` under `:root` — change colors/fonts/spacing there and it cascades everywhere.

## Running it locally

No build step needed. Either:

- Open `index.html` directly in a browser, or
- Serve it properly (recommended, avoids relative-path quirks):
  ```bash
  python3 -m http.server 8000
  # then visit http://localhost:8000
  ```

## Deploying to GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo → **Settings → Pages** → Source: `main` branch, `/ (root)`.
3. Save — GitHub will publish it at `https://<username>.github.io/<repo-name>/`.

## Where the backend goes later

- **Contact form** (`contact.html`): the form currently submits nowhere — `main.js` intercepts it and shows a placeholder message. Point it at a real endpoint (PHP mailer, form service, API route) when ready.
- **Header/footer duplication**: each page currently repeats the same nav and footer markup. If you move to PHP, that's the natural place to convert them to `include('header.php')` / `include('footer.php')`.
- **Content**: services, case studies, and the client list are hand-written into the HTML. If this becomes database-driven later, those are the blocks to templatize first.

## Image credits

All photos are sourced directly from AMSC's own company profile — restoration before/afters, shop floor, and project photography. No stock imagery.
