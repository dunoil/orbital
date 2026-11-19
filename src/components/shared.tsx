import {
  Column,
  Grid,
  Row,
  Span,
  Table,
  TableCell,
  TableRow,
  Text,
  token,
} from "@hyper-elements/react";
import type { Night, Pass } from "../data/night";
import { isPrime, stationByCode } from "../data/night";

/**
 * Shared components — plain functions returning elements, used under
 * several roots, which is exactly why the alert email, the public page
 * and the printed chart can never disagree about a pass.
 */

/**
 * The OrbitMark: one cell per pass tonight, in pass order — cyan for a
 * good pass, amber for a prime one. Built from a Grid of Columns, never
 * an Svg, never an image: an Email cannot hold an Svg and inboxes block
 * images. It is the night, drawn.
 */
export function OrbitMark({
  passes,
  cell = 12,
}: {
  passes: Pass[];
  cell?: number;
}) {
  return (
    <Grid
      columns={4}
      style={{ gap: 3, width: 4 * cell + 9 }}
      stackOnMobile={false}
    >
      {passes.map((pass) => (
        <Column
          key={pass.id}
          style={{
            backgroundColor: isPrime(pass) ? "#e9a426" : "#22a8c8",
            width: cell,
            height: cell,
            borderRadius: cell / 2,
          }}
        />
      ))}
    </Grid>
  );
}

export function Wordmark({ nightFile }: { nightFile: Night }) {
  return (
    <Row style={{ gap: 12, alignItems: "center" }} stackOnMobile={false}>
      <OrbitMark passes={nightFile.passes} cell={9} />
      <Column style={{ gap: 0 }}>
        <Text style={{ fontWeight: 700, fontSize: 17, letterSpacing: 1 }}>
          ORBITAL
        </Text>
        <Text style={{ apply: ["quiet"] }}>
          {nightFile.network} · {nightFile.satellite}
        </Text>
      </Column>
    </Row>
  );
}

export function Eyebrow({ children }: { children: string }) {
  return <Text style={{ apply: ["eyebrow"] }}>{children}</Text>;
}

/** Tonight at a glance: counts, as a mono chart line. */
export function NightLine({ nightFile }: { nightFile: Night }) {
  const prime = nightFile.passes.filter(isPrime).length;
  return (
    <Text style={{ apply: ["mono"], color: token("colors.muted") }}>
      {`${nightFile.passes.length} passes · ${nightFile.stations.length} stations · ${prime} prime`}
    </Text>
  );
}

/** Passes as a chart table — email and document. Cells hold text/Spans. */
export function PassTable({ passes }: { passes: Pass[] }) {
  return (
    <Table>
      <TableRow header>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Pass</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Peak</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Max el.</Span>
        </TableCell>
        <TableCell>
          <Span style={{ fontWeight: 700 }}>Path</Span>
        </TableCell>
      </TableRow>
      {passes.map((pass) => (
        <TableRow key={pass.id}>
          <TableCell>
            <Span style={{ apply: ["mono"], fontWeight: 700 }}>
              {pass.id}
            </Span>{" "}
            {pass.station}
            {isPrime(pass) ? (
              <Span style={{ color: "#9a6206", fontWeight: 700 }}>
                {" "}
                · PRIME
              </Span>
            ) : null}
          </TableCell>
          <TableCell>
            <Span style={{ apply: ["mono"] }}>{pass.peak}</Span>
          </TableCell>
          <TableCell>
            <Span style={{ apply: ["mono"] }}>{`${pass.maxElevation}°`}</Span>
          </TableCell>
          <TableCell>{pass.path}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

/** The prime passes, called out on their own — email and page. */
export function PrimeBlock({ nightFile }: { nightFile: Night }) {
  const prime = nightFile.passes.filter(isPrime);
  if (prime.length === 0) return null;
  return (
    <Column
      style={{
        gap: 10,
        padding: 18,
        backgroundColor: "#fdf6e0",
        border: { width: 1, style: "solid", color: "#e9a426" },
        borderRadius: 6,
      }}
    >
      <Text style={{ fontWeight: 700, color: "#9a6206" }}>
        Worth setting an alarm for — {prime.length} prime passes
      </Text>
      {prime.map((pass) => (
        <Text key={pass.id} style={{ fontSize: 14 }}>
          <Span style={{ apply: ["mono"], fontWeight: 700 }}>
            {pass.id}
          </Span>{" "}
          <Span style={{ fontWeight: 700 }}>
            peaks {pass.peak} at {pass.maxElevation}°
          </Span>{" "}
          over station {pass.station}. {pass.note}
        </Text>
      ))}
    </Column>
  );
}

export function KitFooter() {
  return (
    <Column style={{ gap: 6, alignItems: "center" }}>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        Orbital · Meridian Observation Network · Predictions computed from
        one night file
      </Text>
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        One night file rendered this — alert email, passes page, station
        charts and pass cards — with Hyper Elements.
      </Text>
    </Column>
  );
}
