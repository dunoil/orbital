Templates use Hyper Elements (@hyper-elements/react).
If it isn't installed, install it with react and react-dom.
Before writing a template, read node_modules/@hyper-elements/react/GUIDE.md.

Validate every template, fix errors, review warnings, and inspect outline() before rendering.

# ORBITAL invariants — do not break these

1. ONE source of truth. All content comes from src/data/night.ts.
   Never hard-code pass, station or observer data inside a template.
2. ONE theme. All styling tokens live in src/theme.ts (defineTheme).
   Templates refer to tokens with token("..."); they do not invent palettes.
3. The OrbitMark is a Grid of Columns, never an Svg and never an Image.
   An Email cannot hold an Svg; the mark must survive image-blocking inboxes.
4. No Svg in templates/pass-email.tsx. No remote images in the email at all.
5. No margins anywhere. Space between blocks is the parent's gap;
   space inside a box is its padding. Roots take no padding.
6. Styles go in style={{ }}, never as props. A root's width is a prop.
7. A pass is prime only by the isPrime() rule in the data file
   (elevation >= 55 and magnitude <= 0.5). Never mark one prime by hand.
8. Every template default-exports its component and sets PreviewProps,
   so `npx hyper-elements check templates/` keeps working.
9. The gate runs first. scripts/check.tsx (or the gate inside
   make-night.tsx) must pass before any batch render. Never delete the
   gate to make a run pass.
10. Observer generation is deterministic. No Date.now(), no Math.random()
    in src/data/night.ts — a corrections run must re-render only changed
    records. (Date.now() in the batch script only times the run.)
