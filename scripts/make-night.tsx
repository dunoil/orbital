import { mkdir, writeFile } from "node:fs/promises";
import { render, validate, formatDiagnostics } from "@hyper-elements/react";
import { renderPdf } from "@hyper-elements/react/pdf";
import { renderImage } from "@hyper-elements/react/image";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import PassEmail from "../templates/pass-email";
import StationChartsDocument from "../templates/station-charts-document";
import { PassCanvas } from "../templates/pass-canvas";
import { night, makeObservers } from "../src/data/night";

/**
 * The batch: one night file -> a personalised pass alert for every
 * observer in the network, the printed station charts (one A4 page per
 * station) and one pass card per pass.
 *
 *   npm run make               240 observer alerts + charts + 8 cards
 *   npm run make:sample        12 alerts, for a quick look
 *
 * The gate runs first: the alert email is validated before a single
 * file is written, so one bad pass never becomes 240 bad alerts.
 * Observer generation is deterministic — a corrections run re-renders
 * only the records that changed.
 */
const arg = process.argv.indexOf("--count");
const count = arg >= 0 ? Number(process.argv[arg + 1]) : 240;
const started = Date.now();

const gate = validate(<PassEmail />);
if (!gate.valid) {
  console.error(formatDiagnostics(gate.diagnostics));
  process.exit(1);
}

await mkdir("out/alerts", { recursive: true });
const observers = makeObservers(count);
let emails = 0;
for (const observer of observers) {
  const { html, text } = await render(<PassEmail observer={observer} />);
  const stem = `out/alerts/${observer.ref.toLowerCase()}`;
  await writeFile(`${stem}.html`, html);
  if (text) await writeFile(`${stem}.txt`, text);
  emails++;
}

const charts = await renderPdf(<StationChartsDocument />);
await writeFile("out/station-charts.pdf", charts.pdf);

let cards = 0;
const bold = "assets/fonts/Inter-Bold.woff";
const regular = "assets/fonts/Inter-Regular.woff";
if (existsSync(bold) && existsSync(regular)) {
  const fonts = [
    { family: "Inter", src: await readFile(regular), weight: 400 as const },
    { family: "Inter", src: await readFile(bold), weight: 700 as const },
  ];
  for (const pass of night.passes) {
    const { image } = await renderImage(<PassCanvas pass={pass} />, { fonts });
    await writeFile(`out/alerts/card-${pass.id.toLowerCase()}.png`, image);
    cards++;
  }
} else {
  console.log("cards skipped: add Inter font files to assets/fonts/ (see its README)");
}

const summary = {
  night: `${night.satellite} — ${night.date}`,
  emails,
  chartPages: night.stations.length,
  cards,
  seconds: Math.round((Date.now() - started) / 100) / 10,
};
await writeFile("out/batch.json", JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify(summary, null, 2));
