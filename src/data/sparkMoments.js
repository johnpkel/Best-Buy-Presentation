// The 7 Pillars of Customer Data Strategy (C360 framework)
export const FUNNEL_STEPS = [
  { label: 'Governance: Data quality, compliance, ownership', active: false },
  { label: 'Identity: Resolve anonymous + known into unified profiles', active: false },
  { label: 'Interests & Behaviors: Capture intent signals in real-time', active: false },
  { label: 'First-Party Data: Build owned data through value exchange', active: false },
  { label: 'Intelligence: Predictive scoring + next-best-action models', active: false },
  { label: 'Portability: Activate insights across every touchpoint', active: false },
]

export const DECISION_TABLE = [
  {
    decision: '"Where does the data live?"',
    who: 'Data Team',
    data: 'Snowflake / BigQuery (cold storage, not actionable)',
  },
  {
    decision: '"Who is this visitor?"',
    who: 'Marketing Ops',
    data: 'Anonymous cookie — no link to CRM profile',
  },
  {
    decision: '"What should we show them?"',
    who: 'Personalization Lead',
    data: 'Static rules, not real-time context or intent',
  },

  {
    decision: '"Can we even use this data?"',
    who: 'Legal / Compliance',
    data: '95% of consumers demand control over what data brands collect',
  },
]

export const AUDIENCE_TESTS = [
  {
    name: 'Anonymous visitors (no identity link)',
    size: '90%',
    metric: 'of total web traffic',
    frequency: null,
    pct: 90,
    status: 'warning',
    note: 'No personalization possible — treated as strangers',
  },
  {
    name: 'Known but fragmented (multi-device)',
    size: '8%',
    metric: 'of total web traffic',
    frequency: null,
    pct: 8,
    status: 'warning',
    note: 'Phone ≠ laptop ≠ in-store — fractured identity graph',
  },
  {
    name: 'Fully resolved identity (C360 view)',
    size: '2%',
    metric: 'of total web traffic',
    frequency: null,
    pct: 2,
    status: 'success',
    note: 'Deterministic + probabilistic signals unified — true personalization',
  },
]

export const SLACK_OUTBOUND = {
  to: '#data-activation',
  mention: '@Marketing Ops',
  from: 'Data Insights',
  body: `We cross-referenced our internal data with the Contentstack Personalization Benchmark. The findings:

1. 80% of our collected first-party data is dormant — never reaches the experience layer
2. 64% of consumers report "creepy" personalization experiences (our NPS confirms this)
3. Only 14% of our profiles qualify as C360 — but 95% of buyers demand control over their data

We're sitting on a goldmine we can't spend. The gap between collection and activation is where we're bleeding revenue.`,
}

export const SLACK_RESPONSE = {
  from: 'Marketing Ops Lead',
  role: 'VP, Marketing Technology',
  body: `This maps to exactly what the benchmark shows. Three architectural shifts needed:

1. First-party data needs to flow bidirectionally — not just into the warehouse, but back out to the DXP in real-time
2. Identity resolution must happen at the edge, before the page renders — 90% of our visitors are anonymous ghosts
3. AI for product recommendations (71% prefer it), but humans for complex support (82% prefer it) — we need both

McKinsey says getting this right can cut acquisition costs 50% and lift revenue 5-15%. Let's build the business case.`,
}

export const CREATIVE_BRIEF = {
  title: 'From Zero to C360',
  objective: 'Build a comprehensive data strategy that powers real-time activation',
  audience: 'Enterprise teams stuck between "we have data" and "we can use data"',
  channels: [
    { name: '1. Governance', budget: 'Foundation', pct: 14 },
    { name: '2. Identity', budget: 'Resolution', pct: 16 },
    { name: '3. Interests', budget: 'Intent signals', pct: 14 },
    { name: '4. Behaviors', budget: 'Journey maps', pct: 14 },
    { name: '5. First-Party Data', budget: 'Value exchange', pct: 16 },
    { name: '6. Intelligence', budget: 'AI / Scoring', pct: 14 },
    { name: '7. Portability', budget: 'Activation', pct: 12 },
  ],
}
