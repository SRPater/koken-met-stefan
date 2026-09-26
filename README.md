# Koken Met Stefan

A personal recipe collection website - recipes added manually
from various sources, organized and searchable, with GitHub
login gating write access.

**Live at:** https://koken-met-stefan.vercel.app

## Features

- Add, edit, and delete recipes with ingredients, steps, photos,
  and source attribution
- Ingredients stored once and reused across recipes (no
  duplicate "spaghetti" rows)
- Quantity parsing for fractions, ranges, and Dutch decimal
  commas (e.g. "1/2", "2-3", "0,5")
- Custom units for anything the fixed unit list doesn't cover
  (e.g. "teentjes", "takjes")
- 0.5x/1x/2x/4x recipe scaling
- Light/dark mode
- Installable as a PWA with offline support for previously
  visited pages
- GitHub OAuth login, restricted to a single allowed account

## Tech stack

- Next.js 16 (App Router, Turbopack)
- Prisma 7 + PostgreSQL (local for development, Supabase in
  production)
- Better Auth (GitHub OAuth, database-less/JWT sessions)
- Tailwind CSS v4
- Serwist (PWA support)
- Biome (linting/formatting)

## Development

Requires a local PostgreSQL database.

```bash
npm install
npx prisma migrate dev
npm run dev
```

Environment variables needed in `.env` - see `.env.example` for
the full list (GitHub OAuth credentials, Better Auth secret,
database URL, allowed email).

## Deployment

Deployed on Vercel, connected to a production Supabase
database. Migrations are applied manually with
`npx prisma migrate deploy` against the production
`DATABASE_URL` before deploying schema changes.
