# UI Context

## Theme

Dark by default — the design language is a dark editorial performing-arts
identity (near-black backgrounds, hairline dividers, small-caps section
labels, sharp/square edges). `next-themes` is installed in the stack, but
no light-mode palette has been designed yet — treat dark as the only
supported theme until a light mode is explicitly designed and added to the
tables below. Don't let `next-themes` silently fall back to a
browser/OS light preference with undesigned colors.

## Colors

Configure these as the MUI theme's palette (`createTheme({ palette: {...} })`)
and mirror them in `tailwind.config.js` under `theme.extend.colors`, so MUI's
`sx`/`styled` and Tailwind utility classes both resolve to the same values.
No component should hardcode a hex value directly.

| Role                          | Token name (suggested) | Value                    |
| ------------------------------ | ------------------------ | ------------------------- |
| Page background (darkest)     | `background.default`     | `#0A0D12`                 |
| Surface / card background     | `background.paper` (navy)| `#101826`                 |
| Deep surface (footer, banded sections) | `navyDeep`       | `#0B121C`                 |
| Primary text                  | `text.primary`           | `#F3F5F8`                 |
| Primary accent / buttons      | `primary.main`           | `#FFFFFF`                 |
| Muted text                    | `text.secondary`         | `rgba(243,245,248,.55)`   |
| Faintest text                 | `text.disabled`          | `rgba(243,245,248,.38)`   |
| Hairline borders/dividers     | `divider`                | `rgba(243,245,248,.14)`   |
| Accent — red                  | `error.main` / `redAccent` | `#E5484D`                |
| Accent — red (hover/deep)     | `error.dark`             | `#C23238`                 |
| Accent — green                | `success.main`           | `#3FBF6F`                 |
| Accent — purple               | `secondary.main`         | `#A78BFA`                 |
| Accent — gold (Pathway/Training tag) | `warning.main`     | `#D9A441`                 |
| Accent — teal (Wellness tag)  | `info.main`              | `#4FD1C5`                 |
| Accent — blue (Stories tag)   | custom `storiesBlue`     | `#5B9BD5`                 |
| Footer background             | custom `footerBg`        | `#06080B`                 |

Assigned meanings (keep consistent across the app, don't reassign per page):
- **White** is the primary interactive accent (buttons, pills, active nav)
- **Red** = primary CTA emphasis / Events category
- **Green** = confirmations, "how it works" links / Community category
- **Purple** = secondary accent links / Culture category
- **Gold** = Pathway/Training category
- **Teal** = Wellness category
- **Blue** = Stories category

## Typography

| Role              | Font              | MUI theme key                     |
| ------------------ | ------------------ | ----------------------------------- |
| Display / headings | Fraunces (serif)  | `typography.h1`–`h4`.fontFamily     |
| Body / UI text     | Manrope (sans)     | `typography.fontFamily` (default)   |

Load both via `next/font/google` (App Router's built-in font loader) rather
than a manual `<link>` tag, and wire the resulting CSS variables into the
MUI theme's `typography.fontFamily`. Two families only — do not introduce a
third without updating this file.

## Border Radius

The brand uses sharp, square edges — `0` by default. Set
`shape.borderRadius: 0` in the MUI theme so this applies globally to MUI
components (`Button`, `Card`, `Paper`, `Chip`, etc.) without per-component
overrides. Circular elements (avatars, icon buttons, carousel dots) are the
only exception and use MUI's `variant="circular"` / `borderRadius: '50%'`.

## Component Library

MUI v5 (`@mui/material` + `@mui/icons-material`), styled via Emotion, is
the primary component library — reach for a MUI component before
hand-building an equivalent. Tailwind utility classes are used alongside
MUI for layout/spacing that doesn't need theme-aware values. Configure the
MUI theme once (palette, typography, shape) so every component inherits
brand-consistent tokens instead of overriding them ad hoc.

Reusable UI patterns to build as shared `components/` (matching the section
patterns already established in the earlier static prototype):
- `SectionHeader` — small-caps label + optional "see more" link, hairline
  top border (`Divider`)
- `AlternatingDetailRow` — photo + text block that flips sides (Programs/
  Training style)
- `EventRow` / `EventCard` — used both in the homepage carousel
  (`react-multi-carousel`) and the full Events page list
- `CategoryTag` — colored pill using the category-color mapping above (blog
  posts, program tags)

## Layout Patterns

- **Header/nav**: fixed/sticky top MUI `AppBar`, translucent dark
  background with backdrop blur, hairline bottom `Divider`; logo left, nav
  center, primary CTA button + icons right
- **Content width**: a shared `Container maxWidth` (MUI) around `1360px`
  equivalent, consistent horizontal padding — apply via the theme's
  `Container` default props rather than repeating `sx` on every page
- **Section vertical rhythm**: consistent vertical padding per section
  (large on desktop, reduced under MUI's `sm`/`md` breakpoints)
- **Grids**: MUI `Grid`/`Grid2` for 3- and 4-column card layouts,
  collapsing to 2-col and 1-col at the same breakpoints used before (roughly
  900px / 560px — map to MUI's `md`/`sm` breakpoints)
- **Carousels**: `react-multi-carousel` for the events/performances row and
  any other horizontally-scrolling card set
- **Route transitions**: `nextjs-progressbar` shows a top-of-page loading
  bar on navigation — style it with the primary accent color

## Blog Layout

- **Index**: card grid (reuse the Grids pattern above) with a `CategoryTag`
  per post, a search field (MUI `TextField`) and category filter chips
  above the grid
- **Article template**: a single-column reading width narrower than the main
  `Container` (comfortable line length for body text), Fraunces for the
  headline, Manrope for body copy, cover image full-bleed at the top via
  ImageKit
- **Share rail**: a small sticky column (desktop) / bottom bar (mobile) with
  WhatsApp, email, and copy-link icon buttons (`@mui/icons-material` +
  `SvgIcon` for WhatsApp) — see `code-standards.md` for why this is a
  Client Component

## Icons

Use `@mui/icons-material` for standard UI icons (search, menu, chevrons,
social links) instead of hand-drawn inline SVG. For icons
`@mui/icons-material` doesn't cover (WhatsApp, a custom brand mark), import
the SVG as a React component and wrap it in MUI's `SvgIcon` so it inherits
sizing/color props consistently with the rest of the app.
