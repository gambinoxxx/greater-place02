# Architecture Context

## Stack

| Layer            | Technology                                                        | Role                                                                 |
| ----------------- | ------------------------------------------------------------------| --------------------------------------------------------------------|
| Framework         | Next.js (App Router), React 18                                    | Routing, rendering (Server + Client Components), Route Handlers     |
| Language          | JavaScript (`.js`/`.jsx`) — no TypeScript in the project           | No `tsconfig.json` / `@types/*` — keep new files plain JS to match  |
| UI Library        | MUI v5 (`@mui/material`, `@mui/icons-material`) + Emotion          | Primary component library and its styling engine (`sx` prop, `styled`) |
| Utility CSS       | Tailwind CSS 3.3 + Autoprefixer + PostCSS                          | Utility classes for layout/spacing alongside MUI components         |
| Theming           | `next-themes`                                                      | Light/dark mode toggle, persisted theme preference                  |
| Navigation UX     | `nextjs-progressbar`                                                | Top-of-page loading bar on route transitions                        |
| Carousel          | `react-multi-carousel`                                              | Events/performances and any other horizontally-scrolling card rows  |
| ORM               | Prisma 5                                                            | Schema, migrations, type-safe queries against the database          |
| Database          | Neon (serverless Postgres) via `@neondatabase/serverless`           | Primary relational data store, reached through Prisma's driver adapter |
| Backend services  | Firebase 12                                                         | Confirm exact usage in this project (Auth, Storage, and/or Firestore) — record the decision below once confirmed |
| Image CDN/upload  | ImageKit (`imagekit` server SDK + `imagekit-javascript` client SDK) | Image upload, on-the-fly transformation, and delivery                |
| Logging           | `debug`                                                             | Namespaced debug logging in server-side code                        |

> **Open item:** Firebase is installed but its exact role isn't yet documented here — Auth, Firestore, Storage, or a combination. Confirm and update this row (and `Auth and Access Model` below) once decided, rather than assuming.

## System Boundaries

Standard Next.js App Router layout — confirm folder names against the actual
repo and correct here if they differ:

- `app/` — routes and layouts. Each route segment owns its own `page.js`
  (and `layout.js` where a segment needs a shared shell); Route Handlers
  (`route.js`) live under `app/api/**` for anything that needs to run
  server-side (form submissions, Prisma queries, ImageKit uploads)
- `components/` — shared, reusable UI built on MUI + Tailwind; a component
  here should not reach into Prisma or Firebase directly — it receives data
  as props
- `lib/` (or `utils/`) — server-only helpers: the Prisma client singleton,
  the ImageKit server SDK instance, Firebase Admin init, any Neon
  connection setup
- `prisma/` — `schema.prisma` and migrations; the single source of truth
  for the data model
- `public/` — static assets that are not routed through ImageKit

## Storage Model

- **Database (Neon Postgres, via Prisma)**: structured content and
  metadata — programs, classes, events, blog posts, team members, contact
  submissions, and any other record with fields/relations. This replaces
  the hardcoded HTML content from the earlier static-site prototype.
- **ImageKit**: all uploaded/served images (event photos, team photos,
  blog post images) — the database stores the ImageKit file ID/URL, not
  the binary
- **Firebase**: role to be confirmed (see Open Item above) — do not treat
  it as a second source of truth for content that already lives in
  Postgres; pick one system of record per data type

### Blog

- A `Post` Prisma model is the source of truth — no MDX/filesystem-based
  blog content and no separate headless CMS unless explicitly decided
- Suggested fields: `slug` (unique, used for the route param), `title`,
  `excerpt`, `body` (rich text or markdown stored as text — sanitize
  before rendering, see `code-standards.md`), `category`, `coverImage`
  (ImageKit file ID/URL), `publishedAt`, `authorId`/author fields
- Category filters and search (see `project-overview.md` → Blog index)
  are implemented as a Prisma query (`where: { category, OR: [...] }`)
  in the index route's Server Component, driven by URL search params —
  not a client-side fetch of the full post list
- The article template route is `app/blog/[slug]/page.js`, a Server
  Component that fetches the single post by slug and 404s (Next.js
  `notFound()`) if it doesn't exist

## Auth and Access Model

- To be confirmed once Firebase's role is documented. Until then:
  - If Firebase Auth is in use: visitors/admins sign in through Firebase;
    the app must validate the Firebase session server-side (Route Handler
    or middleware) before trusting any identity-bound request
  - Public marketing pages (home, programs, events, blog, contact) remain
    unauthenticated and publicly readable regardless of the auth setup
  - Any write path (contact form submission, an admin CMS for
    programs/events/blog) must enforce ownership/role checks server-side —
    never trust a client-supplied role or ID

## Invariants

1. Server Components are the default for any route that only reads data;
   add `"use client"` only where browser interactivity (MUI form state,
   the carousel, theme toggle) requires it
2. Route Handlers validate and parse input before touching Prisma —
   never pass raw request body straight into a query
3. Content that belongs in Postgres (programs, events, blog posts, team)
   is not duplicated as hardcoded JSX — the database is the single source
   of truth once a data model exists for it
4. Large binary content (images) never goes into the Postgres database —
   it goes through ImageKit, with only the resulting URL/ID stored in a
   Prisma model
5. `npm run build` (which runs `prisma generate && next build`) must pass
   before a unit of work is considered done
