import {
  Canvas,
  Column,
  Heading,
  Row,
  Text,
  token,
} from "@hyper-elements/react";
import { night } from "../src/data/night";
import type { Night, Pass } from "../src/data/night";
import { isPrime } from "../src/data/night";
import { orbitalTheme } from "../src/theme";
import { OrbitMark } from "../src/components/shared";

/**
 * OUTPUT 4 — The pass card (Canvas root, 1080 x 1080 -> PNG).
 *
 * A square card per pass, rendered on the server with renderImage():
 * deep-space ground, the pass id in mono, peak time and elevation as
 * the heroes. The batch makes one card per pass (8 cards); this default
 * export is the night's brightest pass. Fonts arrive as bytes; nothing
 * is fetched.
 */
export function PassCanvas({
  nightFile = night,
  pass,
}: {
  nightFile?: Night;
  pass?: Pass;
}) {
  const hero =
    pass ?? nightFile.passes.reduce((a, b) => (a.magnitude <= b.magnitude ? a : b));
  const prime = isPrime(hero);
  return (
    <Canvas
      theme={orbitalTheme}
      width={1080}
      height={1080}
      title={`${hero.satellite} pass ${hero.id} — peaks ${hero.peak} at ${hero.maxElevation} degrees`}
      lang="en"
      style={{
        padding: 72,
        gap: 28,
        justifyContent: "space-between",
        backgroundColor: "#0d1526",
      }}
    >
      <Column
        style={{ gap: 28, justifyContent: "space-between", height: 936 }}
        tokens={{
          colors: { foreground: "#edf0f5", muted: "#a7b3c9", primary: "#7dd3e8" },
        }}
      >
      <Row style={{ gap: 16, alignItems: "center" }} stackOnMobile={false}>
        <OrbitMark passes={nightFile.passes} cell={16} />
        <Column style={{ gap: 0 }}>
          <Text style={{ fontWeight: 700, fontSize: 30, letterSpacing: 2 }}>
            ORBITAL
          </Text>
          <Text style={{ fontSize: 20, color: token("colors.muted") }}>
            {nightFile.network}
          </Text>
        </Column>
      </Row>

      <Column style={{ gap: 22 }}>
        <Text
          style={{
            color: prime ? "#e9a426" : "#7dd3e8",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          {prime ? "PRIME PASS" : "VISIBLE PASS"} · STATION {hero.station} ·{" "}
          {nightFile.date}
        </Text>
        <Heading level={1} style={{ fontSize: 84, lineHeight: 1.05 }}>
          {hero.satellite} peaks at {hero.maxElevation}°
        </Heading>
        <Text style={{ fontSize: 30 }}>
          Rise {hero.rise} · Peak {hero.peak} · Set {hero.set} — path{" "}
          {hero.path}, magnitude {hero.magnitude}.
        </Text>
        <Text style={{ fontSize: 24, color: token("colors.muted") }}>
          {hero.note}
        </Text>
      </Column>

      <Column style={{ gap: 12 }}>
        <Text style={{ apply: ["mono"], fontSize: 22, color: token("colors.muted") }}>
          Pass {hero.id} · One night file rendered this card, the alert
          email, the passes page and the printed station chart.
        </Text>
        <Text style={{ fontSize: 20, color: token("colors.muted") }}>
          Orbital · Every pass, predicted · Look up.
        </Text>
      </Column>
      </Column>
    </Canvas>
  );
}

PassCanvas.PreviewProps = { nightFile: night };
export default PassCanvas;
