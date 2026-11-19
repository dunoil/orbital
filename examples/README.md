# Examples — real artefacts from the demo run

Produced by `npm run render` on the sample night in `src/data/night.ts`
(MERIDIAN-1, Thursday night 19–20 November 2026). Nothing here is
hand-made: if it is in this folder, the library rendered it.

- `pass-email.html` / `pass-email.txt` — the observer alert email and
  its plain-text twin (the greeting shows `{{first_name}}` because the
  sample renders the template itself; the batch fills real names and
  filters the passes to each observer's station).
- `pass-page.html` — the public passes page.
- `station-charts.pdf` — the printed charts: one A4 page per station.
- `pass-card.png` — the brightest pass as a square card (1080×1080).

Regenerate everything with `npm run check && npm run render`.
