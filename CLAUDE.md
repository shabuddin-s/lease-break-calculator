# LeaseAdvisor

An Astro 5 static site that calculates early lease termination penalties by US state, with articles, FAQ pages, and a lease break letter generator. Deploys to Vercel with a standard `astro build` step.

## Project structure

```
lease-break-calculator/
├── src/
│   ├── pages/
│   │   ├── index.astro              # Homepage — calculator
│   │   ├── [state].astro            # 51 state landing pages (dynamic route)
│   │   ├── faq.astro                # FAQ page
│   │   └── articles/
│   │       ├── index.astro          # Article listing
│   │       └── [slug].astro        # Individual article pages
│   ├── layouts/
│   │   ├── BaseLayout.astro         # Shared <head>, header, footer, SEO tags
│   │   └── ArticleLayout.astro      # Layout for article pages
│   ├── components/
│   │   ├── Calculator.astro         # 3-step calculator form
│   │   └── StateInfoCard.astro      # State-specific legal info card
│   ├── content/
│   │   ├── articles/                # Markdown articles — one file = one page
│   │   └── faqs/                    # Markdown FAQ entries
│   ├── data/
│   │   └── states.js                # STATES object (ES module) — source of truth for all 51 jurisdictions
│   ├── content.config.ts            # Content Collections schema
│   └── env.d.ts
├── public/
│   ├── calculator.js                # Vanilla JS calculation engine + UI logic
│   ├── calculator.css               # All styles
│   ├── robots.txt
│   └── og-image.png                 # (not yet added — add here when ready)
├── api/
│   └── generate-letter.js           # Vercel serverless function — calls Claude API
├── astro.config.mjs
├── vercel.json
└── package.json
```

## Constraints

### Do NOT
- Add authentication or sessions
- Use `localStorage` or cookies
- Add any backend database
- Add React or other frameworks — Astro + vanilla JS is sufficient
- Add runtime npm packages to `public/calculator.js` (it is loaded as a plain browser script)

### Do
- Keep `public/calculator.js` and `public/calculator.css` as plain files — they are served as static assets and loaded via `<script is:inline src="/calculator.js">` with no bundling
- Test that all 50-state + DC calculations produce sensible results — no `NaN`, no negative outputs
- Ensure the letter generator gracefully falls back to a hardcoded template if the API call fails
- When adding a new article: drop a `.md` file in `src/content/articles/` — no code changes needed
- When adding a new FAQ: drop a `.md` file in `src/content/faqs/` — no code changes needed

## Key implementation notes

### State data (`src/data/states.js`)
- ES module export (`export default STATES`)
- All 50 states + DC with: `name`, `slug`, `mit`, `notice`, `cap`, `avgDays`, `etfOk`, `dv`, `notes`, `stat`
- Imported by `[state].astro` via `getStaticPaths()` to generate all 51 pages at build time
- Cap field: `{ months: number, text: string }` or `null`

### State landing pages (`src/pages/[state].astro`)
- Replaces the old `scripts/generate-state-pages.js` generator
- `getStaticPaths()` iterates `STATES` and generates one page per slug
- Each page gets unique `<title>`, `<meta description>`, `<link rel="canonical">`, and WebApplication JSON-LD
- Sets `window.PRESET_STATE = abbr` via `define:vars` before `calculator.js` loads, so the calculator auto-selects the state

### Calculation engine (`public/calculator.js`)
- Plain browser JS, served statically — no bundling, no modules
- Three scenarios: **best**, **most likely**, **worst**
- Protected exits short-circuit: military (SCRA) → $0, DV survivor in qualifying state → $0
- Non-mitigation states (AL, AR, LA, MS, WV, WY): worst = full remaining rent
- Cap states (DE, MD = 2 months; OR = 1.5 months): clamp all three scenarios
- ETF clause present: flat fee replaces per-month formula
- Reletting fee always added on top
- Final guardrails: `worst ≥ likely ≥ best ≥ 0`, no `NaN`

### Content collections (`src/content.config.ts`)
Articles schema: `title` (string), `description` (string), `publishDate` (date), `state` (string, optional)
FAQs schema: `question` (string), `order` (number, optional)

Use `getCollection('articles')` / `getCollection('faqs')` + `render(entry)` from `astro:content` (Astro 5 API).

### Letter generator (`api/generate-letter.js`)
- Vercel serverless function (Node 18+)
- Calls Claude API with tenant details to draft a formal lease break notice letter
- Must fall back to a hardcoded template string if the API errors or returns non-200
- No runtime npm dependencies — use Node's built-in `fetch` (Node 18+)
- Lives outside the Astro `src/` directory; Vercel auto-discovers it

### Clipboard / download (no libraries)
```js
// Copy
navigator.clipboard.writeText(text);

// Download .txt
const blob = new Blob([text], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = 'lease-break-notice.txt'; a.click();
URL.revokeObjectURL(url);
```

## Deployment
- Vercel auto-detects Astro and runs `astro build`, serving from `dist/`
- `vercel.json` handles `trailingSlash: false` and security headers
- The `api/` directory is picked up by Vercel as serverless functions alongside the static site
- `public/` files are copied to `dist/` automatically — place static assets there

## Development
```bash
npm run dev      # local dev server (http://localhost:4321)
npm run build    # production build → dist/
npm run preview  # preview the production build locally
```
