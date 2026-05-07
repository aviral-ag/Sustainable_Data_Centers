import { date, integer, jsonb, numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const dataCenters = pgTable("data_centers", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  operator: varchar("operator", { length: 120 }).notNull(),
  locationCity: varchar("location_city", { length: 120 }).notNull(),
  locationState: varchar("location_state", { length: 120 }),
  country: varchar("country", { length: 120 }).notNull(),
  regionCode: varchar("region_code", { length: 80 }),
  latitude: numeric("latitude", { precision: 10, scale: 6 }).notNull(),
  longitude: numeric("longitude", { precision: 10, scale: 6 }).notNull(),
  capacityMw: integer("capacity_mw").notNull(),
  pue: numeric("pue", { precision: 3, scale: 2 }).notNull(),
  wue: numeric("wue", { precision: 4, scale: 2 }).notNull(),
  balancingAuthorityCode: varchar("balancing_authority_code", { length: 40 }),
  status: varchar("status", { length: 32 }).notNull().default("operational"),
  pointWkt: text("point_wkt").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const waterStressRegions = pgTable("water_stress_regions", {
  id: serial("id").primaryKey(),
  regionName: varchar("region_name", { length: 180 }).notNull().unique(),
  regionCode: varchar("region_code", { length: 80 }).notNull().unique(),
  stressScore: numeric("stress_score", { precision: 3, scale: 1 }).notNull(),
  stressLevel: varchar("stress_level", { length: 16 }).notNull(),
  geomWkt: text("geom_wkt").notNull(),
  centroidLat: numeric("centroid_lat", { precision: 10, scale: 6 }).notNull(),
  centroidLng: numeric("centroid_lng", { precision: 10, scale: 6 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const balancingAuthorities = pgTable("balancing_authorities", {
  id: serial("id").primaryKey(),
  code: varchar("code", { length: 24 }).notNull().unique(),
  name: varchar("name", { length: 180 }).notNull(),
  region: varchar("region", { length: 120 }).notNull(),
  carbonIntensity: integer("carbon_intensity").notNull(),
  renewableSharePct: numeric("renewable_share_pct", { precision: 5, scale: 2 }).notNull(),
  geomWkt: text("geom_wkt").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const researchPapers = pgTable("research_papers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  authors: text("authors").array().notNull(),
  publicationYear: integer("publication_year").notNull(),
  journal: varchar("journal", { length: 180 }).notNull(),
  doi: varchar("doi", { length: 180 }).notNull().unique(),
  abstract: text("abstract").notNull(),
  citationCount: integer("citation_count").notNull(),
  keywords: text("keywords").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const dcPipeline = pgTable("dc_pipeline", {
  id: serial("id").primaryKey(),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  operator: varchar("operator", { length: 120 }).notNull(),
  locationCity: varchar("location_city", { length: 120 }).notNull(),
  locationState: varchar("location_state", { length: 120 }),
  country: varchar("country", { length: 120 }).notNull(),
  plannedCapacityMw: integer("planned_capacity_mw").notNull(),
  expectedCompletionDate: date("expected_completion_date").notNull(),
  phase: varchar("phase", { length: 48 }).notNull(),
  latitude: numeric("latitude", { precision: 10, scale: 6 }).notNull(),
  longitude: numeric("longitude", { precision: 10, scale: 6 }).notNull(),
  pointWkt: text("point_wkt").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const etlRuns = pgTable("etl_runs", {
  id: serial("id").primaryKey(),
  pipelineName: varchar("pipeline_name", { length: 120 }).notNull(),
  status: varchar("status", { length: 32 }).notNull(),
  startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
  finishedAt: timestamp("finished_at", { withTimezone: true }),
  rowsProcessed: integer("rows_processed").notNull().default(0),
  details: jsonb("details").notNull().default({}),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const forecastsCache = pgTable("forecasts_cache", {
  id: serial("id").primaryKey(),
  cacheKey: varchar("cache_key", { length: 255 }).notNull().unique(),
  forecastType: varchar("forecast_type", { length: 120 }).notNull(),
  horizonDays: integer("horizon_days").notNull(),
  generatedAt: timestamp("generated_at", { withTimezone: true }).notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  payload: jsonb("payload").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
