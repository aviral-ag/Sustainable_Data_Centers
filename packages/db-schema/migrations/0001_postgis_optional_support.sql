-- Optional PostGIS support.
-- This migration is safe on machines without PostGIS packages installed.
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_available_extensions WHERE name = 'postgis') THEN
    CREATE EXTENSION IF NOT EXISTS postgis;

    ALTER TABLE data_centers ADD COLUMN IF NOT EXISTS point_geom geometry(Geometry, 4326);
    UPDATE data_centers
      SET point_geom = ST_GeomFromText(point_wkt, 4326)
      WHERE point_geom IS NULL;

    ALTER TABLE water_stress_regions ADD COLUMN IF NOT EXISTS geom geometry(Geometry, 4326);
    UPDATE water_stress_regions
      SET geom = ST_GeomFromText(geom_wkt, 4326)
      WHERE geom IS NULL;

    ALTER TABLE balancing_authorities ADD COLUMN IF NOT EXISTS geom geometry(Geometry, 4326);
    UPDATE balancing_authorities
      SET geom = ST_GeomFromText(geom_wkt, 4326)
      WHERE geom IS NULL;

    ALTER TABLE dc_pipeline ADD COLUMN IF NOT EXISTS point_geom geometry(Geometry, 4326);
    UPDATE dc_pipeline
      SET point_geom = ST_GeomFromText(point_wkt, 4326)
      WHERE point_geom IS NULL;

    CREATE INDEX IF NOT EXISTS data_centers_point_geom_idx ON data_centers USING GIST (point_geom);
    CREATE INDEX IF NOT EXISTS water_stress_regions_geom_idx ON water_stress_regions USING GIST (geom);
    CREATE INDEX IF NOT EXISTS balancing_authorities_geom_idx ON balancing_authorities USING GIST (geom);
    CREATE INDEX IF NOT EXISTS dc_pipeline_point_geom_idx ON dc_pipeline USING GIST (point_geom);
  END IF;
END $$;
