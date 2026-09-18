# Greater Place

## Overview

Greater Place is a performing-arts, ministry, and youth-development
nonprofit serving young people ages 8–33. The website is a Next.js (App
Router) application — structurally and visually modeled on ailey.org —
that introduces the organization, its training pathway, its programs and
classes, its events, and gives visitors real ways to get in touch
(WhatsApp, email) and eventually enroll or donate. Content that used to be
hardcoded (programs, classes, events, blog posts, team members) is backed
by Neon Postgres via Prisma, with images served through ImageKit.

## Goals

1. Present a professional, editorial visual identity (not a generic
   NGO/SaaS look) that a client can confidently share with funders and
   families
2. Give every major offering — training, programs, classes, events — its
   own clear, navigable route rather than burying everything on the
   homepage
3. Make every call-to-action on the site actually work end to end (real
   WhatsApp/email links, real internal routes/anchors) with no dead
   `href="#"` links in shipped work
4. Move content (programs, classes, events, blog, team) out of hardcoded
   JSX and into the database, so it can be updated without a code change
   once a CMS/admin path exists

## Core User Flow

1. A visitor lands on the homepage and gets the pitch (season/enrollment
   banner, mission statement, stat strip)
2. They browse Performances (Events), the Pathway (Training stages), and
   Programs/Classes to understand what Greater Place actually offers —
   this content is fetched from Postgres via Prisma in each route's Server
   Component
3. They read Our Story for the organization's background and leadership
4. They reach out via the Contact page (WhatsApp, email, or a contact form
   that writes a submission to the database) to enroll, ask a question, or
   book a performance
5. Optionally, they read the Blog for stories/culture content and go
   deeper on a specific program or event via its dedicated route

## Features

### Marketing & Content Pages

- Homepage following ailey.org's section pattern: promo banner, bleed "Our
  Story" block, performance carousel (`react-multi-carousel`), training
  block, program/culture grids, team grid, repertory list, support/donate
  section, contact teaser
- Our Story page (About-page pattern): hero, quote block, founder strip,
  colored mission bands, leadership list, history block
- Blog index with search + category filters (query params handled in the
  Server Component, or a client-side filter for a small dataset), and an
  article template with a sticky share rail (WhatsApp / email / copy-link)

### Program Detail Pages

- Programs overview: Faith & Character, Leadership, Wellness, plus a
  Culture/Movement grid and an FAQ accordion (MUI `Accordion`)
- Dedicated Training route (the four-stage Pathway: Discover → Develop →
  Perform → Lead) — reachable only via specific CTAs, not the main navbar
- Dedicated Classes route (Ogene, Liturgical Dance, Praise & Worship, Drama
  & Skits) — same navbar exclusion as Training
- Events route with full detail per performance (Winter Showcase, Mid-Year
  Performance, Annual Gala, Ogene Night), sourced from Prisma, with real
  WhatsApp RSVP links pre-filled per event

### Contact & Conversion

- Contact page: WhatsApp deep link, mailto link, and a contact form
  (MUI form components) that submits to a Route Handler, which validates
  input and writes the submission via Prisma
- Donate/Support section on the homepage

## Scope

### In Scope

- Next.js App Router pages/routes, MUI + Tailwind UI, content backed by
  Prisma/Neon where it benefits from being data-driven (programs, classes,
  events, blog, team, contact submissions)
- Real, working WhatsApp and email links throughout
- A consistent dark editorial design system (colors, fonts, spacing),
  centralized in the MUI theme, across every route
- Images served through ImageKit rather than static placeholder assets
  once real photography is available

### Out of Scope

- User accounts, sign-in, or any authenticated visitor-facing area, unless
  and until an admin/CMS path is explicitly scoped (Firebase's exact role
  here is still an open item — see `architecture.md`)
- Payment processing / real donation checkout (the Donate button is a
  placeholder CTA until a processor is chosen)
- Real photography — CSS-gradient/color placeholders remain until real
  assets are uploaded through ImageKit

## Success Criteria

1. `npm run build` (`prisma generate && next build`) passes with no errors
2. Every internal link (nav, footer, buttons, cards) resolves to a real
   route or anchor — none point to `#`
3. WhatsApp and email CTAs open the correct app/client with the right
   pre-filled message
4. Visual design is consistent (colors, fonts, spacing, nav/footer) across
   all routes, driven by the shared MUI theme rather than per-page
   overrides
5. Content that should be data-driven (programs, events, blog, team) is read
   from Prisma/Neon in the Server Component, not hardcoded in JSX
