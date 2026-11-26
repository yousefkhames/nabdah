# Nabdah (نبضة)

Crowdsourced network coverage map for emergencies and hiking. Arabic first (RTL), English toggle. Free, no accounts.

## What it does
- **Map**: coverage cells coloured by signal (no service to excellent), carrier filter, confidence by number of reports.
- **Report**: log your signal in two taps. Position is snapped to a ~275 m grid and time to the day before anything is stored.
- **Emergency**: shows your signal, the nearest cell with usable signal (distance + compass arrow), a ready SMS/copy message with your coordinates, and Egypt numbers 112 / 122 / 123.
- **Trail**: record a route offline, tag signal along it, see the longest dead stretch, export GPX.
- Offline-first: data lives in the browser. Optional zero-dependency Node API (`server/server.js`) to pool reports; set `window.NABDAH_API` in `docs/index.html`.

## Run
```
npx serve docs          # or any static host
node server/server.js   # optional API (PORT, NABDAH_DATA)
node test/test.js       # tests
```

## Honest limits
- The demo map ships with **seeded sample data** (Alexandria, Cairo-Alex desert road, St Catherine, Siwa), clearly labelled. It is not real coverage until people report.
- Browsers cannot read real signal bars, so readings are self-reported. No automatic measurement in the web version. A native Android app could sample `TelephonyManager` (roadmap).
- Pages demo is static; pooling reports needs the API hosted somewhere.
- Browsers pause GPS when the screen locks. Not a substitute for a satellite messenger or telling someone your route.

## Prior art
OpenCellID and TowerCollector (cell tower databases), CoverageMap, Cell Surveys, LastBar. Nabdah differs by being free, Arabic-first, privacy-snapped, and focused on emergency "walk to signal" guidance plus trail dead-stretch logging.

MIT License.
