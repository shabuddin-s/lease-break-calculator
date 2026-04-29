// ── State data ──────────────────────────────────────────────────────────────
const STATES = {
  AL: { name: "Alabama", mit: false, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Alabama does not require landlords to re-rent. Your landlord can pursue all remaining rent if the unit sits vacant.", stat: "Ala. Code § 35-9A-401" },
  AK: { name: "Alaska", mit: true, notice: 30, cap: null, avgDays: 60, etfOk: true, dv: true, notes: "Landlord must make reasonable efforts to find a new tenant. Domestic violence survivors can exit with documentation.", stat: "Alaska Stat. § 34.03.230" },
  AZ: { name: "Arizona", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Strong mitigation law. Phoenix and Scottsdale re-rent fast, which typically works in your favor.", stat: "Ariz. Rev. Stat. § 33-1370" },
  AR: { name: "Arkansas", mit: false, notice: 30, cap: null, avgDays: 50, etfOk: true, dv: false, notes: "Arkansas does not require landlords to re-rent. High-risk state for tenants breaking a lease.", stat: "Ark. Code Ann. § 18-17-101" },
  CA: { name: "California", mit: true, notice: 30, cap: null, avgDays: 28, etfOk: true, dv: true, notes: "Strong tenant protections. Landlord must re-rent at fair market value. Fast market in most metros.", stat: "Cal. Civ. Code § 1951.2" },
  CO: { name: "Colorado", mit: true, notice: 21, cap: null, avgDays: 30, etfOk: true, dv: true, notes: "Mitigation required. Only 21 days notice needed. Domestic violence survivors can exit with 3 days notice.", stat: "Colo. Rev. Stat. § 13-40-107.5" },
  CT: { name: "Connecticut", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: true, notes: "Landlord must actively try to re-rent. Your liability ends when a new tenant moves in.", stat: "Conn. Gen. Stat. § 47a-11d" },
  DE: { name: "Delaware", mit: true, notice: 60, cap: { months: 2, text: "Penalty capped at 2 months' rent" }, avgDays: 40, etfOk: true, dv: true, notes: "Delaware caps your total penalty at 2 months' rent — one of the strongest tenant protections in the US.", stat: "Del. Code Ann. tit. 25, § 5507" },
  FL: { name: "Florida", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Landlord must re-rent. Domestic violence survivors can exit with 30-day notice and documentation.", stat: "Fla. Stat. § 83.595" },
  GA: { name: "Georgia", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: false, notes: "Courts require landlords to mitigate. Your liability reduces once a new tenant is found.", stat: "O.C.G.A. § 44-7-1" },
  HI: { name: "Hawaii", mit: true, notice: 28, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors may exit with documentation.", stat: "Haw. Rev. Stat. § 521-80" },
  ID: { name: "Idaho", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Mitigation required under common law. Tenant owes until unit is re-rented.", stat: "Idaho Code § 6-301" },
  IL: { name: "Illinois", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Mitigation required by statute. Chicago has additional tenant protections under local ordinance.", stat: "735 ILCS 5/9-213.1" },
  IN: { name: "Indiana", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Courts require mitigation under contract principles.", stat: "Ind. Code § 32-31-3-12" },
  IA: { name: "Iowa", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors may exit with documentation.", stat: "Iowa Code § 562A.29" },
  KS: { name: "Kansas", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Mitigation required. You owe rent until the unit is re-rented or the lease ends.", stat: "Kan. Stat. Ann. § 58-2565" },
  KY: { name: "Kentucky", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Mitigation required under URLTA. Standard process applies.", stat: "Ky. Rev. Stat. Ann. § 383.695" },
  LA: { name: "Louisiana", mit: false, notice: 30, cap: null, avgDays: 55, etfOk: true, dv: false, notes: "Louisiana follows civil law — no mitigation duty. One of the most landlord-friendly states in the US.", stat: "La. Civ. Code Ann. art. 2695" },
  ME: { name: "Maine", mit: true, notice: 30, cap: null, avgDays: 50, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors can exit with documentation.", stat: "Me. Rev. Stat. tit. 14, § 6010-B" },
  MD: { name: "Maryland", mit: true, notice: 30, cap: { months: 2, text: "Penalty capped at 2 months' rent" }, avgDays: 35, etfOk: true, dv: false, notes: "Maryland caps your total penalty at 2 months' rent. Mitigation still required.", stat: "Md. Code, Real Property § 8-207" },
  MA: { name: "Massachusetts", mit: true, notice: 30, cap: null, avgDays: 28, etfOk: true, dv: true, notes: "Strong mitigation requirement. Boston metro re-rents in roughly 28 days.", stat: "Mass. Gen. Laws ch. 186, § 15B" },
  MI: { name: "Michigan", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors can exit. You owe until unit is re-rented.", stat: "Mich. Comp. Laws § 554.601" },
  MN: { name: "Minnesota", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: true, notes: "Strong mitigation duty. Minneapolis and St. Paul have additional tenant protections.", stat: "Minn. Stat. § 504B.206" },
  MS: { name: "Mississippi", mit: false, notice: 30, cap: null, avgDays: 55, etfOk: true, dv: false, notes: "Mississippi does not require mitigation. Landlord can pursue all remaining rent.", stat: "Miss. Code Ann. § 89-8-1" },
  MO: { name: "Missouri", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Mitigation required under common law. ETF clauses are enforceable.", stat: "Mo. Rev. Stat. § 441.880" },
  MT: { name: "Montana", mit: true, notice: 30, cap: null, avgDays: 50, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors have exit rights.", stat: "Mont. Code Ann. § 70-24-422" },
  NE: { name: "Nebraska", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Mitigation required under URLTA. Standard framework applies.", stat: "Neb. Rev. Stat. § 76-1432" },
  NV: { name: "Nevada", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Strong mitigation duty. Domestic violence survivors can exit with 30-day notice and documentation.", stat: "Nev. Rev. Stat. § 118A.345" },
  NH: { name: "New Hampshire", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors have exit rights.", stat: "N.H. Rev. Stat. Ann. § 540:2" },
  NJ: { name: "New Jersey", mit: true, notice: 30, cap: null, avgDays: 30, etfOk: false, dv: true, notes: "Very strong tenant protections. Flat ETF fees are generally unenforceable — landlord is limited to actual lost rent only.", stat: "N.J. Stat. Ann. § 2A:42-10.16" },
  NM: { name: "New Mexico", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors may exit with documentation.", stat: "N.M. Stat. Ann. § 47-8-37" },
  NY: { name: "New York", mit: true, notice: 30, cap: null, avgDays: 25, etfOk: true, dv: true, notes: "Mitigation required since 2019. NYC re-rental market is extremely fast — often under 30 days.", stat: "N.Y. Real Prop. Law § 227-e" },
  NC: { name: "North Carolina", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors can exit with 30-day notice and documentation.", stat: "N.C. Gen. Stat. § 42-3" },
  ND: { name: "North Dakota", mit: true, notice: 30, cap: null, avgDays: 50, etfOk: true, dv: false, notes: "Mitigation required. Slower re-rental market in most of the state.", stat: "N.D. Cent. Code § 47-16-13.4" },
  OH: { name: "Ohio", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: false, notes: "Mitigation required under ORC 5321.", stat: "Ohio Rev. Code § 5321.17" },
  OK: { name: "Oklahoma", mit: true, notice: 30, cap: null, avgDays: 45, etfOk: true, dv: false, notes: "Oklahoma adopted URLTA. Mitigation required.", stat: "Okla. Stat. tit. 41, § 122" },
  OR: { name: "Oregon", mit: true, notice: 30, cap: { months: 1.5, text: "ETF capped at 1.5 months' rent with proper notice" }, avgDays: 30, etfOk: true, dv: true, notes: "Oregon caps early termination fees at 1.5 months' rent. Domestic violence survivors may exit immediately.", stat: "Or. Rev. Stat. § 90.302" },
  PA: { name: "Pennsylvania", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: false, notes: "Mitigation required under common law. Philadelphia has additional tenant protections.", stat: "68 Pa. Cons. Stat. § 250.501" },
  RI: { name: "Rhode Island", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors may exit with 30-day notice.", stat: "R.I. Gen. Laws § 34-18-38" },
  SC: { name: "South Carolina", mit: true, notice: 30, cap: null, avgDays: 40, etfOk: true, dv: false, notes: "URLTA adopted. Mitigation required. Your liability reduces once a new tenant is found.", stat: "S.C. Code Ann. § 27-40-730" },
  SD: { name: "South Dakota", mit: true, notice: 30, cap: null, avgDays: 50, etfOk: true, dv: false, notes: "Mitigation required. Slower re-rental market in most areas.", stat: "S.D. Codified Laws § 43-32-12" },
  TN: { name: "Tennessee", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: false, notes: "URLTA adopted. Mitigation required. Nashville metro re-rents faster than rural areas.", stat: "Tenn. Code Ann. § 66-28-507" },
  TX: { name: "Texas", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Texas law explicitly requires landlords to mitigate. Reletting fees are separate and chargeable. Domestic violence survivors can exit under § 92.016.", stat: "Tex. Prop. Code § 91.006" },
  UT: { name: "Utah", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence protection available. Fast re-rental in Salt Lake City.", stat: "Utah Code Ann. § 57-22-6" },
  VT: { name: "Vermont", mit: true, notice: 30, cap: null, avgDays: 50, etfOk: true, dv: true, notes: "Mitigation required. Domestic violence survivors may exit. Slower rural re-rental market.", stat: "Vt. Stat. Ann. tit. 9, § 4467" },
  VA: { name: "Virginia", mit: true, notice: 30, cap: null, avgDays: 35, etfOk: true, dv: true, notes: "Virginia VRLTA requires mitigation. Northern Virginia market re-rents quickly.", stat: "Va. Code Ann. § 55.1-1251" },
  WA: { name: "Washington", mit: true, notice: 20, cap: null, avgDays: 28, etfOk: true, dv: true, notes: "Only 20 days notice required. Domestic violence survivors can exit immediately with documentation. Seattle re-rents very fast.", stat: "Wash. Rev. Code § 59.18.575" },
  WV: { name: "West Virginia", mit: false, notice: 30, cap: null, avgDays: 60, etfOk: true, dv: false, notes: "No mitigation required. Landlord can pursue all remaining rent. Slow re-rental market in most areas.", stat: "W. Va. Code § 37-6-30" },
  WI: { name: "Wisconsin", mit: true, notice: 28, cap: null, avgDays: 40, etfOk: true, dv: true, notes: "Wisconsin explicitly requires mitigation. Landlord can charge advertising costs but not personal time. Domestic violence survivors can exit.", stat: "Wis. Stat. § 704.29" },
  WY: { name: "Wyoming", mit: false, notice: 30, cap: null, avgDays: 55, etfOk: true, dv: false, notes: "Minimal landlord-tenant statute. No mitigation required. Landlord-friendly state.", stat: "Wyo. Stat. Ann. § 1-21-1206" },
  DC: { name: "Washington D.C.", mit: true, notice: 30, cap: null, avgDays: 25, etfOk: true, dv: true, notes: "Extremely strong tenant protections. Very fast re-rental market. Domestic violence survivors have broad exit rights.", stat: "D.C. Code § 42-3505.51" },
};

// ── State ──────────────────────────────────────────────────────────────────
const checks = { military: false, dv: false, etf: false };
let currentStep = 0;

// ── Init ──────────────────────────────────────────────────────────────────
(function init() {
  const sel = document.getElementById('state');
  Object.entries(STATES).sort((a, b) => a[1].name.localeCompare(b[1].name)).forEach(([k, v]) => {
    const o = document.createElement('option');
    o.value = k; o.textContent = v.name;
    sel.appendChild(o);
  });
  // window.PRESET_STATE is set by state landing pages before this script loads
  const preset = window.PRESET_STATE ||
    new URLSearchParams(window.location.search).get('state');
  if (preset) { sel.value = preset; if (sel.value) onStateChange(); }
})();

// ── Helpers ──────────────────────────────────────────────────────────────
const cur = n => '$' + Math.round(n).toLocaleString('en-US');

function v(id) { return document.getElementById(id); }

function toggle(key) {
  checks[key] = !checks[key];
  const cb = v('cb-' + key);
  cb.classList.toggle('checked', checks[key]);
  validate();
}

function toggleETF() {
  checks.etf = !checks.etf;
  v('cb-etf').classList.toggle('checked', checks.etf);
  v('etf-field').style.display = checks.etf ? 'block' : 'none';
  // Show NJ warning
  const state = v('state').value;
  const rules = STATES[state];
  if (rules && !rules.etfOk && checks.etf) {
    v('etf-note').textContent = 'Good news: ' + rules.name + ' generally does not enforce flat ETF fees — your landlord is limited to actual losses.';
    v('etf-note').style.display = 'block';
  } else {
    v('etf-note').style.display = 'none';
  }
}

function onStateChange() {
  const state = v('state').value;
  const note = v('state-note');
  if (!state) { note.className = 'state-note'; return; }
  const rules = STATES[state];
  note.textContent = rules.notes;
  note.className = 'state-note visible' + (rules.mit ? '' : ' warn-state');
  validate();
  updateNoticeHint();
  updateExposure();
}

function validate() {
  const state = v('state').value;
  const rent = Number(v('rent').value);
  v('btn-0').disabled = !(state && rent > 0);

  const months = Number(v('months') && v('months').value);
  if (v('btn-1')) v('btn-1').disabled = !(months > 0);

  updateExposure();
}

function updateNoticeHint() {
  const state = v('state').value;
  const noticeEl = v('notice');
  const hintEl = v('notice-hint');
  if (!state || !noticeEl) return;
  const rules = STATES[state];
  const given = Number(noticeEl.value) || 0;
  if (given >= rules.notice) {
    hintEl.textContent = 'Meets the ' + rules.notice + '-day requirement in ' + rules.name + ' ✓';
    hintEl.className = 'field-hint good';
  } else {
    hintEl.textContent = rules.name + ' requires ' + rules.notice + ' days — you\'re ' + (rules.notice - given) + ' short';
    hintEl.className = 'field-hint warn';
  }
}

function updateExposure() {
  const rent = Number(v('rent') && v('rent').value) || 0;
  const months = Number(v('months') && v('months').value) || 0;
  const box = v('exposure-box');
  if (!box) return;
  if (rent > 0 && months > 0) {
    box.style.display = 'block';
    v('exposure-amount').textContent = cur(rent * months);
    const state = v('state').value;
    const rules = state ? STATES[state] : null;
    const noteEl = v('exposure-note');
    if (rules) {
      if (rules.mit) {
        noteEl.textContent = rules.name + ' requires landlords to actively re-rent — your actual cost will very likely be lower than this ceiling.';
        noteEl.style.color = 'var(--sage)';
      } else {
        noteEl.textContent = 'Note: ' + rules.name + ' has no mitigation requirement. Work through the next steps to see your realistic range.';
        noteEl.style.color = 'var(--amber)';
      }
    } else {
      noteEl.textContent = '';
    }
  } else {
    box.style.display = 'none';
  }
}

// ── Navigation ──────────────────────────────────────────────────────────
const stepNames = ['About your lease', 'Lease timeline', 'Lease clauses'];

function goStep(n) {
  v('step-' + currentStep).classList.remove('active');
  currentStep = n;
  v('step-' + currentStep).classList.add('active');

  // Progress
  [0, 1, 2].forEach(i => {
    v('seg-' + i).classList.toggle('active', i <= n);
  });
  v('progress-label').textContent = stepNames[n] + ' · Step ' + (n + 1) + ' of 3';

  if (n === 1) { updateNoticeHint(); updateExposure(); validate(); }
}

// ── Calculate ───────────────────────────────────────────────────────────
function calculate() {
  const state = v('state').value;
  const rent = Number(v('rent').value);
  const months = Number(v('months').value);
  const notice = Number(v('notice').value) || 0;
  const etfAmt = checks.etf ? (Number(v('etf').value) || 0) : 0;
  const relet = Number(v('relet').value) || 0;

  const rules = STATES[state];
  const base = rent * months;
  const etf = checks.etf && rules.etfOk ? etfAmt : 0;
  const properNotice = notice >= rules.notice;
  const noticeCredit = (properNotice && rules.mit) ? Math.min(notice / 30, months) : 0;
  const avgM = rules.avgDays / 30;
  const fastM = Math.max(0.5, avgM * 0.4);

  // Protected exits
  if (checks.military) {
    showProtected({
      title: 'You qualify for military protection',
      body: 'The Servicemembers Civil Relief Act (SCRA) lets you exit your lease with zero penalty. Give your landlord 30 days\' written notice along with a copy of your deployment or PCS orders.',
      note: 'We recommend confirming your documentation requirements with a JAG officer or legal assistance office on your base.',
      state: rules.name
    });
    return;
  }
  if (checks.dv && rules.dv) {
    showProtected({
      title: 'You may qualify for a protected exit',
      body: rules.name + ' law allows survivors of domestic violence to terminate a lease without financial penalty. You\'ll need to provide documentation and give ' + rules.notice + ' days\' written notice.',
      note: 'We recommend reaching out to a local domestic violence advocacy organization or tenant rights group to confirm the process in your area.',
      state: rules.name
    });
    return;
  }

  // Compute
  let worst, likely, best;
  if (!rules.mit) {
    worst = base + relet;
    likely = rent * Math.min(avgM * 1.5, months) + relet;
    best = rent * Math.min(fastM * 2, months) + relet;
  } else if (etf > 0) {
    worst = etf + relet;
    likely = etf + relet;
    best = Math.max(0, etf - (properNotice ? rent * 0.5 : 0) + relet);
  } else {
    worst = base * 0.95 + relet;
    likely = Math.max(0, rent * Math.min(avgM, months) - rent * noticeCredit + relet);
    best = Math.max(0, rent * fastM - rent * noticeCredit + relet);
  }
  if (rules.cap) {
    const capAmt = rules.cap.months * rent;
    worst = Math.min(worst, capAmt);
    likely = Math.min(likely, capAmt);
    best = Math.min(best, capAmt);
  }
  worst = Math.round(Math.max(0, worst));
  likely = Math.round(Math.max(0, likely));
  best = Math.round(Math.max(0, best));
  worst = Math.max(worst, likely);
  best = Math.min(best, likely);
  const savings = worst - best;

  // Build facts
  const facts = [
    {
      cls: rules.mit ? 'good' : 'bad',
      text: rules.mit
        ? 'Landlord is legally required to actively re-rent the unit'
        : 'No mitigation law in ' + rules.name + ' — landlord can let the unit sit vacant'
    },
    {
      cls: properNotice ? 'good' : 'bad',
      text: properNotice
        ? 'You\'re giving proper notice (' + rules.notice + ' days required ✓)'
        : 'Notice gap: ' + rules.notice + ' days required — send written notice immediately'
    },
    ...(rules.cap ? [{ cls: 'good', text: 'State cap: maximum ' + rules.cap.months + ' months\' rent (' + cur(rules.cap.months * rent) + ')' }] : []),
    ...(etf > 0 ? [{ cls: 'neutral', text: 'Flat ETF clause (' + cur(etf) + ') replaces the per-month formula' }] : []),
    { cls: 'neutral', text: 'Average re-rent time in ' + rules.name + ': ' + rules.avgDays + ' days' },
    { cls: 'neutral', text: 'Law: ' + rules.stat },
  ];

  const tips = [
    { hi: true, tip: 'Offer to find your own replacement tenant. This is the single highest-leverage action you can take.' },
    { hi: true, tip: 'Send written notice today, even if you\'re past the ideal window. Every day of notice counts.' },
    {
      hi: false, tip: rules.mit
        ? 'Track your landlord\'s re-renting efforts. If they\'re not actively trying, you can dispute charges in court.'
        : rules.name + ' has no mitigation law — your strongest move is negotiating a written mutual release agreement.'
    },
    { hi: false, tip: 'Propose a lump-sum settlement below the worst case. Most landlords prefer a certain payment over the cost and uncertainty of court.' },
    { hi: false, tip: 'Review your lease and the unit for habitability problems. If your landlord failed to maintain the property, you may have legal grounds to exit without penalty.' },
  ];

  showResult({ likely, best, worst, savings, rules, months, rent, avgM, fastM, facts, tips });
}

function showProtected({ title, body, note, state }) {
  switchToResult();
  v('step-result').innerHTML = `
    <div class="protected-card">
      <div class="protected-icon">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path d="M11 2L4 5.5V10c0 4 2.8 7.7 7 9 4.2-1.3 7-5 7-9V5.5L11 2z"
            stroke="var(--sage)" stroke-width="1.5" fill="none" stroke-linejoin="round"/>
          <path d="M8 11l2 2 4-4" stroke="var(--sage)" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="protected-title">${title}</div>
      <div class="protected-body">${body}</div>
      <div class="protected-zero">$0 owed</div>
    </div>
    <div class="protected-note">${note}</div>
    <button class="btn btn-reset" onclick="restart()">← Start over</button>
  `;
}

function showResult({ likely, best, worst, savings, rules, months, rent, avgM, fastM, facts, tips }) {
  switchToResult();

  const contextMsg = rules.mit
    ? `Based on ${rules.name}'s average re-rent time of ${rules.avgDays} days. Your landlord is legally required to find a new tenant.`
    : `Warning: ${rules.name} does not require your landlord to re-rent. Your actual cost could reach the worst-case figure.`;

  const savingsBanner = savings > 300 ? `
    <div class="savings-banner">
      <div>
        <div style="font-size:12px;color:var(--sage);font-weight:500;margin-bottom:3px">Potential savings</div>
        <div class="savings-number">${cur(savings)}</div>
      </div>
      <div class="savings-note">gap between worst and best case — the actions below can help close it</div>
    </div>
  ` : '';

  const factsHtml = facts.map(f => `
    <div class="fact-item">
      <div class="fact-dot ${f.cls}"></div>
      <span class="fact-text ${f.cls}">${f.text}</span>
    </div>
  `).join('');

  const tipsHtml = tips.map(t => `
    <div class="tip-item ${t.hi ? 'hi' : 'lo'}">
      <span class="tip-arrow">→</span>
      <span>${t.tip}</span>
    </div>
  `).join('');

  v('step-result').innerHTML = `
    <div class="result-hero">
      <div class="result-eyebrow">Your most likely cost</div>
      <div class="result-amount">${cur(likely)}</div>
      <div class="result-context">${contextMsg}</div>
    </div>

    <p style="font-size:13px;color:var(--ink-faint);margin-bottom:10px;font-weight:500;letter-spacing:0.04em;text-transform:uppercase;font-size:11px">Your range, based on how quickly your landlord re-rents</p>
    <div class="scenarios-grid">
      <div class="scenario-card best">
        <div class="scenario-label">Best case</div>
        <div class="scenario-amount">${cur(best)}</div>
        <div class="scenario-sub">Re-rented in ~${Math.round(fastM * 30)} days${rules.mit ? '' : ' (landlord cooperates)'}</div>
      </div>
      <div class="scenario-card likely">
        <div class="scenario-label">Most likely</div>
        <div class="scenario-amount">${cur(likely)}</div>
        <div class="scenario-sub">~${rules.avgDays}-day re-rent (${rules.name} average)</div>
      </div>
      <div class="scenario-card worst">
        <div class="scenario-label">Worst case</div>
        <div class="scenario-amount">${cur(worst)}</div>
        <div class="scenario-sub">${rules.mit ? 'Minimal re-renting effort by landlord' : 'No mitigation law — landlord pursues full amount'}</div>
      </div>
    </div>

    ${savingsBanner}

    <div style="margin-bottom:20px">
      <div class="section-label">How ${rules.name} law applies to your situation</div>
      ${factsHtml}
    </div>

    <div style="margin-bottom:4px">
      <div class="section-label">Steps you can take to reduce what you owe</div>
      ${tipsHtml}
    </div>

    <div class="disclaimer">
      <strong>This is an estimate, not legal advice.</strong> Your actual liability depends on your specific lease terms, local ordinances, and circumstances. A tenant rights organization or legal aid office in ${rules.name} can give you guidance specific to your situation.
    </div>

    <button class="btn btn-reset" onclick="restart()">← Start over</button>
  `;
}

function switchToResult() {
  v('step-' + currentStep).classList.remove('active');
  currentStep = 'result';
  v('step-result').classList.add('active');
  v('card-header').style.display = 'none';
  v('progress-wrap').style.display = 'none';

  // Add result header
  const header = v('card-header');
  header.innerHTML = `
    <p class="eyebrow">Your personalized lease break assessment</p>
    <h1 class="title" style="font-size:22px;margin-bottom:0">Here's what you're likely looking at</h1>
  `;
  header.style.display = 'block';
}

function restart() {
  v('step-result').classList.remove('active');
  currentStep = 0;
  v('step-0').classList.add('active');

  // Reset header
  v('card-header').innerHTML = `
    <p class="eyebrow">Your personalized lease break assessment</p>
    <h1 class="title">Most tenants owe far less than they fear.</h1>
    <p class="subtitle">Tell us about your situation and we'll calculate exactly what you owe under your state's law — and show you how to reduce it.</p>
  `;
  v('progress-wrap').style.display = 'block';
  [0, 1, 2].forEach(i => v('seg-' + i).classList.toggle('active', i === 0));
  v('progress-label').textContent = 'About your lease · Step 1 of 3';

  // Reset form
  const currentState = v('state').value;
  v('rent').value = '';
  v('months').value = '';
  v('notice').value = '30';
  v('etf').value = '';
  v('relet').value = '';
  checks.military = false; checks.dv = false; checks.etf = false;
  v('cb-military').classList.remove('checked');
  v('cb-dv').classList.remove('checked');
  v('cb-etf').classList.remove('checked');
  v('etf-field').style.display = 'none';
  v('state').value = currentState;
  if (currentState) onStateChange(); else v('btn-0').disabled = true;
  v('step-result').innerHTML = '';
}
