# GenSanFragheads

One-page static website for the [r/GenSanFragheads](https://www.reddit.com/r/GenSanFragheads) fragrance community in General Santos City. Built with Next.js (App Router, static export), TypeScript and Tailwind CSS.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static site in out/
```

`out/` can be deployed to any static host (GitHub Pages, Cloudflare Pages, Netlify). Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://example.com`) at build time so share previews get absolute URLs; it defaults to `http://localhost:3000`.

## Editing content

The home page is a single scrolling page: a hero, the Scent Map and a join call to action. The Scent Map content lives in `src/data/`, so updating it rarely means touching page code:

| File | Section |
| --- | --- |
| `src/data/scent-map.json` | Scent Map spots, group names and descriptions, map center |

Field types and notes for these files are in `src/lib/data.ts`, which also checks the references when the site builds: an unknown `kind` fails the build with a message naming the entry. In short:

- A spot needs `name`, `kind` (`counter`, `decant` or `local-maker`) and `location`. Add `coords` as `[latitude, longitude]` to pin it on the map (right-click a place on openstreetmap.org and choose Show address to get them); leave it out for online-only sellers. `notes` and `link` are optional.

Site name, subreddit link and the menu entries are in `src/lib/site.ts`.
