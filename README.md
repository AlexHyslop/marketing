# marketing

A [Next.js](https://nextjs.org) app (App Router, TypeScript, Tailwind CSS, ESLint).

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page lives in `src/app/page.tsx`.

## Dashboard password

Every page is behind a shared password. Set `DASHBOARD_PASSWORD` (and optionally
`SESSION_SECRET`) in the Vercel project's environment variables. Until then a
built-in fallback password is used; this repo is public, so set your own.

## What's here

- `/dashboard` — how the work flows, from calling landscapers to getting paid
- `/dashboard/calls`, `contractors`, `leads`, `approvals`, `agents`, `activity`
- `/quote` — preview of the homeowner landing page

All data is demo data in `src/lib/demo-data.ts` until a database is connected.
