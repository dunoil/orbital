# ORBITAL — design notes

## Concept

A template kit for a satellite observation network's best night of the
month. One night file (8 predicted passes over 6 stations) renders
personalised observer alert emails, the public passes page, printed A4
station charts and square pass cards. Style: "the star chart" — pale
chart paper `#edf0f5`, deep-space ink `#0d1526`, signal cyan `#0e7490`,
amber reserved for prime passes; mono for every number that matters.

Signature: the **OrbitMark** — one dot per pass tonight, cyan for a good
pass, amber for a prime one — built from a Grid of Columns so it works
in an inbox, on the page, on the printed chart and on the card. "Prime"
is a rule in the data file (elevation >= 55 and magnitude <= 0.5),
never a hand-applied label, so the email, page, chart and cards always
agree about which passes matter.

## Build lessons (from the gate, all fixed)

1. Svg children are primitives (Circle, Path), not raw SVG markup, and
   Svg takes width/height as props. `fill: "none"` is not a colour —
   a ring is a filled circle in the ground colour with a stroke.
2. A Canvas root takes no `tokens` prop — token scopes live on a
   Section/Row/Column/Grid inside it.
3. (Carried from Release Ledger) theme defaults are flat, padding uses
   the array form, TableCell holds text/Span directly, inline runs are
   Span not Text, roots take no padding, an Email has no subject prop.
