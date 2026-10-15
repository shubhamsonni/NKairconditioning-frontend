# N K Airconditioning — Frontend

Next.js, React and TypeScript frontend for the N K Airconditioning service website.

## Setup

```bash
npm ci
```

Create `.env.local` from `.env.example` and set `NEXT_PUBLIC_API_URL` to the backend URL.

## Development

```bash
npm run dev
```

## Production

```bash
npm run build
npm start
```

HTTPS is required in production for browser location permission.


## Backend-owned category media

The Express backend owns category data, media and pagination. The frontend receives category summaries, seven hero slides and only the current gallery page (up to 10 items). Page changes request the API instead of slicing a full gallery in the browser.

Set `API_URL` to the backend origin before building and starting Next.js. It falls back to `NEXT_PUBLIC_API_URL`, then `http://localhost:5000`. Next.js proxies `/api/catalog/*` and `/work/*` to this backend. Rebuild/restart Next.js when the backend origin changes. The backend must be running for category pages and media to load.

The first gallery page renders on the server. Later pages have loading/retry states and cancelled stale requests. Images retain Next.js optimization and lazy loading. Video previews request metadata; seeking uses HTTP range support. The frontend no longer contains a gallery manifest or project media files.
