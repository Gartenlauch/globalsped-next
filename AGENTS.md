# Globalsped Website Relaunch – Coding Agent Instructions

## Project
Relaunch of globalsped.de as a multilingual Next.js onepager with SEO-ready subpages.

## Tech Stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4 CSS-first
- Firebase for forms/backend if needed

## Languages
- German: /de
- English: /en
- Azerbaijani: /az

## Main rule
Always consider SEO and GEO optimization when creating routes, content, components, metadata and schema.

## Design
Use the Globalsped business brochure as design reference:
- dark green corporate background
- lime green accent
- Montserrat for headings and navigation
- Sans Serif for body text
- premium B2B logistics look

## Routing
Homepage:
- /de
- /en
- /az

Separate pages:
- /de/anfrage
- /de/faq
- /de/destinationen
- /de/leistungen
- /de/zollabwicklung
- /de/ueber-uns
- /de/kontakt
- /de/transport-[country] dynamic page for contries

countries = kasachstan, ksbekistan, kirgisistan, turkmenistan, tadschikistan, aserbaidschan, georgien, armenien, mongolei, irak

Each Country has a one page
Same structure for /en and /az.

## Forms
Create a separate transport request form page.
Do not place FAQ and RequestForm directly on the homepage.

## Code Rules
- Use reusable components
- Keep content separated from components
- Use semantic HTML
- Use accessible alt texts
- Do not hardcode all texts inside components long-term
