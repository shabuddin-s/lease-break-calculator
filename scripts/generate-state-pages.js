const fs = require('fs');
const path = require('path');

const STATES = {
  AL: { name: 'Alabama',        slug: 'alabama',         mit: false, notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Ala. Code § 35-9A-401' },
  AK: { name: 'Alaska',         slug: 'alaska',          mit: true,  notice: 30, avgDays: 60,  dv: true,  cap: null,                                           stat: 'Alaska Stat. § 34.03.230' },
  AZ: { name: 'Arizona',        slug: 'arizona',         mit: true,  notice: 30, avgDays: 35,  dv: true,  cap: null,                                           stat: 'Ariz. Rev. Stat. § 33-1370' },
  AR: { name: 'Arkansas',       slug: 'arkansas',        mit: false, notice: 30, avgDays: 50,  dv: false, cap: null,                                           stat: 'Ark. Code Ann. § 18-17-101' },
  CA: { name: 'California',     slug: 'california',      mit: true,  notice: 30, avgDays: 28,  dv: true,  cap: null,                                           stat: 'Cal. Civ. Code § 1951.2' },
  CO: { name: 'Colorado',       slug: 'colorado',        mit: true,  notice: 21, avgDays: 30,  dv: true,  cap: null,                                           stat: 'Colo. Rev. Stat. § 13-40-107.5' },
  CT: { name: 'Connecticut',    slug: 'connecticut',     mit: true,  notice: 30, avgDays: 40,  dv: true,  cap: null,                                           stat: 'Conn. Gen. Stat. § 47a-11d' },
  DE: { name: 'Delaware',       slug: 'delaware',        mit: true,  notice: 60, avgDays: 40,  dv: true,  cap: { months: 2,   text: "Penalty capped at 2 months' rent" },  stat: 'Del. Code Ann. tit. 25, § 5507' },
  FL: { name: 'Florida',        slug: 'florida',         mit: true,  notice: 30, avgDays: 35,  dv: true,  cap: null,                                           stat: 'Fla. Stat. § 83.595' },
  GA: { name: 'Georgia',        slug: 'georgia',         mit: true,  notice: 30, avgDays: 40,  dv: false, cap: null,                                           stat: 'O.C.G.A. § 44-7-1' },
  HI: { name: 'Hawaii',         slug: 'hawaii',          mit: true,  notice: 28, avgDays: 35,  dv: true,  cap: null,                                           stat: 'Haw. Rev. Stat. § 521-80' },
  ID: { name: 'Idaho',          slug: 'idaho',           mit: true,  notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Idaho Code § 6-301' },
  IL: { name: 'Illinois',       slug: 'illinois',        mit: true,  notice: 30, avgDays: 35,  dv: true,  cap: null,                                           stat: '735 ILCS 5/9-213.1' },
  IN: { name: 'Indiana',        slug: 'indiana',         mit: true,  notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Ind. Code § 32-31-3-12' },
  IA: { name: 'Iowa',           slug: 'iowa',            mit: true,  notice: 30, avgDays: 45,  dv: true,  cap: null,                                           stat: 'Iowa Code § 562A.29' },
  KS: { name: 'Kansas',         slug: 'kansas',          mit: true,  notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Kan. Stat. Ann. § 58-2565' },
  KY: { name: 'Kentucky',       slug: 'kentucky',        mit: true,  notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Ky. Rev. Stat. Ann. § 383.695' },
  LA: { name: 'Louisiana',      slug: 'louisiana',       mit: false, notice: 30, avgDays: 55,  dv: false, cap: null,                                           stat: 'La. Civ. Code Ann. art. 2695' },
  ME: { name: 'Maine',          slug: 'maine',           mit: true,  notice: 30, avgDays: 50,  dv: true,  cap: null,                                           stat: 'Me. Rev. Stat. tit. 14, § 6010-B' },
  MD: { name: 'Maryland',       slug: 'maryland',        mit: true,  notice: 30, avgDays: 35,  dv: false, cap: { months: 2,   text: "Penalty capped at 2 months' rent" },  stat: 'Md. Code, Real Property § 8-207' },
  MA: { name: 'Massachusetts',  slug: 'massachusetts',   mit: true,  notice: 30, avgDays: 28,  dv: true,  cap: null,                                           stat: 'Mass. Gen. Laws ch. 186, § 15B' },
  MI: { name: 'Michigan',       slug: 'michigan',        mit: true,  notice: 30, avgDays: 45,  dv: true,  cap: null,                                           stat: 'Mich. Comp. Laws § 554.601' },
  MN: { name: 'Minnesota',      slug: 'minnesota',       mit: true,  notice: 30, avgDays: 40,  dv: true,  cap: null,                                           stat: 'Minn. Stat. § 504B.206' },
  MS: { name: 'Mississippi',    slug: 'mississippi',     mit: false, notice: 30, avgDays: 55,  dv: false, cap: null,                                           stat: 'Miss. Code Ann. § 89-8-1' },
  MO: { name: 'Missouri',       slug: 'missouri',        mit: true,  notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Mo. Rev. Stat. § 441.880' },
  MT: { name: 'Montana',        slug: 'montana',         mit: true,  notice: 30, avgDays: 50,  dv: true,  cap: null,                                           stat: 'Mont. Code Ann. § 70-24-422' },
  NE: { name: 'Nebraska',       slug: 'nebraska',        mit: true,  notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Neb. Rev. Stat. § 76-1432' },
  NV: { name: 'Nevada',         slug: 'nevada',          mit: true,  notice: 30, avgDays: 35,  dv: true,  cap: null,                                           stat: 'Nev. Rev. Stat. § 118A.345' },
  NH: { name: 'New Hampshire',  slug: 'new-hampshire',   mit: true,  notice: 30, avgDays: 40,  dv: true,  cap: null,                                           stat: 'N.H. Rev. Stat. Ann. § 540:2' },
  NJ: { name: 'New Jersey',     slug: 'new-jersey',      mit: true,  notice: 30, avgDays: 30,  dv: true,  cap: null, etfOk: false,                            stat: 'N.J. Stat. Ann. § 2A:42-10.16' },
  NM: { name: 'New Mexico',     slug: 'new-mexico',      mit: true,  notice: 30, avgDays: 45,  dv: true,  cap: null,                                           stat: 'N.M. Stat. Ann. § 47-8-37' },
  NY: { name: 'New York',       slug: 'new-york',        mit: true,  notice: 30, avgDays: 25,  dv: true,  cap: null,                                           stat: 'N.Y. Real Prop. Law § 227-e' },
  NC: { name: 'North Carolina', slug: 'north-carolina',  mit: true,  notice: 30, avgDays: 40,  dv: true,  cap: null,                                           stat: 'N.C. Gen. Stat. § 42-3' },
  ND: { name: 'North Dakota',   slug: 'north-dakota',    mit: true,  notice: 30, avgDays: 50,  dv: false, cap: null,                                           stat: 'N.D. Cent. Code § 47-16-13.4' },
  OH: { name: 'Ohio',           slug: 'ohio',            mit: true,  notice: 30, avgDays: 40,  dv: false, cap: null,                                           stat: 'Ohio Rev. Code § 5321.17' },
  OK: { name: 'Oklahoma',       slug: 'oklahoma',        mit: true,  notice: 30, avgDays: 45,  dv: false, cap: null,                                           stat: 'Okla. Stat. tit. 41, § 122' },
  OR: { name: 'Oregon',         slug: 'oregon',          mit: true,  notice: 30, avgDays: 30,  dv: true,  cap: { months: 1.5, text: "ETF capped at 1.5 months' rent with proper notice" }, stat: 'Or. Rev. Stat. § 90.302' },
  PA: { name: 'Pennsylvania',   slug: 'pennsylvania',    mit: true,  notice: 30, avgDays: 40,  dv: false, cap: null,                                           stat: '68 Pa. Cons. Stat. § 250.501' },
  RI: { name: 'Rhode Island',   slug: 'rhode-island',    mit: true,  notice: 30, avgDays: 40,  dv: true,  cap: null,                                           stat: 'R.I. Gen. Laws § 34-18-38' },
  SC: { name: 'South Carolina', slug: 'south-carolina',  mit: true,  notice: 30, avgDays: 40,  dv: false, cap: null,                                           stat: 'S.C. Code Ann. § 27-40-730' },
  SD: { name: 'South Dakota',   slug: 'south-dakota',    mit: true,  notice: 30, avgDays: 50,  dv: false, cap: null,                                           stat: 'S.D. Codified Laws § 43-32-12' },
  TN: { name: 'Tennessee',      slug: 'tennessee',       mit: true,  notice: 30, avgDays: 35,  dv: false, cap: null,                                           stat: 'Tenn. Code Ann. § 66-28-507' },
  TX: { name: 'Texas',          slug: 'texas',           mit: true,  notice: 30, avgDays: 35,  dv: true,  cap: null,                                           stat: 'Tex. Prop. Code § 91.006' },
  UT: { name: 'Utah',           slug: 'utah',            mit: true,  notice: 30, avgDays: 35,  dv: true,  cap: null,                                           stat: 'Utah Code Ann. § 57-22-6' },
  VT: { name: 'Vermont',        slug: 'vermont',         mit: true,  notice: 30, avgDays: 50,  dv: true,  cap: null,                                           stat: 'Vt. Stat. Ann. tit. 9, § 4467' },
  VA: { name: 'Virginia',       slug: 'virginia',        mit: true,  notice: 30, avgDays: 35,  dv: true,  cap: null,                                           stat: 'Va. Code Ann. § 55.1-1251' },
  WA: { name: 'Washington',     slug: 'washington',      mit: true,  notice: 20, avgDays: 28,  dv: true,  cap: null,                                           stat: 'Wash. Rev. Code § 59.18.575' },
  WV: { name: 'West Virginia',  slug: 'west-virginia',   mit: false, notice: 30, avgDays: 60,  dv: false, cap: null,                                           stat: 'W. Va. Code § 37-6-30' },
  WI: { name: 'Wisconsin',      slug: 'wisconsin',       mit: true,  notice: 28, avgDays: 40,  dv: true,  cap: null,                                           stat: 'Wis. Stat. § 704.29' },
  WY: { name: 'Wyoming',        slug: 'wyoming',         mit: false, notice: 30, avgDays: 55,  dv: false, cap: null,                                           stat: 'Wyo. Stat. Ann. § 1-21-1206' },
  DC: { name: 'Washington D.C.', slug: 'washington-dc',  mit: true,  notice: 30, avgDays: 25,  dv: true,  cap: null,                                           stat: 'D.C. Code § 42-3505.51' },
};

const outDir = path.join(__dirname, '..');

Object.entries(STATES).forEach(([abbr, state]) => {
  const dir = path.join(outDir, state.slug);
  fs.mkdirSync(dir, { recursive: true });

  const mitText = state.mit
    ? `${state.name} law requires landlords to actively re-rent the unit — you only owe rent until a new tenant moves in.`
    : `Warning: ${state.name} does not require landlords to re-rent. You may owe all remaining rent.`;

  const capText = state.cap
    ? `<p><strong>State cap:</strong> ${state.name} limits your total penalty to ${state.cap.months} months' rent.</p>`
    : '';

  const etfText = state.etfOk === false
    ? `<p><strong>Note:</strong> ${state.name} generally does not enforce flat early termination fees — landlords are limited to actual lost rent.</p>`
    : '';

  const dvText = state.dv
    ? `<p><strong>Domestic violence protection:</strong> ${state.name} allows survivors to exit a lease without financial penalty with proper documentation.</p>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${state.name} Lease Break Penalty Calculator — Early Termination Cost in ${abbr}</title>
  <meta name="description" content="Calculate your lease break penalty in ${state.name}. ${mitText} Free estimate based on ${abbr} landlord-tenant law (${state.stat})." />
  <link rel="canonical" href="https://earlyleaseterminationcalculator.com/${state.slug}/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${state.name} Lease Break Penalty Calculator" />
  <meta property="og:description" content="${mitText}" />
  <meta property="og:url" content="https://earlyleaseterminationcalculator.com/${state.slug}/" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "${state.name} Lease Break Penalty Calculator",
    "description": "${mitText}",
    "url": "https://earlyleaseterminationcalculator.com/${state.slug}/",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  }
  </script>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: system-ui, sans-serif; background: #FAF7F2; color: #1C1A18; line-height: 1.6; }
    .prose { max-width: 680px; margin: 40px auto; padding: 0 20px 32px; }
    h1 { font-size: 26px; font-weight: 600; margin-bottom: 14px; }
    p { font-size: 15px; color: #5C5751; margin-bottom: 10px; }
    strong { color: #1C1A18; }
    .meta { font-size: 13px; color: #9C9890; margin-top: 16px; }
    iframe { display: block; width: 100%; border: none; min-height: 820px; }
  </style>
</head>
<body>
  <div class="prose">
    <h1>${state.name} Lease Break Penalty Calculator</h1>
    <p>${mitText}</p>
    ${capText}
    ${etfText}
    ${dvText}
    <p>Average re-rental time in ${state.name}: approximately <strong>${state.avgDays} days</strong>. Required notice: <strong>${state.notice} days</strong>.</p>
    <p class="meta">Governing law: ${state.stat}</p>
  </div>
  <iframe
    src="/?state=${abbr}"
    id="calc-frame"
    title="Lease break penalty calculator"
  ></iframe>
</body>
</html>`;

  fs.writeFileSync(path.join(dir, 'index.html'), html);
  console.log(`Generated /${state.slug}/`);
});

console.log(`\nDone — ${Object.keys(STATES).length} state pages generated.`);
