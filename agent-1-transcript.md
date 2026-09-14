# UFW port 8082 configuration
_Exported on 9/14/2026 at 17:42:44 GMT-3 from Cursor (3.20.17)_

---

**User**

ufw allow port 8082 how to

---

**Cursor**

Allow TCP on 8082:

```bash
sudo ufw allow 8082/tcp
```

Then check that the rule is active:

```bash
sudo ufw status
```

If UFW isn’t enabled yet:

```bash
sudo ufw enable
```

---

**User**

read the project, the documentation and set up a agents.md file with instructions every agent should have before coding.

---

**Cursor**

I'll read the create-rule skill and the project docs so we can draft a solid `AGENTS.md`.

Next I'll skim the codebase structure and key stubs so `AGENTS.md` matches how this project actually works.

I have enough context from the README and stubs — writing a focused root `AGENTS.md` with priorities, messy-data rules, and how to run the stack.

Created [`AGENTS.md`](AGENTS.md) at the repo root. Agents get:

- Project goal and core-over-stretch priority
- Layout map (`server/`, `app/`, key stubs)
- Messy-data rules from `stations.json` (null UV, missing region, strip `__internalId`)
- WHO UV bands and run/test commands
- Coding constraints (small diffs, types, UI states, don’t “fix” the JSON)
- Submission/workflow expectations and a core definition-of-done checklist

---

**User**

/find-skills recommend me skills for coding the app and the server applications

---

**Cursor**

I'll check the skills leaderboard and search for Expo/React Native and Node/Express skills that fit this stack.

Pulling details on the strongest matches so recommendations stay accurate for this Expo + Express take-home.

Best fits for this Expo app + Express server take-home (high installs / trusted sources). You already have `tdd`, `codebase-design`, `diagnosing-bugs`, and `vercel-react-best-practices` — keep those; skip adding more Express skills (most are low-install / unknown).

### App (Expo / React Native) — install these

**1. `vercel-react-native-skills`** — strongest match  
Lists, Pressable, Expo UI patterns, navigation. From Vercel Labs (~210K installs).  
https://skills.sh/vercel-labs/agent-skills/vercel-react-native-skills

```bash
npx skills add vercel-labs/agent-skills@vercel-react-native-skills -g -y
```

**2. `expo-data-fetching`** — official Expo  
API requests, loading/error/offline — maps to the stations list. (~16K)  
https://skills.sh/expo/skills/expo-data-fetching

```bash
npx skills add expo/skills@expo-data-fetching -g -y
```

**3. `react-native-best-practices`** (Callstack) — optional stretch  
Performance only if you have time for stretch E. (~26K)  
https://skills.sh/callstackincubator/agent-skills/react-native-best-practices

```bash
npx skills add callstackincubator/agent-skills@react-native-best-practices -g -y
```

### Server (Node / Express / TypeScript)

No high-quality Express skill stands out (most &lt;1K installs). For this small API, use what you already have:

| Already installed | Use for |
|---|---|
| `tdd` | `uvCategory` tests first |
| `codebase-design` / `domain-modeling` | Clean station types + dirty JSON |
| `diagnosing-bugs` | When API ↔ device networking breaks |

**Optional Node skill:** `mcollina/skills@node` (~5K, Matteo Collina) — solid Node guidance, but it pushes type-stripping patterns that fight this repo’s `tsx` setup. Skip unless you want general Node advice.

```bash
npx skills add mcollina/skills@node -g -y
```

**Optional for tests:** `javascript-typescript-jest` (~13K, GitHub)  
https://skills.sh/github/awesome-copilot/javascript-typescript-jest

```bash
npx skills add github/awesome-copilot@javascript-typescript-jest -g -y
```

### Skip for this take-home

- Most `expo/*` skills (router, deployment, Tailwind, upgrading) — out of scope  
- `vercel-react-best-practices` — Next.js/web; less useful than the RN skill here  
- Low-install Express starters — not worth the noise  

### Minimal install set

```bash
npx skills add vercel-labs/agent-skills@vercel-react-native-skills -g -y
npx skills add expo/skills@expo-data-fetching -g -y
```

Want me to install those two now?

---

**User**

install these ones: vercel-react-native-skills, react-native-best-practices, expo-data-fetching

---

**Cursor**

Installing those three skills globally now.

All three are installed under `~/.agents/skills/`:

- `vercel-react-native-skills`
- `react-native-best-practices`
- `expo-data-fetching`

(PromptScript reported it doesn’t support global installs; that can be ignored — Cursor/agents got the copies.)

