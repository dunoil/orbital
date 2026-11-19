import {
  Button,
  Circle,
  Column,
  Grid,
  Heading,
  Page,
  Row,
  Section,
  Svg,
  Text,
  token,
} from "@hyper-elements/react";
import { night } from "../src/data/night";
import type { Night } from "../src/data/night";
import { isPrime } from "../src/data/night";
import { orbitalTheme } from "../src/theme";
import { KitFooter, NightLine, OrbitMark, PrimeBlock } from "../src/components/shared";
import { PassCard } from "../src/components/pass-card";

/**
 * OUTPUT 2 — The public passes page (Page root -> responsive web HTML,
 * no client-side JavaScript).
 *
 * The epic one: a deep-space hero with real Svg orbit art (allowed
 * here, forbidden in the email), every pass as a typed orbital.PassCard,
 * and the network's stations charted below.
 */
export function PassPage({ nightFile = night }: { nightFile?: Night }) {
  return (
    <Page
      theme={orbitalTheme}
      width={1100}
      title={`${nightFile.satellite} passes — ${nightFile.date}`}
      description={nightFile.summary}
      lang="en"
      style={{ gap: 0 }}
    >
      <Section
        style={{
          backgroundColor: "#0d1526",
          padding: [48, 40],
          gap: 20,
          mobile: { padding: [32, 20] },
        }}
        tokens={{
          colors: {
            foreground: "#edf0f5",
            muted: "#a7b3c9",
            primary: "#7dd3e8",
          },
        }}
      >
        <Row style={{ gap: 32, alignItems: "start" }}>
          <Column style={{ gap: 14 }}>
            <Text
              style={{
                color: "#7dd3e8",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              {`${nightFile.network} · ${nightFile.date}`}
            </Text>
            <Heading level={1} style={{ fontSize: 46, mobile: { fontSize: 30 } }}>
              One satellite. Six stations. One night.
            </Heading>
            <Text style={{ fontSize: 17 }}>{nightFile.summary}</Text>
            <NightLine nightFile={nightFile} />
            <Row style={{ gap: 12 }}>
              <Button href="https://orbital.example/join">
                Join the network
              </Button>
              <Button
                href="https://orbital.example/charts"
                variant="secondary"
                style={{ color: "#0d1526" }}
              >
                Print tonight's charts
              </Button>
            </Row>
          </Column>
          <Column style={{ gap: 12, alignItems: "center" }}>
            <Svg
              width={200}
              height={200}
              viewBox="0 0 200 200"
              title="Orbit arc over the network"
            >
              <Circle cx={100} cy={100} r={88} style={{ fill: "#0d1526", stroke: "#7dd3e8", strokeWidth: 2 }} />
              <Circle cx={100} cy={100} r={34} style={{ fill: "#1d4ed8" }} />
              <Circle cx={168} cy={64} r={6} style={{ fill: "#e9a426" }} />
              <Circle cx={40} cy={150} r={3} style={{ fill: "#edf0f5" }} />
              <Circle cx={160} cy={150} r={3} style={{ fill: "#edf0f5" }} />
              <Circle cx={100} cy={24} r={3} style={{ fill: "#edf0f5" }} />
            </Svg>
            <OrbitMark passes={nightFile.passes} cell={16} />
            <Text style={{ apply: ["quiet"], color: "#a7b3c9", textAlign: "center" }}>
              The orbit mark: one dot per pass tonight, amber for prime —
              the same mark your alert email and printed chart carry.
            </Text>
          </Column>
        </Row>
      </Section>

      <Section style={{ padding: [36, 40], gap: 24, mobile: { padding: [24, 20] } }}>
        <PrimeBlock nightFile={nightFile} />
        <Heading level={2}>The eight passes</Heading>
        <Grid columns={2} style={{ gap: 16 }}>
          {nightFile.passes.map((pass) => (
            <PassCard
              key={pass.id}
              passId={pass.id}
              station={pass.station}
              peak={pass.peak}
              maxElevation={pass.maxElevation}
              magnitude={pass.magnitude}
              path={pass.path}
              prime={isPrime(pass)}
              note={pass.note}
            />
          ))}
        </Grid>
        <Heading level={2}>The stations</Heading>
        <Grid columns={3} style={{ gap: 16 }}>
          {nightFile.stations.map((station) => (
            <Column
              key={station.code}
              style={{
                gap: 6,
                padding: 18,
                backgroundColor: token("colors.paper"),
                border: { width: 1, style: "solid", color: token("colors.border") },
                borderRadius: 8,
              }}
            >
              <Text style={{ apply: ["mono"], fontWeight: 700 }}>
                {station.code} · {station.name}
              </Text>
              <Text style={{ fontSize: 13, color: token("colors.muted") }}>
                {station.location}
              </Text>
              <Text style={{ fontSize: 13 }}>{station.horizon}</Text>
            </Column>
          ))}
        </Grid>
      </Section>

      <Section style={{ padding: [28, 40], mobile: { padding: [20, 20] } }}>
        <KitFooter />
      </Section>
    </Page>
  );
}

PassPage.PreviewProps = { nightFile: night };
export default PassPage;
