export interface DataCenterSeed {
  name: string;
  operator: string;
  location_city: string;
  location_state: string | null;
  country: string;
  region_code: string;
  latitude: number;
  longitude: number;
  capacity_mw: number;
  pue: number;
  wue: number;
  balancing_authority_code: string | null;
  status: string;
}

const operators = ["Google", "Microsoft", "AWS", "Meta", "Equinix", "Digital Realty"] as const;

const clusters = [
  { key: "NVA", city: "Ashburn", state: "Virginia", country: "USA", lat: 39.0438, lng: -77.4874, ba: "PJM-DOM" },
  { key: "PHX", city: "Phoenix", state: "Arizona", country: "USA", lat: 33.4484, lng: -112.074, ba: "AZPS" },
  { key: "DAL", city: "Dallas", state: "Texas", country: "USA", lat: 32.7767, lng: -96.797, ba: "ERCOT-N" },
  { key: "DUB", city: "Dublin", state: null, country: "Ireland", lat: 53.3498, lng: -6.2603, ba: null },
  { key: "SIN", city: "Singapore", state: null, country: "Singapore", lat: 1.3521, lng: 103.8198, ba: null },
  { key: "FRA", city: "Frankfurt", state: null, country: "Germany", lat: 50.1109, lng: 8.6821, ba: null },
  { key: "SJC", city: "San Jose", state: "California", country: "USA", lat: 37.3382, lng: -121.8863, ba: "CAISO" },
  { key: "CHI", city: "Chicago", state: "Illinois", country: "USA", lat: 41.8781, lng: -87.6298, ba: "MISO" },
  { key: "NYC", city: "New York", state: "New York", country: "USA", lat: 40.7128, lng: -74.006, ba: "NYISO" },
  { key: "AMS", city: "Amsterdam", state: null, country: "Netherlands", lat: 52.3676, lng: 4.9041, ba: null },
] as const;

export const dataCentersSeed: DataCenterSeed[] = Array.from({ length: 50 }).map((_, idx) => {
  const cluster = clusters[idx % clusters.length];
  const operator = operators[idx % operators.length];
  const capacity = 10 + ((idx * 17) % 291);
  const pue = Number((1.1 + ((idx * 7) % 50) / 100).toFixed(2));
  const wue = Number((0.1 + ((idx * 13) % 190) / 100).toFixed(2));

  return {
    name: `${operator} ${cluster.city} Campus ${Math.floor(idx / clusters.length) + 1}`,
    operator,
    location_city: cluster.city,
    location_state: cluster.state,
    country: cluster.country,
    region_code: cluster.key,
    latitude: Number((cluster.lat + ((idx % 5) - 2) * 0.08).toFixed(6)),
    longitude: Number((cluster.lng + ((idx % 7) - 3) * 0.09).toFixed(6)),
    capacity_mw: capacity,
    pue,
    wue,
    balancing_authority_code: cluster.ba,
    status: "operational",
  };
});
