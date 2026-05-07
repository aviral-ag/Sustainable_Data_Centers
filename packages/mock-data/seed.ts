import "dotenv/config";
import { Pool } from "pg";

import { balancingAuthoritiesSeed } from "./seeds/balancing_authorities";
import { dataCentersSeed } from "./seeds/data_centers";
import { dcPipelineSeed } from "./seeds/dc_pipeline";
import { researchPapersSeed } from "./seeds/research_papers";
import { waterStressRegionsSeed } from "./seeds/water_stress_regions";

const connectionString = process.env.DATABASE_URL ?? "postgresql:///datacenter_dev";

async function seed() {
  const pool = new Pool({ connectionString });
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(`
      TRUNCATE TABLE
        forecasts_cache,
        etl_runs,
        dc_pipeline,
        research_papers,
        data_centers,
        water_stress_regions,
        balancing_authorities
      RESTART IDENTITY CASCADE
    `);

    for (const ba of balancingAuthoritiesSeed) {
      await client.query(
        `INSERT INTO balancing_authorities
          (code, name, region, carbon_intensity, renewable_share_pct, geom_wkt)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [ba.code, ba.name, ba.region, ba.carbon_intensity, ba.renewable_share_pct, ba.wkt_polygon],
      );
    }

    for (const region of waterStressRegionsSeed) {
      await client.query(
        `INSERT INTO water_stress_regions
          (region_name, region_code, stress_score, stress_level, geom_wkt, centroid_lat, centroid_lng)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          region.region_name,
          region.region_code,
          region.stress_score,
          region.stress_level,
          region.wkt_polygon,
          region.centroid_lat,
          region.centroid_lng,
        ],
      );
    }

    for (const dc of dataCentersSeed) {
      await client.query(
        `INSERT INTO data_centers
          (name, operator, location_city, location_state, country, region_code, latitude, longitude, capacity_mw, pue, wue, balancing_authority_code, status, point_wkt)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13, $14)`,
        [
          dc.name,
          dc.operator,
          dc.location_city,
          dc.location_state,
          dc.country,
          dc.region_code,
          dc.latitude,
          dc.longitude,
          dc.capacity_mw,
          dc.pue,
          dc.wue,
          dc.balancing_authority_code,
          dc.status,
          `POINT(${dc.longitude} ${dc.latitude})`,
        ],
      );
    }

    for (const paper of researchPapersSeed) {
      await client.query(
        `INSERT INTO research_papers
          (title, authors, publication_year, journal, doi, abstract, citation_count, keywords)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          paper.title,
          paper.authors,
          paper.publication_year,
          paper.journal,
          paper.doi,
          paper.abstract,
          paper.citation_count,
          paper.keywords,
        ],
      );
    }

    for (const project of dcPipelineSeed) {
      await client.query(
        `INSERT INTO dc_pipeline
          (project_name, operator, location_city, location_state, country, planned_capacity_mw, expected_completion_date, phase, latitude, longitude, point_wkt)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          project.project_name,
          project.operator,
          project.location_city,
          project.location_state,
          project.country,
          project.planned_capacity_mw,
          project.expected_completion_date,
          project.phase,
          project.latitude,
          project.longitude,
          `POINT(${project.longitude} ${project.latitude})`,
        ],
      );
    }

    await client.query(
      `INSERT INTO etl_runs (pipeline_name, status, started_at, finished_at, rows_processed, details)
       VALUES ($1, $2, NOW() - INTERVAL '2 hours', NOW() - INTERVAL '90 minutes', $3, $4::jsonb)`,
      ["bootstrap-seed", "success", 210, JSON.stringify({ source: "mock" })],
    );

    await client.query(
      `INSERT INTO forecasts_cache (cache_key, forecast_type, horizon_days, generated_at, expires_at, payload)
       VALUES ($1, $2, $3, NOW(), NOW() + INTERVAL '6 hours', $4::jsonb)`,
      ["water-stress:global:7", "water_stress", 7, JSON.stringify({ status: "mock-ready" })],
    );

    await client.query("COMMIT");

    const counts = [
      await client.query("SELECT COUNT(*)::int AS count FROM data_centers"),
      await client.query("SELECT COUNT(*)::int AS count FROM water_stress_regions"),
      await client.query("SELECT COUNT(*)::int AS count FROM balancing_authorities"),
      await client.query("SELECT COUNT(*)::int AS count FROM research_papers"),
      await client.query("SELECT COUNT(*)::int AS count FROM dc_pipeline"),
      await client.query("SELECT COUNT(*)::int AS count FROM etl_runs"),
      await client.query("SELECT COUNT(*)::int AS count FROM forecasts_cache"),
    ];

    console.log("Seed complete:");
    console.log(`data_centers: ${counts[0].rows[0].count}`);
    console.log(`water_stress_regions: ${counts[1].rows[0].count}`);
    console.log(`balancing_authorities: ${counts[2].rows[0].count}`);
    console.log(`research_papers: ${counts[3].rows[0].count}`);
    console.log(`dc_pipeline: ${counts[4].rows[0].count}`);
    console.log(`etl_runs: ${counts[5].rows[0].count}`);
    console.log(`forecasts_cache: ${counts[6].rows[0].count}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
