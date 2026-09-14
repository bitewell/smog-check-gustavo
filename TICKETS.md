# Core tickets — UV Index Monitor

Progress tracker for the take-home. Agents update status as they work.

| Status | Meaning |
|--------|---------|
| `todo` | Not started |
| `in_progress` | Agent working |
| `blocked` | Waiting on another ticket |
| `done` | Acceptance criteria met |
| `needs_fix` | Review found issues |

**Shared public API contract** (locked — all agents must match this):

```ts
export interface StationReading {
  ts: string;
  uvIndex: number;
}

export interface Station {
  id: string;
  name: string;
  /** Missing in source → `"Unknown"` on the API */
  region: string;
  /** `null` when offline / no reading */
  uvIndex: number | null;
  lastUpdated: string;
  readings: StationReading[];
}
```

- Never expose `__internalId`.
- Do not edit `server/data/stations.json`.
- UV ≥ 11 is Extreme (handled by `uvCategory`).

---

## C1 — Station types + clean `GET /api/stations`

- **Status:** `done`
- **Owner files:** `server/src/**` only (may add helpers under `server/src/`)
- **Do not touch:** `app/**`
- **Acceptance:**
  - [x] `GET /health` still works
  - [x] `GET /api/stations` returns 200 + JSON array matching `Station[]`
  - [x] `__internalId` stripped
  - [x] Missing `region` → `"Unknown"`
  - [x] `uvIndex: null` and empty `readings` preserved / allowed
  - [x] `npm run typecheck` in `server/` passes
- **Notes:** Done by [C1 stations API](3ef8e7bf-9296-4f13-bbee-c27b44421780). Added `types.ts` + `stations.ts`; curl 200 with 8 clean stations.

---

## C2 — Implement `uvCategory(uv)`

- **Status:** `done`
- **Owner files:** `app/src/lib/uv.ts` only
- **Do not touch:** anything else
- **Acceptance:**
  - [x] WHO bands: Low/green, Moderate/yellow, High/orange, Very High/red, Extreme/purple
  - [x] `cd app && npm test` passes
- **Notes:** Done by [C2 uvCategory](12ba42d5-bf46-45e8-8bca-2d25d3b4fc8d). Tests needed `NODE_PATH=node_modules/expo/node_modules` for nested `expo-modules-core` — flag for R1.

---

## C3 — Client fetch helper

- **Status:** `done`
- **Owner files:** `app/src/lib/api.ts`, `app/src/lib/types.ts` (create types)
- **Do not touch:** `App.tsx`, `uv.ts`, `server/**`
- **Acceptance:**
  - [x] Export `Station` / `StationReading` types matching the shared contract
  - [x] Export `fetchStations(): Promise<Station[]>` using existing `API_BASE_URL`
  - [x] Non-OK HTTP → throw with a clear Error message
- **Notes:** Done by [C3 client fetch](0b0f160a-ee6e-45a5-b450-503988faeec5). Typecheck passed.

---

## C4 — Stations list UI

- **Status:** `done`
- **Owner files:** `app/App.tsx`, `app/src/components/**` (create as needed)
- **Do not touch:** `server/**`, `uv.ts` implementation, rewrite of `api.ts` (import only)
- **Depends on contract:** import `fetchStations` from `./src/lib/api` and `uvCategory` from `./src/lib/uv`
- **Acceptance:**
  - [x] List shows name, region, UV + category/color
  - [x] Loading, error, and empty states
  - [x] Null UV → show `—` / “No data” (not nonsense); do not call `uvCategory` on null
  - [x] Region always displayed (API sends `"Unknown"` when missing)
- **Notes:** Done by [C4 list UI](8ed1ca5c-d88e-44d2-95b8-8e45ae1c0547). StationRow + FlatList; typecheck passed.

---

## C5 — Messy-data hardening pass

- **Status:** `done`
- **Owner files:** may touch server cleaners + UI fallbacks; keep diffs small
- **Acceptance:**
  - [x] Null / missing / odd UV or region never crashes the UI
  - [x] No `__internalId` leak
  - [x] Brief note of clean-data choices ready for `SUBMISSION.md`
- **Notes:**
  - Verified live `GET /api/stations`: 8 stations, no `__internalId`, `anc-offline` keeps `uvIndex: null` + `readings: []`, `kc` region `"Unknown"`, UV 14 still present.
  - Gaps fixed: server rejects non-finite/negative UV and blank ids/names/regions; UI only calls `uvCategory` on finite numbers + region/name fallbacks; `fetchStations` requires an array response.
  - **Clean-data choices (for SUBMISSION.md):**
    - Strip internal fields by building a public object (never pass through `__internalId`).
    - Missing/blank `region` → `"Unknown"`; keep `uvIndex: null` and empty `readings` as first-class values.
    - Non-finite or negative UV → `null` (UI shows `—` / “No data”; never call `uvCategory` on null/odd values).
    - Drop malformed readings; drop stations missing required `id` / `name` / `lastUpdated`.

---

## R1 — Code review + fix

- **Status:** `done`
- **Acceptance:**
  - [x] Review C1–C5 for bugs, type gaps, contract drift, UX holes
  - [x] Fix issues found
  - [x] `server` typecheck, `app` typecheck, `app` tests all green
- **Notes:**
  - **Issues found + fixes:**
    1. `npm test` failed: `Cannot find module 'expo-modules-core'` (nested under `expo/node_modules`). Fixed by installing `expo-modules-core@~57.0.18` as a direct app dependency via `npx expo install` so Jest resolves it without `NODE_PATH` hacks.
    2. UI treated negative UV as displayable → would call `uvCategory` and show “Low”. Tightened `isDisplayableUv` to require `value >= 0`.
    3. `FlatList` lacked `flex: 1` — list may not scroll/fill under the title on some layouts. Added `styles.list`.
    4. Client `Station` types lacked shared-contract JSDoc; aligned comments with `TICKETS.md` / server types.
    5. Server `cleanStation` kept padded `id`/`name` when only trim-checked; now emits trimmed values.
  - **Verified OK (no change needed):** API contract live (8 stations, no `__internalId`, null UV + Unknown region); `uvCategory` WHO bands; loading/error/empty states reachable; no stretch scope creep.
  - **Checks:** server typecheck ✅, app typecheck ✅, `npm test` ✅ (no `NODE_PATH`).

---

## Stretch (later)

| ID | Status | Ticket |
|----|--------|--------|
| S-A | `todo` | Search by station name |
| S-B | `todo` | Detail + `GET /api/stations/:id` |
| S-C | `todo` | Favorites (persist) |
| S-D | `todo` | Pull-to-refresh / auto-refresh |
| S-E | `todo` | Extra tests / a11y / perf |

## Delivery

| ID | Status | Ticket |
|----|--------|--------|
| D1 | `todo` | Branch + commits |
| D2 | `todo` | `claude-transcript.md` |
| D3 | `todo` | Fill `SUBMISSION.md` |
| D4 | `todo` | PR into `main` |
