# Code Standards

## General

- Keep components small and single-purpose — a component that renders a
  section (e.g. `EventsCarousel`) should not also fetch and shape its own
  data if that logic is reusable elsewhere; lift data-fetching to the page
  and pass props down
- Fix root causes, do not layer workarounds — if MUI's default styling and
  a Tailwind utility class conflict, resolve the conflict at the theme or
  component level rather than adding `!important`
- Do not mix unrelated concerns in one component or route — a Route
  Handler that both writes to Prisma and uploads to ImageKit should call
  out to two focused helper functions, not inline both concerns

## JavaScript

- The project is plain JavaScript (no TypeScript) — do not introduce `.ts`/
  `.tsx` files or a `tsconfig.json` without an explicit decision to migrate
  the whole project; keep new files `.js`/`.jsx` to match
- Validate unknown external input (form submissions, query params, webhook
  payloads) at the boundary — a Route Handler — before passing it to
  Prisma or any other internal function
- Prefer explicit prop shapes (e.g. a short JSDoc comment or a default-prop
  object) over implicit `any`-like usage, since there's no TypeScript
  safety net

## Next.js (App Router)

- Default to Server Components; add `"use client"` only when the component
  needs browser APIs, local state, or event handlers (MUI `TextField`
  state, `react-multi-carousel`, the `next-themes` toggle,
  `nextjs-progressbar`)
- Keep Route Handlers (`app/api/**/route.js`) focused on one responsibility
  each — one handler per resource/action, not a single catch-all
- Data fetching for a page happens in that page's Server Component (or a
  small server-only helper it calls) — do not fetch the same data
  redundantly in a client component that could have received it as a prop

## Styling — MUI + Tailwind

- MUI is the primary component library — reach for a MUI component
  (`Button`, `Card`, `Grid`, `Dialog`, etc.) before hand-building an
  equivalent with Tailwind alone
- Use MUI's `sx` prop or a `styled()` component for anything that needs to
  read the MUI theme (colors, spacing, breakpoints) — use Tailwind utility
  classes for layout/spacing that doesn't need theme awareness
- Don't fight the two systems against each other: if a MUI component's
  `className` is being overridden by a conflicting Tailwind utility, prefer
  the theme/`sx` approach for that element rather than increasing
  specificity
- Centralize design tokens (colors, typography, spacing scale) in the MUI
  theme (`createTheme`) so both MUI components and any custom component
  can read from one source — see `ui-context.md` for the actual token
  values to configure there
- `next-themes` drives light/dark mode — theme-aware colors must be
  defined for both modes in the MUI theme, not hardcoded to one mode

## Database (Prisma + Neon)

- Schema changes go through `prisma/schema.prisma` and a generated
  migration — never hand-edit the database out of band
- Use the Prisma Client via a single shared singleton (typically
  `lib/prisma.js`) — do not instantiate a new `PrismaClient` per request
- Queries that filter/mutate by a resource's owner must include that
  ownership condition in the query itself, not as a separate check after
  fetching unfiltered data

## Images (ImageKit)

- Uploads go through the ImageKit server SDK from a Route Handler — never
  accept a raw file upload into a Route Handler and store it anywhere
  other than ImageKit
- Store only the ImageKit file ID/URL in the Prisma model, not the binary
  or a base64 string
- Use ImageKit's URL-based transformations (resize/crop/format) rather
  than shipping multiple pre-rendered image sizes

## Blog Content

- Blog post body is stored as text (rich text or markdown) in the `Post`
  Prisma model — never as a filesystem MDX file, so it can be edited
  without a deploy
- Sanitize/escape post body before rendering (e.g. a markdown-to-safe-HTML
  step) — never `dangerouslySetInnerHTML` on unsanitized stored content
- Blog index search/category filtering happens server-side via a Prisma
  query built from URL search params (`?category=`, `?q=`) in the route's
  Server Component — do not ship the full post list to the client to
  filter in JS
- The share rail (WhatsApp / email / copy-link) is a small Client
  Component (`"use client"`) since copy-link needs the Clipboard API —
  keep it isolated from the rest of the otherwise-server-rendered article

## API / Route Handlers

- Validate and parse request input before any logic runs
- Enforce auth and ownership checks before any mutation (see
  `architecture.md` → Auth and Access Model)
- Return consistent, predictable JSON response shapes (e.g.
  `{ data, error }`) across all Route Handlers

## File Organization

- `app/` — routes, layouts, Route Handlers (see `architecture.md` for the
  full breakdown)
- `components/` — shared presentational components (MUI + Tailwind)
- `lib/` — server-only singletons and helpers (Prisma client, ImageKit
  instance, Firebase Admin init)
- `prisma/` — schema and migrations
