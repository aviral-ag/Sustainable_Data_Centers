CREATE TABLE "balancing_authorities" (
	"id" serial PRIMARY KEY NOT NULL,
	"code" varchar(24) NOT NULL,
	"name" varchar(180) NOT NULL,
	"region" varchar(120) NOT NULL,
	"carbon_intensity" integer NOT NULL,
	"renewable_share_pct" numeric(5, 2) NOT NULL,
	"geom_wkt" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "balancing_authorities_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "data_centers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"operator" varchar(120) NOT NULL,
	"location_city" varchar(120) NOT NULL,
	"location_state" varchar(120),
	"country" varchar(120) NOT NULL,
	"region_code" varchar(80),
	"latitude" numeric(10, 6) NOT NULL,
	"longitude" numeric(10, 6) NOT NULL,
	"capacity_mw" integer NOT NULL,
	"pue" numeric(3, 2) NOT NULL,
	"wue" numeric(4, 2) NOT NULL,
	"balancing_authority_code" varchar(40),
	"status" varchar(32) DEFAULT 'operational' NOT NULL,
	"point_wkt" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "dc_pipeline" (
	"id" serial PRIMARY KEY NOT NULL,
	"project_name" varchar(255) NOT NULL,
	"operator" varchar(120) NOT NULL,
	"location_city" varchar(120) NOT NULL,
	"location_state" varchar(120),
	"country" varchar(120) NOT NULL,
	"planned_capacity_mw" integer NOT NULL,
	"expected_completion_date" date NOT NULL,
	"phase" varchar(48) NOT NULL,
	"latitude" numeric(10, 6) NOT NULL,
	"longitude" numeric(10, 6) NOT NULL,
	"point_wkt" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "etl_runs" (
	"id" serial PRIMARY KEY NOT NULL,
	"pipeline_name" varchar(120) NOT NULL,
	"status" varchar(32) NOT NULL,
	"started_at" timestamp with time zone NOT NULL,
	"finished_at" timestamp with time zone,
	"rows_processed" integer DEFAULT 0 NOT NULL,
	"details" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "forecasts_cache" (
	"id" serial PRIMARY KEY NOT NULL,
	"cache_key" varchar(255) NOT NULL,
	"forecast_type" varchar(120) NOT NULL,
	"horizon_days" integer NOT NULL,
	"generated_at" timestamp with time zone NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "forecasts_cache_cache_key_unique" UNIQUE("cache_key")
);
--> statement-breakpoint
CREATE TABLE "research_papers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"authors" text[] NOT NULL,
	"publication_year" integer NOT NULL,
	"journal" varchar(180) NOT NULL,
	"doi" varchar(180) NOT NULL,
	"abstract" text NOT NULL,
	"citation_count" integer NOT NULL,
	"keywords" text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "research_papers_doi_unique" UNIQUE("doi")
);
--> statement-breakpoint
CREATE TABLE "water_stress_regions" (
	"id" serial PRIMARY KEY NOT NULL,
	"region_name" varchar(180) NOT NULL,
	"region_code" varchar(80) NOT NULL,
	"stress_score" numeric(3, 1) NOT NULL,
	"stress_level" varchar(16) NOT NULL,
	"geom_wkt" text NOT NULL,
	"centroid_lat" numeric(10, 6) NOT NULL,
	"centroid_lng" numeric(10, 6) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "water_stress_regions_region_name_unique" UNIQUE("region_name"),
	CONSTRAINT "water_stress_regions_region_code_unique" UNIQUE("region_code")
);
