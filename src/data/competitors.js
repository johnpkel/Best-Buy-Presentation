// Symptoms of first-party data paralysis
export const BUYER_BELIEFS = [
  {
    id: 1,
    vendor: 'Architecture Gap',
    belief: 'Our first-party data flows to the warehouse, but never back to the app',
    detail: 'OLAP (analytics) vs. OLTP (real-time) — fundamentally different architectures',
  },
  {
    id: 2,
    vendor: 'Identity Crisis',
    belief: '90% of our web traffic is anonymous — and only 11% of buyers willingly share more data',
    detail: 'Deterministic + probabilistic signals needed to build a C360 view from limited consent',
  },
  {
    id: 3,
    vendor: 'Latency Problem',
    belief: 'Our pipeline refreshes daily — insights are stale before they arrive',
    detail: 'Activation requires millisecond utility, not 24-hour batch jobs',
  },
  {
    id: 4,
    vendor: 'Personalization Backfire',
    belief: '64% of shoppers have experienced personalization that felt creepy or invasive',
    detail: '70% saw ads for items they only discussed verbally — that\'s the line',
  },
]

// Barriers impact table
export const COMPETITOR_GRID = [
  {
    vendor: 'Data Direction',
    frame: 'Unidirectional',
    blindSpot: '1P data flows to warehouse, never back to DXP',
  },
  {
    vendor: 'Speed',
    frame: 'High Latency',
    blindSpot: 'Batch processing too slow for live sessions',
  },
  {
    vendor: 'Identity',
    frame: 'Fragmented Profiles',
    blindSpot: 'Only 14% have a true C360 customer view — Gartner',
  },
  {
    vendor: 'Trust',
    frame: 'Privacy Gap',
    blindSpot: '95% of consumers demand control over their data — Benchmark',
  },
]
