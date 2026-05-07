# Project Context
Repo: https://github.com/aviral-ag/Sustainable_Data_Centers
Stack: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
Map: MapLibre GL with free Carto basemap (no token needed)
Database: Railway Postgres with PostGIS extension
ETL: Python scripts run as Railway cron services
ML Service: FastAPI as Railway web service (private networking)
Storage: Railway volumes for raw data caching
Hosting: Everything on Railway, single platform
Cost target: ~$5-15/month on Railway Hobby
