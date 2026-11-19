import {
  Button,
  Column,
  Email,
  Heading,
  Link,
  MergeTag,
  Text,
} from "@hyper-elements/react";
import { night } from "../src/data/night";
import type { Night, Observer } from "../src/data/night";
import { passesFor, stationByCode } from "../src/data/night";
import { orbitalTheme } from "../src/theme";
import {
  KitFooter,
  NightLine,
  PassTable,
  PrimeBlock,
  Wordmark,
} from "../src/components/shared";

/**
 * OUTPUT 1 — The observer alert email (Email root -> email-safe HTML +
 * a plain-text twin from the same render).
 *
 * Personal in the way that matters: each observer gets the passes for
 * THEIR station, from the same night file the charts are printed from.
 * No Svg, no remote images: the OrbitMark is layout, so the night
 * survives image-blocking inboxes.
 */
export function PassEmail({
  nightFile = night,
  observer,
}: {
  nightFile?: Night;
  observer?: Observer;
}) {
  const station = observer
    ? stationByCode(nightFile, observer.station)
    : nightFile.stations[0];
  const passes = observer
    ? passesFor(nightFile, observer.station)
    : nightFile.passes;
  return (
    <Email
      theme={orbitalTheme}
      width={600}
      previewText={`Tonight: ${passes.length} passes over ${station.name}, first rise ${passes[0]?.rise ?? ""}. The prime ones are marked.`}
      title={`${nightFile.satellite} passes — ${nightFile.date}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <Column style={{ apply: ["card"] }}>
        <Wordmark nightFile={nightFile} />
        <Heading level={1} style={{ mobile: { fontSize: 25 } }}>
          Tonight's sky, <MergeTag name="first_name" />
        </Heading>
        <Text>
          {nightFile.summary}
        </Text>
        <NightLine nightFile={nightFile} />
        <PrimeBlock nightFile={nightFile} />
        <Heading level={2}>
          {observer
            ? `Over ${station.name} (${station.code})`
            : "Tonight, across the network"}
        </Heading>
        <PassTable passes={passes} />
        {observer ? (
          <Text style={{ fontSize: 14 }}>{station.horizon}</Text>
        ) : null}
        <Button href="https://orbital.example/passes">
          See the full night chart
        </Button>
        {observer ? (
          <Text style={{ apply: ["quiet"] }}>
            Alert for observer {observer.ref} at station {observer.station}.
            Times are local to your station; arrive ten minutes before the
            rise time.
          </Text>
        ) : null}
      </Column>
      <KitFooter />
      <Text style={{ apply: ["quiet"], textAlign: "center" }}>
        You receive pass alerts because you observe with the Meridian
        network. <Link href="{{unsubscribe_url}}">Unsubscribe</Link>
      </Text>
    </Email>
  );
}

PassEmail.PreviewProps = { nightFile: night };
export default PassEmail;
