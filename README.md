# GenSanFragheads

One-page static website for the [r/GenSanFragheads](https://www.reddit.com/r/GenSanFragheads) fragrance community in General Santos City. Built with Next.js (App Router, static export), TypeScript and Tailwind CSS.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

`out/` can be deployed to any static host (GitHub Pages, Cloudflare Pages, Netlify).

## Editing content

The home page is a single scrolling page: a hero, the Scent Map and Heat-Proof Picks. Heat Tips has its own page at `/heat-tips` (`src/app/heat-tips/page.tsx`). Their content lives in `src/data/`, so updating it rarely means touching page code:

| File | Section |
| --- | --- |
| `src/data/scent-map.json` | Scent Map spots, group names and descriptions, map center |
| `src/data/heat-proof.json` | Heat-Proof Picks and the peso budget tiers |
| `src/data/heat-tips.json` | Heat Tips page: a heading and a short text for each tip |

Field types and notes for these files are in `src/lib/data.ts`, which also checks the references when the site builds: an unknown `kind` or `tier` fails the build with a message naming the entry. In short:

- A spot needs `name`, `kind` (`counter`, `decant` or `local-maker`) and `location`. Add `coords` as `[latitude, longitude]` to pin it on the map (right-click a place on openstreetmap.org and choose Show address to get them); leave it out for online-only sellers. `notes` and `link` are optional.
- A pick needs `name`, `brand`, `tier` (one of the tier `id`s) and `why`. `link` is optional.
- A tip needs `heading` and `text`; a missing one fails the build. Tips show in file order.

Site name, subreddit link and the menu entries are in `src/lib/site.ts`.
