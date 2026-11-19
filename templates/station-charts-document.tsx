import {
  Span,
  Column,
  Document,
  Heading,
  PageFooter,
  PageHeader,
  PageNumber,
  Row,
  Text,
} from "@hyper-elements/react";
import { night } from "../src/data/night";
import type { Night } from "../src/data/night";
import { passesFor } from "../src/data/night";
import { orbitalTheme } from "../src/theme";
import { OrbitMark, PassTable } from "../src/components/shared";

/**
 * OUTPUT 3 — The station charts (Document root -> print HTML via
 * render(), PDF via renderPdf() from @hyper-elements/react/pdf).
 *
 * One A4 chart per station, printed and pinned up at the observing
 * site: that station's passes in big mono type, its horizon notes, and
 * space to log what was actually seen. The chart on the wall and the
 * alert in the inbox are the same file's children.
 */
export function StationChartsDocument({
  nightFile = night,
}: {
  nightFile?: Night;
}) {
  return (
    <Document
      theme={orbitalTheme}
      size="A4"
      margin={42}
      title={`${nightFile.satellite} station charts — ${nightFile.date}`}
      lang="en"
      style={{ gap: 20 }}
    >
      <PageHeader style={{ padding: { bottom: 10 } }}>
        <Row style={{ gap: 10, alignItems: "center" }} stackOnMobile={false}>
          <OrbitMark passes={nightFile.passes} cell={8} />
          <Text style={{ fontWeight: 700, fontSize: 11 }}>
            {nightFile.network} · {nightFile.satellite} · Station charts ·{" "}
            {nightFile.date}
          </Text>
        </Row>
      </PageHeader>
      <PageFooter style={{ padding: { top: 10 } }}>
        <Text style={{ fontSize: 10, color: "#47536b" }}>
          Chart <PageNumber /> of <PageNumber total /> · One night file
          rendered this chart · Orbital · {nightFile.date}
        </Text>
      </PageFooter>

      {nightFile.stations.map((station) => {
        const passes = passesFor(nightFile, station.code);
        return (
          <Document.Page key={station.code} style={{ gap: 16 }}>
            <Row
              style={{ gap: 16, alignItems: "center" }}
              stackOnMobile={false}
            >
              <Column style={{ gap: 4 }}>
                <Heading level={1} style={{ fontSize: 26 }}>
                  {station.name}
                </Heading>
                <Text>
                  Station {station.code} · {station.location} ·{" "}
                  {passes.length} passes tonight
                </Text>
              </Column>
              <Text style={{ apply: ["stamp"], color: "#0e7490" }}>
                PIN UP
              </Text>
            </Row>

            <Text>{station.horizon}</Text>

            <PassTable passes={passes} />

            <Column style={{ gap: 8 }}>
              <Heading level={3}>Full pass detail</Heading>
              {passes.map((pass) => (
                <Text key={pass.id} style={{ fontSize: 12 }}>
                  <Span style={{ apply: ["mono"], fontWeight: 700 }}>
                    {pass.id}
                  </Span>{" "}
                  — rises {pass.rise}, peaks {pass.peak} at{" "}
                  {pass.maxElevation}°, sets {pass.set}. Path {pass.path},
                  magnitude {pass.magnitude}. {pass.note}
                </Text>
              ))}
            </Column>

            <Column
              style={{
                gap: 6,
                padding: { top: 12 },
                border: { top: "1px dashed #47536b" },
              }}
            >
              <Text style={{ fontWeight: 700 }}>
                Observed log — fill in by hand, photograph, send to the
                network.
              </Text>
              <Text>
                Seen ☐ · Missed (cloud) ☐ · Missed (other) ☐ · Observer
                ____________ · Notes ______________________________________
              </Text>
            </Column>
          </Document.Page>
        );
      })}
    </Document>
  );
}

StationChartsDocument.PreviewProps = { nightFile: night };
export default StationChartsDocument;
