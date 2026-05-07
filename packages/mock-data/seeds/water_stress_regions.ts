export interface WaterStressRegionSeed {
  region_name: string;
  region_code: string;
  stress_score: number;
  stress_level: "low" | "medium" | "high";
  wkt_polygon: string;
  centroid_lat: number;
  centroid_lng: number;
}

export const waterStressRegionsSeed: WaterStressRegionSeed[] = [
  { region_name: "Phoenix Metro", region_code: "PHX", stress_score: 4.5, stress_level: "high", wkt_polygon: "POLYGON((-112.35 33.25,-111.75 33.25,-111.75 33.70,-112.35 33.70,-112.35 33.25))", centroid_lat: 33.47, centroid_lng: -112.05 },
  { region_name: "Northern Virginia", region_code: "NVA", stress_score: 2.8, stress_level: "medium", wkt_polygon: "POLYGON((-77.75 38.85,-76.95 38.85,-76.95 39.30,-77.75 39.30,-77.75 38.85))", centroid_lat: 39.07, centroid_lng: -77.35 },
  { region_name: "Dublin Area", region_code: "DUB", stress_score: 1.5, stress_level: "low", wkt_polygon: "POLYGON((-6.55 53.20,-6.00 53.20,-6.00 53.55,-6.55 53.55,-6.55 53.20))", centroid_lat: 53.38, centroid_lng: -6.25 },
  { region_name: "Dallas-Fort Worth", region_code: "DAL", stress_score: 3.4, stress_level: "high", wkt_polygon: "POLYGON((-97.35 32.45,-96.35 32.45,-96.35 33.15,-97.35 33.15,-97.35 32.45))", centroid_lat: 32.80, centroid_lng: -96.86 },
  { region_name: "Singapore", region_code: "SIN", stress_score: 2.3, stress_level: "medium", wkt_polygon: "POLYGON((103.58 1.18,104.05 1.18,104.05 1.50,103.58 1.50,103.58 1.18))", centroid_lat: 1.35, centroid_lng: 103.82 },
  { region_name: "Frankfurt Rhine-Main", region_code: "FRA", stress_score: 1.9, stress_level: "low", wkt_polygon: "POLYGON((8.35 49.95,9.05 49.95,9.05 50.35,8.35 50.35,8.35 49.95))", centroid_lat: 50.12, centroid_lng: 8.70 },
  { region_name: "San Jose Bay", region_code: "SJC", stress_score: 2.9, stress_level: "medium", wkt_polygon: "POLYGON((-122.20 37.10,-121.45 37.10,-121.45 37.55,-122.20 37.55,-122.20 37.10))", centroid_lat: 37.33, centroid_lng: -121.86 },
  { region_name: "Chicago Corridor", region_code: "CHI", stress_score: 2.1, stress_level: "medium", wkt_polygon: "POLYGON((-88.35 41.55,-87.35 41.55,-87.35 42.25,-88.35 42.25,-88.35 41.55))", centroid_lat: 41.88, centroid_lng: -87.65 },
  { region_name: "New York Metro", region_code: "NYC", stress_score: 2.4, stress_level: "medium", wkt_polygon: "POLYGON((-74.40 40.45,-73.55 40.45,-73.55 41.00,-74.40 41.00,-74.40 40.45))", centroid_lat: 40.73, centroid_lng: -73.95 },
  { region_name: "Amsterdam Randstad", region_code: "AMS", stress_score: 1.6, stress_level: "low", wkt_polygon: "POLYGON((4.45 52.10,5.35 52.10,5.35 52.60,4.45 52.60,4.45 52.10))", centroid_lat: 52.37, centroid_lng: 4.90 },
  { region_name: "Los Angeles Basin", region_code: "LAX", stress_score: 3.8, stress_level: "high", wkt_polygon: "POLYGON((-118.75 33.65,-117.75 33.65,-117.75 34.30,-118.75 34.30,-118.75 33.65))", centroid_lat: 34.03, centroid_lng: -118.24 },
  { region_name: "Seattle-Tacoma", region_code: "SEA", stress_score: 1.3, stress_level: "low", wkt_polygon: "POLYGON((-122.65 47.20,-121.95 47.20,-121.95 47.85,-122.65 47.85,-122.65 47.20))", centroid_lat: 47.61, centroid_lng: -122.33 },
  { region_name: "Portland-Vancouver", region_code: "PDX", stress_score: 1.4, stress_level: "low", wkt_polygon: "POLYGON((-123.25 45.25,-122.35 45.25,-122.35 45.85,-123.25 45.85,-123.25 45.25))", centroid_lat: 45.55, centroid_lng: -122.70 },
  { region_name: "Atlanta", region_code: "ATL", stress_score: 2.6, stress_level: "medium", wkt_polygon: "POLYGON((-84.75 33.45,-83.95 33.45,-83.95 34.05,-84.75 34.05,-84.75 33.45))", centroid_lat: 33.75, centroid_lng: -84.39 },
  { region_name: "Charlotte", region_code: "CLT", stress_score: 2.2, stress_level: "medium", wkt_polygon: "POLYGON((-81.15 35.00,-80.55 35.00,-80.55 35.50,-81.15 35.50,-81.15 35.00))", centroid_lat: 35.22, centroid_lng: -80.84 },
  { region_name: "London", region_code: "LON", stress_score: 1.8, stress_level: "low", wkt_polygon: "POLYGON((-0.65 51.25,0.35 51.25,0.35 51.75,-0.65 51.75,-0.65 51.25))", centroid_lat: 51.51, centroid_lng: -0.12 },
  { region_name: "Paris", region_code: "PAR", stress_score: 1.7, stress_level: "low", wkt_polygon: "POLYGON((2.00 48.65,2.75 48.65,2.75 49.10,2.00 49.10,2.00 48.65))", centroid_lat: 48.85, centroid_lng: 2.35 },
  { region_name: "Tokyo", region_code: "TYO", stress_score: 2.0, stress_level: "medium", wkt_polygon: "POLYGON((139.35 35.45,140.10 35.45,140.10 35.95,139.35 35.95,139.35 35.45))", centroid_lat: 35.68, centroid_lng: 139.76 },
  { region_name: "Seoul", region_code: "SEL", stress_score: 2.5, stress_level: "medium", wkt_polygon: "POLYGON((126.70 37.30,127.30 37.30,127.30 37.80,126.70 37.80,126.70 37.30))", centroid_lat: 37.57, centroid_lng: 126.98 },
  { region_name: "Sydney", region_code: "SYD", stress_score: 3.1, stress_level: "high", wkt_polygon: "POLYGON((150.80 -34.15,151.45 -34.15,151.45 -33.55,150.80 -33.55,150.80 -34.15))", centroid_lat: -33.87, centroid_lng: 151.21 },
];
