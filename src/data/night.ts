/**
 * The night file — the kit's single source of truth.
 *
 * One night's predictions for the Meridian observation network: every
 * visible pass over every station, with rise/peak/set times, maximum
 * elevation, brightness and the compass path. The observer alert email,
 * the public passes page, the printed station charts and the pass cards
 * all read this file, so they can never disagree about a pass.
 */

export interface Pass {
  /** Stable pass id, e.g. "P-2214" — printed on charts and cards. */
  id: string;
  satellite: string;
  /** Station code this pass is visible from, e.g. "KUP". */
  station: string;
  rise: string;
  peak: string;
  set: string;
  /** Maximum elevation in degrees (90 = directly overhead). */
  maxElevation: number;
  /** Apparent magnitude — lower is brighter; negative is brilliant. */
  magnitude: number;
  /** Compass path, e.g. "SW → NE". */
  path: string;
  note: string;
}

export interface Station {
  code: string;
  name: string;
  location: string;
  horizon: string;
}

export interface Night {
  network: string;
  satellite: string;
  date: string;
  summary: string;
  stations: Station[];
  passes: Pass[];
}

export interface Observer {
  firstName: string;
  station: string;
  ref: string;
}

/** A pass worth waking up for: high and bright. */
export function isPrime(pass: Pass): boolean {
  return pass.maxElevation >= 55 && pass.magnitude <= 0.5;
}

export const night: Night = {
  network: "Meridian Observation Network",
  satellite: "MERIDIAN-1",
  date: "Thursday night, 19–20 November 2026",
  summary:
    "The best night of the month: MERIDIAN-1 crosses the whole network on one orbital sweep, eight visible passes, four of them prime — high, bright, and slow enough to follow with the naked eye. One prediction file produced every alert, chart and card in this kit.",
  stations: [
    { code: "KUP", name: "Kupang Hill", location: "East Nusa Tenggara", horizon: "Open sea horizon to the south; the network's darkest sky." },
    { code: "BJO", name: "Bajo Ridge", location: "Flores coast", horizon: "Clear west; town glow to the east after 22:00." },
    { code: "MKS", name: "Makassar Roof", location: "South Sulawesi", horizon: "Rooftop station; harbour cranes mark the northern azimuths." },
    { code: "AMB", name: "Ambon Bay", location: "Maluku", horizon: "Bay reflections; best passes are the high southern ones." },
    { code: "MND", name: "Manado Point", location: "North Sulawesi", horizon: "Volcano silhouette to the south-west; superb dawn passes." },
    { code: "DEN", name: "Denpasar Field", location: "Bali", horizon: "Airport glow north; the southern sky stays clean." },
  ],
  passes: [
    { id: "P-2209", satellite: "MERIDIAN-1", station: "DEN", rise: "18:42", peak: "18:47", set: "18:52", maxElevation: 38, magnitude: 1.4, path: "W → NW", note: "Warm-up pass, low over the airport glow. Binoculars help." },
    { id: "P-2210", satellite: "MERIDIAN-1", station: "KUP", rise: "19:03", peak: "19:09", set: "19:15", maxElevation: 71, magnitude: -0.6, path: "SW → NE", note: "The brightest pass of the night — visible even before full dark." },
    { id: "P-2211", satellite: "MERIDIAN-1", station: "BJO", rise: "19:05", peak: "19:10", set: "19:16", maxElevation: 63, magnitude: 0.1, path: "SW → NE", note: "Crosses the whole sky; give it the ridge, not the beach." },
    { id: "P-2212", satellite: "MERIDIAN-1", station: "MKS", rise: "19:08", peak: "19:13", set: "19:18", maxElevation: 47, magnitude: 0.9, path: "S → NE", note: "Skims the harbour cranes at peak. Photographers: wide lens." },
    { id: "P-2213", satellite: "MERIDIAN-1", station: "AMB", rise: "19:31", peak: "19:36", set: "19:41", maxElevation: 55, magnitude: 0.4, path: "W → E", note: "High southern arc over the bay. Reflections on still water." },
    { id: "P-2214", satellite: "MERIDIAN-1", station: "MND", rise: "19:34", peak: "19:39", set: "19:44", maxElevation: 58, magnitude: 0.6, path: "W → E", note: "Clears the volcano silhouette at peak — the postcard shot." },
    { id: "P-2215", satellite: "MERIDIAN-1", station: "KUP", rise: "20:41", peak: "20:45", set: "20:49", maxElevation: 24, magnitude: 2.1, path: "NW → N", note: "Short, low return pass. For the logbook completists." },
    { id: "P-2216", satellite: "MERIDIAN-1", station: "MND", rise: "05:12", peak: "05:17", set: "05:22", maxElevation: 66, magnitude: -0.2, path: "NW → SE", note: "Dawn pass. Coffee first, then the point." },
  ],
};

export const sampleObserver: Observer = {
  firstName: "Sari",
  station: "KUP",
  ref: "OBS-0117",
};

const FIRST = [
  "Sari", "Bima", "Laras", "Dewa", "Nia", "Raka", "Tuti", "Eko",
  "Maya", "Ilham", "Sinta", "Bagus", "Rina", "Yoga", "Dewi", "Fajar",
  "Ayu", "Rizky", "Putri", "Hendra",
];
const STATION_CODES = ["KUP", "BJO", "MKS", "AMB", "MND", "DEN"];

/**
 * Deterministic observer generation — no clock, no randomness.
 * Regenerating the batch after fixing one record reproduces every other
 * record byte-for-byte, which is what makes a corrections pass honest.
 */
export function makeObservers(count: number): Observer[] {
  const out: Observer[] = [];
  for (let i = 0; i < count; i++) {
    out.push({
      firstName: FIRST[(i * 7 + 3) % FIRST.length],
      station: STATION_CODES[(i * 5 + 1) % STATION_CODES.length],
      ref: `OBS-${String(100 + ((i * 37) % 880)).padStart(4, "0")}`,
    });
  }
  return out;
}

export function passesFor(nightFile: Night, stationCode: string): Pass[] {
  return nightFile.passes.filter((p) => p.station === stationCode);
}

export function stationByCode(nightFile: Night, code: string): Station {
  return nightFile.stations.find((s) => s.code === code) ?? nightFile.stations[0];
}
