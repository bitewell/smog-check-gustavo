# Submission Notes

Keep it short, bullets are fine. This helps us review fairly and gives us things to talk through together afterward.

**What I built**
- Core complete: `GET /api/stations` (typed + cleaned), `uvCategory` (WHO bands, tests green), client `fetchStations`, stations list UI with loading / error / empty.
- Messy-data handling on both sides (server cleaners + UI fallbacks for null/odd UV and missing region).
- Light structure polish after core: `useStations` hook, `StationRow` memo, stable `FlatList` `renderItem`.
- No stretch items (A–E).

**Decisions and trade-offs**
- “Clean” means build a public object (never pass `__internalId` through); missing/blank `region` → `"Unknown"`; keep `uvIndex: null` and empty `readings`; non-finite/negative UV → `null`; drop malformed readings / stations missing required fields.
- UI never calls `uvCategory` on non-displayable UV — shows `—` / “No data”.
- Directed AI with `AGENTS.md` + ticket tracker (`TICKETS.md`), then one subagent per core ticket in parallel (file ownership locked), plus a review/fix pass.
- Client and server each own a `Station` type (no shared package) — simple for this repo size; can drift later.
- For device testing I temporarily hardcoded the LAN IP in `api.ts` instead of Expo `hostUri` derivation — works on my network, not the portable default.
- Skipped list virtualization tuning (e.g. `getItemLayout`) — few stations today, so not worth it; easy to add later especially because row height is predictable.

**What I skipped, and why**
- All stretch (search, detail/`/:id`, favorites, refresh, extra a11y/perf). Prefer a solid core over half-built extras in the timebox.
- Didn’t clean every small unused export (`cleanStation` export, unused `StationReading` re-export) once review flagged them as low-signal.

**What I'd do next**
- Stretch A (search), then B (detail + readings).
- Restore host derivation in `api.ts` (or make the override opt-in).
- Error retry / pull-to-refresh (S-D).

**How I used AI**
- Setup first: `AGENTS.md`, ticket breakdown, RN/Expo skills — then parallel implementers for C1–C4, then C5, then a review agent.
- Review caught real issues I wouldn’t have wanted in the PR: Jest `expo-modules-core` resolve failure, negative UV showing as “Low”, FlatList missing `flex: 1`, untrimmed `id`/`name`.
- I steered structure myself (extract `useStations`, memo/`useCallback`) and asked for a dead-code report without auto-cleanup — kept scope tight.
- Transcript: `claude-transcript.md` (plus agent session exports).

**Time spent**
- Roughly ~2 hours total including setup, orchestration, core, light polish, and delivery. Core coding itself was much shorter with parallel agents; I spent more time directing/reviewing than typing.
