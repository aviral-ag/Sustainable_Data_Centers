export interface DcPipelineSeed {
  project_name: string;
  operator: string;
  location_city: string;
  location_state: string | null;
  country: string;
  planned_capacity_mw: number;
  expected_completion_date: string;
  phase: string;
  latitude: number;
  longitude: number;
}

const operators = ["Google", "Microsoft", "AWS", "Meta", "Equinix", "Digital Realty"];
const locations = [
  ["Ashburn", "Virginia", "USA", 39.0438, -77.4874],
  ["Phoenix", "Arizona", "USA", 33.4484, -112.074],
  ["Dallas", "Texas", "USA", 32.7767, -96.797],
  ["Columbus", "Ohio", "USA", 39.9612, -82.9988],
  ["Dublin", null, "Ireland", 53.3498, -6.2603],
  ["Frankfurt", null, "Germany", 50.1109, 8.6821],
  ["Singapore", null, "Singapore", 1.3521, 103.8198],
  ["Johor", null, "Malaysia", 1.4927, 103.7414],
] as const;
const phases = ["permitting", "land-acquired", "construction", "commissioning"];

const baseDate = new Date("2026-01-15T00:00:00Z");

export const dcPipelineSeed: DcPipelineSeed[] = Array.from({ length: 30 }).map((_, idx) => {
  const location = locations[idx % locations.length];
  const completion = new Date(baseDate);
  completion.setMonth(baseDate.getMonth() + 3 + idx * 2);

  return {
    project_name: `NextGen Campus ${idx + 1}`,
    operator: operators[idx % operators.length],
    location_city: location[0],
    location_state: location[1],
    country: location[2],
    planned_capacity_mw: 40 + ((idx * 19) % 240),
    expected_completion_date: completion.toISOString().slice(0, 10),
    phase: phases[idx % phases.length],
    latitude: Number((location[3] + ((idx % 4) - 1.5) * 0.12).toFixed(6)),
    longitude: Number((location[4] + ((idx % 5) - 2) * 0.14).toFixed(6)),
  };
});
