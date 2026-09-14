# AGENTS.md — UV Index Monitor (take-home)

Read this before writing code. Prefer a polished **core** over half-finished stretch goals.

## What this is

Timed (~60 min) full-stack exercise: Node/Express API + Expo/React Native app that shows UV readings from monitoring stations. AI use is expected; quality of direction and review matters more than finishing everything.

Canonical task list and evaluation criteria: `README.md`. Submission notes template: `SUBMISSION.md`.

## Layout

| Path | Role |
|------|------|
| `server/` | Express + TypeScript API (`PORT` default **4000**) |
| `server/data/stations.json` | Source data (intentionally messy) |
| `server/src/index.ts` | Routes; `GET /api/stations` is stubbed (501) |
| `app/` | Expo / React Native client |
| `app/App.tsx` | Entry UI (placeholder) |
| `app/src/lib/api.ts` | API base URL (derives host from Expo `hostUri`) |
| `app/src/lib/uv.ts` | `uvCategory(uv)` — implement so tests pass |
| `app/src/lib/__tests__/uv.test.ts` | WHO UV band tests |

Node version: see `.nvmrc`.

## Priorities (do in order)

### Core (required)

1. **`GET /api/stations`** — return a clean, typed JSON list from `stations.json`.
2. **`uvCategory(uv)`** — WHO bands; make `cd app && npm test` pass.
3. **Stations list UI** — name, region, UV + category/color; loading / error / empty states.
4. **Messy data** — never crash or show nonsense for missing/odd values.

### Stretch (only after core; stop when time is up)

A. Search by name → B. Detail + `GET /api/stations/:id` → C. Favorites (persist) → D. Refresh → E. Tests / a11y / perf.

## Messy data rules

Treat `stations.json` as real-world dirty input. Before coding, inspect it. Known quirks include:

- `uvIndex` can be `null`
- `region` can be missing
- `__internalId` is internal — do **not** expose it on the public API
- `readings` may be empty
- UV can be above 11 (still Extreme)

Define what “clean” means in types and server/UI handling (filter, coalesce, or present a safe fallback). Document the choice briefly in `SUBMISSION.md` when submitting.

## WHO UV bands (for `uvCategory`)

| UV Index | Label | Color |
|----------|-------|-------|
| 0–2 | Low | green |
| 3–5 | Moderate | yellow |
| 6–7 | High | orange |
| 8–10 | Very High | red |
| 11+ | Extreme | purple |

Do not invent alternate labels/colors; tests assert these.

## How to run

```bash
# Terminal 1 — API
cd server && npm install && npm run dev   # http://localhost:4000

# Terminal 2 — app
cd app && npm install && npm start        # Expo Go / press `w` for web
```

- Keep the server running while using the app.
- Physical device: `api.ts` uses the Expo host so the phone can hit `:4000` on your machine (firewall must allow it).
- Typecheck: `npm run typecheck` in `server/` and/or `app/`.
- App tests: `cd app && npm test`.

## Coding guidelines for agents

- **Small diffs.** Extend the skeleton; don’t rewrite the stack or add frameworks unless clearly needed for a stretch item.
- **Types first.** Shared station shapes should be explicit (server response + client consumers). Prefer TypeScript over `any`.
- **API contract.** List endpoint returns clean public fields only. Add `GET /api/stations/:id` only when doing stretch B.
- **UI states.** Loading, error, and empty are part of core — not optional polish.
- **Reuse existing helpers.** Put fetch logic near `app/src/lib/api.ts`; keep `uvCategory` in `uv.ts`; colocate components under `app/src/` if splitting.
- **No secrets / no fake backends.** Use the local server and `stations.json`.
- **Don’t “fix” the data file** to make the happy path easier — handle dirtiness in code.
- **Dependencies.** Avoid heavy new deps for core. If you add one for a stretch (e.g. persistence/navigation), note why in `SUBMISSION.md`.

## Workflow expectations

- Work on a **branch**; commit as you go.
- Open a PR into `main` when done.
- Include: code, `claude-transcript.md` (AI session transcript), filled `SUBMISSION.md`.
- Honesty about skips and trade-offs is valued over claiming unfinished stretch work.

## Definition of done (core)

- [ ] `GET /health` still works; `GET /api/stations` returns 200 + clean typed stations
- [ ] `uvCategory` tests green
- [ ] App lists stations with name, region, UV category + color
- [ ] Loading / error / empty handled
- [ ] Null/missing/odd UV or region does not crash the UI
- [ ] Typecheck passes for touched packages

## Out of scope unless asked

Native iOS/Android builds, production deploy, auth, databases, rewriting Expo/Express setup, changing default API port without updating `api.ts`.
