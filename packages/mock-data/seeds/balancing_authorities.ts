export interface BalancingAuthoritySeed {
  code: string;
  name: string;
  region: string;
  carbon_intensity: number;
  renewable_share_pct: number;
  wkt_polygon: string;
}

export const balancingAuthoritiesSeed: BalancingAuthoritySeed[] = [
  { code: "PJM-DOM", name: "PJM Dominion Zone", region: "Mid-Atlantic", carbon_intensity: 400, renewable_share_pct: 23.4, wkt_polygon: "POLYGON((-78.2 36.8,-75.8 36.8,-75.8 39.4,-78.2 39.4,-78.2 36.8))" },
  { code: "ERCOT-N", name: "ERCOT North", region: "Texas", carbon_intensity: 430, renewable_share_pct: 32.1, wkt_polygon: "POLYGON((-98.9 31.4,-95.8 31.4,-95.8 34.1,-98.9 34.1,-98.9 31.4))" },
  { code: "AZPS", name: "Arizona Public Service", region: "Southwest", carbon_intensity: 470, renewable_share_pct: 18.2, wkt_polygon: "POLYGON((-114.9 31.2,-109.0 31.2,-109.0 37.1,-114.9 37.1,-114.9 31.2))" },
  { code: "CAISO", name: "California ISO", region: "California", carbon_intensity: 210, renewable_share_pct: 49.7, wkt_polygon: "POLYGON((-124.5 32.3,-114.1 32.3,-114.1 42.1,-124.5 42.1,-124.5 32.3))" },
  { code: "BPAT", name: "Bonneville Power Administration", region: "Pacific Northwest", carbon_intensity: 80, renewable_share_pct: 86.3, wkt_polygon: "POLYGON((-124.8 45.5,-110.8 45.5,-110.8 49.1,-124.8 49.1,-124.8 45.5))" },
  { code: "MISO", name: "Midcontinent ISO", region: "Midwest", carbon_intensity: 510, renewable_share_pct: 24.4, wkt_polygon: "POLYGON((-104.2 36.0,-80.2 36.0,-80.2 49.2,-104.2 49.2,-104.2 36.0))" },
  { code: "NYISO", name: "New York ISO", region: "New York", carbon_intensity: 230, renewable_share_pct: 40.5, wkt_polygon: "POLYGON((-79.9 40.4,-71.7 40.4,-71.7 45.2,-79.9 45.2,-79.9 40.4))" },
  { code: "ISONE", name: "ISO New England", region: "New England", carbon_intensity: 250, renewable_share_pct: 37.8, wkt_polygon: "POLYGON((-73.8 40.8,-66.5 40.8,-66.5 47.8,-73.8 47.8,-73.8 40.8))" },
  { code: "SPP", name: "Southwest Power Pool", region: "Central", carbon_intensity: 490, renewable_share_pct: 29.6, wkt_polygon: "POLYGON((-106.8 30.9,-88.9 30.9,-88.9 49.0,-106.8 49.0,-106.8 30.9))" },
  { code: "FPL", name: "Florida Power & Light", region: "Florida", carbon_intensity: 350, renewable_share_pct: 16.9, wkt_polygon: "POLYGON((-87.7 24.2,-79.7 24.2,-79.7 31.1,-87.7 31.1,-87.7 24.2))" },
];
