// ── ENGINE KNOWLEDGE BASE ──────────────────────────────────────────────────

const JURISDICTIONS = {
  singapore: {
    name: "Singapore",
    tag: "Gold Standard",
    strengths: ["World-class rule of law", "Predictable courts", "VCC structure", "Digital asset framework", "Global brand recognition"],
    weaknesses: ["Highest cost in region", "Scarce talent, high turnover", "Intrusive regulator", "12–18 month setup timeline", "Fujian overlay affects China-connected files"],
    bestFor: ["Families valuing certainty above all", "Complex multi-branch structures", "Digital asset holding", "Families willing to pay premium"],
    notFor: ["Price-sensitive families", "Families needing fast setup", "Simple structures"],
    setupTime: "12–18 months",
    costIndex: "High ($$$$)",
    legalCertainty: 5,
    taxEfficiency: 3,
    speed: 1,
    cost: 1,
    reputation: 5,
    vehicles: ["Private Trust", "Variable Capital Company (VCC)", "Private Trust Company"],
    keyRisk: "Compliance overreach; Fujian overlay for China-connected clients",
    islamicCompliance: false,
    digitalAssets: true,
  },
  hongkong: {
    name: "Hong Kong",
    tag: "China Gateway",
    strengths: ["Unique China access (Stock Connect, Bond Connect)", "Lower cost than Singapore", "Simple low tax regime", "Fast approval", "OFC vehicle"],
    weaknesses: ["National security law shadow", "Thinned talent pool post-2020", "Evergrande hangover affecting compliance", "Geopolitical uncertainty"],
    bestFor: ["Families with mainland China exposure", "Manufacturing and trading families", "Renminbi-denominated asset holders", "Families returning from Singapore (boomerang effect)"],
    notFor: ["Politically exposed persons", "Families needing absolute predictability", "Non-China connected families"],
    setupTime: "3–6 months",
    costIndex: "Medium ($$$)",
    legalCertainty: 3,
    taxEfficiency: 4,
    speed: 4,
    cost: 3,
    reputation: 3,
    vehicles: ["Open-ended Fund Company (OFC)", "Limited Partnership Fund (LPF)", "Private Trust"],
    keyRisk: "National security law exposure; developer bond contamination",
    islamicCompliance: false,
    digitalAssets: true,
  },
  dubai: {
    name: "Dubai (DIFC)",
    tag: "Zero Tax Hub",
    strengths: ["Zero personal and corporate income tax", "Fast setup (weeks)", "DIFC actively courts business", "Strong wealth inflow from conflict zones"],
    weaknesses: ["No contested trust case law", "Borrowed untested statute", "Climate/infrastructure risk", "Geopolitical exposure"],
    bestFor: ["Tax efficiency priority families", "Middle East based families", "Families comfortable with pioneer risk", "Fast-moving transactions"],
    notFor: ["Families needing legal certainty", "Complex disputed structures", "Politically sensitive families"],
    setupTime: "4–8 weeks",
    costIndex: "Medium ($$$)",
    legalCertainty: 1,
    taxEfficiency: 5,
    speed: 5,
    cost: 3,
    reputation: 3,
    vehicles: ["DIFC Trust", "DIFC Foundation", "Combined Singapore+Dubai structure"],
    keyRisk: "Zero trust case law; war escalation; zero-tax regime narrowing",
    islamicCompliance: true,
    digitalAssets: true,
  },
  abudhabi: {
    name: "Abu Dhabi (ADGM)",
    tag: "Institutional Choice",
    strengths: ["Real trust case law (small but exists)", "ADIA co-investment access", "Purpose trust recognition", "Quality-over-quantity regulator", "Sovereign wealth proximity"],
    weaknesses: ["Slowest setup in region", "Higher cost than Dubai", "Detailed regulatory questioning", "Limited talent pool"],
    bestFor: ["Institutional families", "Families seeking ADIA co-investment", "Purpose trusts (historic properties, archives)", "Families who value quality over speed"],
    notFor: ["Families in a hurry", "Price-sensitive families", "Simple structures"],
    setupTime: "12–18 months",
    costIndex: "High ($$$$)",
    legalCertainty: 4,
    taxEfficiency: 5,
    speed: 1,
    cost: 2,
    reputation: 4,
    vehicles: ["ADGM Trust", "ADGM Foundation", "Purpose Trust"],
    keyRisk: "Regional volatility; still-developing case law",
    islamicCompliance: true,
    digitalAssets: true,
  },
  malaysia: {
    name: "Malaysia",
    tag: "Professional's Secret",
    strengths: ["Half the cost of Singapore", "Available experienced talent", "Mature trust legislation", "World's best Islamic wealth management", "MM2H residency synergy"],
    weaknesses: ["Weak international brand recognition", "Ringgit volatility", "Forest City/China developer contagion", "Less deep case law than Singapore"],
    bestFor: ["Price-sensitive families", "Muslim families requiring Sharia compliance", "Families wanting to live in Southeast Asia (MM2H)", "Indonesian and regional families"],
    notFor: ["Families needing global brand recognition", "Complex novel structures needing deep case law"],
    setupTime: "3–6 months",
    costIndex: "Low ($$)",
    legalCertainty: 3,
    taxEfficiency: 4,
    speed: 3,
    cost: 5,
    reputation: 2,
    vehicles: ["Malaysian Trust", "Islamic Trust", "Labuan Trust (offshore arm)"],
    keyRisk: "Ringgit exposure; China developer contagion spreading",
    islamicCompliance: true,
    digitalAssets: false,
  },
  labuan: {
    name: "Labuan",
    tag: "Offshore Hybrid",
    strengths: ["Lowest cost in region", "Hybrid offshore-onshore model", "World's only Islamic digital asset trust framework", "Deep personal relationships", "No stamp duty on transfers"],
    weaknesses: ["Reputational shadow (FATF scrutiny history)", "Bank counterparty due diligence overhead", "Thin case law", "Small market"],
    bestFor: ["Islamic digital asset structures", "Offshore flexibility seekers", "Relationship-oriented families", "Indonesian family groups"],
    notFor: ["Families needing global recognition", "Complex novel structures", "US-asset heavy families (legal opinion costs)"],
    setupTime: "2–4 months",
    costIndex: "Very Low ($)",
    legalCertainty: 2,
    taxEfficiency: 4,
    speed: 4,
    cost: 5,
    reputation: 1,
    vehicles: ["Labuan Trust", "Islamic Digital Asset Trust", "Labuan Foundation"],
    keyRisk: "Reputational counterparty friction; thin case law for novel structures",
    islamicCompliance: true,
    digitalAssets: true,
  },
  saudi: {
    name: "Saudi Arabia",
    tag: "Emerging Giant",
    strengths: ["PIF co-investment opportunity", "Family office awakening", "Strong political will", "First-mover advantage available now"],
    weaknesses: ["No trust law yet", "Uncertain timeline", "Sharia compliance mandatory", "Geopolitical risk"],
    bestFor: ["Patient first-movers", "Families with PIF-aligned assets", "Families already in region", "High risk tolerance families"],
    notFor: ["Families needing any legal certainty", "Families with conventional (non-Sharia) portfolios", "Anyone needing action today"],
    setupTime: "Not yet available",
    costIndex: "TBD",
    legalCertainty: 0,
    taxEfficiency: 5,
    speed: 0,
    cost: 0,
    reputation: 3,
    vehicles: ["Dubai Trust (bridge structure)", "Labuan Trust (bridge structure)"],
    keyRisk: "No legal framework yet; Sharia compliance requirement; geopolitical deterioration",
    islamicCompliance: true,
    digitalAssets: false,
  }
};

const ACTION_ENGINE = {
  ch1: {
    title: "Chapter 1 — Trust Fundamentals",
    actions: [
      "Identify and document the three core family concerns: children fighting, spouse protection, wealth duration",
      "Choose trustee based on responsiveness and relationship quality — not credentials alone",
      "Draft a beneficiary communication plan before trust deed is signed",
      "Build beneficiary education as a funded, scheduled obligation in the deed",
      "Schedule a trust review every 3 years minimum",
      "Evaluate trustee's AI administrative capabilities during selection",
    ]
  },
  ch2: {
    title: "Chapter 2 — Jurisdiction Selection",
    actions: [
      "Rank family priorities: certainty / tax efficiency / speed / cost / reputation",
      "Present minimum 3 jurisdiction options to every client",
      "Design multi-jurisdictional structure with restructuring pathways built in",
      "Match beneficiary age profile to trustee technology capability",
      "Review jurisdiction fit every 3 years or after major asset/residency change",
    ]
  },
  ch3: {
    title: "Chapter 3 — Offshore Migration",
    actions: [
      "Review all Caribbean/Channel Island structures for reputational risk immediately",
      "Build source of wealth documentation proactively and comprehensively",
      "Evaluate how trustee's model changed post-Panama Papers",
      "Treat economic substance as minimum baseline, not differentiator",
      "Assume any structure not reviewed since 2018 is suboptimal",
    ]
  },
  ch4: {
    title: "Chapter 4 — Singapore",
    actions: [
      "Open Singapore bank account before approaching any trustee",
      "Establish credible physical presence before filing applications",
      "Engage local compliance-connected adviser for China-linked files",
      "Budget 12-month minimum timeline and 20% cost contingency",
      "Use VCC for multi-branch families or digital asset exposure",
      "Ask trustees directly: 'What is your current regulatory standing?'",
    ]
  },
  ch5: {
    title: "Chapter 5 — Hong Kong",
    actions: [
      "Open HK bank account before committing to structure",
      "Prepare full China property developer counterparty disclosure upfront",
      "Calculate Hong Kong alternative cost if Singapore process exceeds 12 months",
      "Use OFC instead of VCC for cost-sensitive multi-branch structures",
      "Avoid HK for any file with political exposure in mainland China",
      "Request trustee's property developer bond exposure disclosure",
    ]
  },
  ch6: {
    title: "Chapter 6 — Dubai",
    actions: [
      "Always pair Dubai trust with Singapore trust for legal certainty backbone",
      "Include mandatory arbitration clause with trust-experienced arbitrators",
      "Commission geopolitical risk analysis before committing illiquid assets",
      "Budget explicit flood and climate insurance for physical Dubai assets",
      "Ask DIFC trustees how they manage legal uncertainty for existing clients",
    ]
  },
  ch7: {
    title: "Chapter 7 — Abu Dhabi",
    actions: [
      "Compare Dubai vs Abu Dhabi on risk-adjusted basis, not cost alone",
      "Commission personal narrative source of wealth document (not legal brief)",
      "Engage Abu Dhabi adviser with sovereign fund relationships before structuring",
      "Draft trustee discretion clauses for sanctions, strait closure, oil price disruption",
      "Plan 18-month minimum setup timeline",
      "Use ADGM for purpose trusts (historic properties, archives, philanthropy)",
    ]
  },
  ch8: {
    title: "Chapter 8 — Malaysia",
    actions: [
      "Always analyse Malaysia explicitly before defaulting to Singapore",
      "For Muslim families, start with Malaysia then work outward",
      "Structure MM2H application with trust from day one",
      "Open Malaysian bank account before approaching trustee",
      "Get Malaysian tax lawyer to confirm territorial tax treatment per asset class",
    ]
  },
  ch9: {
    title: "Chapter 9 — Labuan",
    actions: [
      "For Islamic digital asset structures, start with Labuan — only complete framework",
      "Commission reputational risk assessment specific to counterparty landscape",
      "Seek introduction from existing Labuan client before approaching trustees",
      "Budget US legal opinion costs for US-held assets",
      "Monitor Fusang as proxy for Labuan digital asset market maturity",
    ]
  },
  ch10: {
    title: "Chapter 10 — Saudi Arabia",
    actions: [
      "Monitor Saudi Ministry of Justice and CMA for trust law announcement",
      "Commission Sharia compliance audit of current portfolio now",
      "Build Saudi advisory relationships before law passes",
      "Structure current Saudi exposure through Dubai/Labuan bridge with restructuring pathway",
      "Treat giga-projects as speculative long-horizon positions only",
    ]
  },
  ch13: {
    title: "Chapter 13 — Value Chain",
    actions: [
      "Commission process-mapping exercise across all three value chain layers",
      "Quantify hours spent on document collection, accounting, regulatory filings",
      "Build custom software — do not rely on off-the-shelf platforms",
      "Keep administration headcount stable while automation is built",
      "Treat upstream advisory as retention tool, not growth engine",
    ]
  },
  ch15: {
    title: "Chapter 15 — Wealth Transfer",
    actions: [
      "Commission beneficiary experience audit — interview beneficiaries under 40",
      "Set 12-month deadline for deploying real-time beneficiary portal",
      "Hire software engineer with no trust background to evaluate processes",
      "Include under-40 beneficiaries in governance review process",
      "Require any trustee candidate to demonstrate functioning beneficiary portal",
    ]
  },
};

// ── ENGINE 1: SETTLOR/FAMILY ADVISOR ─────────────────────────────────────────

function runSettlorEngine() {
  const priority = document.getElementById('s-priority').value;
  const assets = document.getElementById('s-assets').value;
  const religion = document.getElementById('s-religion').value;
  const timeline = document.getElementById('s-timeline').value;
  const digital = document.getElementById('s-digital').value;
  const notes = document.getElementById('s-notes').value.trim();
  const situation = document.getElementById('s-situation').value;

  if (!priority || !assets || !timeline) {
    alert('Please fill in Priority, Asset Type, and Timeline before running the engine.');
    return;
  }

  const btn = document.getElementById('s-btn');
  btn.innerHTML = '<span class="spinner"></span> Analysing...';
  btn.disabled = true;

  setTimeout(() => {
    const scores = scoreJurisdictions(priority, assets, religion, timeline, digital, situation);
    const top3 = scores.slice(0, 3);
    renderSettlorOutput(top3, priority, assets, religion, timeline, digital, notes, situation);
    btn.innerHTML = 'Run Analysis';
    btn.disabled = false;
  }, 1200);
}

function scoreJurisdictions(priority, assets, religion, timeline, digital, situation) {
  const weights = {
    certainty:   { legalCertainty: 5, reputation: 3, taxEfficiency: 1, speed: 1, cost: 1 },
    tax:         { taxEfficiency: 5, speed: 3, legalCertainty: 2, reputation: 2, cost: 2 },
    speed:       { speed: 5, cost: 3, taxEfficiency: 2, legalCertainty: 1, reputation: 1 },
    cost:        { cost: 5, speed: 3, legalCertainty: 2, taxEfficiency: 2, reputation: 1 },
    reputation:  { reputation: 5, legalCertainty: 4, taxEfficiency: 2, speed: 1, cost: 1 },
  };
  const w = weights[priority] || weights.certainty;

  return Object.entries(JURISDICTIONS).map(([key, j]) => {
    if (j.name === "Saudi Arabia") return { key, j, score: 0 };

    let score =
      (j.legalCertainty * w.legalCertainty) +
      (j.taxEfficiency  * w.taxEfficiency)  +
      (j.speed          * w.speed)          +
      (j.cost           * w.cost)           +
      (j.reputation     * w.reputation);

    // Modifiers
    if (religion === 'muslim' && !j.islamicCompliance) score -= 15;
    if (religion === 'muslim' && j.islamicCompliance)  score += 8;
    if (digital === 'yes' && !j.digitalAssets)         score -= 10;
    if (digital === 'yes' && j.digitalAssets)          score += 5;
    if (timeline === 'urgent' && j.speed < 3)          score -= 12;
    if (timeline === 'urgent' && j.speed >= 4)         score += 8;
    if (assets === 'china' && key === 'hongkong')       score += 12;
    if (assets === 'me' && (key === 'dubai' || key === 'abudhabi')) score += 10;
    if (situation === 'offshore' && (key === 'labuan' || key === 'dubai')) score += 6;
    if (situation === 'conflict' && key === 'dubai')    score += 8;

    return { key, j, score };
  })
  .filter(x => x.score > 0)
  .sort((a, b) => b.score - a.score);
}

function renderSettlorOutput(top3, priority, assets, religion, timeline, digital, notes, situation) {
  const out = document.getElementById('s-output');
  out.classList.add('visible');

  const primaryJ = top3[0].j;
  const needsDual = priority === 'tax' || situation === 'conflict';

  const actionKeys = ['ch1', 'ch2'];
  if (primaryJ.name === 'Singapore') actionKeys.push('ch4');
  if (primaryJ.name === 'Hong Kong') actionKeys.push('ch5');
  if (primaryJ.name.includes('Dubai')) actionKeys.push('ch6');
  if (primaryJ.name.includes('Abu Dhabi')) actionKeys.push('ch7');
  if (primaryJ.name === 'Malaysia') actionKeys.push('ch8');
  if (primaryJ.name === 'Labuan') actionKeys.push('ch9');

  const relevantActions = actionKeys.flatMap(k => ACTION_ENGINE[k]?.actions || []).slice(0, 8);

  out.innerHTML = `
    <h4>📋 Analysis Complete — Recommended Structure</h4>

    <div class="output-section">
      <h5>Primary Jurisdiction</h5>
      <p><strong>${primaryJ.name}</strong> — ${primaryJ.tag}</p>
      <p>${primaryJ.bestFor[0]}. ${needsDual ? `<strong>Pair with ${top3[1]?.j?.name || 'a secondary jurisdiction'} for optimal legal+tax structure.</strong>` : ''}</p>
    </div>

    <div class="output-section">
      <h5>Ranked Options</h5>
      ${top3.map((t, i) => `
        <span class="output-tag ${i === 0 ? 'tag-green' : i === 1 ? 'tag-amber' : 'tag-red'}">
          ${i+1}. ${t.j.name} — ${t.j.costIndex}
        </span>`).join('')}
    </div>

    <div class="output-section">
      <h5>Recommended Vehicle</h5>
      <p>${primaryJ.vehicles[0]}${needsDual && top3[1] ? ` + ${top3[1].j.vehicles[0]}` : ''}</p>
    </div>

    <div class="output-section">
      <h5>Setup Timeline</h5>
      <p>${primaryJ.setupTime} — ${timeline === 'urgent' ? '⚠️ Your urgency requirement means you should consider ' + (top3.find(t => t.j.speed >= 4)?.j?.name || 'Dubai or Hong Kong') + ' as primary.' : 'This aligns with your stated timeline.'}</p>
    </div>

    <div class="output-section">
      <h5>Key Risk to Manage</h5>
      <p>${primaryJ.keyRisk}</p>
      ${religion === 'muslim' ? `<p>⚠️ Sharia compliance required — confirm ${primaryJ.islamicCompliance ? primaryJ.name + ' supports this.' : 'jurisdiction switch to Malaysia or Labuan.'}</p>` : ''}
      ${digital === 'yes' && !primaryJ.digitalAssets ? `<p>⚠️ Digital assets require structure adjustment — consider Labuan sub-structure.</p>` : ''}
    </div>

    <div class="output-section">
      <h5>Your Immediate Action Steps</h5>
      <ul>
        ${relevantActions.map(a => `<li>${a}</li>`).join('')}
      </ul>
    </div>

    ${notes ? `<div class="output-section"><h5>Based on Your Notes</h5><p>Your specific situation notes have been factored into the above analysis. Recommend discussing the following with your adviser: ${notes.substring(0,200)}${notes.length > 200 ? '...' : ''}</p></div>` : ''}

    <p style="font-size:0.8rem;color:#999;margin-top:16px;">
      This analysis is generated from the frameworks in <em>The New Trustees</em> by William Chan. It is a strategic starting point — not legal advice. Always engage a qualified trust adviser before making structural decisions.
    </p>
  `;
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── ENGINE 2: TRUSTEE / PROFESSIONAL ADVISOR ──────────────────────────────────

function runTrusteeEngine() {
  const clientType = document.getElementById('t-client').value;
  const assets = document.getElementById('t-assets').value;
  const religion = document.getElementById('t-religion').value;
  const complexity = document.getElementById('t-complexity').value;
  const concern = document.getElementById('t-concern').value;
  const notes = document.getElementById('t-notes').value.trim();

  if (!clientType || !assets || !complexity) {
    alert('Please fill in Client Type, Asset Profile, and Complexity before running the engine.');
    return;
  }

  const btn = document.getElementById('t-btn');
  btn.innerHTML = '<span class="spinner"></span> Generating Recommendation...';
  btn.disabled = true;

  setTimeout(() => {
    renderTrusteeOutput(clientType, assets, religion, complexity, concern, notes);
    btn.innerHTML = 'Generate Recommendation';
    btn.disabled = false;
  }, 1400);
}

function renderTrusteeOutput(clientType, assets, religion, complexity, concern, notes) {
  const out = document.getElementById('t-output');
  out.classList.add('visible');

  const structureMap = {
    simple:   { label: "Discretionary Trust", desc: "Standard discretionary trust with defined distribution classes. Trustee retains full discretion. Minimal documentation overhead." },
    moderate: { label: "Trust + Holding Company", desc: "Trust holds shares in a holding company which owns operating assets. Adds privacy layer and simplifies asset management." },
    complex:  { label: "Multi-Jurisdictional Trust + VCC/OFC", desc: "Primary trust in a certainty jurisdiction, secondary foundation/vehicle in a tax-efficient jurisdiction. Requires coordinated trustee and legal teams." },
    ultra:    { label: "Trust Container + Tokenised Interests + Agentic AI Administration", desc: "On-chain fiduciary model. Beneficial interests tokenised. AI handles downstream administration. Requires pioneering legal framework." },
  };

  const concernActions = {
    conflict:    ["Inject broad trustee discretion for geopolitical events", "Prepare source of wealth documentation offline copies", "Engage Dubai or Abu Dhabi as secondary jurisdiction", "Commission sanctions screening AI deployment"],
    divorce:     ["Consider protective trust provisions for beneficiary marriages", "Draft letter of wishes addressing matrimonial asset concerns", "Review whether fixed or discretionary trust better protects", "Consider trustee power to exclude beneficiary class on divorce"],
    tax:         ["Review territorial tax treatment of each asset class", "Assess UAE/Malaysia territorial tax benefits", "Consider Singapore Section 13O/U fund structures", "Engage local tax counsel in each beneficiary jurisdiction"],
    succession:  ["Map full beneficiary tree including contingent beneficiaries", "Draft comprehensive letter of wishes with succession rationale", "Consider separate trusts per family branch to prevent disputes", "Build beneficiary education programme into deed"],
    digital:     ["Assess Labuan Islamic digital asset framework", "Consider Singapore VCC for tokenised securities", "Draft on-chain trustee discretion provisions", "Engage blockchain-specialist trust counsel"],
    compliance:  ["Deploy AI KYC automation", "Commission source of wealth documentation review", "Upgrade to real-time sanctions screening", "Review economic substance across all entities"],
  };

  const actions = [
    ...(concernActions[concern] || []),
    ...ACTION_ENGINE['ch' + (complexity === 'ultra' ? '16' : complexity === 'complex' ? '15' : '13')]?.actions?.slice(0, 3) || [],
    ...(religion === 'muslim' ? ACTION_ENGINE.ch8.actions.slice(0, 2) : []),
  ].slice(0, 9);

  const structure = structureMap[complexity] || structureMap.moderate;

  const jRecommendation = (() => {
    if (religion === 'muslim' && complexity === 'simple') return "Malaysia — most cost-effective Sharia-compliant structure";
    if (assets === 'china') return "Hong Kong — OFC structure, China connectivity essential";
    if (assets === 'me') return "Abu Dhabi (ADGM) + Dubai (DIFC) dual structure";
    if (complexity === 'ultra') return "Singapore (VCC) + Labuan (digital asset sub-structure)";
    if (complexity === 'complex') return "Singapore (primary certainty) + Dubai (tax efficiency)";
    if (complexity === 'simple') return "Malaysia (cost-efficient, professional capacity available)";
    return "Singapore (standard recommendation for moderate complexity)";
  })();

  out.innerHTML = `
    <h4>📋 Professional Recommendation — ${clientType.charAt(0).toUpperCase() + clientType.slice(1)} Client Profile</h4>

    <div class="output-section">
      <h5>Recommended Structure</h5>
      <p><strong>${structure.label}</strong></p>
      <p>${structure.desc}</p>
    </div>

    <div class="output-section">
      <h5>Jurisdiction Recommendation</h5>
      <p>${jRecommendation}</p>
      ${religion === 'muslim' ? '<span class="output-tag tag-green">Sharia Compliant Framework Required</span>' : ''}
      ${assets === 'digital' ? '<span class="output-tag tag-amber">Digital Asset Framework Required</span>' : ''}
    </div>

    <div class="output-section">
      <h5>Primary Concern: ${concern} — Key Mitigations</h5>
      <ul>
        ${(concernActions[concern] || ["Review full structure with qualified trust counsel"]).map(a => `<li>${a}</li>`).join('')}
      </ul>
    </div>

    <div class="output-section">
      <h5>Full Action Checklist</h5>
      <ul>
        ${actions.map(a => `<li>${a}</li>`).join('')}
      </ul>
    </div>

    <div class="output-section">
      <h5>Value Chain Priority</h5>
      <p>${complexity === 'ultra' || complexity === 'complex'
        ? 'Automate downstream immediately. Deploy agentic AI for compliance monitoring. Free senior staff for advisory and relationship management.'
        : 'Invest in administration automation before expanding upstream advisory. Sterling Trust model applies.'
      }</p>
    </div>

    ${notes ? `<div class="output-section"><h5>Meeting Notes Analysis</h5><p>Key themes from your notes: ${notes.substring(0,300)}${notes.length > 300 ? '...' : ''}. Recommend cross-referencing with jurisdiction-specific checklists from <em>The New Trustees</em> Chapters 4–10.</p></div>` : ''}

    <p style="font-size:0.8rem;color:#999;margin-top:16px;">
      Generated from frameworks in <em>The New Trustees</em> by William Chan. Professional use only. Not legal advice.
    </p>
  `;
  out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ── UPLOAD HANDLER ────────────────────────────────────────────────────────────

function handleUpload(inputId, zoneId) {
  const input = document.getElementById(inputId);
  const zone = document.getElementById(zoneId);
  input.click();
  input.onchange = () => {
    if (input.files[0]) {
      zone.querySelector('p').textContent = `✅ File loaded: ${input.files[0].name} — content will be analysed with your inputs above.`;
      zone.style.borderColor = 'var(--gold)';
      zone.style.background = '#fffdf5';
    }
  };
}

// ── TABS ──────────────────────────────────────────────────────────────────────

function switchTab(tabId) {
  document.querySelectorAll('.engine-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.engine-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ── CHAPTER ACCORDION ─────────────────────────────────────────────────────────

function toggleChapter(el) {
  const item = el.closest('.chapter-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.chapter-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ── INIT ──────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
});

// ── POPUP-AWARE ENGINE TRIGGERS ───────────────────────────────────────────────

// Override the run buttons to go through popup first
function runSettlorEngineWithPopup() {
  showEnginePopup(function(user) {
    runSettlorEngine(user);
  });
}

function runTrusteeEngineWithPopup() {
  showEnginePopup(function(user) {
    runTrusteeEngine(user);
  });
}

// ── PARTIAL RESULT WRAPPER ────────────────────────────────────────────────────
function wrapPartialResult(fullHTML) {
  return `
    ${fullHTML.substring(0, Math.floor(fullHTML.length * 0.45))}
    <div style="
      background:linear-gradient(to bottom, rgba(255,255,255,0), #fff);
      height:80px;margin-top:-80px;position:relative;z-index:2;
    "></div>
    <div style="
      background:#1a1a2e;color:#fff;
      border-radius:10px;padding:28px 24px;
      text-align:center;margin-top:16px;
    ">
      <div style="font-size:1.1rem;font-weight:bold;color:#c9a84c;margin-bottom:10px;">
        🔒 Full Analysis Locked
      </div>
      <p style="color:#99aabb;font-size:0.95rem;margin-bottom:20px;line-height:1.6;">
        You are seeing a partial result. Readers of <em>The New Trustees</em> unlock the complete jurisdiction recommendation, full risk assessment, and all action steps.
      </p>
      <a href="https://www.amazon.com/dp/B0GZMZQZ7Q" target="_blank" style="
        display:inline-block;
        background:#c9a84c;color:#1a1a2e;
        padding:12px 28px;border-radius:8px;
        font-weight:700;font-size:0.95rem;
        text-decoration:none;margin-bottom:12px;
      ">Get The Book on Amazon — $9.99 →</a>
      <p style="color:#556;font-size:0.8rem;margin-top:8px;">
        Already bought it? <a href="#" onclick="resetSession()" style="color:#c9a84c;">Click here to update your profile.</a>
      </p>
    </div>
  `;
}

function resetSession() {
  sessionStorage.removeItem('ms_session');
  location.reload();
}

// ── UPDATE ENGINE FUNCTIONS TO ACCEPT USER ────────────────────────────────────

const _origRunSettlor = runSettlorEngine;
window.runSettlorEngine = function(user) {
  // If called from button directly (no user), trigger popup
  if (!user || typeof user !== 'object') {
    runSettlorEngineWithPopup();
    return;
  }

  const priority = document.getElementById('s-priority').value;
  const assets = document.getElementById('s-assets').value;
  const religion = document.getElementById('s-religion').value;
  const timeline = document.getElementById('s-timeline').value;
  const digital = document.getElementById('s-digital').value;
  const notes = document.getElementById('s-notes').value.trim();
  const situation = document.getElementById('s-situation').value;

  if (!priority || !assets || !timeline) {
    alert('Please fill in Priority, Asset Type, and Timeline before running the engine.');
    return;
  }

  const btn = document.getElementById('s-btn');
  btn.innerHTML = '<span class="spinner"></span> Analysing...';
  btn.disabled = true;

  setTimeout(() => {
    const scores = scoreJurisdictions(priority, assets, religion, timeline, digital, situation);
    const top3 = scores.slice(0, 3);
    const out = document.getElementById('s-output');
    out.classList.add('visible');

    renderSettlorOutput(top3, priority, assets, religion, timeline, digital, notes, situation);

    // If not a reader, wrap with partial
    if (!user.has_read) {
      out.innerHTML = wrapPartialResult(out.innerHTML);
    }

    // Update counter
    const counter = document.getElementById('engine-counter-1');
    if (counter) counter.textContent = getCounter();

    btn.innerHTML = 'Run Analysis';
    btn.disabled = false;
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1200);
};

const _origRunTrustee = runTrusteeEngine;
window.runTrusteeEngine = function(user) {
  if (!user || typeof user !== 'object') {
    runTrusteeEngineWithPopup();
    return;
  }

  const clientType = document.getElementById('t-client').value;
  const assets = document.getElementById('t-assets').value;
  const religion = document.getElementById('t-religion').value;
  const complexity = document.getElementById('t-complexity').value;
  const concern = document.getElementById('t-concern').value;
  const notes = document.getElementById('t-notes').value.trim();

  if (!clientType || !assets || !complexity) {
    alert('Please fill in Client Type, Asset Profile, and Complexity before running the engine.');
    return;
  }

  const btn = document.getElementById('t-btn');
  btn.innerHTML = '<span class="spinner"></span> Generating Recommendation...';
  btn.disabled = true;

  setTimeout(() => {
    const out = document.getElementById('t-output');
    out.classList.add('visible');
    renderTrusteeOutput(clientType, assets, religion, complexity, concern, notes);

    if (!user.has_read) {
      out.innerHTML = wrapPartialResult(out.innerHTML);
    }

    const counter = document.getElementById('engine-counter-2');
    if (counter) counter.textContent = getCounter();

    btn.innerHTML = 'Generate Professional Recommendation';
    btn.disabled = false;
    out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 1400);
};

