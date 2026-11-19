# Competition submission — ORBITAL (posted 19 Nov 2026 as a bonus entry)

Target: GitHub Discussions → **Challenge Submissions** in `hyper-elements/hyper-elements`
Repository: https://github.com/dunoil/orbital
All numbers below come from the actual run on 19 Nov 2026 (`out/checks.json`, `out/batch.json`).

---

### Which challenge are you entering?
Hyper Elements Template Challenge (November 2026)

### Project name
ORBITAL — Every pass, predicted: a satellite observation kit (observer alert email, passes page, printed station charts PDF, pass cards from one night file)

### Project description

One night file in → **240 personalised observer alerts, a 6-page station-chart PDF, a public passes page and 8 pass cards** out — from one theme and one set of shared components.

A pass prediction is a promise with a time on it. If the email says 19:09 and the printed chart says 19:19, someone stands in a field looking at the wrong sky. This kit makes disagreement impossible by construction — and "prime", the passes worth setting an alarm for, is a **rule in the data** (max elevation ≥ 55° and magnitude ≤ 0.5), never a label applied by hand, so all four outputs always agree about which passes matter.

- **Alert email** (`Email` → `render()`) — personal in the way that counts: each observer gets the passes for *their* station, prime passes called out first. No Svg, no remote images: the OrbitMark (one dot per pass, amber for prime) is a `Grid` of `Column`s, so the night survives image-blocking inboxes. `MergeTag` greeting; plain-text twin from the same render.
- **Passes page** (`Page` → `render()`) — the epic one: a deep-space hero with real `Svg` orbit art (allowed here, forbidden in the email), every pass as a typed `orbital.PassCard`, the six stations charted below, no client-side JavaScript.
- **Station charts** (`Document` → `renderPdf()`) — one A4 chart per station, printed and pinned up at the observing site: that station's pass table and full detail, horizon notes, and a hand-written observed log. No browser makes this PDF.
- **Pass cards** (`Canvas` → `renderImage()`) — 1080×1080 PNGs, one per pass, peak time and elevation as the heroes on a deep-space ground. Server-rendered; fonts in as bytes; nothing fetched.

**Measured on the demo run (19 Nov 2026):** 240 observer alerts · 6 chart pages in one PDF · 8 pass cards · **gate: 0 errors, 0 warnings** · full batch in **12.2s** on a shared VM.

**Corrections pass:** observer generation is deterministic (no clock, no randomness), so fixing one record re-renders only that record — the other 239 alerts are byte-identical.

### Public GitHub repository URL
https://github.com/dunoil/orbital

### How did you use Hyper Elements?

- **One `defineTheme()`** carries all four roots — chart paper, deep-space ink, signal cyan, a sans + mono pairing, named `card`/`stamp`/`mono` styles, Button variants, per-format overrides. The theme carries no `mobile` blocks on purpose — phone styles are an error in a Document or a Canvas.
- **Shared components across roots** (`Wordmark`, `OrbitMark`, `NightLine`, `PassTable`, `PrimeBlock`) are why the emailed pass and the printed pass are the same pass.
- **Each root plays to its medium.** The Page gets full `Svg` orbit art; the Email, which cannot hold an Svg, gets the OrbitMark as layout instead — the same information, drawn the way each medium allows.
- **A custom element with `defineElement()`**: `orbital.PassCard` with typed props (`prop.text`, `prop.number`, `prop.boolean`). A mistyped elevation is a diagnostic with a path, before anything renders.
- **`validate()` as a gate, not a linter.** The batch validates before writing a single file. `out/checks.json` makes the verdict a file instead of a claim.
- **Token scopes for the dark grounds**: the Page hero and the Canvas card invert via `tokens` on a Section/Column — the theme itself never changes.
- **`@hyper-elements/email-clients`** for client proof (`npm run clients`): 5 previews of the email as classic Outlook, Gmail and Apple Mail draw it; screenshots in `docs/`.
- **CLI-ready**: `npx hyper-elements check templates/` reports **4 templates: 0 errors, 0 warnings, 0 skipped** (verified 19 Nov 2026).
- **Written for agents too** (`AGENTS.md`): ten invariants an agent must not break.

**Run it:** `npm install && npm run check && npm run render && npm run make` (240 alerts) · `npm run make:sample` (12) · `npm run clients`. Node 20+. `examples/` holds one artefact of each kind. All data is fictional (the Meridian network and MERIDIAN-1 are invented; times are illustrative).

### Live preview URL (optional)
No hosted preview. `examples/` in the repository contains the alert email (HTML + plain text), the passes page, the station charts as a PDF and the brightest pass card PNG, all from the demo run — and `docs/` holds screenshots of every output, including the email as Outlook and Gmail render it.

### Submission confirmation
- [x] I have starred the Hyper Elements repository. (Starred 18 Nov 2026; same account.)
- [x] My repository is public and contains the complete source code and required README.
- [x] My submission meets the requirements of the selected challenge.
