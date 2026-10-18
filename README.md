# TravelTrucks

A camper rental web app: a filterable catalog and a camper details page with a gallery, specifications, reviews and a booking form.

**Live demo:** https://travel-trucks-eight-pi.vercel.app/

## Features

- Home page with a hero banner and a link to the catalog
- Catalog with server-side filtering by location, vehicle type, engine and transmission
- "Load more" pagination (4 campers per page); previous results reset on a new search
- Empty catalog state with a filter reset
- Camper details page (opens in a new tab): gallery, specifications, reviews with ratings
- Booking form with validation and toast notifications
- Loaders, error and 404 pages
- Responsive layout

## Tech Stack

- Next.js 16 (App Router), TypeScript
- TanStack Query (useInfiniteQuery)
- Axios
- CSS Modules
- next/font (Inter, Manrope), next/image
- Sonner (toast notifications)

## Routes

| Route                 | Page            |
| --------------------- | --------------- |
| `/`                   | Home            |
| `/catalog`            | Campers catalog |
| `/catalog/[camperId]` | Camper details  |

## API

https://campers-api.goit.study

## Getting Started

```bash
git clone https://github.com/groteskzp/travel-trucks.git
cd travel-trucks
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Environment Variables

| Variable              | Description  |
| --------------------- | ------------ |
| `NEXT_PUBLIC_API_URL` | API base URL |

## Project Structure

The source code lives in the `src/` folder:

- `src/app` — pages and layouts (App Router)
- `src/components` — UI components
- `src/lib/api` — API requests
- `src/types` — TypeScript types

## Author

Valentyn Buryi — [GitHub](https://github.com/groteskzp)
