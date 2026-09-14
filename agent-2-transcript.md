# Readme file ticket breakdown
_Exported on 9/14/2026 at 17:43:45 GMT-3 from Cursor (3.20.17)_

---

**User**

get the readme file, identify what needs to be done and break it into tickets.

---

**Cursor**

I'll read the README and related task docs, then break the work into tickets.

Quick look at the stubs so the tickets match what’s actually unfinished.

Here’s a ticket breakdown from the README / AGENTS.md, ordered for a ~60‑minute run. Prefer finishing **Core** before any stretch.

---

### Core (required)

| ID | Ticket | Acceptance criteria | Touch |
|----|--------|---------------------|-------|
| **C1** | **Station types + clean `GET /api/stations`** | Load `stations.json`; return 200 with a typed public list; strip `__internalId`; normalize null/missing `uvIndex` / missing `region` / empty `readings` without crashing; keep `GET /health` working | `server/src/` (+ types) |
| **C2** | **Implement `uvCategory(uv)`** | WHO bands: Low/green, Moderate/yellow, High/orange, Very High/red, Extreme/purple (11+); `cd app && npm test` passes | `app/src/lib/uv.ts` |
| **C3** | **Client fetch helper** | Fetch stations from the existing API base URL; typed response; surface HTTP/network failures | `app/src/lib/api.ts` |
| **C4** | **Stations list UI** | List name, region, UV + category/color; loading / error / empty states | `app/App.tsx` (+ optional `app/src/` components) |
| **C5** | **Messy-data hardening** | Null/missing/odd UV or region never crashes or shows nonsense; safe fallbacks in API and/or UI; document choice in submission | server cleaners + list UI |

C1 → C2 can run in parallel. C3–C5 depend on C1/C2.

---

### Stretch (only after core; do in order)

| ID | Ticket | Notes |
|----|--------|-------|
| **S-A** | Search list by station name | Client filter |
| **S-B** | Detail screen + `GET /api/stations/:id` | Needs navigation; show recent readings |
| **S-C** | Favorites that persist across restart | AsyncStorage (or similar); note dep in `SUBMISSION.md` |
| **S-D** | Pull-to-refresh or auto-refresh | |
| **S-E** | Extra tests / a11y / perf | Whatever matters most |

---

### Delivery (end of session)

| ID | Ticket | Acceptance criteria |
|----|--------|---------------------|
| **D1** | Branch + commits | Work on a branch; commit as you go |
| **D2** | `claude-transcript.md` | AI session transcript committed |
| **D3** | Fill `SUBMISSION.md` | Built / skipped / trade-offs / AI use / time |
| **D4** | Open PR into `main` | Code + transcript + submission |

---

### Suggested ~60‑min order

1. **C1** (API + types) and **C2** (`uvCategory`) first  
2. **C3** → **C4** → **C5** until list + states feel solid  
3. Stretch **S-A → S-B → …** only if time left  
4. **D1–D4** before the clock runs out  

Out of scope unless asked: native builds, deploy, auth, DB, rewriting Expo/Express, changing port without updating `api.ts`.

Want me to start implementing from **C1**?

---

**User**

use a .md for keeping track of these tickets. the progress should be updated as the agents work on each one.

Let's have one subagent per each core ticket, implementing them and working in paralel when possible. After the code to be done, put on another subagent to review the code and find possible issues and resolving them.

---

**Cursor**

Creating a tickets tracker with a shared API contract, then launching one implementer per core ticket (parallel where file ownership doesn't clash), followed by a review/fix pass.

Launching C1–C4 in parallel with locked file ownership and the shared API contract.

Tracker is in [`TICKETS.md`](TICKETS.md). Branch: `feat/core-uv-monitor`.

**Running in parallel (C1–C4):**
- [C1 stations API](3ef8e7bf-9296-4f13-bbee-c27b44421780) — `server/src/**`
- [C2 uvCategory](12ba42d5-bf46-45e8-8bca-2d25d3b4fc8d) — `uv.ts`
- [C3 client fetch](0b0f160a-ee6e-45a5-b450-503988faeec5) — `api.ts` + `types.ts`
- [C4 list UI](8ed1ca5c-d88e-44d2-95b8-8e45ae1c0547) — `App.tsx` + components

**Queued after those finish:** C5 (messy-data hardening) → R1 (review + fix)

I’ll update `TICKETS.md` as each agent reports back, then kick off C5 and the review pass.

---

**User**

<timestamp>Monday, Sep 14, 2026, 3:43 PM (UTC-3)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: subagent
status: success
task_id: 0b0f160a-ee6e-45a5-b450-503988faeec5
title: C3 client fetch API
tool_call_id: call-ebdd003d-ec98-4936-a536-4e1d78e8ebc3-22
fc_0dfcd985-0df2-9582-8de5-54b42e1554df_2
agent_id: 0b0f160a-ee6e-45a5-b450-503988faeec5
detail: <user_visible_high_level_summary>
Added typed client fetch for stations: `types.ts` exports `Station` / `StationReading`; `api.ts` keeps `API_BASE_URL` and adds `fetchStations()` plus type re-exports. App typecheck passed.
</user_visible_high_level_summary>
<response>
## C3 summary

### Exports added
- **`types.ts`**: `StationReading`, `Station`
- **`api.ts`**: `fetchStations(): Promise<Station[]>`; re-exports `Station`, `StationReading`; keeps `API_BASE_URL` / `getApiBaseUrl`

### Files changed
- `app/src/lib/types.ts` (created)
- `app/src/lib/api.ts` (extended)

### Verify
`npm run typecheck` — **passed**
</response>
output_path: /home/gustavo/.cursor/projects/home-gustavo-dev-foodhealth-smog-check-gustavo/agent-transcripts/763f941e-1ba3-4e2a-964d-40717a7d6174/subagents/0b0f160a-ee6e-45a5-b450-503988faeec5.jsonl
</task>
</system_notification>
<user_query>Perform any necessary follow-up actions in response to the subagent completion above. If no follow-up work is needed, no further action is required. If you mention an agent or subagent in your response, link it with the `[Name](id)` Don't use generic label such as `[agent]`, `[worker]`, or `[subagent]`. For cloud subagents, when the agent has edited code, link to `[Review](bc-id#changes)`, or, if you know the exact added and deleted line counts, `[Review +A −D](bc-id#changes)`, replacing A and D with those counts. Never write A or D literally. Use `[Try Live](bc-id#desktop)` only when the agent used computer use. Don't repeat the same confirmation every time.</user_query>

---

**Cursor**

**C3** marked `done` in `TICKETS.md` — [C3 client fetch](0b0f160a-ee6e-45a5-b450-503988faeec5) added `types.ts` + `fetchStations()`. Still waiting on C1, C2, and C4 before C5 / review.

---

**User**

<timestamp>Monday, Sep 14, 2026, 3:43 PM (UTC-3)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: subagent
status: success
task_id: 3ef8e7bf-9296-4f13-bbee-c27b44421780
title: C1 stations API
tool_call_id: call-ebdd003d-ec98-4936-a536-4e1d78e8ebc3-20
fc_0dfcd985-0df2-9582-8de5-54b42e1554df_0
agent_id: 3ef8e7bf-9296-4f13-bbee-c27b44421780
detail: <user_visible_high_level_summary>
Implemented typed `GET /api/stations` under `server/src` only. Cleaning: strip `__internalId`, missing region → `"Unknown"`, keep `uvIndex: null` and empty `readings`. Typecheck is green; curl on :4000 returns 200 with 8 clean stations.
</user_visible_high_level_summary>
<response>
## C1 complete — `GET /api/stations`

### Files changed (only under `server/src/**`)
- `server/src/types.ts` — public `Station` / `StationReading` contract
- `server/src/stations.ts` — load + typed cleaning helpers
- `server/src/index.ts` — 501 stub → `res.json(getStations())`; `/health` unchanged

### Cleaning rules
| Rule | Behavior |
|------|----------|
| `__internalId` | Omitted from response |
| Missing `region` | `"Unknown"` |
| `uvIndex: null` | Kept as `null` |
| Empty `readings` | Kept as `[]` |
| Invalid readings / stations | Dropped (must have string `id`, `name`, `lastUpdated`) |
| Non-finite UV | Treated as `null` |

### Verification
- `npm run typecheck` — **pass**
- Smoke curl on `:4000` — **200**, 8 stations; `kc.region === "Unknown"`, `anc-offline.uvIndex === null`, no `__internalId`

### Caveats
None for core. Server was already running with hot reload, so the live endpoint picked up the change.
</response>
output_path: /home/gustavo/.cursor/projects/home-gustavo-dev-foodhealth-smog-check-gustavo/agent-transcripts/763f941e-1ba3-4e2a-964d-40717a7d6174/subagents/3ef8e7bf-9296-4f13-bbee-c27b44421780.jsonl
</task>
</system_notification>
<user_query>Perform any necessary follow-up actions in response to the subagent completion above. If no follow-up work is needed, no further action is required. If you mention an agent or subagent in your response, link it with the `[Name](id)` Don't use generic label such as `[agent]`, `[worker]`, or `[subagent]`. For cloud subagents, when the agent has edited code, link to `[Review](bc-id#changes)`, or, if you know the exact added and deleted line counts, `[Review +A −D](bc-id#changes)`, replacing A and D with those counts. Never write A or D literally. Use `[Try Live](bc-id#desktop)` only when the agent used computer use. Don't repeat the same confirmation every time.</user_query>

---

**Cursor**

**C1** marked `done` — [C1 stations API](3ef8e7bf-9296-4f13-bbee-c27b44421780) shipped clean `GET /api/stations`. Still waiting on C2 and C4.

---

**User**

<timestamp>Monday, Sep 14, 2026, 3:43 PM (UTC-3)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: subagent
status: success
task_id: 12ba42d5-bf46-45e8-8bca-2d25d3b4fc8d
title: C2 uvCategory
tool_call_id: call-ebdd003d-ec98-4936-a536-4e1d78e8ebc3-21
fc_0dfcd985-0df2-9582-8de5-54b42e1554df_1
agent_id: 12ba42d5-bf46-45e8-8bca-2d25d3b4fc8d
detail: <user_visible_high_level_summary>
Implemented `uvCategory(uv)` in `app/src/lib/uv.ts` with WHO bands (Low/green 0–2, Moderate/yellow 3–5, High/orange 6–7, Very High/red 8–10, Extreme/purple 11+). All 6 tests in `uv.test.ts` passed.
</user_visible_high_level_summary>
<response>
**Implemented:** `uvCategory(uv)` in `app/src/lib/uv.ts` — WHO bands with exact labels/colors (Low/green ≤2, Moderate/yellow ≤5, High/orange ≤7, Very High/red ≤10, Extreme/purple 11+). Kept `UvCategory` unchanged.

**Tests:** All 6 passed (`uv.test.ts`). Plain `npm test` hit a missing top-level `expo-modules-core` (nested under Expo); with `NODE_PATH=node_modules/expo/node_modules` it ran clean. No other files edited; no commit.
</response>
output_path: /home/gustavo/.cursor/projects/home-gustavo-dev-foodhealth-smog-check-gustavo/agent-transcripts/763f941e-1ba3-4e2a-964d-40717a7d6174/subagents/12ba42d5-bf46-45e8-8bca-2d25d3b4fc8d.jsonl
</task>
</system_notification>
<user_query>Perform any necessary follow-up actions in response to the subagent completion above. If no follow-up work is needed, no further action is required. If you mention an agent or subagent in your response, link it with the `[Name](id)` Don't use generic label such as `[agent]`, `[worker]`, or `[subagent]`. For cloud subagents, when the agent has edited code, link to `[Review](bc-id#changes)`, or, if you know the exact added and deleted line counts, `[Review +A −D](bc-id#changes)`, replacing A and D with those counts. Never write A or D literally. Use `[Try Live](bc-id#desktop)` only when the agent used computer use. Don't repeat the same confirmation every time.</user_query>

---

**Cursor**

**C2** marked `done` — [C2 uvCategory](12ba42d5-bf46-45e8-8bca-2d25d3b4fc8d). Still waiting on C4; then C5 + review.

---

**User**

<timestamp>Monday, Sep 14, 2026, 3:43 PM (UTC-3)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: subagent
status: success
task_id: 8ed1ca5c-d88e-44d2-95b8-8e45ae1c0547
title: C4 stations list UI
tool_call_id: call-ebdd003d-ec98-4936-a536-4e1d78e8ebc3-23
fc_0dfcd985-0df2-9582-8de5-54b42e1554df_3
agent_id: 8ed1ca5c-d88e-44d2-95b8-8e45ae1c0547
detail: <user_visible_high_level_summary>
Stations list UI is in place: App.tsx fetches on mount with loading / error / empty states, and StationRow shows name, region, and UV with WHO category colors (null UV → “—” / “No data”, no uvCategory call). `npm run typecheck` passes.
</user_visible_high_level_summary>
<response>
## C4 summary

### Components
- **`app/App.tsx`** — fetches via `fetchStations()` on mount; renders loading / error / empty / list
- **`app/src/components/StationRow.tsx`** — row with name, region, UV + category/color; local WHO→hex color map

### States
- **Loading:** `ActivityIndicator` + “Loading stations…”
- **Error:** title + error message from `Error.message`
- **Empty:** “No stations available.” when success with `[]`
- **List:** `FlatList` of `StationRow`

### Null UV
- When `uvIndex == null`: shows `—` / “No data”; does **not** call `uvCategory`

### Typecheck
- `npm run typecheck` **passes** (C2 `fetchStations` / `Station` already present)
</response>
output_path: /home/gustavo/.cursor/projects/home-gustavo-dev-foodhealth-smog-check-gustavo/agent-transcripts/763f941e-1ba3-4e2a-964d-40717a7d6174/subagents/8ed1ca5c-d88e-44d2-95b8-8e45ae1c0547.jsonl
</task>
</system_notification>
<user_query>Perform any necessary follow-up actions in response to the subagent completion above. If no follow-up work is needed, no further action is required. If you mention an agent or subagent in your response, link it with the `[Name](id)` Don't use generic label such as `[agent]`, `[worker]`, or `[subagent]`. For cloud subagents, when the agent has edited code, link to `[Review](bc-id#changes)`, or, if you know the exact added and deleted line counts, `[Review +A −D](bc-id#changes)`, replacing A and D with those counts. Never write A or D literally. Use `[Try Live](bc-id#desktop)` only when the agent used computer use. Don't repeat the same confirmation every time.</user_query>

---

**Cursor**

C1–C4 are done. Updating the tracker and launching C5, then the review pass.

**C4** marked `done` — [C4 list UI](8ed1ca5c-d88e-44d2-95b8-8e45ae1c0547).

[C5 messy-data harden](862d95ee-d211-4f16-9fb1-1cd1bf790095) is running next; R1 review starts after that.

---

**User**

<timestamp>Monday, Sep 14, 2026, 3:45 PM (UTC-3)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: subagent
status: success
task_id: 862d95ee-d211-4f16-9fb1-1cd1bf790095
title: C5 messy-data harden
tool_call_id: call-e8b67a3c-5188-4416-b981-0b153554edb3-31
fc_4803269c-172a-9e96-a95e-3eff3e492ca9_2
agent_id: 862d95ee-d211-4f16-9fb1-1cd1bf790095
detail: <user_visible_high_level_summary>
C5 messy-data hardening is done. Live API already stripped `__internalId` and handled null UV / missing region / empty readings; small defensive fixes landed on server cleaners, StationRow, and fetchStations. Server and app typechecks both pass.
</user_visible_high_level_summary>
<response>
## C5 report

### Issues found
Core path was already solid (no `__internalId` leak; null UV / missing region / empty readings OK). Gaps were defensive edge cases:
- Non-finite/negative UV could still reach `uvCategory` (`NaN` → “Extreme”)
- Blank/whitespace region only partly handled
- `fetchStations` didn’t guard non-array JSON

### Fixes applied
- **`server/src/stations.ts`**: reject non-finite/negative UV → `null`; trim blank region → `"Unknown"`; drop blank `id`/`name`; build public object only (no `__internalId`); reuse UV cleaner for readings
- **`app/src/components/StationRow.tsx`**: call `uvCategory` only on finite numbers; region/name fallbacks
- **`app/src/lib/api.ts`**: require array response
- **`TICKETS.md`**: C5 → `done` + notes / SUBMISSION draft bullets

### Verify
- `server` typecheck: pass
- `app` typecheck: pass
- curl `GET /api/stations`: 200, 8 stations, keys `id|name|region|uvIndex|lastUpdated|readings`, no internals; `anc-offline` null + `[]`; `kc` → `"Unknown"`; UV 14 kept

### Clean-data choices (for SUBMISSION.md)
- Strip internals by building a public object (never pass through `__internalId`)
- Missing/blank `region` → `"Unknown"`; keep `uvIndex: null` and empty `readings`
- Non-finite/negative UV → `null` (UI `—` / “No data”; never call `uvCategory` on null/odd)
- Drop malformed readings; drop stations missing required `id` / `name` / `lastUpdated`
</response>
output_path: /home/gustavo/.cursor/projects/home-gustavo-dev-foodhealth-smog-check-gustavo/agent-transcripts/763f941e-1ba3-4e2a-964d-40717a7d6174/subagents/862d95ee-d211-4f16-9fb1-1cd1bf790095.jsonl
</task>
</system_notification>
<user_query>Perform any necessary follow-up actions in response to the subagent completion above. If no follow-up work is needed, no further action is required. If you mention an agent or subagent in your response, link it with the `[Name](id)` Don't use generic label such as `[agent]`, `[worker]`, or `[subagent]`. For cloud subagents, when the agent has edited code, link to `[Review](bc-id#changes)`, or, if you know the exact added and deleted line counts, `[Review +A −D](bc-id#changes)`, replacing A and D with those counts. Never write A or D literally. Use `[Try Live](bc-id#desktop)` only when the agent used computer use. Don't repeat the same confirmation every time.</user_query>

---

**Cursor**

C5 is done — launching the R1 review/fix pass next.

**C5** is `done` — [C5 messy-data harden](862d95ee-d211-4f16-9fb1-1cd1bf790095).

[R1 review and fix](f0775a5a-cffb-4f1f-ad90-5583d7b5ec2e) is running now.

---

**User**

<timestamp>Monday, Sep 14, 2026, 3:48 PM (UTC-3)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: subagent
status: success
task_id: f0775a5a-cffb-4f1f-ad90-5583d7b5ec2e
title: R1 review and fix
tool_call_id: call-21c31891-aeb8-449b-9f94-32f08a28ce50-35
fc_098aa862-f026-9e9c-9711-3951df842839_1
agent_id: f0775a5a-cffb-4f1f-ad90-5583d7b5ec2e
detail: <user_visible_high_level_summary>
R1 review is done: fixed the Jest `expo-modules-core` resolve failure (direct dep), tightened negative-UV handling, FlatList flex, trimmed station id/name, and aligned client type docs. Server/app typecheck and `npm test` all pass.
</user_visible_high_level_summary>
<response>
## R1 report

### Issues found
1. **Jest broken** — `Cannot find module 'expo-modules-core'` (nested under `expo/node_modules`)
2. **Negative UV UX** — `StationRow` treated negatives as valid → `uvCategory` → “Low”
3. **List layout** — `FlatList` missing `flex: 1` (scroll/fill under title)
4. **Contract docs drift** — client `Station` missing shared JSDoc
5. **Padded id/name** — server trim-checked but returned untrimmed strings

### Fixes applied
| Fix | Where |
|-----|--------|
| `npx expo install expo-modules-core` (`~57.0.18`) | `app/package.json` |
| `isDisplayableUv` requires `value >= 0` | `StationRow.tsx` |
| `styles.list` with `flex: 1` on FlatList | `App.tsx` |
| JSDoc aligned with shared contract | `app/src/lib/types.ts` |
| Emit trimmed `id` / `name` | `server/src/stations.ts` |
| R1 → `done` + notes | `TICKETS.md` |

### Verified OK (no change)
- Live API: 8 stations, no `__internalId`, null UV + `"Unknown"` region
- WHO bands / no `uvCategory` on null
- Loading / error / empty reachable
- No stretch features added

### Verify results
| Command | Result |
|---------|--------|
| `server && npm run typecheck` | ✅ |
| `app && npm run typecheck` | ✅ |
| `app && npm test` | ✅ (no `NODE_PATH`) |

### Remaining risks
- Client/server `Station` types still duplicated (intentional; can drift later)
- `fetchStations` only checks array shape, not per-item fields (OK for core)
- Error UI has no retry (stretch refresh)
</response>
output_path: /home/gustavo/.cursor/projects/home-gustavo-dev-foodhealth-smog-check-gustavo/agent-transcripts/763f941e-1ba3-4e2a-964d-40717a7d6174/subagents/f0775a5a-cffb-4f1f-ad90-5583d7b5ec2e.jsonl
</task>
</system_notification>
<user_query>Perform any necessary follow-up actions in response to the subagent completion above. If no follow-up work is needed, no further action is required. If you mention an agent or subagent in your response, link it with the `[Name](id)` Don't use generic label such as `[agent]`, `[worker]`, or `[subagent]`. For cloud subagents, when the agent has edited code, link to `[Review](bc-id#changes)`, or, if you know the exact added and deleted line counts, `[Review +A −D](bc-id#changes)`, replacing A and D with those counts. Never write A or D literally. Use `[Try Live](bc-id#desktop)` only when the agent used computer use. Don't repeat the same confirmation every time.</user_query>

---

**Cursor**

**Core pipeline complete.** [R1 review and fix](f0775a5a-cffb-4f1f-ad90-5583d7b5ec2e) closed out the pass; typechecks + tests are green.

| Ticket | Status |
|--------|--------|
| C1–C5 | `done` |
| R1 | `done` |
| Stretch / Delivery | still `todo` |

Tracker: `TICKETS.md`. Say if you want stretch items next, or delivery (commits / `SUBMISSION.md` / PR).

---

**User**

what are the tickets remaining?

---

**Cursor**

Core (C1–C5 + R1) is done. Still open:

**Stretch** (optional, in order)
- **S-A** — Search by station name  
- **S-B** — Detail screen + `GET /api/stations/:id`  
- **S-C** — Favorites (persist across restart)  
- **S-D** — Pull-to-refresh / auto-refresh  
- **S-E** — Extra tests / a11y / perf  

**Delivery** (for submission)
- **D1** — Commits on the branch  
- **D2** — `claude-transcript.md`  
- **D3** — Fill `SUBMISSION.md`  
- **D4** — PR into `main`

