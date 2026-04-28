# Lease Break Calculator

A production-ready, single-file web app that calculates early lease termination penalties by US state, with an integrated lease break letter generator. Deployable to Vercel with no build step.

## Project structure

```
lease-break-calculator/
├── index.html                  # Entire calculator app (must stay under 120kb unminified)
├── api/
│   └── generate-letter.js      # Vercel serverless function — calls Claude API to generate letter
├── scripts/
│   └── generate-state-pages.js # Node script: generates /[state-slug]/index.html for all 51 jurisdictions
├── public/
│   └── og-image.png
├── robots.txt
├── vercel.json
└── package.json
```

## Constraints

### Do NOT
- Use any JS framework or bundler (no React, Vue, Vite, Webpack, etc.)
- Import any runtime npm packages into `index.html`
- Add authentication or sessions
- Use `localStorage` or cookies
- Add any backend database
- Use TypeScript

### Do
- Keep the entire calculator in one `index.html` file, **under 120 kb unminified**
- Test that all 50-state + DC calculations produce sensible results — no `NaN`, no negative outputs
- Ensure the letter generator gracefully falls back to a hardcoded template if the API call fails (network error or non-200 response)
- Make the copy-to-clipboard button work without any library (`navigator.clipboard.writeText`)
- Make the `.txt` download work without any library — use a `Blob` and a temporary anchor element

## Key implementation notes

### State data
- Embedded directly in `index.html` as a `const STATES` object
- All 50 states + DC must be present with: `mit`, `notice`, `cap`, `avgDays`, `etfOk`, `dv`, `notes`, `stat`

### Calculation engine (`calculate()`)
- Three scenarios: **best**, **most likely**, **worst**
- Protected exits short-circuit: military (SCRA) → $0, DV survivor in qualifying state → $0
- Non-mitigation states (AL, AR, LA, MS, WV, WY): worst = full remaining rent
- Cap states (DE, MD = 2 months; OR = 1.5 months): clamp all three scenarios
- ETF clause present: flat fee replaces per-month formula
- Reletting fee always added on top
- Final guardrails: `worst ≥ likely ≥ best ≥ 0`, no `NaN`

### Letter generator (`api/generate-letter.js`)
- Vercel serverless function (Node 18+)
- Calls Claude API with tenant details to draft a formal lease break notice letter
- Must fall back to a hardcoded template string if the API errors or returns non-200
- No runtime npm dependencies — use Node's built-in `fetch` (Node 18+)

### State landing pages (`scripts/generate-state-pages.js`)
- Run with `npm run generate-pages`
- Generates `/[state-slug]/index.html` for all 51 jurisdictions
- Each page has unique `<title>`, `<meta name="description">`, `<link rel="canonical">`
- Embeds the calculator via `<iframe src="/">` with a `postMessage` to preset the state dropdown

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
- Vercel (zero-config for static + `/api` serverless functions)
- `vercel.json` handles `cleanUrls`, `trailingSlash: false`, and security headers
- No build step required — `index.html` is served as-is
