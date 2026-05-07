# Project Context
Repo: https://github.com/aviral-ag/Sustainable_Data_Centers
Stack: Next.js 14 (App Router) + TypeScript + Tailwind + shadcn/ui
Map: MapLibre GL with Carto Voyager basemap (free, no token)
Database: Local Postgres for dev, Railway Postgres for production
ETL: Python scripts (run as Railway cron in production)
ML: FastAPI service (Railway in production, local Python in dev)

Dev workflow: localhost-first. Each tab uses mock data until UI is approved, then real data plugs in.

UI principles: latest shadcn/ui, modern dashboard design, smooth animations, glassmorphism on map overlays, proper loading/empty/error states, mobile-responsive.

Production hosting: Railway (single platform, ~$10-15/month)
