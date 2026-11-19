import { Column, Row, Text, defineElement, prop, token } from "@hyper-elements/react";

/**
 * `orbital.PassCard` — one satellite pass, as a chart card: its id in
 * mono, peak time, maximum elevation, brightness and compass path, with
 * a prime flag for the passes worth an alarm.
 *
 * A custom element because the pass is the kit's unit of reuse: the page
 * grids eight of them, and a mistyped elevation or a missing peak time
 * should be a diagnostic with a path, not a broken chart. Props are
 * typed with the prop.* builders.
 */
export const PassCard = defineElement({
  type: "orbital.PassCard",
  label: "Pass card",
  description:
    "One visible satellite pass: id, station, peak time, max elevation, magnitude, path and note.",
  props: {
    passId: prop.text({ label: "Pass id", required: true }),
    station: prop.text({ label: "Station code", required: true }),
    peak: prop.text({ label: "Peak time", required: true }),
    maxElevation: prop.number({ label: "Max elevation (deg)", required: true }),
    magnitude: prop.number({ label: "Magnitude", required: true }),
    path: prop.text({ label: "Compass path", required: true }),
    prime: prop.boolean({ label: "Prime pass", default: false }),
    note: prop.text({ label: "Viewing note", required: true }),
  },
  render: ({ passId, station, peak, maxElevation, magnitude, path, prime, note }) => {
    return (
      <Column
        style={{
          gap: 8,
          backgroundColor: token("colors.paper"),
          border: {
            width: 1,
            style: "solid",
            color: prime ? "#e9a426" : token("colors.border"),
          },
          borderRadius: 8,
          padding: 18,
        }}
      >
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <Column
            style={{
              backgroundColor: prime ? "#e9a426" : "#22a8c8",
              width: 10,
              height: 10,
              borderRadius: 5,
            }}
          />
          <Text style={{ apply: ["mono"], fontWeight: 700 }}>{passId}</Text>
          <Text style={{ apply: ["quiet"] }}>Station {station}</Text>
          {prime ? (
            <Text style={{ color: "#9a6206", fontWeight: 700, fontSize: 12 }}>
              PRIME
            </Text>
          ) : null}
        </Row>
        <Text style={{ fontWeight: 700, fontSize: 16 }}>
          Peaks {peak} · {maxElevation}° · mag {magnitude}
        </Text>
        <Text style={{ fontSize: 14 }}>
          Path {path}. {note}
        </Text>
      </Column>
    );
  },
});
