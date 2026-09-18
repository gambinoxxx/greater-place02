# AI Workflow Rules

## Approach

Build this project incrementally as a Next.js (App Router) application.
Each unit of work is a route segment, a shared component, a Route Handler,
or a Prisma schema change — not a whole page rewritten at once. Context
files define what to build (`project-overview.md`), how to build it
(`architecture.md`, `code-standards.md`, `ui-context.md`), and what's
already done (`progress-tracker.md` — read-only record, do not edit).
Always implement against these specs and the design system already
defined (MUI theme tokens, Tailwind config) — do not invent new visual
patterns, color tokens, or route structures without checking here first.

## Scoping Rules

- Work on one route segment, one shared component, or one Route
  Handler/schema change at a time
- Prefer small, verifiable increments (one component, one route, one
  Prisma model, one fixed link) over rewriting multiple routes at once
- Do not combine unrelated changes (e.g. copy edits and a Prisma schema
  change, or a UI restructure and a new Route Handler) in a single
  implementation step

## When to Split Work

Split an implementation step if it combines:

- Content/copy changes and structural/layout changes
- Changes to more than one route or shared component
- A new route plus nav/footer changes across existing routes
- A UI change and a Prisma schema/migration change

If a change cannot be visually verified (rendered in the browser or via a
screenshot) and, where relevant, `npm run build` cannot be run to confirm
it compiles, the scope is too broad — split it.

## Handling Missing Requirements

- Do not invent new brand colors, fonts, or content (names, dates, bios)
  that contradict what's already established — see `ui-context.md` and
  the MUI theme/Tailwind config already in place
- If a requirement is ambiguous (e.g. which route a new CTA should link
  to, or whether a field belongs in Prisma vs. Firebase), resolve it
  before implementing — ask rather than guess
- If a requirement is missing, flag it as an open question for
  `progress-tracker.md` rather than silently deciding — that file is a
  record the user maintains, not one the agent edits unprompted
- Firebase's exact role is an open item (see `architecture.md`) — do not
  add new Firebase usage that assumes Auth, Firestore, or Storage without
  confirming first

## Protected Files

Do not modify the following unless explicitly instructed:

- `progress-tracker.md` — record file, maintained by the user, not the
  agent
- `prisma/schema.prisma` migrations already applied — add new migrations,
  don't hand-edit or delete existing ones
- Any route/component the user has explicitly called "final" or
  "approved" in a session — confirm before editing it

## Keeping Docs in Sync

Update the relevant context file whenever implementation changes:

- New route/segment added, folder structure changes, or a dependency's role
  is confirmed (e.g. Firebase) → `architecture.md`
- New color, font, or MUI/Tailwind component pattern introduced →
  `ui-context.md`
- New JS/Next.js pattern, Prisma convention, or file-organization
  convention introduced → `code-standards.md`
- Overall project scope changes → `project-overview.md`
- New Prisma model or relation added → `architecture.md` (Storage Model)

## Before Moving to the Next Unit

1. The current route/component renders correctly end to end (verified
   with a screenshot or by opening it in a browser), and `npm run build`
   passes if the change touches Prisma, Route Handlers, or server-only
   code
2. No convention defined in `ui-context.md` or `code-standards.md` was
   violated (colors, fonts, spacing, Server/Client Component boundaries,
   MUI theme usage)
3. The work is ready to be reflected in `progress-tracker.md` — surface a
   summary for the user to add, since the agent does not edit that file
4. Every internal link on the changed route(s) resolves to a real route or
   a real anchor — no placeholder `href="#"` left behind
5. Any new environment variable (database URL, ImageKit keys, Firebase
   config) is documented, not just hardcoded locally
